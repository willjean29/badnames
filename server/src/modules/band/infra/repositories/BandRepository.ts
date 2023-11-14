import { v4 as uuidv4 } from 'uuid';
import { IAddBand } from "../../domain/models/IAddBand";
import { IBand } from "../../domain/models/IBand";
import { IBandRepository } from "../../domain/repositories/IBandRepository";
import { bandsMock } from './mock/BandMock';
import { IUpdateBand } from '../../domain/models/IUpdateBand';


export class BandRepository implements IBandRepository {
  private bands: IBand[];
  constructor() {
    console.log("create BandRepository")
    this.bands = bandsMock;
  }
  async addBand(addBand: IAddBand): Promise<IBand> {
    const { name } = addBand;
    const band = {
      id: uuidv4(),
      name,
      votes: 0
    }
    this.bands = [
      ...this.bands,
      band
    ];
    return band;
  }

  async getAllBands(): Promise<IBand[]> {
    return this.bands;
  }

  async getBandById(id: string): Promise<IBand | undefined> {
    const band = this.bands.find(band => band.id === id);
    return band;
  }

  async increaseVotes(id: string): Promise<IBand | undefined> {
    let band: IBand | undefined = undefined;
    this.bands = this.bands.map(currentBand => {
      if (currentBand.id === id) {
        band = currentBand;
        currentBand.votes += 1;
      }
      return currentBand;
    });

    return band;
  }

  async deleteBand(id: string): Promise<IBand | undefined> {
    const band = await this.getBandById(id);
    if (band) {
      this.bands = this.bands.filter(band => band.id !== id);
    }
    return band;
  }

  async updateBand(band: IUpdateBand): Promise<IBand | undefined> {
    const { id, name } = band;
    let bandUpdated: IBand | undefined = undefined;
    this.bands = this.bands.map(currentBand => {
      if (currentBand.id === id) {
        bandUpdated = {
          ...currentBand,
          name
        }
        return bandUpdated;
      }
      return currentBand;
    });
    return bandUpdated;
  }

}
