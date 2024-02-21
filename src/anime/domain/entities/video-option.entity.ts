
interface VideoOptionProps{
    id:string
    createdAt: Date
    episodeId:string
    isActive: boolean
    nameServer: string
    updatedAt: Date
    url:string
}

export class VideoOption{
    public readonly id: string
    public createdAt: Date
    public episodeId: string
    public isActive: boolean
    public nameServer: string
    public updatedAt: Date
    public url: string
    
    constructor({ id, episodeId, nameServer, url, createdAt, isActive, updatedAt }: VideoOptionProps){
        this.id = id
        this.createdAt = createdAt
        this.episodeId = episodeId
        this.isActive =  isActive        
        this.nameServer = nameServer
        this.updatedAt = updatedAt        
        this.url = url
    }

}