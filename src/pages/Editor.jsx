import React, { useEffect, useRef, useState } from 'react';
import "../css/Editor.css";
import Client from "../components/client.jsx";
import Editorcomp from "../components/editor.jsx";
import { initSocket } from '../socket.js';
import { EVENTS } from '../Events.js';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Editor = () => {
  const [clients, setClients] = useState([]);
  const location = useLocation();
  const reactNavigator = useNavigate();
  const { roomId } = useParams();
  const codeRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    async function init() {
      try {
        socketRef.current = await initSocket();

        socketRef.current.on('connect_error', handleErrors);
        socketRef.current.on('connect_failed', handleErrors);

        socketRef.current.emit(EVENTS.JOIN, {
          roomId,
          username: location.state?.username,
        });

        socketRef.current.on(EVENTS.JOINED, ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room`);
            console.log(`${username} joined`);
          }
          setClients(clients);
        });

        socketRef.current.on(EVENTS.CODE_CHANGE, ({ code }) => {
          if (codeRef.current) {
            codeRef.current.setValue(code);
          }
        });

        socketRef.current.on(EVENTS.DISCONNECTED, ({ socketId, username }) => {
          toast.success(`${username} left the room`);
          setClients((prev) => prev.filter(client => client.socketId !== socketId));
        });

      } catch (error) {
        console.error('Socket initialization error:', error);
      }
    }

    function handleErrors(err) {
      console.error('Socket error:', err);
      toast.error('Socket connection failed, try again later.');
      reactNavigator('/');
    }

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [reactNavigator, location.state, roomId]);

  const copyRoomId = async () => {
    await navigator.clipboard.writeText(roomId);
    toast.success('Room ID copied to clipboard');
    console.log('Room ID copied to clipboard');
  };

  return (
    <div className='mainWrap'>
      <div className='aside'>
        <div className='asideinner'>
          <div className='logo'>
            <img className='logoimg' src="/code-sync.png" alt="logo" />
          </div>
          <h3>Connected</h3>
          <div className='clientList'>
            {clients.map((item) => (
              <Client key={item.socketId} username={item.username} />
            ))}
          </div>
        </div>
        <button className='btn copybtn' onClick={copyRoomId}>Copy Room Id</button>
        <button className='btn leavebtn' onClick={() => reactNavigator('/')}>Leave Room</button>
      </div>
      <div className='editorWrap'>
        <Editorcomp socketRef={socketRef} roomId={roomId} ref={codeRef} />
      </div>
    </div>
  );
};

export default Editor;
