const Person = require('./models/Person')

const repository = []
class PersonService {
    endSuccsessResponse(response, data) {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.write(JSON.stringify(data, null, 2))
        response.end()
    }

    endNotFoundResponse(response, id) {
        response.writeHead(400, { 'Content-Type': 'application/json' })
        response.write(`Not found: ${id}`)
        response.end()
    }

    getById(id, response) {
        const result = repository.find((person) => person.id === id)
        if (result) {
            this.endSuccsessResponse(response, result)
        } else {
            this.endNotFoundResponse(response, id)
        }
    }

    getAll(response) {
        this.endSuccsessResponse(response, repository)
    }

    setPerson(data, response) {
        const { name, age, hobbies } = data
        const person = new Person(name, age, hobbies)
        repository.push(person)
        this.endSuccsessResponse(response, person)
    }

    editPerson(id, data, response) {
        const { name, age, hobbies } = data
        const prevPerson = repository.find((person) => person.id === id)
        if (prevPerson) {
            const index = repository.indexOf(prevPerson)
            const updatedPerson = { ...prevPerson, name, age, hobbies }
            repository[index] = updatedPerson
            this.endSuccsessResponse(response, updatedPerson)
        } else {
            this.endNotFoundResponse(response, id)
        }
    }

    deletePerson(response, id) {
        const person = repository.find((person) => person.id === id)
        if (person) {
            const index = repository.indexOf(person)
            repository.splice(index, 1)
            this.endSuccsessResponse(
                response,
                `Person with id: ${id} successfully deleted`
            )
        } else {
            this.endNotFoundResponse(response, id)
        }
    }
}
module.exports = PersonService
