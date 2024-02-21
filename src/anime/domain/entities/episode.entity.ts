
interface EpisodeProps{
    id:string
    animeId: string
    createdAt: Date
    isActive: boolean
    number: number
    updatedAt: Date
}

export class Episode{
    public readonly id: string
    public animeId: string
    public createdAt: Date
    public isActive: boolean
    public number: number
    public updatedAt: Date
    
    constructor({ id, animeId, number,createdAt, isActive, updatedAt }: EpisodeProps){
        this.id = id
        this.animeId = animeId
        this.createdAt = createdAt
        this.isActive =  isActive        
        this.number = number
        this.updatedAt = updatedAt        
    }

}