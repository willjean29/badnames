import { IAddBand } from '../models/IAddBand';
import { IBand } from '../models/IBand';

export interface IBandRepository {
  getAllBands(): Promise<IBand[]>;
  getBandById(id: string): Promise<IBand | undefined>;
  addBand(add: IAddBand): Promise<IBand>;
  // updateBand(band: IBand): Promise<IBand>;
  deleteBand(id: string): Promise<IBand | undefined>;
  increaseVotes(id: string): Promise<IBand | undefined>;
}