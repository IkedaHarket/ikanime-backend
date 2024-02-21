import { Prisma } from "../../../core/adapters";
import { FindOptions, FindResponse } from "../../../core/interfaces";
import { Criteria } from "../../../core/models";
import { Episode } from "../../domain/entities/episode.entity";
import { EpisodeRepository } from "../../domain/repository/episode.repository";

interface Options{
    prismaClient?: Prisma
}

export class EpisodePostgresRepository implements EpisodeRepository{

    private readonly prismaClient: Prisma

    constructor({ prismaClient }:Options){
        this.prismaClient = prismaClient || Prisma.getInstance()
    }

    async find({ filter, paginationDto }: FindOptions): Promise<FindResponse<Episode[]>> {
        try {
            const [postgresObjects, totalRecords] = await Promise.all([
                this.prismaClient.prismaClient.animeEpisode.findMany({
                    where: { ...(filter as Criteria<{ [key: string]: any[] }>)?.applyFilter() },
                    skip: (paginationDto.page - 1) * paginationDto.limit,
                    take: paginationDto.limit,
                }),
                this.prismaClient.prismaClient.animeEpisode.count({
                    where: { ...(filter as Criteria<{ [key: string]: any[] }>)?.applyFilter() },
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