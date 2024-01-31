import Express from 'express'
import { userRoutes } from './user.router'
import { authenticateRouter } from './authenticate.router'

const routes = Express.Router()
routes.use(authenticateRouter)
routes.use('/user', userRoutes)
export default routes
