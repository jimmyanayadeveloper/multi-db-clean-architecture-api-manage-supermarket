import { Provider } from "../../../domain/providers/entities/provider.entity";
import { ProviderRepository } from "../../../domain/providers/repository/provider.repository";


export class UpdateProvider {
    constructor(private repository: ProviderRepository) { }
    execute(term: string, provider: Provider): Provider | null {
        return this.repository.update(term, provider);
    }
}