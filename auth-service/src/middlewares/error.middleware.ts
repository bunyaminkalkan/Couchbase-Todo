import { Request, Response, NextFunction } from 'express'
import { errorFilter } from '../helpers/error.helper'


export const globalErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // It returns safe (instance of BaseError) error
  const filteredError = errorFilter(err)
  console.log(filteredError)
  console.log(filteredError)
  console.log(filteredError)
  console.log(filteredError)

  res.status(filteredError.status).json({
    success: false,
    code: filteredError.code,
    message: filteredError.message,
    date: filteredError.date,
  })
}