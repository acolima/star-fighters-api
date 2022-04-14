import { Request, Response } from "express"
import * as battleService from "../services/battleService.js"

export async function battle(req: Request, res: Response) {
  const {firstUser, secondUser} = req.body
  
  const result = await battleService.battle({firstUser, secondUser})

  const {winner, loser, draw} = result
  const battleResult = {
    winner,
    loser,
    draw
  }

  res.send(battleResult)
}