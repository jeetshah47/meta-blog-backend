import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MousePosition } from './interfaces/MouseInterface';
import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { ClientData, ClientInput } from './interfaces/Client';

@WebSocketGateway({
  cors: {
    origin: '*',
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

      socket.on('get-document', async (documentId) => {
        const document = documentId;
        socket.join(documentId);
        socket.emit('load-document', document.data);

        socket.on('send-changes', (delta) => {
          socket.broadcast.to(documentId).emit('receive-changes', delta);
        });

        socket.on('save-document', async (data) => {
          socket.broadcast.to(documentId).emit('receive-changes', data);
        });
      });
    });
  }

  @SubscribeMessage('receiveUpdates')
  onReceiveUpdates(@MessageBody() body: MousePosition) {
    this.server.emit('sendUpdate', {
      mousePostion: body,
    });
  }

  @SubscribeMessage('get-document')
  onReceiveInput(@MessageBody() body: ClientInput) {
    this.server.emit('sendInputs', {
      data: body,
    });
  }
}
