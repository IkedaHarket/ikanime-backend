import { Request, Response } from "express";

import { PaginationDto } from "../../core/dtos";

import * as Domain from "../domain";
import { Controller } from "./controller";
import { PaginationResponse, ServerResponse } from "../../core/interfaces";

export class EpisodeController extends Controller{

    constructor(
            private readonly episodeRepository: Domain.EpisodeRepository,
        ){
      super();
    }

    getEpisodes = (req: Request, res: Response) => {
        try {
          const { page = 1, limit = 12 } = req.query;
          const paginationDto  = PaginationDto.create( +page, +limit );
          const episodeFindFilterDto = Domain.EpisodeFindFilterDto.create(req.body)

          new Domain.FindEpisode(this.episodeRepository).execute({ 
            paginationDto,
            filter: episodeFindFilterDto,
          })
          .then( response => {
            const serverResponse: ServerResponse<PaginationResponse<Domain.Episode[]>> = {
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

