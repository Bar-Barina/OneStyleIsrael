import { httpService } from './http.service'

export const userService = {
  getUser,
  signup,
  addToCart,
  removeFromCart,
  login,
  getEmptyCred,
  getEmptyContact,
  updateUser,
  logout,
}

function getUser() {
  return JSON.parse(localStorage.getItem('user'))
}

async function login(userCred) {
  const user = await httpService.post('auth/login', userCred)
  return user
}

function signup(userCred) {
  if (getUser()) userCred.cart = getUser().cart
  return httpService.post('auth/signup', userCred)
}

function logout() {
  return httpService.post(`auth/logout`)
}

function updateUser(user) {
  return httpService.put(`user/${user._id}`, user)
}

function addToCart(product) {
  const user = getUser()
  user.cart.unshift(product)
  updateLocalUser(user)
  return user
}

function removeFromCart(productId, productSize) {
  const user = getUser()
  const idx = user.cart.findIndex(
    (p) => p._id === productId && p.size === productSize
  )
  user.cart.splice(idx, 1)
  updateLocalUser(user)
  return user
}

function updateLocalUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

// function lastMoves(moves, id) {
//     if (!id) return moves.splice(moves.length - 4)
//     else return moves.filter(move => move.toId === id)
// }

function getEmptyCred() {
  return {
    accountName: '',
    email: '',
    password: '',
  }
}

function getEmptyContact() {
  return {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postal: '',
    phone: '',
  }
}

async function adminSignup(userCred) {
  const user = await httpService.post('auth/signup', userCred)
}

// const adminCred = {
//     email: 'dor@gmail.com',
//     password: '1234',
//     accountName: 'dor'
// }

// adminSignup(adminCred)
