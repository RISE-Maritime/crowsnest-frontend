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

function postSubscribeMessage(e) {
  try {
    const payload = JSON.parse(e.data)
    postMessage("subscribe", payload)
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
  })

  // Add the new key to the store
  store[key] = createValue()
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

function CreateSubscription(url) {
  let subscription
  try {
    subscription = new EventSource(url)
    subscription.addEventListener("PUT", postSubscribeMessage, false)
  } catch (err) {
    postMessage("error", err.data)
  }
  return subscription
}

function RemoveSubscription(eventSource) {
  eventSource.close()
}

self.onconnect = e => {
  const port = e.ports[0]
  ports.push(port)
  postMessage("info", "KeelsonWorker - Port connection. Total number of ports: " + ports.length)

  port.onmessage = message => {
    switch (message.data.type) {
      case "subscribe":
        manageKeyValueStore(
          subscriptions,
          message.data.data,
          CreateSubscription.bind(null, message.data.data),
          RemoveSubscription
        )
        postMessage("info", `KeelsonWorker - Created subscription for ${message.data.data} . Total number of 'subscriptions': ${Object.keys(subscriptions).length}`)
        break
      case "get_loop":
        manageKeyValueStore(
          get_loops,
          message.data.data,
          // TODO: How to set from component delay?
          CreateGetDataLoop.bind(null, message.data.data, 5000),
          clearInterval
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
