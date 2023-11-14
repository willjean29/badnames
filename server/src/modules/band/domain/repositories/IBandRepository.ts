import { IAddBand } from '../models/IAddBand';
import { IBand } from '../models/IBand';
import { IUpdateBand } from '../models/IUpdateBand';

export interface IBandRepository {
  getAllBands(): Promise<IBand[]>;
  getBandById(id: string): Promise<IBand | undefined>;
  addBand(add: IAddBand): Promise<IBand>;
  updateBand(band: IUpdateBand): Promise<IBand | undefined>;
  deleteBand(id: string): Promise<IBand | undefined>;
  increaseVotes(id: string): Promise<IBand | undefined>;
}