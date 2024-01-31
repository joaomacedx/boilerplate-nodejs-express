import { AppError } from '@shared/errors/app-error'
import { UserRepository } from '@modules/users/enterprise/repositories'
import { environment } from '@shared/infra/environment'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

export interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}
interface AuthenticateUserUseCaseResponse {
  user: {
    name: string
    email: string
  }
  token: string
}
export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const userAlreadyExists = await this.userRepository.findByEmail(email)
    if (!userAlreadyExists) throw new AppError('Email or password incorrect!')
    const passworMatch = await compare(password, userAlreadyExists.password)
    if (!passworMatch) {
      throw new AppError('Email or password incorrect!')
    }
    const token = sign({}, environment.tokenInfo.token, {
      subject: userAlreadyExists.id.toString(),
      expiresIn: environment.tokenInfo.expirationTime,
    })

    return {
      token,
      user: {
        name: userAlreadyExists.name,
        email: userAlreadyExists.email,
      },
    }
  }
}
