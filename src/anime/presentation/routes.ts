import { Router } from 'express';
import * as Controller from './';
import * as Infrastructure from '../infrastructure';

export class AnimeRouter {


  static get routes(): Router {

    const router = Router();

    const animeRepository = new Infrastructure.AnimePostgresRepository({})
    const animeController = new Controller.AnimeController(animeRepository);

    const episodeRepository = new Infrastructure.EpisodePostgresRepository({})
    const episodeController = new Controller.EpisodeController(episodeRepository)

    const videoOptionsRepository = new Infrastructure.VideoOptionPostgresRepository({})
    const videoOptionsController = new Controller.VideoOptionController(videoOptionsRepository)

    router.post('/find', animeController.getAnimes );
    
    router.post('/episode/find', episodeController.getEpisodes );
    
    router.post('/video-option/find', videoOptionsController.getVideoOptions );

    return router;
  }


}