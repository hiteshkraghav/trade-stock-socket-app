import React from 'react'

function Error({ message, closeMsg }) {
  return (
    <div className="errorMsg">{message}<span className={'btnClose'} onClick={() => closeMsg('')}> <u>clear</u></span></div>
  )
}

export default Error