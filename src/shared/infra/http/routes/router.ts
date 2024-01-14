import Express from 'express'
import { userRoutes } from './user.router'

const routes = Express.Router()

routes.use('/user', userRoutes)
export default routes
