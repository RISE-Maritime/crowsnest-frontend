import { useEffect, useRef } from "react"

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

export const useKeelsonData = (keyExpr, type, onMessage) => {
  const routerURL = process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL
  ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL
  : "http://localhost:8000"
  const keelsonWorkerRef = useRef(null);
  const keyExprRef = useRef(null)

  // On Mount
  useEffect(() => {
  
    // Ensure SharedWorker is supported
    if (!window.SharedWorker) {
      console.error("SharedWorker is not supported in this browser.")
      return
    }
    // Initialize the SharedWorker
    if (!keelsonWorkerRef.current) {
      keelsonWorkerRef.current = new SharedWorker(new URL("../workers/keelsonWorker.js", import.meta.url), {
        name: "keelsonWorker",
      });
      keelsonWorkerRef.current.port.start();
    }
    //console.info("Started new worker for keyExpr" + keyExpr)
    
    keyExprRef.current = keyExpr
    
    // Add  subscription or get_loop
    keelsonWorkerRef.current.port.postMessage({
      type: type,
      data: `${routerURL}/${keyExpr}`,
    })

    return () => {
      //console.info("Cleaning up Keelson hook for keyexpr " + keyExpr)
      keelsonWorkerRef.current.port.postMessage({
        type: `remove_${type}`,
        data: `${routerURL}/${keyExpr}`,
      })
      keelsonWorkerRef.current.port.postMessage({ type: "disconnect", data: "" })
      setTimeout(() => {
        keelsonWorkerRef.current.port.close()
      }, 500)
    }

  },[])


  // Listener for incoming messages from the worker
  useEffect(()=>{
    if (keelsonWorkerRef.current) {
      keelsonWorkerRef.current.port.onmessage = message => {
        switch (message.data.type) {
          case "get_loop":
            // The data of a get_loop type of message is an array with records.
            message.data.data.forEach(record => {
              if (record.key === "ERROR") {
                console.error(`Keelson: ${record.value}`)
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
    }
},[keelsonWorkerRef, onMessage])

// Effect of changing the keyExpr
useEffect(()=>{
  if (keelsonWorkerRef.current) {
  if (keyExprRef && keyExprRef.current !== keyExpr) {
    //console.log("OLD keyExpr " + keyExprRef.current)
    //console.log("NEw keyExpr "+ keyExpr)
    // Remove old subscription or get_loop
    keelsonWorkerRef.current.port.postMessage({
      type: `remove_${type}`,
      data: `${routerURL}/${keyExprRef.current}`,
    })
    // Add new subscription or get_loop
    keelsonWorkerRef.current.port.postMessage({
      type: type,
      data: `${routerURL}/${keyExpr}`,
    })
    // Update keyExprRef
    keyExprRef.current = keyExpr
  }    
  }  
}, [keyExpr])
    

}
