import { EntityId } from '@core/entities/entity-id'
import { User } from '@modules/users/enterprise/entities/user'
import { UserRepository } from '@modules/users/enterprise/repositories/user-repository'
import { AppError } from '@errors/app-error'

export interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}
interface CreateUserUseCaseResponse {
  user: User
}
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute({
    name,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userAlreadyExists = await this.userRepository.findByEmail(email)
    if (userAlreadyExists) throw new AppError('User Already exists.')
    const newUser = User.create({
      name,
      email,
      password,
      userId: new EntityId(),
    })
    this.userRepository.save(newUser)

    return {
      user: newUser,
    }
  }
}
