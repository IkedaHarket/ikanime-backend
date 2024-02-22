import { Response, Request } from 'express';

import { CustomError } from '../../core/models';
import { PaginationDto } from '../../core/dtos';

import * as Domain from '../domain';

export class AnimeController {

  constructor(
    private readonly animeRepository: Domain.AnimeRepository
  ) { }

  getAnimes = ( req: Request, res: Response ) => {
    const { page = 1, limit = 10 } = req.query;
    const [ errorPagination, paginationDto ] = PaginationDto.create( +page, +limit );
    const [ errorFilter, animeFindFilterDto ] = Domain.AnimeFindFilterDto.create(req.body);

    if ( errorPagination ) return res.status(400).json({ error: errorPagination });
    if ( errorFilter ) return res.status(400).json({ error: errorFilter });
    new Domain.FindAnime(this.animeRepository).execute({ 
      paginationDto: paginationDto!,
      filter: animeFindFilterDto!,
    })
    .then( response => res.json( response )) 
    .catch( error => this.handleError( error, res ) );
      
  };

  private handleError = ( error: unknown, res: Response ) => {
    if ( error instanceof CustomError ) {
      return res.status( error.statusCode ).json( { error: error.message } );
    }

    console.log( `${ error }` );
    return res.status( 500 ).json( { error: 'Internal server error' } );
  };
  
}