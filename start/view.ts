import View from '@ioc:Adonis/Core/View'

View.global('menu', [
  {
    url: '/customers',
    text: 'Get customers',
  },
  {
    url: '/customers/add',
    text: 'Add a customer',
  },
  {
    url: '/estimates',
    text: 'Get estimates',
  },
  {
    url: '/estimates/create',
    text: 'Create an estimate',
  }
])
