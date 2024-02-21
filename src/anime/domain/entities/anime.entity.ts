
interface AnimeProps{
    id:string
    name: string,
    description: string,
    uniqueName: string,
    stateId: string,
    typeId: string,
    image: string,
    position: number,
    nextEpisode : Date | null,
    releaseDate : Date | null,
    isActive ?: boolean,
    updatedAt: Date
    createdAt: Date
}

export class Anime{
    public readonly id: string
    public name: string
    public description : string
    public uniqueName : string
    public stateId : string
    public typeId : string
    public image : string
    public position : number
    public nextEpisode : Date | null
    public releaseDate : Date | null
    public isActive ?: boolean
    public updatedAt : Date
    public createdAt : Date
    
    constructor({
                id,
                name,
                description,
                uniqueName,
                stateId,
                image,
                position,
                typeId,
                nextEpisode,
                releaseDate,
                createdAt,
                updatedAt,
                isActive,
                }: AnimeProps ){  
        this.id = id
        this.name = name
        this.description = description
        this.uniqueName = uniqueName
        this.stateId = stateId
        this.typeId = typeId
        this.image = image
        this.position = position
        this.nextEpisode = nextEpisode
        this.releaseDate = releaseDate
        this.isActive =  isActive        
        this.updatedAt = updatedAt        
        this.createdAt = createdAt
    }

}