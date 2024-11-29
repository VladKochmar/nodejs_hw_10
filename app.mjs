// Задача. У будь-якому з ваших проєктів:
// 1)Структрувати проєкт (винести окремі секції app.mjs у окремі розділи і модулі за зразком на лекції)
// 2)додати автентифікацію з використанням модуля  Password

import express from 'express'
import routes from './routes/index.mjs'
import connectDB from './db/connect.mjs'
import middleware from './middleware/index.mjs'
import errorHandler from './middleware/errorHandler.mjs'

const app = express()

connectDB()

middleware(app)

app.use('/', routes)

errorHandler(app)

export default app
