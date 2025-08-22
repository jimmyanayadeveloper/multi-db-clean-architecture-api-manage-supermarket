import { AuthController } from "../presentation/auth/controllers";
import { ProviderController } from "../presentation/providers/controllers";

import { AuthenticationDatasourceImpl } from "../infrastructure/database/mongo/datasources/authentication.datasource.mongo";
import { AuthenticationRepositoryImpl } from "../infrastructure/repository/user/authentication.repository.impl";
import { ProviderDatasourceImp } from "../infrastructure/database/postgreSQL/datasources/provider.datasource.postgres";
import { ProviderRepositoryImpl } from "../infrastructure/repository/provider/provider.repository.imp";

import { CreateProvider } from "../application/providers/use-cases/add-provider.use-case";
import { LoginUser } from "../application/user/use-cases/login-user.use-case";
import { RegisterUser } from "../application/user/use-cases/register-user.use-case";
import { ShowAllProvider } from "../application/providers/use-cases/get-all-provider.use-case";
import { ProviderByTerm } from "../application/providers/use-cases/get-provider-term.use-case";
import { UpdateProvider } from "../application/providers/use-cases/update-provider.use-case";
import { DeleteProvider } from "../application/providers/use-cases/delete-provider.use-case";
import { BillDatasourceImp } from "../infrastructure/database/postgreSQL/datasources/bill.datasource.postgres";
import { BillsRepositoryImpl } from "../infrastructure/repository/bills/bills.repository.imp";
import { RegisterBill } from "../application/bills/use-cases/register-bill.use-case";
import { BillsController } from "../presentation/bills/controllers";
import { GetBillByNumberID } from "../application/bills/use-cases/get-bill-by-id.use-case";
import { GetAllBills } from "../application/bills/use-cases/get-all-bills.use-case";
import { GetBillsByProvider } from "../application/bills/use-cases/get-bills-by-provider.use-case";
import { UpdateBill } from "../application/bills/use-cases/update-bill.use-case";
import { PaidBill } from "../application/bills/use-cases/paid-bill.use-case";
import { GetBillsByStatus } from "../application/bills/use-cases/get-bill-by-status.use-case";


export function initDependencies() {

    /* Datasource */
    const authDatasource = new AuthenticationDatasourceImpl();
    const billDatasource = new BillDatasourceImp();
    const providerDatasource = new ProviderDatasourceImp();

    /* Repository with datasource */
    const authRepository = new AuthenticationRepositoryImpl(authDatasource);
    const billRepository = new BillsRepositoryImpl(billDatasource);
    const providerRepository = new ProviderRepositoryImpl(providerDatasource);

    /* Instance use case */
    /* Authentication */
    const registerUserUseCase = new RegisterUser(authRepository)
    const loginUserUseCase = new LoginUser(authRepository);
    /* Bills */
    const registerNewBillUseCase = new RegisterBill(billRepository);
    const getBillByNumberBillUseCase = new GetBillByNumberID(billRepository);
    const getBillsByProvider = new GetBillsByProvider(billRepository);
    const getBillsByStatus = new GetBillsByStatus(billRepository);
    const showAllBills = new GetAllBills(billRepository);
    const paidBill = new PaidBill(billRepository);
    const updateBill = new UpdateBill(billRepository);
    /* Providers */
    const createProviderUseCase = new CreateProvider(providerRepository);
    const findByTermUseCase = new ProviderByTerm(providerRepository);
    const showAllProvidersUseCase = new ShowAllProvider(providerRepository);
    const updateProviderById = new UpdateProvider(providerRepository);
    const deleteProviderById = new DeleteProvider(providerRepository);



    /* Controller with use cases */
    /* Authentication */
    const authController = new AuthController({ registerUserUseCase, loginUserUseCase });
    /* Bills */
    const billController = new BillsController({ registerNewBillUseCase, getBillByNumberBillUseCase, getBillsByProvider, getBillsByStatus, paidBill, showAllBills, updateBill });
    /* Providers */
    const providerController = new ProviderController({ createProviderUseCase, showAllProvidersUseCase, findByTermUseCase, updateProviderById, deleteProviderById });


    return {
        authController,
        billController,
        providerController
    }

}
