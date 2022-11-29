import { DateTime } from 'luxon'
import { BaseModel, type BelongsTo, belongsTo, column, type HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import User from './User'
import Service from './Service'

export default class Quote extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public priceWithoutVat: number

  @column()
  public priceWithVat: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public customerId: number

  @belongsTo(() => Customer)
  public customer: BelongsTo<typeof Customer>

  @hasMany(() => Service)
  public services: HasMany<typeof Service>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
