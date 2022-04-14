import { connection } from "../database.js"

export async function findUser(user: string){
  const result = await connection.query(`
    SELECT id FROM fighters
    WHERE username=$1
  `, [user])

  return result.rowCount
}

export function insertUser(user: string){
  return connection.query(`
    INSERT INTO fighters (username, wins, losses, draws)
    VALUES ($1, 0, 0, 0)
  `, [user])
}

export function updateResult(user: string, result: string ){
  const queryString = `UPDATE fighters SET ${result}=${result}+1 WHERE username=$1`
  return connection.query(queryString, [user])
}