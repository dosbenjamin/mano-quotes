import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'quotes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('description')
      table.float('price_without_vat').notNullable()
      table.float('price_with_vat').notNullable()
      table.integer('user_id').notNullable()
      table.foreign('user_id').references('users.id')
      table.integer('customer_id').notNullable()
      table.foreign('customer_id').references('customers.id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
