export type UserWithNoId = {
  email: string,
  password: string
}

export type UserWithNoIdSignUp = {
  email: string,
  password: string,
  confirmPassword: string
}

export type UserWithEmailAndToken = {
  email : string,
  token : string
}
