const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const cors = require('cors')
// const { errorHandler } = require('./middleware/errorMiddleware')
const app = express()

// DB Connectivity
const connectDB = require('./config/db')
connectDB()

app.use(cors())

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ErrorHandler  app.use(errorHandler)

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/', (req, res)=>{
	res.send('hello')
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on port ${port}`))