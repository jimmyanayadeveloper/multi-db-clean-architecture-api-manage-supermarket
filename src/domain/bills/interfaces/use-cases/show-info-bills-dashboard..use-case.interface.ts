import { Pagination } from "../../../common/pagination";
import { BillResponseWithSummaryPaginated } from "../dto/response/response.dto";

export interface showStandarInfoBillsDashboard {
    execute(pagination?: Pagination): BillResponseWithSummaryPaginated
}