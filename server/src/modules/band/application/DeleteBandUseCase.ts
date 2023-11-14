import { IBandRepository } from "../domain/repositories/IBandRepository";

export class DeleteBandUseCase {
  constructor(private bandRepository: IBandRepository) {
    this.bandRepository = bandRepository;
  }
  async execute(id: string) {
    return await this.bandRepository.deleteBand(id);
  }
}