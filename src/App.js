import io from "socket.io-client";

import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");
function App() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("recived_message", (recivedObj) => {
      setMessageList((prev) => [...prev, recivedObj]);
    });
  }, [socket]);

  const roomHandler = () => {
    socket.emit("join_room", roomId);
    if (!(username === "" && roomId === "")) {
    }
  };

  const messageHandler = async () => {
    const dataObj = {
      roomId,
      author: username,
      currentMessage,
      time: new Date(Date.now()),
    };
    await socket.emit("send_message", dataObj);
  };

  console.log("messageList", messageList);
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="user..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="room..."
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={roomHandler}>join</button>
      </div>
      <br />
      <div>
        <input
          type="text"
          placeholder="enter your message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={messageHandler}>send</button>
      </div>
    </>
  );
}
export default App;
