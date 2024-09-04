import jwt from 'jsonwebtoken'
import { SafeUser } from '../@types'

const TOKEN_SECRET = process.env.TOKEN_SECRET || ""
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || ""
const EXPIRES_IN = process.env.EXPIRES_IN || ""

const generateAccessToken = (payload: SafeUser) =>
  jwt.sign(payload, TOKEN_SECRET, {
    expiresIn: EXPIRES_IN,
  })

const verifyAccessToken = (token: string) => jwt.verify(token, TOKEN_SECRET) as SafeUser

const generateRefreshToken = (payload: Pick<SafeUser, 'id'>) => jwt.sign(payload, REFRESH_TOKEN_SECRET)

const verifyRefreshToken = (token: string) => jwt.verify(token, REFRESH_TOKEN_SECRET) as Pick<SafeUser, 'id'>

const TokenService = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
}

export default TokenService