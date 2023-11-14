import { IBandRepository } from "../domain/repositories/IBandRepository";



export class GetBandByIdUseCase {
  constructor(private bandRepository: IBandRepository) {
    this.bandRepository = bandRepository;
  }
  async execute(id: string) {
    const band = await this.bandRepository.getBandById(id);
    return band;
  }
}