import jwt from 'jsonwebtoken'
import to from 'await-to-js'
import { User } from '../store/models'

const auth = async (req, res, next) => {
  const token = req.cookies['access-token']
  if (!token) {
    return res.status(403).send({
      error: 'Token must be provided',
    })
  }

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const [error, user] = await to(User.findById(payload.userId).lean())
    if (error)
      return res.status(500).clearCookie('access-token').send({ error })
    if (!user)
      return res.status(401).clearCookie('access-token').send({
        message: 'An account with that username does not exist',
        error: 'User does not exist',
      })

    req.user = user
    return next()
  } catch (e) {
    return res.status(401).send({ error: e })
  }
}

export default auth
