
import * as Domain from "../";
import { ServerResponse } from "../../../core/interfaces";

export abstract class LogRepository{
    abstract create( log: Domain.CreateLogDto): Promise<ServerResponse<Domain.Log>>
}