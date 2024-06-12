import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MousePosition } from './interfaces/MouseInterface';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ClientData } from './interfaces/Client';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
  },
})
export class MouseGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  clients: { [index: string]: ClientData } = {};
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
      this.clients[socket.id] = {
        color: Object.keys(this.clients).length + 1,
        name: socket.id,
      };
      console.log(this.clients);
    });
    this.server.emit('newConnection', { client: this.clients });
  }

  //   @SubscribeMessage('disconnect')
  //   onDisconnect(socket: Socket) {
  //     console.log('discconnnect', socket);
  //   }

  @SubscribeMessage('receiveUpdates')
  onReceiveUpdates(@MessageBody() body: MousePosition) {
    console.log(body);
    this.server.emit('sendUpdate', {
      mousePostion: body,
    });
  }
}
