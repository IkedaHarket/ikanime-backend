import { Envs } from "./core/adapters/envs/envs.adapter"
import { AppRoutes } from "./core/server/express/routes"
import { Server } from "./core/server/express/server"


async function main(){
    const server = new Server({
        port: Envs.PORT,
        routes: AppRoutes.routes
    })

    server.start()
}


( async ()=> await main() )()