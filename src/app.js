import express from 'express'
import 'dotenv/config'
import cors from 'cors'

import { userRouters } from './routes/user.routes.js'
import { postRouters } from './routes/post.routes.js'
import { profileRouters } from './routes/profile.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use(userRouters)
app.use(postRouters)
app.use(profileRouters)

export default app
