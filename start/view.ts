import View from '@ioc:Adonis/Core/View'

View.global('menu', [
  {
    url: '/customers',
    text: 'Get customers',
  },
  {
    url: '/customers/create',
    text: 'Create a customer',
  },
  {
    url: '/quotes',
    text: 'Get quotes',
  },
  {
    url: '/quotes/create',
    text: 'Create a quote',
  }
])
