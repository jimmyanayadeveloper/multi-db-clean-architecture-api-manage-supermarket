import { BillResponseWithSummaryPaginated } from "../../../domain/bills/interfaces/dto/response/response.dto";
import { showStandarInfoBillsDashboard } from "../../../domain/bills/interfaces/use-cases/show-info-bills-dashboard..use-case.interface";
import { BillRepository } from "../../../domain/bills/repository/bill.repository";
import { Pagination } from "../../../domain/common/pagination";

export class GetBillsPaginatedWithSummary implements showStandarInfoBillsDashboard {

    constructor(private readonly repo: BillRepository) { }

    execute(pagination?: Pagination): BillResponseWithSummaryPaginated {
        throw new Error("Method not implemented.");
    }

}