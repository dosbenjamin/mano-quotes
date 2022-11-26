import Customer from '../Models/Customer'
import { BaseRepository } from './BaseRepository'

export default class CustomerRepository extends BaseRepository<typeof Customer> {
  protected readonly model = Customer
}
