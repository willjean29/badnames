
import { Server } from "socket.io";
import BandSocket from "../../../modules/band/infra/http/events/BandSocket";

class Sockets {
  private static instance: Sockets;
  constructor(private io: Server) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {
      console.log('Cliente conectado', socket.id);
      new BandSocket(this.io, socket);
    });
  }

  public getSocket() {
    return this.io;
  }

  public static getInstance(io: Server): Sockets {
    if (!Sockets.instance) {
      Sockets.instance = new Sockets(io);
    }
    return Sockets.instance;
  }

}

export default Sockets;