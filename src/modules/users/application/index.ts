import { CreateUserController } from './controllers'
import { AuthenticateUserController } from './controllers/'

export const createUserController = new CreateUserController()
export const authenticateUserController = new AuthenticateUserController()
