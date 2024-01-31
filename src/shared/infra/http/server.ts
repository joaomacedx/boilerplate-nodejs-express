import 'reflect-metadata'
import Express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'
import routes from './routes/router'
import swaggerFile from '../../../swagger.json'
import { AppError } from '@shared/errors/app-error'
import { environment } from '../environment'

const app = Express()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(Express.json())
app.use(routes)

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      })
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${error.message}`,
    })
  },
)

app.listen(environment.port, () => {
  console.log('[app-name-api] - Server is running')
})
