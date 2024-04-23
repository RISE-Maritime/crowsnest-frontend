import { useEffect } from "react"

function matchKeyWithKeyExpression(key, keyExpr) {
  // Escape all regex characters except the wildcard '**'
  let regexKeyExpr = keyExpr
    .replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&")
    .replace(/\\\*\\\*/g, ".*") // convert '**' to '.*' for regex
    .replace(/\\\*/g, ".*") // convert '**' to '.*' for regex

  // Create a new RegExp object with start and end anchors
  let regex = new RegExp("^" + regexKeyExpr + "$")

  // Test the target string against the regex
  return regex.test(key)
}

export const useKeelsonData = (routerURL, keyExpr, type, onMessage) => {
  useEffect(() => {
    // Ensure SharedWorker is supported
    if (!window.SharedWorker) {
      console.error("SharedWorker is not supported in this browser.")
      return
    }

    // Initialize the SharedWorker
    const keelsonWorker = new SharedWorker(new URL("../workers/keelsonWorker.js", import.meta.url), {
      name: "keelsonWorker",
    })

    // Listener for incoming messages from the worker
    keelsonWorker.port.onmessage = message => {
      switch (message.data.type) {
        case "get_loop":
          // The data of a get_loop type of message is an array with records.
          // console.log("New record!")
          // console.log("DATA", message.data)

          if (message.data.data.length === 0) {
            console.log("No data received.")
            break
          }

          message.data.data.forEach(record => {
            if (record.key === "ERROR") {
              console.log(record.key, record.value)
            } else if (matchKeyWithKeyExpression(record.key, keyExpr)) {
              onMessage(record)
            } 
          })
          break
        case "subscribe":
          console.error("Functionality not implemented in useKeelsonData.")
          break
        case "error":
          console.error(message.data.data)
          break
        case "info":
          console.info(message.data.data)
          break
        default:
          console.error(`Unrecognized message type '${message.data.type}' in useKeelsonData.`)
          console.log(message.data.data)
      }
    }

    // Start the worker port
    keelsonWorker.port.start()

    const url = `${routerURL}/${keyExpr}`

    // Post a message to subscribe using the provided key
    keelsonWorker.port.postMessage({
      type: type,
      data: url,
    })

    // Cleanup on component unmount
    return () => {
      console.log("Cleaning")
      keelsonWorker.port.postMessage({
        type: `remove_${type}`,
        data: url,
      })
      keelsonWorker.port.postMessage({ type: "disconnect", data: "" })
      setTimeout(() => {
        keelsonWorker.port.close()
      }, 500)
    }
  }, [routerURL, keyExpr, type, onMessage])
}
