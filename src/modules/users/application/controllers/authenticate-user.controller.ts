import { Request, Response } from 'express'
import { authenticateUserUseCase } from '../use-cases'

export class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    const token = await authenticateUserUseCase.execute({
      email,
      password,
    })
    return response.json(token)
  }
}
