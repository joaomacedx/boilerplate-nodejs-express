import { InMemoryUserRepository } from '../repositories'
import { AuthenticateUserUseCase } from './authenticate-user'
import { CreateUserUseCase } from './create-user'

export const inMemoryUserRepository = new InMemoryUserRepository()
export const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)
export const authenticateUserUseCase = new AuthenticateUserUseCase(
  inMemoryUserRepository,
)
