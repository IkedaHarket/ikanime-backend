import { Response, Request } from 'express';

import { PaginationDto } from '../../core/dtos';

import * as Domain from '../domain';
import { PaginationResponse, ServerResponse } from '../../core/interfaces';
import { Controller } from './controller';

export class TypeController extends Controller {

  constructor(
    private readonly typeRepository: Domain.TypeRepository
  ) {
    super();
  }

  getTypes = ( req: Request, res: Response ) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const  paginationDto  = PaginationDto.create( +page, +limit );

      new Domain.FindType(this.typeRepository).execute({
            paginationDto,
            filter: undefined
        })
      .then( response => {
        const serverResponse: ServerResponse<PaginationResponse<Domain.Type[]>> = {
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