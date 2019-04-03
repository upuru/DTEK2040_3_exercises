const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 3
  }
]


app.get('/', (req, res) => {
  res.send('<h1>Etuvisu on täsä</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  const newId = Math.floor(Math.random()*1000000 + 1)
  return newId
}

const doesExist = (name) => {
    names = persons.map(person=> person.name)
    if (names.includes(name)) {
        return false
    }
    else {
        return true
    }
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }
  if (!doesExist) {
    return response.status(400).json({error: 'name must be unique'})
  }
  if (body.number === "") {
      return response.status(400).json({error: 'number missing'})
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server runs now on port ${PORT}`)
})