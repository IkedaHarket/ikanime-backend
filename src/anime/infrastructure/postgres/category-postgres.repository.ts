import { Prisma } from "../../../core/adapters";
import { FindOptions, FindResponse } from "../../../core/interfaces";

import * as Domain from "../../domain";

interface Options{
    prismaClient?: Prisma
}

export class CategoryPostgresRepository implements Domain.CategoryRepository{

    private readonly prismaClient: Prisma

    constructor({ prismaClient }:Options){
        this.prismaClient = prismaClient || Prisma.getInstance()
    }

    async find({ paginationDto }: FindOptions<undefined>): Promise<FindResponse<Domain.Category[]>> {
        try {
            
            const [postgresObjects, totalRecords] = await Promise.all([
                this.prismaClient.prismaClient.animeCategory.findMany({
                    skip: (paginationDto.page - 1) * paginationDto.limit,
                    take: paginationDto.limit,
                }),
                this.prismaClient.prismaClient.animeCategory.count()
            ])

            const records: Domain.Category[] = postgresObjects.map( ca => new Domain.Category({
                id: ca.id,
                name: ca.name,
                createdAt: ca.createdAt,
                isActive: ca.isActive,
                updatedAt: ca.updatedAt,
            }))
            return {
                totalRecords,
                records,
            }
        } catch (error) {
            throw error
        }
    }

}