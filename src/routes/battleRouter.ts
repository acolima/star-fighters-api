import { Router } from "express"
import * as battleController from "../controllers/battleController.js"
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js"

const battleRouter = Router()

battleRouter.post("/battle", validateSchema(), battleController.battle)

export default battleRouter