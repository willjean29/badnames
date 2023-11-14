import { Socket, Server } from "socket.io";
import BandController from "../controllers/BandController";


class BandSocket {
  private bandController: BandController;

  constructor(private io: Server, private socket: Socket) {
    this.io = io;
    this.socket = socket;
    this.bandController = BandController.getInstance();
    this.listenBandEvents();
  }

  addBandEvent() {
    this.socket.on('add-band', async (data) => {
      const { name } = data;
      await this.bandController.create(name);
      this.getBandsEvent();
    });
  }

  async getBandsEvent() {
    const bands = await this.bandController.getAll();
    this.io.emit('get-bands', bands);
  }

  voteBandEvent() {
    this.socket.on('vote-band', async (data) => {
      const { id } = data;
      await this.bandController.increaseVotes(id);
      this.getBandsEvent();
    });
  }

  removeBandEvent() {
    this.socket.on('remove-band', async (data) => {
      const { id } = data;
      await this.bandController.deleteBand(id);
      this.getBandsEvent();
    });
  }

  changeNameBandEvent() {
    this.socket.on('change-name-band', async (data) => {
      const { id, name } = data;
      await this.bandController.updateBand(id, name);
      this.getBandsEvent();
    });
  }

  listenBandEvents() {
    this.getBandsEvent();
    this.addBandEvent();
    this.voteBandEvent();
    this.removeBandEvent();
    this.changeNameBandEvent();
  }
}

export default BandSocket;