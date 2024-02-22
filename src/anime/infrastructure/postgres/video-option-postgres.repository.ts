import { Prisma } from "../../../core/adapters";
import { FindOptions, FindResponse } from "../../../core/interfaces";
import { Criteria, FilterPostgres } from "../../../core/models";

import * as Domain from "../../domain";
import { EqualAnimeEpisodeId } from "./filters";

interface Options{
    prismaClient?: Prisma
}

export class VideoOptionPostgresRepository implements Domain.VideoOptionRepository{

    private readonly prismaClient: Prisma

    constructor({ prismaClient }:Options){
        this.prismaClient = prismaClient || Prisma.getInstance()
    }

    async find({ filter, paginationDto }: FindOptions<Domain.VideoOptionFindFilterDto>): Promise<FindResponse<Domain.VideoOption[]>> {
        try {
            const filters : Criteria<Object>[] = []

            if(filter?.animeEpisodeId){
                filters.push(new EqualAnimeEpisodeId(filter.animeEpisodeId))
            }
            
            const [postgresObjects, totalRecords] = await Promise.all([
                this.prismaClient.prismaClient.animeEpisodeVideoOption.findMany({
                    where: { ...new FilterPostgres({
                                    criteria: filters,
                                    logic: filter!.logic
                                })?.applyFilter() },
                    skip: (paginationDto.page - 1) * paginationDto.limit,
                    take: paginationDto.limit,
                }),
                this.prismaClient.prismaClient.animeEpisodeVideoOption.count({
                    where: { ...new FilterPostgres({
                                    criteria: filters,
                                    logic: filter!.logic
                                })?.applyFilter() },
                })
            ])

            const records: Domain.VideoOption[] = postgresObjects.map( ep => new Domain.VideoOption({
                id: ep.id,
                createdAt: ep.createdAt,
                episodeId: ep.animeEpisodeId,
                isActive: ep.isActive,
                nameServer: ep.nameServer,
                updatedAt: ep.updatedAt,
                url: ep.url
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