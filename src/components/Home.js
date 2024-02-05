import React, { useState, useEffect } from "react";
// import * as io from 'socket.io-client';
import SocketServer from "./page1";

const Home = () => {
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  // const [messageArray,setMessageArray] = useState([]);
  const [sResponse,setSResponse] = useState('');

  const dynamicUserId = localStorage.getItem("myData");

  const createConnection = () => {
    // SocketServer.establishSocketConnection(dynamicUserId);
    // SocketServer.receiveMessage();
    // SocketServer.eventEmitter.on('add-message-response', receiveSocketMessages );
  };



  const receiveSocketMessages = (socketResponse) => {
    setSResponse(socketResponse);
    console.log("socketResponse==============", socketResponse);
    if(socketResponse){
        console.log('iinsdie if------------')
        //const newItem=[...messageArray,socketResponse];
        // setMessageArray((prevMessageArray) => [...prevMessageArray, socketResponse]);
        //     console.log(" is message Array",messageArray);         
    }
  };
    

//   const socket = io.io('http://localhost:4000', { transport: ['websocket'], query: {
//               userId: dynamicUserId,
//               // Add any other data you want to pass to the server
//             }  });

  useEffect(() => {
    SocketServer.establishSocketConnection(dynamicUserId);

    SocketServer.receiveMessage();
    SocketServer.eventEmitter.on('add-message-response', receiveSocketMessages );
    console.log("inside useefffect=============")
//      socket.on('add-message-response', (data) => {
//         console.log("inside receiveMessage=====data=======",data)
//         setResponseData(data)
    
//   })    
  }, [sResponse]); //eslint-disable-line

  const sendMessage = () => {
    // Emit chat message event to the server

    const messageData = {
      sender_Id: dynamicUserId,
      message: message,
      reciver_Id: id,
    };

     SocketServer.sendMessage(messageData);

    //  socket.emit('add-message', {  sender_Id: dynamicUserId,
    //    message: message,
    //    reciver_Id: id, });


//        socket.on('add-message-response', (data) => {
//         console.log("inside receiveMessage==111===data=======",data)

    
//   }) 

  };

  //console.log("this is props",message)
  return (
    <div>
      <h6>Home Page {dynamicUserId}</h6>
      <br></br>
      <div>
        <button onClick={createConnection}>Create connection</button>
        <br></br>

        <div>
          <label>Enter Message : </label>{" "}
          <input type="text" onChange={(e) => setMessage(e.target.value)} />
        </div>
        <br></br>
        <div>
          <label>Enter senderId : </label>{" "}
          <input type="text" onChange={(e) => setId(e.target.value)} />
        </div>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Home;
