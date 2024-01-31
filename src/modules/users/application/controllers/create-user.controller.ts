import { Request, Response } from 'express'
import { createUserUseCase } from '../use-cases'
import { hash } from 'bcryptjs'

export class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body
    const passwordHash = await hash(password, 8)
    const user = await createUserUseCase.execute({
      name,
      email,
      password: passwordHash,
    })
    return response.status(201).send(user)
  }
}
