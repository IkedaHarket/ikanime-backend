import { Router } from 'express';
import { AnimeController, EpisodeController, AnimePostgresRepository, EpisodePostgresRepository } from '../';

export class AnimeRouter {


  static get routes(): Router {

    const router = Router();

    const animeRepository = new AnimePostgresRepository({})
    const animeController = new AnimeController(animeRepository);

    const episodeRepository = new EpisodePostgresRepository({})
    const episodeController = new EpisodeController(episodeRepository)


    router.get('/', animeController.getAnimes );
    
    router.get('/episode', episodeController.getEpisodes );

    return router;
  }


}