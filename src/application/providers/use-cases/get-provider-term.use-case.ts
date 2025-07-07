import { ProviderRepository } from "../../../domain/providers/provider.repository";


export class ProviderByTerm {
    constructor(private repository: ProviderRepository) { }
    execute(term: string) {
        this.repository.findByTerm(term);
    }
}