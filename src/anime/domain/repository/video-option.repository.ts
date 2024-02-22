import { FindOptions } from "../../../core/interfaces";
import { VideoOption } from '../../'

export abstract class VideoOptionRepository{
    abstract find(findOptions: FindOptions<any>): Promise<VideoOption[]>
}