import joi from "joi"
import {Request, Response, NextFunction} from "express"

const battleSchema = joi.object({
  firstUser: joi.string().required(),
  secondUser: joi.string().required()
})

export function validateSchema() {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = battleSchema.validate(req.body)
    if (validation.error) {
      return res.status(422).send(validation.error.message)
    }

    next()
  }
}