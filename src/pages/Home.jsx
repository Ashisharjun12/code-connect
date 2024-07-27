import React, { useState } from 'react'
import "../css/Home.css"
import {v4 as uuid} from "uuid"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigation = useNavigate()
  const [roomId ,SetRoomId]= useState('')
  const [username , SetUserName]= useState('')



  const createNewRoom = (e)=>{

    e.preventDefault()
    const id = uuid()
    SetRoomId(id)
    toast.success('Created a New Room')

  }

  const joinRoom = ()=>{
    if(!roomId ||!username){
      toast.error('Please Enter Room ID & Username')
      return
    }
   //redirect editor  page
   navigation(`/Editor/${roomId}`, {
    state:{
      username
    }
   })
  }


  //handel enter
  const handelEnter= (e)=>{
    if(e.code === 'Enter'){
      joinRoom()
    }

  }



  return (
    <div className='homePageWrapper'>
      <div className='formWrapper'>
        <img className='logo' src="/code-sync.png" alt="code-snippet"  />
        <h4 className='mainlavel'>Paste Invitation Room Id</h4>
        <div className='inputgroup'>
          <input type="text" className='inputbox' value={roomId} onChange={(e)=>{SetRoomId(e.target.value)}} placeholder='ROOM ID' onKeyUp={handelEnter}/>
          <input type="text" className='inputbox' placeholder='USERNAME' value={username} onChange={(e)=>{SetUserName(e.target.value)}} onKeyUp={handelEnter}/>

          <button onClick={joinRoom}  className='btn joinbtn'>Join Now</button>

          <span className='createinfo'>
            If you don't have invite then create &nbsp; <a href="#" className='createnewbtn' onClick={createNewRoom}>New Room</a>
          </span>

        </div>


      </div>

    </div>
  )
}

export default Home