const express = require('express')
const cors = require('cors')
const api = require('./Employee-api');

const app = express()

// Enable CORS for all routes
app.use(cors())

// Parse incoming JSON data
app.use(express.json())

// app.use('/employee-api', api)

//Test endpoint
app.get('/employee-api', (req, res) => {
  res.json({ message: 'Employee Portal Backend is working!' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
