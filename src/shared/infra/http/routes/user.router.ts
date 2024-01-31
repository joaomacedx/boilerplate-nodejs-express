import { Router } from 'express'
import { createUserController } from '@modules/users/application'

const userRoutes = Router()
userRoutes.post('/', createUserController.handle)

export { userRoutes }
