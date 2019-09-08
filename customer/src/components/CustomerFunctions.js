import axios from 'axios'

// export const create = newCustomer => {
//   return axios
//     .post('customers/create', {
//       first_name: newCustomer.first_name,
//       last_name: newCustomer.last_name,
//       email: newCustomer.email,
//       password: newCustomer.password
//     })
//     .then(response => {
//       console.log('Registered')
//     })
// }

export const search = customer => {
  return axios
    .post('customers/search', {
      email: customer.email,
      password: customer.password,
      phone: customer.phone
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
