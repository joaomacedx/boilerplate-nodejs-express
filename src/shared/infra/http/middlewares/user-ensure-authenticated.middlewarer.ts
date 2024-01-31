import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../../../errors'
import { inMemoryUserRepository } from '../../../../modules/users/application/use-cases'
import { environment } from '@shared/infra/environment'

interface IPayload {
  sub: string
}
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization
  if (!authHeader) throw new AppError('Token missing', 401)
  const [, token] = authHeader.split(' ')
  try {
    const { sub: userID } = verify(
      token,
      environment.tokenInfo.token,
    ) as IPayload
    const user = inMemoryUserRepository.findById(userID)
    if (!user) throw new AppError('User does not exists!', 401)
    request.user = {
      id: userID,
    }
    next()
  } catch {
    throw new AppError('Invalid token!', 401)
  }
}
