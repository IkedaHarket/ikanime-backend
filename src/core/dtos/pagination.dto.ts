import { CustomError } from "../models";

export class PaginationDto {

    private constructor(
      public readonly page: number,
      public readonly limit: number,
    ) {}
  
    static create( page: number = 1, limit: number = 10 ): PaginationDto {
  
      if ( isNaN(page) || isNaN(limit) ) throw CustomError.badRequest('Page and Limit must be numbers');
  
      if ( page <= 0 ) throw CustomError.badRequest('Page must be greater than 0');
      if ( limit <= 0 ) throw CustomError.badRequest('Limit must be greater than 0')
  
      return  new PaginationDto(page, limit);
    }
  
  }