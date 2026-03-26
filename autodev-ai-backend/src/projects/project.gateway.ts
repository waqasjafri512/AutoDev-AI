import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ProjectGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-project')
  handleJoinProject(client: Socket, projectId: string) {
    client.join(`project-${projectId}`);
    console.log(`Client joined project room: project-${projectId}`);
  }

  @SubscribeMessage('join-user')
  handleJoinUser(client: Socket, userId: string) {
    client.join(`user-${userId}`);
    console.log(`Client joined user room: user-${userId}`);
  }

  sendProjectUpdate(userId: string, data: any) {
    this.server.to(`user-${userId}`).emit('project-updated', data);
  }
}
