import { Request, Response } from "express"
import * as rankingService from "../services/rankingService.js"

export async function ranking(req: Request, res: Response){
  const result = await rankingService.getRanking()

  res.send({fighters: result})
}