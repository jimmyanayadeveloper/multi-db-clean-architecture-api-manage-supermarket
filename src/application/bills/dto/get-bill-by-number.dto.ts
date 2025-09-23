import { DtoResult } from "../interfaces/response-dto";


export class GetBillByNumberDto {
    public readonly id: string
    private constructor(id: string) {
        this.id = id;
    }
    static createGetBillByIdDto(idParams: string): DtoResult<GetBillByNumberDto> {
        const id = (idParams ?? "").trim();
        return { ok: true, value: new GetBillByNumberDto(id) }
    }
}