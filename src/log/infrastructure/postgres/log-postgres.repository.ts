import { Prisma } from "../../../core/adapters"
import { ServerResponse } from "../../../core/interfaces"

import * as Domain from '../../domain'

interface Options{
    prismaClient?: Prisma
}

export class AnimePostgresRepository implements Domain.LogRepository{

    private readonly prismaClient: Prisma

    constructor({ prismaClient }:Options){
        this.prismaClient = prismaClient || Prisma.getInstance()
    }

    async create(log: Domain.CreateLogDto): Promise<ServerResponse<Domain.Log>> {
        throw new Error("Method not implemented.")
    }
}