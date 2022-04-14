import * as fightersRepository from "../repositories/fightersRepository.js"
import axios from "axios"
import { invalidUser } from "../utils/errorUtils.js"

export async function battle({firstUser, secondUser}){
  let winner: string
  let loser: string
  let draw: boolean = false

  const reposFirstUser = await getRepos(firstUser)
  const reposSecondUser = await getRepos(secondUser)
  
  if(!reposFirstUser) throw invalidUser(firstUser)
  if(!reposSecondUser) throw invalidUser(secondUser)

  const firstFighter = await fightersRepository.findUser(firstUser)
  if(firstFighter === 0){
    await fightersRepository.insertUser(firstUser)
  }

  const secondFighter = await fightersRepository.findUser(secondUser)
  if(secondFighter === 0){
    await fightersRepository.insertUser(secondUser)
  }

  const starsFirstUser = await getStargazersCount(reposFirstUser)
  const starsSecondUser = await getStargazersCount(reposSecondUser)
    
  if(starsFirstUser === starsSecondUser){
    fightersRepository.updateResult(firstUser, 'draws')
    fightersRepository.updateResult(secondUser, 'draws')
    winner = null
    loser = null
    draw = true
  }
  else if(starsFirstUser > starsSecondUser){
    fightersRepository.updateResult(firstUser, 'wins')
    fightersRepository.updateResult(secondUser, 'losses')
    winner = firstUser
    loser = secondUser
  }
  else{
    fightersRepository.updateResult(firstUser, 'losses')
    fightersRepository.updateResult(secondUser, 'wins')
    winner = secondUser
    loser = firstUser
  }

  return {winner, loser, draw}
}

async function getRepos(username: string) {
  try{
    const {data: repos} = await axios(`https://api.github.com/users/${username}/repos`)
    return repos
  } catch (error){
    return undefined
  }
}

async function getStargazersCount(repos) {
  const stargazers: number = repos.reduce((sum: number, repo) => 
    sum + repo.stargazers_count, 0
  )
  return stargazers 
}