require('dotenv').config()
const express = require('express')
const { reset } = require('nodemon')
const app = express()
const port = process.env.PORT || 3000

// We are adding middleware so that body is parsed into json in Post
app.use(express.json())

const courses = [
  { id: 1, name: 'course 1' },
  { id: 2, name: 'course 2' },
  { id: 3, name: 'course 3' }
]

// Get request
app.get('/', (req, res) => {
  res.send('Hello World')
})

// Get all courses
app.get('/api/courses', (req, res) => {
  res.send(courses)
})

// Post a single course
app.post('/api/courses', (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    // 400 Bad Request
    return res.status(400).send('Name is required and should be minimum 3 characters.')
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course)
  res.send(course)
})

// Update a single course
app.put('/api/courses/:id', (req, res) => {
  // Look up the course
  // If not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if (!course) return res.status(404).send('The course was not found')

  // Validate
  // If invalid, return 400 - Bad request
  if (!req.body.name || req.body.name.length < 3) {
    // 400 Bad Request
    return res.status(400).send('Name is required and should be minimum 3 characters.')
  }

  // Update course
  course.name = req.body.name
  // Return the updated course
  res.send(course)
})

// Get a single course
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if (!course) return res.status(404).send('The course was not found')

  res.send(course)
})

// Delete single course
app.delete('/api/courses/:id', (req, res) => {
  // Look up the course
  // Not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if (!course) return res.status(404).send('The course was not found')

  // Delete
  const index = courses.indexOf(course)
  courses.splice(index, 1)

  // Return the same course
  res.send(course)
})

// To get just the ID - '/api/courses/:id'
// app.get('/api/posts/:year/:month', (req, res) => {
  // to read the page id from the url
  // res.send(req.params.id)
  // to read the url parameters
  // res.send(req.params)
  // to read a query ?some=something
  // req.send(req.query)
// })

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))