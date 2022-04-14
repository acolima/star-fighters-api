import * as rankingRepository from "../repositories/rankingRepository.js"

export async function getRanking(){
  const ranking = await rankingRepository.getRanking()
  return ranking
}