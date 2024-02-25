import { Response, Request } from 'express';

import { PaginationDto } from '../../core/dtos';

import * as Domain from '../domain';
import { PaginationResponse, ServerResponse } from '../../core/interfaces';
import { Controller } from './controller';

export class CategoryController extends Controller {

  constructor(
    private readonly categoryRepository: Domain.CategoryRepository
  ) {
    super();
  }

  getCategories = ( req: Request, res: Response ) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const  paginationDto  = PaginationDto.create( +page, +limit );

      new Domain.FindCategory(this.categoryRepository).execute({
            paginationDto,
            filter: undefined
        })
      .then( response => {
        const serverResponse: ServerResponse<PaginationResponse<Domain.Category[]>> = {
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