import { EntityId } from './entity-id'

export class Entity<Props> {
  private _id: EntityId
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: EntityId) {
    this._id = id ?? new EntityId()
    this.props = props
  }
}
