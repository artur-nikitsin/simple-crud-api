const PersonService = require('./PersonService')
const utils = require('./utils')

const personController = (request, response, url) => {
    const repository = []
    const personService = new PersonService(repository)
    const personId = utils.splitPath(url.path, '/')[2]

    try {
        switch (request.method) {
            case 'GET':
                if (personId) {
                    personService.getById(personId, response)
                } else {
                    personService.getAll(response)
                }
                break
            case 'POST':
                request.on('data', (chunk) => {
                    personService.setPerson(JSON.parse(chunk), response)
                })
                break
            case 'PUT':
                request.on('data', (chunk) => {
                    personService.editPerson(
                        personId,
                        JSON.parse(chunk),
                        response
                    )
                })
                break
            case 'DELETE':
                personService.deletePerson(response, personId)
                break
            default: {
                response.writeHead(500, { 'Content-Type': 'application/json' })
                response.end(`Server error`)
            }
        }
    } catch (error) {
        response.writeHead(500, { 'Content-Type': 'application/json' })
        response.end(`Server error`)
    }
}

module.exports = personController
