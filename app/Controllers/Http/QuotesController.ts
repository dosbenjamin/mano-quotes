import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { QuoteRoutes, QuoteViews } from '../../Enums/QuoteEnums'
import Customer from '../../Models/Customer'
import Quote from '../../Models/Quote'
import CreateQuoteValidator from '../../Validators/CreateQuoteValidator'
import UpdateQuoteValidator from '../../Validators/UpdateQuoteValidator'

export default class QuotesController {
  public async index({ view, auth }: HttpContextContract): Promise<string> {
    const quotes = await Quote.query().where('user_id', auth.user.id)

    return view.render(QuoteViews.INDEX, { quotes })
  }

  public async create({ view, auth }: HttpContextContract): Promise<string> {
    const customers = await Customer.query().where('user_id', auth.user.id)

    return view.render(QuoteViews.CREATE, { customers })
  }

  public async store({ response, request, auth }: HttpContextContract): Promise<void> {
    const { services: servicesPayload, ...quotePayload } = await request.validate(CreateQuoteValidator)
    const quote = await Database.transaction(async trx => {
      const quote = new Quote()
        .useTransaction(trx)
        .fill({ ...quotePayload, userId: auth.user.id })

      await quote.related('services').createMany(servicesPayload)

      return quote.save()
    })

    return response.redirect().toRoute(QuoteRoutes.SHOW, [quote.id])
  }

  public async show({ view, params, bouncer }: HttpContextContract): Promise<string> {
    const quote = await Quote.findOrFail(params.id)
    await bouncer.with('QuotePolicy').authorize('view', quote)

    await Promise.all([
      quote.load('customer'),
      quote.load('services')
    ])

    return view.render(QuoteViews.SHOW, { quote })
  }

  public async edit({ view, params, auth, bouncer }: HttpContextContract): Promise<string> {
    const quote = await Quote.findOrFail(params.id)
    await bouncer.with('QuotePolicy').authorize('update', quote)

    const [customers] = await Promise.all([
      Customer.query().where('user_id', auth.user.id),
      quote.load('customer'),
      quote.load('services')
    ])

    return view.render(QuoteViews.EDIT, { customers, quote: quote.toObject() })
  }

  public async update({ response, request, params, bouncer }: HttpContextContract): Promise<void> {
    const quote = await Quote.findOrFail(params.id)
    await bouncer.with('QuotePolicy').authorize('update', quote)

    const { services: servicesPayload, ...quotePayload } = await request.validate(UpdateQuoteValidator)
    await Database.transaction(async trx => {
      const updatedQuote = quote.useTransaction(trx).merge(quotePayload)

      await updatedQuote
        .related('services')
        .query()
        .whereNotIn('uuid', servicesPayload.map(({ uuid }) => uuid))
        .delete()

      await updatedQuote
        .related('services')
        .updateOrCreateMany(servicesPayload, 'uuid')

      return updatedQuote.save()
    })

    return response.redirect().toRoute(QuoteRoutes.SHOW, [quote.id])
  }

  public async destroy({ response, params, bouncer }: HttpContextContract): Promise<void> {
    const quote = await Quote.findOrFail(params.id)
    await bouncer.with('QuotePolicy').authorize('update', quote)

    await quote.delete()

    return response.redirect().toRoute(QuoteRoutes.INDEX)
  }
}
