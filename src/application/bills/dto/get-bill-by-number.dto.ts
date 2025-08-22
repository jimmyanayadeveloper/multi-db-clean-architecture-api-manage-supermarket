import { DtoResult } from "../../../domain/bills/interfaces/response-dto";

export class GetBillByNumberDto {
    public readonly id: string
    private constructor(id: string) {
        this.id = id;
    }
    static createGetBillByIdDto(idParams: string): DtoResult<GetBillByNumberDto> {
        const id = (idParams ?? "").trim();
        if (!id) return { ok: false, error: "Id is required" };
        return { ok: true, value: new GetBillByNumberDto(id) }
    }
}