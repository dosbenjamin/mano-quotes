import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export default class CreateCustomerValidator {
  constructor(protected ctx: HttpContextContract) { }

  public refs = schema.refs({
    userId: this.ctx.auth.user.id,
    id: this.ctx.params.id
  })

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
    email: schema.string({}, [
      rules.email(),
      rules.unique({
        table: 'customers',
        column: 'email',
        where: {
          user_id: this.refs.userId
        },
        whereNot: {
          id: this.refs.id
        }
      })
    ]),
    vat: schema.string(),
    phone: schema.string({}, [
      rules.mobile()
    ]),
    street: schema.string(),
    number: schema.string(),
    city: schema.string(),
    zip: schema.string(),
    country: schema.string()
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
