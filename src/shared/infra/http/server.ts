import 'reflect-metadata'
import Express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'
import routes from './routes/router'
import swaggerFile from '../../../swagger.json'
import { AppError } from '@errors/app-error'

const app = Express()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(Express.json())
app.use(routes)

app.use(
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

app.listen(3333, () => {
  console.log('[app-name-api] - Server is running')
})
