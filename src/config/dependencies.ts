import { AuthController } from "../infrastructure/user/controllers/controllers";
import { ProviderController } from "../infrastructure/provider/controllers/controllers";

import { CreateProvider } from "../application/providers/use-cases/add-provider.use-case";
import { DeleteProvider } from "../application/providers/use-cases/delete-provider.use-case";
import { GetAllBills } from "../application/bills/use-cases/get-all-bills.use-case";
import { GetBillByNumberID } from "../application/bills/use-cases/get-bill-by-id.use-case";
import { GetBillsByProvider } from "../application/bills/use-cases/get-bills-by-provider.use-case";
import { GetBillsByStatus } from "../application/bills/use-cases/get-bill-by-status.use-case";
import { GetSummariesBillByStatusPaid } from "../application/bills/use-cases/get-summaries-by-status-paid.use-case";
import { LoginUser } from "../application/user/use-cases/login-user.use-case";
import { PaidBill } from "../application/bills/use-cases/paid-bill.use-case";
import { ProviderByTerm } from "../application/providers/use-cases/get-provider-term.use-case";
import { RegisterBill } from "../application/bills/use-cases/register-bill.use-case";
import { RegisterUser } from "../application/user/use-cases/register-user.use-case";
import { ShowAllProvider } from "../application/providers/use-cases/get-all-provider.use-case";
import { UpdateBill } from "../application/bills/use-cases/update-bill.use-case";
import { UpdateProvider } from "../application/providers/use-cases/update-provider.use-case";

import { AuthenticationDatasourceImpl } from "../infrastructure/datasources/mongo/datasources/authentication.datasource.mongo";

import { BillDatasourceImp } from "../infrastructure/datasources/postgreSQL/repository-dts-imp/bill.datasource.postgres";
import { BillsController } from "../infrastructure/bills/controllers/controllers";
import { BillsRepositoryImpl } from "../infrastructure/bills/repository/bills.repository.imp";
import { ProviderDatasourceImp } from "../infrastructure/datasources/postgreSQL/repository-dts-imp/provider.datasource.postgres";
import { ProviderRepositoryImpl } from "../infrastructure/provider/repository/provider.repository.imp";
import { AuthenticationRepositoryImpl } from "../infrastructure/user/repository/authentication.repository.impl";
import { GetProviderById } from '../application/providers/use-cases/get-provider-by-id.use-case';
import { GetProviderByName } from "../application/providers/use-cases/get-provider-by-name.use-case";
import { GetProviderByNit } from "../application/providers/use-cases/get-provider-by-nit.use-case";

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
    const loginUserUseCase = new LoginUser(authRepository);
    const registerUserUseCase = new RegisterUser(authRepository)
    /* Bills */
    const getBillByNumberBillUseCase = new GetBillByNumberID(billRepository);
    const getBillsByProvider = new GetBillsByProvider(billRepository, providerRepository);
    const getBillsByStatus = new GetBillsByStatus(billRepository);
    const getSummariesSlipByPaidStatus = new GetSummariesBillByStatusPaid(billRepository)
    const paidBill = new PaidBill(billRepository);
    const registerNewBillUseCase = new RegisterBill(billRepository, providerRepository);
    const showAllBills = new GetAllBills(billRepository);
    const updateBill = new UpdateBill(billRepository);
    /* Providers */
    const createProviderUseCase = new CreateProvider(providerRepository);
    const deleteProviderByIdUseCase = new DeleteProvider(providerRepository);
    const findProviderByIdUseCase = new GetProviderById(providerRepository);
    const findProviderByNameUseCase = new GetProviderByName(providerRepository);
    const findProviderByNitUseCase = new GetProviderByNit(providerRepository);
    const findProviderByTermUseCase = new ProviderByTerm(providerRepository);
    const showAllProvidersUseCase = new ShowAllProvider(providerRepository);
    const updateProviderByIdUseCase = new UpdateProvider(providerRepository);

    /* Controller with use cases */
    /* Authentication */
    const authController = new AuthController({ registerUserUseCase, loginUserUseCase });
    /* Bills */
    const billController = new BillsController({ registerNewBillUseCase, getBillByNumberBillUseCase, getBillsByProvider, getBillsByStatus, paidBill, showAllBills, updateBill, getSummariesSlipByPaidStatus });
    /* Providers */
    const providerController = new ProviderController({ createProviderUseCase, showAllProvidersUseCase, findProviderByIdUseCase, findProviderByNameUseCase, findProviderByNitUseCase, findProviderByTermUseCase, updateProviderByIdUseCase, deleteProviderByIdUseCase });

    return {
        authController,
        billController,
        providerController
    }
}
