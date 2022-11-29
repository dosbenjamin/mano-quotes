import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateQuoteValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name: schema.string(),
    description: schema.string.optional(),
    customerId: schema.number([
      rules.exists({
        table: 'customers',
        column: 'id'
      })
    ]),
    priceWithoutVat: schema.number(),
    priceWithVat: schema.number(),
    services: schema.array([
      rules.minLength(1)
    ]).members(
      schema.object().members({
        id: schema.number.optional(),
        name: schema.string(),
        quantity: schema.number(),
        vat: schema.number([
          rules.range(0, 100)
        ]),
        priceWithoutVat: schema.number(),
        priceWithVat: schema.number(),
        uuid: schema.string()
      })
    )
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}
