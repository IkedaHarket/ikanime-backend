import { Router } from 'express';
import { AnimeRouter } from '../../../anime';

export class AppRoutes {

  static get routes(): Router {

    const router = Router();

    router.use('/api/anime', AnimeRouter.routes)

    return router;
  }

}