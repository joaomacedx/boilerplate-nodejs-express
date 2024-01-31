import { User } from '@modules/users/enterprise/entities/user'
import { UserRepository } from '@modules/users/enterprise/repositories/user-repository'

export class InMemoryUserRepository implements UserRepository {
  public repository: User[] = []

  public async save(user: User): Promise<void> {
    this.repository.push(user)
  }

  public async findByEmail(email: string): Promise<User | null> {
    const userFound = this.repository.find((user) => user.email === email)
    if (userFound) return userFound
    return null
  }

  public async findById(id: string): Promise<User | null> {
    const userFound = this.repository.find((user) => user.id.toValue() === id)
    if (userFound) return userFound
    return null
  }
}
