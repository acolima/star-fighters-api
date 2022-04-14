export function invalidUser(username: string) {
  return { type: "invalid_user", message: `${username} isn't a Github user` }
}