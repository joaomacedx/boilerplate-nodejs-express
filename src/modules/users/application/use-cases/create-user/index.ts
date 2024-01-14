import { inMemoryUserRepository } from '../../repositories'
import { CreateUserUseCase } from './create-user.useCase'

export const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)
