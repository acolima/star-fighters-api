import { connection } from "../database.js"

export async function getRanking(){
  const result = await connection.query(`
    SELECT * FROM fighters
    ORDER BY wins DESC, draws DESC
  `)

  return result.rows
}