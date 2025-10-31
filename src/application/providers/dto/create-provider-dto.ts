import { RegisterProviderRequest } from "./interfaces/request/register-provider.dto";
import { validationRegisterProvider } from "./validation/validation-register-provider.dto";

export class RegisterProviderDto {
    public name: string;
    public nit: string;
    public salesman: string;
    public creditBalance: number;
    public withHoldingsTaxes: boolean;
    public allowedCredit: boolean;
    public creditDays: number;

    private constructor(dataProvider: RegisterProviderRequest) {
        this.name = dataProvider.name;
        this.nit = dataProvider.nit;
        this.salesman = dataProvider.salesman;
        this.creditBalance = dataProvider.creditBalance || 0;
        this.withHoldingsTaxes = dataProvider.withholdingsTaxes || false;
        this.allowedCredit = dataProvider.saleWithCredit || false;
        this.creditDays = dataProvider.creditDays || 0;
    }

    static create(props: RegisterProviderRequest): RegisterProviderDto {
        const validationResponse = validationRegisterProvider(props);
        return new RegisterProviderDto(validationResponse);
    }
}