import { ProviderRepository } from "../../../domain/providers/repository/provider.repository";


export class DeleteProvider {
    constructor(private repository: ProviderRepository) { }
    execute(term: string) {
        this.repository.delete(term);
    }
}