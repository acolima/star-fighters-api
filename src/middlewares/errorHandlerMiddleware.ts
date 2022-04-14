import { Request, Response, NextFunction } from "express";

export default function errorHandlerMiddleware(
  error, req: Request, res: Response, next: NextFunction
) {
  if (error.type === "invalid_user") {
    return res.status(404).send(error.message)
  }
  console.log(error)
  return res.sendStatus(500)
}