import React from 'react'
import Setting from './Setting'

function Home({parentData}) {
  console.log(parentData);
  return (
    <div>{parentData.name}{parentData.place}
        <Setting childdata={parentData}/>
    </div>
  )
}

export default Home