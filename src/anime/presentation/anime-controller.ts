import { Response, Request } from 'express';

import { PaginationDto } from '../../core/dtos';

import * as Domain from '../domain';
import { PaginationResponse, ServerResponse } from '../../core/interfaces';
import { Controller } from './controller';

export class AnimeController extends Controller {

  constructor(
    private readonly animeRepository: Domain.AnimeRepository
  ) {
    super();
  }

  getAnimes = ( req: Request, res: Response ) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const  paginationDto  = PaginationDto.create( +page, +limit );
      const  animeFindFilterDto  = Domain.AnimeFindFilterDto.create(req.body);

      new Domain.FindAnime(this.animeRepository).execute({ 
        paginationDto: paginationDto!,
        filter: animeFindFilterDto!,
      })
      .then( response => {
        const serverResponse: ServerResponse<PaginationResponse<Domain.Anime[]>> = {
          status: true,
          response
        }
        res.json( serverResponse )
      }) 
      .catch( error => this.handleError( error, res ) );
    } catch (error) {
      this.handleError(error, res)
    }
      
  };

  
  
}