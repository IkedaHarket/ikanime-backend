import { Prisma } from "../../../core/adapters";
import { FindOptions, FindResponse } from "../../../core/interfaces";
import { Criteria, FilterPostgres } from "../../../core/models";
import { EpisodeFindFilterDto } from "../../domain/dtos/episode/episode-find-filter.dto";
import { Episode } from "../../domain/entities/episode.entity";
import { EpisodeRepository } from "../../domain/repository/episode.repository";
import { EqualAnimeId } from "./filters/equal-animeId-episode.filter";

interface Options{
    prismaClient?: Prisma
}

export class EpisodePostgresRepository implements EpisodeRepository{

    private readonly prismaClient: Prisma

    constructor({ prismaClient }:Options){
        this.prismaClient = prismaClient || Prisma.getInstance()
    }

    async find({ filter, paginationDto }: FindOptions<EpisodeFindFilterDto>): Promise<FindResponse<Episode[]>> {
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

            const records: Episode[] = postgresObjects.map( ep => new Episode({
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