interface State{ id: string, value:string }
interface Type{ id: string, value:string }
interface OtherNames{ id: string, value:string }
interface Category{ id: string, value:string }
interface AnimeProps{
    id:string
    name: string,
    description: string,
    uniqueName: string,
    otherNames: OtherNames[],
    state: State,
    type: Type,
    image: string,
    position: number,
    categories: Category[],
    nextEpisode : Date | null,
    releaseDate : Date | null,
    isActive ?: boolean,
    updatedAt: Date
    createdAt: Date
}

export class Anime{
    public readonly id: string
    public categories : Category[]
    public createdAt : Date
    public description : string
    public image : string
    public isActive ?: boolean
    public name: string
    public nextEpisode : Date | null
    public otherNames : OtherNames[]
    public position : number
    public releaseDate : Date | null
    public state : State
    public type : Type
    public uniqueName : string
    public updatedAt : Date
    
    constructor({
                id,
                categories,
                createdAt,
                description,
                image,
                isActive,
                name,
                nextEpisode,
                otherNames,
                position,
                releaseDate,
                state,
                type,
                uniqueName,
                updatedAt,
                }: AnimeProps ){  
        this.id = id
        this.categories = categories
        this.createdAt = createdAt
        this.description = description
        this.image = image
        this.isActive = isActive        
        this.name = name
        this.nextEpisode = nextEpisode
        this.otherNames = otherNames
        this.position = position
        this.releaseDate = releaseDate
        this.state = state
        this.type = type
        this.uniqueName = uniqueName
        this.updatedAt = updatedAt        
    }

}

