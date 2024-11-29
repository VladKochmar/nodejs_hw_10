import { Router } from 'express'

const router = new Router()

router.get('/', (req, res) => {
  const user = req.user || null
  res.render('index.ejs', { user })
})

router.get('/about', (req, res) => {
  const user = req.user || null
  res.render('about.ejs', { user })
})

export default router
