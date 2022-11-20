import Customer from '../Models/Customer'

export default class CustomerRepository {
  static async findAllByUser(userId: number) {
    const customers = await Customer
      .query()
      .where('user_id', '=', userId)

    return customers
  }

  static async findByUserAndId(userId: number, customerId: number) {
    const customer = await Customer
      .query()
      .where('user_id', '=', userId)
      .andWhere('id', '=', customerId)
      .firstOrFail()

    return customer
  }
}
