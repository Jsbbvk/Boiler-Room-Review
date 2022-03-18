import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  const token = req.cookies['access-token']
  if (!token) {
    return res.status(403).send({
      error: 'Token must be provided',
    })
  }

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    console.log(payload)
    req.userId = payload.userId
    next()
  } catch (e) {
    return res.status(401).send({ error: e })
  }
}

export default auth
