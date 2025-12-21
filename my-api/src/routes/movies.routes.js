import { Router } from 'express'
import { listMovies, getMovie } from '../controllers/movies.controller.js'

const router = Router()

router.get('/', listMovies)
router.get('/:id', getMovie)

export default router
