import { ROLE } from "../constants"

export interface LoginResponse {
  token: string
  name: string
  lastName: string,
  email: string,
  role: ROLE 
}