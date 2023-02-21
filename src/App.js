import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";
import './App.css'
const socket = io.connect("https://simple-chat-server-gamma.vercel.app/");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat,setShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };

  return (
    <div className="container">
      {!showChat && (
        <div className="box">
        <h3>Welcome to the Simple chat</h3>
        <div className="input">
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Room No"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join Chat</button>
        </div>
      </div>
      )}
     {showChat && (
       <Chat socket={socket} username={username} room = {room}/>
     )}
    </div>
  );
}

export default App;
