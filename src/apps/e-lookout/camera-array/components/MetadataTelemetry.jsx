import React from 'react'
import { useKeelsonData } from '../../../../hooks/useKeelsonData'
import { get_subject_from_pub_sub_key, decodePayloadFromTypeName, getSubjectSchema } from 'keelson-js/dist'

// eslint-disable-next-line 
const routerURL =  process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL ? process.env.REACT_APP_ZENOH_LOCAL_ROUTER_URL : "http://localhost:8000"
   

export default function MetadataTelemetry({keyExpression}) {

  const onMessage = (envelope) => {
    console.log("🚀 ~ onMessage ~ envelope:", envelope)
    
    const subject = get_subject_from_pub_sub_key(envelope.key)
    let schemaProtoMsg = getSubjectSchema(subject)
    let msgData = decodePayloadFromTypeName(schemaProtoMsg, envelope.value)

     console.log("🚀 ~ onMessage ~ msgData:", msgData)   
  
  }

  useKeelsonData("http://localhost:8888", keyExpression, "get_loop", onMessage)


  return (
    <div>ControlMetadataTelemetry</div>
  )
}
