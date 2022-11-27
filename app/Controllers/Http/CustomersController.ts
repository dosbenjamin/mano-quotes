import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateCustomerValidator from '../../Validators/CreateCustomerValidator'
import UpdateCustomerValidator from '../../Validators/UpdateCustomerValidator'
import CustomerRepository from '../../Repositories/CustomerRepository'
import { inject } from '@adonisjs/core/build/standalone'
import { CustomerRoutes, CustomerViews } from '../../Enums/CustomerEnums'

@inject()
export default class CustomersController {
  constructor(private customerRepository: CustomerRepository) {}

  public async index({ view, auth }: HttpContextContract): Promise<string> {
    const customers = await this.customerRepository.findAllBy({ userId: auth.user.id })

    return view.render(CustomerViews.INDEX, { customers })
  }

  public async create({ view }: HttpContextContract): Promise<string> {
    return view.render(CustomerViews.CREATE)
  }

  public async store({ response, request, auth }: HttpContextContract): Promise<void> {
    const payload = await request.validate(CreateCustomerValidator)
    const customer = await this.customerRepository.create({ ...payload, userId: auth.user.id })

    response.redirect().toRoute(CustomerRoutes.SHOW, [customer.id])
  }

  public async show({ view, params, bouncer }: HttpContextContract): Promise<string> {
    const customer = await this.customerRepository.find(params.id)
    await bouncer.with('CustomerPolicy').authorize('view', customer)

    return view.render(CustomerViews.SHOW, { customer })
  }

  public async edit({ view, params, bouncer }: HttpContextContract): Promise<string> {
    const customer = await this.customerRepository.find(params.id)
    await bouncer.with('CustomerPolicy').authorize('update', customer)

    return view.render(CustomerViews.EDIT, { customer })
  }

  public async update({ request, response, params, bouncer }: HttpContextContract): Promise<void> {
    const customer = await this.customerRepository.find(params.id)
    await bouncer.with('CustomerPolicy').authorize('update', customer)

    const payload = await request.validate(UpdateCustomerValidator)
    await customer.merge(payload).save()

    response.redirect().toRoute(CustomerRoutes.SHOW, [params.id])
  }

  public async destroy({ response, params, bouncer }: HttpContextContract): Promise<void> {
    const customer = await this.customerRepository.find(params.id)
    await bouncer.with('CustomerPolicy').authorize('delete', customer)

    await customer.delete()

    response.redirect().toRoute(CustomerRoutes.INDEX)
  }
}
