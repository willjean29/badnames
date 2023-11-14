

import { AddBandUseCase, DeleteBandUseCase, GetAllBandsUseCase, GetBandByIdUseCase, IncreaseVotesUseCase, UpdateBandUseCase } from "../../../application";
import { BandRepository } from "../../repositories/BandRepository";

class BandController {
  private bandRepository: BandRepository;
  private static instance: BandController;
  constructor() {
    this.bandRepository = new BandRepository();
  }
  public async create(name: string) {
    const addBand = new AddBandUseCase(this.bandRepository);
    const band = await addBand.execute({ name });
    return band;
  }

  public async getAll() {
    const getAllBands = new GetAllBandsUseCase(this.bandRepository);
    const bands = await getAllBands.execute();
    return bands;
  }

  public async getBandById(id: string) {
    const getBandById = new GetBandByIdUseCase(this.bandRepository);
    const band = await getBandById.execute(id);
    return band;
  }

  public async deleteBand(id: string) {
    const deleteBand = new DeleteBandUseCase(this.bandRepository);
    const band = await deleteBand.execute(id);
    return band;
  }

  public async increaseVotes(id: string) {
    const increaseVotes = new IncreaseVotesUseCase(this.bandRepository);
    const band = await increaseVotes.execute(id);
    return band;
  }

  public async updateBand(id: string, name: string) {
    const updateBand = new UpdateBandUseCase(this.bandRepository);
    const band = await updateBand.execute({ id, name });
    return band;
  }

  public static getInstance(): BandController {
    if (!BandController.instance) {
      BandController.instance = new BandController();
    }
    return BandController.instance;
  }
}

export default BandController;