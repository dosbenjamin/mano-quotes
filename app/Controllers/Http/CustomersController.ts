import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateCustomerValidator from '../../Validators/CreateCustomerValidator'
import UpdateCustomerValidator from '../../Validators/UpdateCustomerValidator'
import { CustomerRoutes, CustomerViews } from '../../Enums/CustomerEnums'
import Customer from '../../Models/Customer'

export default class CustomersController {
  public async index({ view, auth }: HttpContextContract): Promise<string> {
    const customers = await Customer.query().where('user_id', auth.user.id)

    return view.render(CustomerViews.INDEX, { customers })
  }

  public async create({ view }: HttpContextContract): Promise<string> {
    return view.render(CustomerViews.CREATE)
  }

  public async store({ response, request, auth }: HttpContextContract): Promise<void> {
    const payload = await request.validate(CreateCustomerValidator)
    const customer = await Customer.create({ ...payload, userId: auth.user.id })

    return response.redirect().toRoute(CustomerRoutes.SHOW, [customer.id])
  }

  public async show({ view, params, bouncer }: HttpContextContract): Promise<string> {
    const customer = await Customer.findOrFail(params.id)
    await bouncer.with('CustomerPolicy').authorize('view', customer)

    return view.render(CustomerViews.SHOW, { customer })
  }

  public async edit({ view, params, bouncer }: HttpContextContract): Promise<string> {
    const customer = await Customer.findOrFail(params.id)
    await bouncer.with('CustomerPolicy').authorize('update', customer)

    return view.render(CustomerViews.EDIT, { customer })
  }

  public async update({ request, response, params, bouncer }: HttpContextContract): Promise<void> {
    const customer = await Customer.findOrFail(params.id)
    await bouncer.with('CustomerPolicy').authorize('update', customer)

    const payload = await request.validate(UpdateCustomerValidator)
    await customer.merge(payload).save()

    return response.redirect().toRoute(CustomerRoutes.SHOW, [params.id])
  }

  public async destroy({ response, params, bouncer }: HttpContextContract): Promise<void> {
    const customer = await Customer.findOrFail(params.id)
    await bouncer.with('CustomerPolicy').authorize('delete', customer)

    await customer.delete()

    return response.redirect().toRoute(CustomerRoutes.INDEX)
  }
}
