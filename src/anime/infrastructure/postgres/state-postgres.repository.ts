import { Prisma } from "../../../core/adapters";
import { FindOptions, FindResponse } from "../../../core/interfaces";

import * as Domain from "../../domain";

interface Options{
    prismaClient?: Prisma
}

export class StatePostgresRepository implements Domain.StateRepository{

    private readonly prismaClient: Prisma

    constructor({ prismaClient }:Options){
        this.prismaClient = prismaClient || Prisma.getInstance()
    }

    async find({ paginationDto }: FindOptions<undefined>): Promise<FindResponse<Domain.State[]>> {
        try {
            
            const [postgresObjects, totalRecords] = await Promise.all([
                this.prismaClient.prismaClient.animeState.findMany({
                    skip: (paginationDto.page - 1) * paginationDto.limit,
                    take: paginationDto.limit,
                }),
                this.prismaClient.prismaClient.animeState.count()
            ])

            const records: Domain.State[] = postgresObjects.map( state => new Domain.State({
                id: state.id,
                name: state.name,
                createdAt: state.createdAt,
                isActive: state.isActive,
                updatedAt: state.updatedAt,
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