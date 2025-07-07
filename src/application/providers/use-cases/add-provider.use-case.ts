import { Provider } from "../../../domain/providers/provider.entity";
import { ProviderRepository } from "../../../domain/providers/provider.repository";


export class CreateProvider {
    constructor(private repository: ProviderRepository) { }
    execute(provider: Provider) {
        return this.repository.createProvider(provider);
    }
}