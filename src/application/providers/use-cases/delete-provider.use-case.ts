import { ProviderRepository } from "../../../domain/providers/repository/provider.repository";


export class DeleteProvider {
    constructor(private repository: ProviderRepository) { }
    async execute(id: string) {
        return this.repository.inactivate(id);
    }
}