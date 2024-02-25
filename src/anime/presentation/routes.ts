import { Router } from 'express';
import * as Controller from './';
import * as Infrastructure from '../infrastructure';
import { TypePostgresRepository } from '../infrastructure/postgres/type-postgres.repository';

export class AnimeRouter {


  static get routes(): Router {

    const router = Router();

    const animeRepository = new Infrastructure.AnimePostgresRepository({})
    const animeController = new Controller.AnimeController(animeRepository);

    const episodeRepository = new Infrastructure.EpisodePostgresRepository({})
    const episodeController = new Controller.EpisodeController(episodeRepository)

    const videoOptionsRepository = new Infrastructure.VideoOptionPostgresRepository({})
    const videoOptionsController = new Controller.VideoOptionController(videoOptionsRepository)

    const categoriesRepository = new Infrastructure.CategoryPostgresRepository({})
    const categoryController = new Controller.CategoryController(categoriesRepository)

    const typeRepository = new Infrastructure.TypePostgresRepository({})
    const typeController = new Controller.TypeController(typeRepository)

    router.post('/find', animeController.getAnimes );
    
    router.post('/episode/find', episodeController.getEpisodes );
    
    router.post('/video-option/find', videoOptionsController.getVideoOptions );

    router.post('/categories/find', categoryController.getCategories )

    router.post('/type/find', typeController.getTypes )

    return router;
  }


}