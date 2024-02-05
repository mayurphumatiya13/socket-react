import * as io from 'socket.io-client';
const events = require('events');


class ChatSocketServer {
    
    socket = null
    eventEmitter = new events.EventEmitter();

    // Connecting to Socket Server
    establishSocketConnection(userId) {
        try {
          console.log("inside establishSocketConnection=====")
            // this.socket = io(`http://localhost:4000`, {
            //     query: `userId=${userId}`
            // });
            this.socket = io.io('https://socket-test-x1gv.onrender.com/', { transport: ['websocket'], query: {
              userId: userId,
              // Add any other data you want to pass to the server
            }  });
        } catch (error) {
            alert(`Something went wrong; Can't connect to socket server`);
        }
    }

    getChatList(userId) {
        this.socket.emit('chat-list', {
            userId: userId
        });
        this.socket.on('chat-list-response', (data) => {
            this.eventEmitter.emit('chat-list-response', data);
        });
    }

    sendMessage(message) {
      console.log("inside send message=======",message)
        this.socket.emit('add-message', message);
    }

    receiveMessage() {
      console.log("inside receiveMessage============")
        this.socket.on('add-message-response', (data) => {
          console.log("inside receiveMessage=====data=======",data)

            this.eventEmitter.emit('add-message-response', data);
        });
    }

    logout(userId) {
        this.socket.emit('logout', userId);
        this.socket.on('logout-response', (data) => {
            this.eventEmitter.emit('logout-response', data);
        });
    }

}

const SocketServer = new ChatSocketServer();

export default SocketServer;