import { Envs } from "./core/adapters"
import { AppRoutes, Server } from "./core/server/express"


function main(){
    const server = new Server({
        port: Envs.PORT,
        routes: AppRoutes.routes
    })

    server.start()
}


( async ()=> main() )()