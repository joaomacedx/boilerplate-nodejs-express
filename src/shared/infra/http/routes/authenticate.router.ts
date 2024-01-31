import { Router } from 'express'
import { authenticateUserController } from '@modules/users/application'

const authenticateRouter = Router()

authenticateRouter.post('/sessions', authenticateUserController.handle)

export { authenticateRouter }
