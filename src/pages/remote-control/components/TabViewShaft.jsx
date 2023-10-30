import React from 'react'
import ControlBowThrustersMASSLAB from './ControlBowThrustersMASSLAB'
import ControlEngineMASSLAB from './ControlEngineMASSLAB'
import ControlRudderMASSLAB from './ControlRudderMASSLAB'

export default function TabViewShaft() {
  return (
    <div>
      <ControlBowThrustersMASSLAB />
      <ControlEngineMASSLAB />
      <ControlRudderMASSLAB />
    </div>
  )
}
