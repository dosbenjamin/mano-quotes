import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Quote from './Quote'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public quantity: number

  @column()
  public vat: number

  @column()
  public priceWithoutVat: number

  @column()
  public priceWithVat: number

  @column()
  public uuid: string

  @column()
  public quoteId: number

  @belongsTo(() => Quote)
  public quote: BelongsTo<typeof Quote>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
