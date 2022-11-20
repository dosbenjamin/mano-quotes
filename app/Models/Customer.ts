import { BaseModel, belongsTo, type BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import type { DateTime } from 'luxon'
import User from './User'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public vat: string

  @column()
  public phone: string

  @column()
  public street: string

  @column()
  public number: string

  @column()
  public city: string

  @column()
  public zip: string

  @column()
  public country: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
