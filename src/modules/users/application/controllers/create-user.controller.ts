import { Request, Response } from 'express'
import { createUserUseCase } from '../use-cases/create-user'

export class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body
    console.log('ok')
    await createUserUseCase.execute({
      name,
      email,
      password,
    })
    return response.status(201).send()
  }
}
