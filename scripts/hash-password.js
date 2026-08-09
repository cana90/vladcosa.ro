import readline from 'node:readline'
import bcrypt from 'bcryptjs'

function promptVisible() {
  const interfaceInstance = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    interfaceInstance.question('Parolă: ', (password) => {
      interfaceInstance.close()
      resolve(password)
    })
  })
}

function promptHidden() {
  return new Promise((resolve, reject) => {
    let password = ''
    process.stdout.write('Parolă: ')
    process.stdin.setRawMode(true)
    process.stdin.setEncoding('utf8')
    process.stdin.resume()

    const cleanup = () => {
      process.stdin.setRawMode(false)
      process.stdin.pause()
      process.stdin.removeListener('data', handleInput)
    }

    const handleInput = (character) => {
      if (character === '\u0003') {
        cleanup()
        process.stdout.write('\n')
        reject(new Error('Operațiune anulată.'))
        return
      }

      if (character === '\r' || character === '\n') {
        cleanup()
        process.stdout.write('\n')
        resolve(password)
        return
      }

      if (character === '\u007f' || character === '\b') {
        if (password.length > 0) {
          password = password.slice(0, -1)
          process.stdout.write('\b \b')
        }
        return
      }

      password += character
      process.stdout.write('*')
    }

    process.stdin.on('data', handleInput)
  })
}

try {
  const password = process.stdin.isTTY
    ? await promptHidden()
    : await promptVisible()
  if (!password) {
    throw new Error('Parola nu poate fi goală.')
  }
  console.log(await bcrypt.hash(password, 12))
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
