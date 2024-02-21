import express, { Request, Response } from 'express'
import compression from 'compression';
import path from 'path';

interface Options {
    port: number,
    routes: express.Router,
    publicPath ?: string,
}

export class Server{
    public readonly app = express()
    private readonly port: number
    private readonly publicPath: string
    private readonly routes: express.Router

    constructor(options:Options){
        const { port, routes, publicPath = 'public' } = options
        this.port = port
        this.routes = routes
        this.publicPath = publicPath
    }

    public start(){
        this.setMiddlewares()
        this.setRoutes()
        this.setPublicPath()
        this.setSinglePage()
        this.startListen()
    }

    private setMiddlewares(): void {
        this.app.use( express.json() )
        this.app.use( express.urlencoded({ extended: true }) )
        this.app.use( compression() )
    }
    
    private setRoutes(): void {
        this.app.use( this.routes )
    }

    private setPublicPath(): void {
        this.app.use( express.static( this.publicPath ) )
    }

    private setSinglePage(): void {
        this.app.get('*', (req, res) => {
            const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
            res.sendFile(indexPath);
        });
    }

    private startListen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${ this.port }`);
          });
    }


}