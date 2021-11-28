const Person = require('./models/Person')

const repository = []
class PersonService {
    constructor({ endResponse }) {
        this.endResponse = endResponse
    }

    endResponse({ response, code, data, message }) {
        this.endResponse({ response, code, data, message })
    }

    validatePersonFields({ response, requestPerson }) {
        const keys = Object.keys(requestPerson)
        const requiredFields = ['name', 'age', 'hobbies']
        let errors = []
        requiredFields.forEach((key) => {
            if (!keys.includes(key)) {
                errors = [...errors, `Required field "${key}" not provided.`]
            }
        })
        if (errors.length > 0) {
            const message = errors.join('')
            this.endResponse({ response, code: 400, message })
            return false
        }
        return true
    }

    getById({ id, response }) {
        const currentPerson = repository.find((person) => person.id === id)
        if (currentPerson) {
            this.endResponse({
                response,
                code: 200,
                data: currentPerson,
            })
        } else {
            this.endResponse({
                response,
                code: 404,
                message: `Not found: ${id}`,
            })
        }
    }

    getAll({ response }) {
        this.endResponse({ response, code: 200, data: repository })
    }

    setPerson({ data, response }) {
        const isValidPerson = this.validatePersonFields({
            requestPerson: data,
            response,
        })
        if (isValidPerson) {
            const { name, age, hobbies } = data
            const newPerson = new Person({ name, age, hobbies })
            repository.push(newPerson)
            this.endResponse({ response, code: 201, data: newPerson })
        }
    }

    editPerson({ id, data, response }) {
        const { name, age, hobbies } = data
        const prevPerson = repository.find((person) => person.id === id)
        if (prevPerson) {
            const index = repository.indexOf(prevPerson)
            const updatedPerson = { ...prevPerson, name, age, hobbies }
            repository[index] = updatedPerson
            this.endResponse({
                response,
                code: 200,
                data: updatedPerson,
            })
        } else {
            this.endResponse({
                response,
                code: 404,
                message: `Person with id: ${id} not found`,
            })
        }
    }

    deletePerson({ response, id }) {
        const person = repository.find((person) => person.id === id)
        if (person) {
            const index = repository.indexOf(person)
            repository.splice(index, 1)

            this.endResponse({
                response,
                code: 204,
                message: `Person with id: ${id} successfully deleted`,
            })
        } else {
            this.endResponse({
                response,
                code: 404,
                message: `Person with id: ${id} not found`,
            })
        }
    }
}
module.exports = PersonService
