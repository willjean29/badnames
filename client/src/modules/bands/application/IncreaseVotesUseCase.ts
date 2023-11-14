import { IBandRepository } from "../domain/repositories/IBandRepository";

export class IncreaseVotesUseCase {
  constructor(private bandRepository: IBandRepository) {
    this.bandRepository = bandRepository;
  }

  async execute(id: string) {
    const band = await this.bandRepository.increaseVotes(id);
    return band;
  }
}