import { Router } from "express"
import * as rankingController from "../controllers/rankingController.js"

const rankingRouter = Router()

rankingRouter.get("/ranking", rankingController.ranking)

export default rankingRouter