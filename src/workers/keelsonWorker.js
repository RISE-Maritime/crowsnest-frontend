import axios from "axios"

var subscriptions = {}
var get_loops = {}
var ports = []

function postMessage(type, data) {
  if (ports.length > 0) {
        ports.forEach(port => {
            port.postMessage({ type: type, data: data })
        })
    }
}

function postKeelsonMessage(e) {
  try {
    const payload = JSON.parse(e.data)
    postMessage("keelson", payload)
  } catch (err) {
    postMessage("error", err)
  }
}

function keyToRegex(keyExpr) {
  // Properly escape all regex characters
  let escaped = keyExpr.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&")

  // Convert '**' to '.*' (match any string including '/')
  // We must ensure '**' is replaced before '*', to avoid transforming '*' into something unintended
  escaped = escaped.replace(/\*\*/g, ".*")

  // Convert '*' to '[^/]*' (match any string except '/')
  // Now replace '*' ensuring it does not begin the pattern to avoid syntax errors
  escaped = escaped.replace(/\\\*/g, "[^/]*")

  return new RegExp("^" + escaped + "$")
}

function manageKeyValueStore(store, key, createValue, deleteValue) {
  const newKeyRegex = keyToRegex(key)
  const keys = Object.keys(store)
  let isMoreGeneralOrEqualExisting = false
  let specificKeysToRemove = []

  // Determine the action based on the specificity of existing keys
  for (let existingKey of keys) {
    const existingKeyRegex = keyToRegex(existingKey)

    // Check if the new key matches under any existing key's pattern (existing is more general)
    if (existingKeyRegex.test(key)) {
      isMoreGeneralOrEqualExisting = true
      break
    }

    // Check if any existing key matches under the new key's pattern (new is more general)
    if (newKeyRegex.test(existingKey)) {
      specificKeysToRemove.push(existingKey)
    }
  }

  // If a more general or equal key already covers the new key, reject the addition
  if (isMoreGeneralOrEqualExisting) {
    return false
  }

  // Remove more specific keys if the new key is more general
  specificKeysToRemove.forEach(keyToRemove => {
    deleteValue(store[keyToRemove])
    delete store[keyToRemove]
    //postMessage("info", `Key removed from store: ${keyToRemove}`)
  })

  // Add the new key to the store
  store[key] = createValue()
  //postMessage("info", `New key added to store: ${key}`)
  return true
}

function CreateGetDataLoop(url, delay) {
  return setInterval(() => {
    axios
      .get(url)
      .then(res => {
        if (!(Array.isArray(res) && res.length === 0)) {
          postMessage("get_loop", res.data)        
        } 
      })
      .catch(err => {
        postMessage("error", err)
      })
  }, delay)
}

function CreateKeelsonSubscription(url) {
  try {
    subscriptions[url] = new EventSource(url)
    subscriptions[url].addEventListener("PUT", postKeelsonMessage, false)
  } catch (err) {
    postMessage("error", err.data)
  }
}

self.onconnect = e => {
  const port = e.ports[0]
  ports.push(port)
  postMessage("info", "KeelsonWorker - Port connection. Total number of ports: " + ports.length)

  port.onmessage = message => {
    switch (message.data.type) {
      case "subscribe":
        CreateKeelsonSubscription()
        postMessage("error", "Subscribe is not yet implemented.")
        break
      case "get_loop":
        manageKeyValueStore(
          get_loops,
          message.data.data,
          // TODO: How to set from component delay?
          CreateGetDataLoop.bind(null, message.data.data, 5000),
          clearInterval,
        )
        postMessage("info", `KeelsonWorker - Created get_loop for ${message.data.data} . Total number of 'get_loops': ${Object.keys(get_loops).length}`)
        break
      case "remove_get_loop":
        delete get_loops[message.data.data]
        postMessage("info", `KeelsonWorker - Removed get_loop for ${message.data.data} . Total number of 'get_loops': ${Object.keys(get_loops).length}`)
        break
      case "remove_subscribe":
        delete subscriptions[message.data.data]
        break
      case "disconnect":
        ports = ports.filter(p => p !== port)
        postMessage("info", "KeelsonWorker - Port disconnection. Total number of ports: " + ports.length)
        break
      default:
        postMessage("error", `KeelsonWorker - Unrecognized message of type ${message.data.type}!`)
    }
  }
  port.start()
}
