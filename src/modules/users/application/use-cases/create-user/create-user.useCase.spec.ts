import { expect, beforeEach, describe, it } from 'vitest'
import { InMemoryUserRepository } from '../../repositories/in-memory-user-repository'
import { CreateUserUseCase } from './create-user.useCase'
import { AppError } from '@errors/app-error'

let inMemoryUserRepository: InMemoryUserRepository
let createQuestionUseCase: CreateUserUseCase

describe('Create an User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    createQuestionUseCase = new CreateUserUseCase(inMemoryUserRepository)
  })
  it('Should be able to create an User', async () => {
    const { user } = await createQuestionUseCase.execute({
      email: '123432434@email.com.br',
      name: 'Fernando dos Santos',
      password: 'F3RN4Nd0123',
    })
    expect(user.id).toBeTruthy()
    expect(inMemoryUserRepository.repository[0].id).toEqual(user.id)
  })

  it('Should not be able to create an user when it has already been registered', async () => {
    await createQuestionUseCase.execute({
      email: '123432434@email.com.br',
      name: 'Fernando dos Santos',
      password: 'F3RN4Nd0123',
    })
    expect(async () => {
      await createQuestionUseCase.execute({
        email: '123432434@email.com.br',
        name: 'Fernando dos Santos',
        password: 'F3RN4Nd0123',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
