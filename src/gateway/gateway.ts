import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MousePosition } from './interfaces/MouseInterface';
import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
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
    let clientCount = 1;
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
      // Add New Clients
      this.clients[socket.id] = {
        color: clientCount++,
        name: socket.id,
        mousePosition: {
          x: 0,
          y: 0,
          id: socket.id,
        },
      };
      this.server.emit('newConnection', { client: this.clients });

      console.log('Clinet', this.clients);

      //Remove Old Clients

      socket.on('disconnect', () => {
        delete this.clients[socket.id];
        this.server.emit('client-disconnect', {
          id: socket.id,
        });
      });
    });
  }

  //   @SubscribeMessage('disconnect')
  //   onDisconnect(socket: Socket) {
  //     console.log('discconnnect', socket);
  //   }

  @SubscribeMessage('receiveUpdates')
  onReceiveUpdates(@MessageBody() body: MousePosition) {
    console.log(`From Client ${body.id}`, body);

    this.server.emit('sendUpdate', {
      mousePostion: body,
    });
  }
}
