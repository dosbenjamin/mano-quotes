import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import type User from '../Models/User'
import type Quote from '../Models/Quote'

export default class QuotePolicy extends BasePolicy {
  public async view(user: User, quote: Quote): Promise<boolean> {
    return user.id === quote.userId
  }

  public async update(user: User, quote: Quote): Promise<boolean> {
    return user.id === quote.userId
  }

  public async delete(user: User, quote: Quote): Promise<boolean> {
    return user.id === quote.userId
  }
}
