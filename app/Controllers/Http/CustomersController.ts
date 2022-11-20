import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from '../../Models/Customer'
import CreateCustomerValidator from '../../Validators/CreateCustomerValidator'
import UpdateCustomerValidator from '../../Validators/UpdateCustomerValidator'
import CustomerRepository from '../../Repositories/CustomerRepository'

export default class CustomersController {
  public async index({ view, auth }: HttpContextContract) {
    const customers = await CustomerRepository.findAllByUser(auth.user.id)

    return view.render('customers/index', { customers })
  }

  public create({ view }: HttpContextContract) {
    return view.render('customers/create')
  }

  public async store({ response, request, auth }: HttpContextContract) {
    const payload = await request.validate(CreateCustomerValidator)

    const { id } = await Customer.create({
      ...payload,
      userId: auth.user.id
    })

    response.redirect().toRoute('customers.show', [id])
  }

  public async show({ view, params, auth }: HttpContextContract) {
    const customer = await CustomerRepository.findByUserAndId(auth.user.id, params.id)

    return view.render('customers/show', { customer })
  }

  public async edit({ view, params, auth }: HttpContextContract) {
    const customer = await CustomerRepository.findByUserAndId(auth.user.id, params.id)

    return view.render('customers/edit', { customer })
  }

  public async update({ request, response, params, auth }: HttpContextContract) {
    const payload = await request.validate(UpdateCustomerValidator)

    const customer = await CustomerRepository.findByUserAndId(auth.user.id, params.id)
    await customer.merge(payload).save()

    response.redirect().toRoute('customers.show', [customer.id])
  }

  public async destroy({ response, params, auth }: HttpContextContract) {
    const customer = await CustomerRepository.findByUserAndId(auth.user.id, params.id)
    await customer.delete()

    response.redirect().toRoute('customers.index')
  }
}
