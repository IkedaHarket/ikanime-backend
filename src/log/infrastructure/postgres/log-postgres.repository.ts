
import { LogSeverityLevel as  LogSeverityLevelPrisma } from "@prisma/client"

import { Prisma } from "../../../core/adapters"

import * as Domain from '../../domain'

const SeverityEnum = {
    LOW: LogSeverityLevelPrisma.LOW,
    MEDIUM: LogSeverityLevelPrisma.MEDIUM,
    HIGH: LogSeverityLevelPrisma.HIGH,
}

interface Options{
    prismaClient?: Prisma
}

export class AnimePostgresRepository implements Domain.LogRepository{

    private readonly prismaClient: Prisma

    constructor({ prismaClient }:Options){
        this.prismaClient = prismaClient || Prisma.getInstance()
    }

    async create(createLogDto: Domain.CreateLogDto): Promise<Domain.Log>{
        const { level, ...logData} = createLogDto
        const severity = SeverityEnum[level]
        const postgresObject = await this.prismaClient.prismaClient.log.create({
            data: { ...logData, severity }
        })

        return new Domain.Log({
            id: postgresObject.id, 
            createdAt: postgresObject.createdAt, 
            message: postgresObject.message, 
            origin: postgresObject.origin, 
            level: severity as Domain.LogSeverityLevel,
        })
    }
}