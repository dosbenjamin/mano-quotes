import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import CreateUserValidator from '../../Validators/CreateUserValidator'
import LogUserValidator from '../../Validators/LogUserValidator'

export default class AuthController {
  public showLoginForm({ view, auth, response }: HttpContextContract) {
    if (auth.isLoggedIn) {
      return response.redirect('/dashboard')
    }

    return view.render('auth/login')
  }

  public showRegisterForm({ view, auth, response }: HttpContextContract) {
    if (auth.isLoggedIn) {
      return response.redirect('/dashboard')
    }

    return view.render('auth/register')
  }

  public async login({ response, auth, request }: HttpContextContract) {
    const { email, password } = await request.validate(LogUserValidator)

    await auth.attempt(email, password)
    response.redirect('/dashboard')
  }

  public async register({ response, request, auth }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)

    await User.create(payload)
    await auth.attempt(payload.email, payload.password)
    response.redirect('/dashboard')
  }

  public logout({ auth, response }: HttpContextContract) {
    auth.logout()
    response.redirect('/login')
  }
}
