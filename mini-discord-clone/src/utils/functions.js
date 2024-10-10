const generateRandomId = (length = 8) => {
  return crypto.randomBytes(length).toString('hex')
}

export { generateRandomId }
