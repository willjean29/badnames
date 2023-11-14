import { IBandRepository } from "../domain/repositories/IBandRepository";

export class GetAllBandsUseCase {
  constructor(private bandRepository: IBandRepository) {
    this.bandRepository = bandRepository;
  }
  async execute() {
    const bands = await this.bandRepository.getAllBands();
    return bands;
  }
}