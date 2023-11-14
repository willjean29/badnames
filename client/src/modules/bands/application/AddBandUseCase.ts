import { IAddBand } from '../domain/models/IAddBand';
import { IBandRepository } from '../domain/repositories/IBandRepository';
export class AddBandUseCase {
  constructor(private bandRepository: IBandRepository) {
    this.bandRepository = bandRepository;
  }
  async execute(iAddBand: IAddBand) {
    return await this.bandRepository.addBand(iAddBand);
  }
}