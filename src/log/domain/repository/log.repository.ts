
import * as Domain from "../";

export abstract class LogRepository{
    abstract create( log: Domain.CreateLogDto): Promise<Domain.Log>
}