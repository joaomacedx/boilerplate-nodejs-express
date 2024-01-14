import { Entity } from '@core/entities/entity'
import { EntityId } from '@core/entities/entity-id'

interface UserProps {
  userId: EntityId
  name: string
  email: string
  password: string
}
export class User extends Entity<UserProps> {
  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  public static create(props: UserProps, id?: EntityId): User {
    const user = new User(
      {
        ...props,
      },
      id,
    )

    return user
  }
}
