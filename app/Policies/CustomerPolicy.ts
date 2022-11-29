import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import type Customer from '../Models/Customer'
import type User from '../Models/User'

export default class CustomerPolicy extends BasePolicy {
  public async view(user: User, customer: Customer): Promise<boolean> {
    return user.id === customer.userId
  }

  public async update(user: User, customer: Customer): Promise<boolean> {
    return user.id === customer.userId
  }

  public async delete(user: User, customer: Customer): Promise<boolean> {
    return user.id === customer.userId
  }
}
