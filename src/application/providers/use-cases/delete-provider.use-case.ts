import { ProviderRepository } from "../../../domain/providers/provider.repository";


export class DeleteProvider {
    constructor(private repository: ProviderRepository) { }
    execute(term: string) {
        this.repository.delete(term);
    }
}