import ProcessEnv = NodeJS.ProcessEnv
import * as dotenv from 'dotenv'
import { EnvironmentInterfaces } from '../../interfaces'

const env: ProcessEnv = process.env
const ENV: string | undefined = env.NODE_ENV

dotenv.config({
  path: !ENV ? './env/.env' : `./env/.env.${ENV}`,
})

export const environment: EnvironmentInterfaces = {
  port: env.SERVICE_PORT as string,
  tokenInfo: {
    token: env.AUTH_TOKEN as string,
    expirationTime: env.AUTH_TOKEN_EXPIRATION_TIME as string,
  },
}
