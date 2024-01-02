// Register a callback to process messages from the parent
self.onmessage = event => {
  // Do some computation with the data from the parent
  const result = event.data * 2

  // Send the result back to the parent
  self.postMessage(result)
}
