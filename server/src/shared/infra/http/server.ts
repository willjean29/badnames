// Servidor de Express
import express, { Application } from 'express';
import cors from 'cors';
import http, { Server } from 'http';
import { Server as ServerSocket } from 'socket.io';
import path from 'path';
import Sockets from '../sockets/socket';

class ServerHttp {
  private app: Application;
  private port: number;
  private server: Server;
  private io: ServerSocket;
  constructor() {

    this.app = express();
    this.port = 4000;

    // Http server
    this.server = http.createServer(this.app);

    // Configuraciones de sockets
    this.io = new ServerSocket(this.server, {
      cors: { "origin": "*" }
    });
  }

  middlewares() {
    // Desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, '../public')));
    this.app.use(cors());
  }

  configurarSockets() {
    Sockets.getInstance(this.io);
  }

  execute() {

    // Inicializar Middlewares
    this.middlewares();

    // Inicializar sockets
    this.configurarSockets();

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log('Server corriendo en puerto:', this.port);
    });
  }

  public getApp() {
    return this.app;
  }
}


const server = new ServerHttp();
server.execute();