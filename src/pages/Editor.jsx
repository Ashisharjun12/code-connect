import React, { useState } from 'react'
import "../css/Editor.css"
import Client from "../components/client.jsx"
import Editorcomp from "../components/editor.jsx"

const Editor = () => {

  const [clients,SetClients] = useState([
    {socketId:1 , username:"ASHISH"},
    {socketId:2 , username:"Ravi"},
  ])



  return (
    <div className='mainWrap'>
      <div className='aside'>
        <div className='asideinner'>

          <div className='logo'>
            <img className='logoimg' src="/code-sync.png" alt="logo"  />

          </div>

          <h3>Connected</h3>

<div className='clientList'>
  {
    clients.map((item)=>(<Client key={item.socketId} username={item.username}/>))
  }

</div>

        </div>

        <button className='btn copybtn'>Copy Room Id</button>
        <button className='btn leavebtn'>Leave Room</button>

       

        





      </div>


      <div className='editorWrap'>

       <Editorcomp/>

      </div>

    </div>
  )
}

export default Editor