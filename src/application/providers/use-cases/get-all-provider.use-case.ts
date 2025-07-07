import { ProviderRepository } from "../../../domain/providers/provider.repository";

export class GetAllProvider {
    constructor(private repository: ProviderRepository) { }
    execute() {
        return this.repository.getAllProvider();
    }
}