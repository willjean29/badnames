import { IUpdateBand } from "../domain/models/IUpdateBand";
import { IBandRepository } from "../domain/repositories/IBandRepository";

export class UpdateBandUseCase {
  constructor(private readonly bandRepository: IBandRepository) {
    this.bandRepository = bandRepository;
  }

  async execute(band: IUpdateBand) {
    const bandToUpdate = await this.bandRepository.updateBand(band);
    return bandToUpdate;
  }
}