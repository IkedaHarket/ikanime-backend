import { Request, Response } from "express";

import { PaginationDto } from "../../core/dtos";

import * as Domain from "../domain";
import { Controller } from "./controller";
import { PaginationResponse, ServerResponse } from "../../core/interfaces";

export class VideoOptionController extends Controller{

    constructor(
            private readonly videoOptionRepository: Domain.VideoOptionRepository,
        ){
      super();
    }

    getVideoOptions = (req: Request, res: Response) => {
        try {
          const { page = 1, limit = 12 } = req.query;
          const paginationDto  = PaginationDto.create( +page, +limit );
          const videoOptionFindFilterDto = Domain.VideoOptionFindFilterDto.create(req.body)

          new Domain.FindVideoOption(this.videoOptionRepository).execute({ 
            paginationDto,
            filter: videoOptionFindFilterDto,
          })
          .then( response => {
            const serverResponse: ServerResponse<PaginationResponse<Domain.VideoOption[]>> = {
              status: true,
              response
            }
            res.json( serverResponse )
          }) 
          .catch( error => this.handleError( error, res ) );
        } catch (error) {
          this.handleError(error, res)
        }
    }

}

