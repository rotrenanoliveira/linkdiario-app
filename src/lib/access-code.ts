export function genAccessCode() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  let code = ''

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length)
    if (i % 4 === 0 && i !== 0) {
      code = code.concat('-')
    }
    code = code.concat(alphabet[randomIndex])
  }

  return code
}
