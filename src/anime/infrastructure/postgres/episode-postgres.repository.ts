import { Prisma } from "../../../core/adapters";
import { FindOptions, FindResponse } from "../../../core/interfaces";
import { Criteria, FilterPostgres } from "../../../core/models";

import * as Domain from "../../domain";
import { EqualAnimeId } from "./filters";

interface Options{
    prismaClient?: Prisma
}

export class EpisodePostgresRepository implements Domain.EpisodeRepository{

    private readonly prismaClient: Prisma

    constructor({ prismaClient }:Options){
        this.prismaClient = prismaClient || Prisma.getInstance()
    }

    async find({ filter, paginationDto }: FindOptions<Domain.EpisodeFindFilterDto>): Promise<FindResponse<Domain.Episode[]>> {
        try {
            const filters : Criteria<Object>[] = []

            if(filter?.animeId){
                filters.push(new EqualAnimeId(filter.animeId))
            }
            
            const [postgresObjects, totalRecords] = await Promise.all([
                this.prismaClient.prismaClient.animeEpisode.findMany({
                    where: { ...new FilterPostgres({
                                    criteria: filters,
                                    logic: filter!.logic
                                })?.applyFilter() },
                    skip: (paginationDto.page - 1) * paginationDto.limit,
                    take: paginationDto.limit,
                }),
                this.prismaClient.prismaClient.animeEpisode.count({
                    where: { ...new FilterPostgres({
                                    criteria: filters,
                                    logic: filter!.logic
                                })?.applyFilter() },
                })
            ])

            const records: Domain.Episode[] = postgresObjects.map( ep => new Domain.Episode({
                id: ep.id,
                animeId: ep.animeId,
                createdAt: ep.createdAt,
                isActive: ep.isActive,
                number: ep.number,
                updatedAt: ep.updatedAt,
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