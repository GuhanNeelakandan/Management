import React from 'react'

function Setting({childdata}) {
  console.log(childdata);
  return (
    <div>{childdata.place}</div>
  )
}

export default Setting