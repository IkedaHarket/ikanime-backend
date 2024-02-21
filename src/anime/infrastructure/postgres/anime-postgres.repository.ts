import { FindOptions, FindResponse } from "../../../core/interfaces";
import { Prisma } from "../../../core/adapters";
import { Criteria } from "../../../core/models";

import { Anime, AnimeRepository } from "../..";

interface Options{
    prismaClient?: Prisma
}

export class AnimePostgresRepository implements AnimeRepository{

    private readonly prismaClient: Prisma

    constructor({ prismaClient }:Options){
        this.prismaClient = prismaClient || Prisma.getInstance()
    }

    async find( { filter, paginationDto }: FindOptions ): Promise<FindResponse<Anime[]>> {
        try {
            const [postgresObjects, totalRecords] = await Promise.all([
                this.prismaClient.prismaClient.anime.findMany({
                    where: { ...(filter as Criteria<{ [key: string]: any[] }>)?.applyFilter() },
                    skip: (paginationDto.page - 1) * paginationDto.limit,
                    take: paginationDto.limit,
                    include: { 
                    state: true, 
                    animeCategories:{
                        include: { animeCategory: true }
                    }, 
                    anotherNames: true, 
                    _count: true, 
                    type: true 
                }
                }),
                this.prismaClient.prismaClient.anime.count({
                    where: { ...(filter as Criteria<{ [key: string]: any[] }>)?.applyFilter() },
                })
            ])

            const records : Anime[] = postgresObjects.map( (po) => (
                    new Anime({
                        id: po.id,
                        createdAt: po.createdAt,
                        description: po.description,
                        image: po.image,
                        name: po.name,
                        nextEpisode: po.nextEpisode,
                        position: po.position,
                        releaseDate: po.releaseDate,
                        uniqueName: po.uniqueName,
                        updatedAt: po.updatedAt,
                        isActive: po.isActive,
                        otherNames: po.anotherNames.map( ({id,name}) => ({id , value: name})),
                        state: { id: po.state.id, value: po.state.name },
                        type: { id: po.type.id, value: po.type.name },
                        categories: po.animeCategories.map(({animeCategory}) => ({id: animeCategory.id, value: animeCategory.name}))
                    })
                ))
            return { records, totalRecords }
            
        } catch (error) {
            throw error
        }
    }

}