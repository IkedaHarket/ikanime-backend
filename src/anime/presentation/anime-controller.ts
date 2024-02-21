import { Response, Request } from 'express';
import { AnimeRepository, FindAnime } from '..';
import { CustomError } from '../../core/models';
import { PaginationDto } from '../../core/dtos';

export class AnimeController {

  constructor(
    private readonly animeRepository: AnimeRepository
  ) { }


  getAnimes = async ( req: Request, res: Response ) => {

    const { page = 1, limit = 10 } = req.query;
    const [ error, paginationDto ] = PaginationDto.create( +page, +limit );
    if ( error ) return res.status(400).json({ error });
    
    new FindAnime(this.animeRepository).execute({ paginationDto: paginationDto! })
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