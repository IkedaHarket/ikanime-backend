import { PrismaClient } from "@prisma/client"

export class Prisma{
    private static _instance: Prisma
    private _prisma: PrismaClient

    private constructor(){
        this._prisma = new PrismaClient()
    }

    public static getInstance(): Prisma {
        if(!Prisma._instance){
            Prisma._instance = new Prisma()
        }
        return Prisma._instance
    }

    get prismaClient(){
        return this._prisma
    }
}