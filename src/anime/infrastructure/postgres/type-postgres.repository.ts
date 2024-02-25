import { Prisma } from "../../../core/adapters";
import { FindOptions, FindResponse } from "../../../core/interfaces";

import * as Domain from "../../domain";

interface Options{
    prismaClient?: Prisma
}

export class TypePostgresRepository implements Domain.TypeRepository{

    private readonly prismaClient: Prisma

    constructor({ prismaClient }:Options){
        this.prismaClient = prismaClient || Prisma.getInstance()
    }

    async find({ paginationDto }: FindOptions<undefined>): Promise<FindResponse<Domain.Type[]>> {
        try {
            
            const [postgresObjects, totalRecords] = await Promise.all([
                this.prismaClient.prismaClient.animeType.findMany({
                    skip: (paginationDto.page - 1) * paginationDto.limit,
                    take: paginationDto.limit,
                }),
                this.prismaClient.prismaClient.animeType.count()
            ])

            const records: Domain.Type[] = postgresObjects.map( type => new Domain.Type({
                id: type.id,
                name: type.name,
                createdAt: type.createdAt,
                isActive: type.isActive,
                updatedAt: type.updatedAt,
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