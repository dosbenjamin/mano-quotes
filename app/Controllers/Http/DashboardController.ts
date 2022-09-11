import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DashboardController {
  public index({ view }: HttpContextContract) {
    return view.render('dashboard')
  }
}
