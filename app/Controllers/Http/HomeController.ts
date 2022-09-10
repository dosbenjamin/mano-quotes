import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  public index({ response, auth }: HttpContextContract) {
    if (auth.isLoggedIn) {
      return response.redirect('/dashboard')
    }

    response.redirect('/login')
  }
}
