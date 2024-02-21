import { Request, Response } from "express";
import { Criteria, CustomError, FilterPostgres } from "../../core/models";
import { PaginationDto } from "../../core/dtos";

import { FindEpisode, EpisodeRepository, EpisodeFindFilterDto, EqualAnimeId } from "../";



export class EpisodeController{

    constructor(
            private readonly episodeRepository: EpisodeRepository,
        ){}

    

    getEpisodes = (req: Request, res: Response) => {
        const { page = 1, limit = 12 } = req.query;
        const [ errorPagination, paginationDto ] = PaginationDto.create( +page, +limit );
        const [ errorFilter, episodeFindFilterDto ] = EpisodeFindFilterDto.create(req.body)
        
        if ( errorPagination ) return res.status(400).json({ error: errorPagination });
        if ( errorFilter ) return res.status(400).json({ error: errorFilter });
        
        const filters : Criteria<Object>[] = []

        if(episodeFindFilterDto?.animeId){
          filters.push(new EqualAnimeId(episodeFindFilterDto?.animeId))
        }

        new FindEpisode(this.episodeRepository).execute({ 
          paginationDto: paginationDto!,
          filter: new FilterPostgres({
            criteria: filters,
            logic: 'AND'
          })
        })
        .then( response => res.json( response )) 
        .catch( error => this.handleError( error, res ) );
    }

    private handleError = ( error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
          return res.status( error.statusCode ).json( { error: error.message } );
        }
    
        console.log( `${ error }` );
        return res.status( 500 ).json( { error: 'Internal server error' } );
      };

}

