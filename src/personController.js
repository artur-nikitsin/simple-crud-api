const PersonService = require('./PersonService')
const utils = require('./utils')

const personController = (request, response, url) => {
    const { endResponse } = utils
    const personService = new PersonService({
        endResponse,
    })
    const personId = utils.splitPath(url.path, '/')[2]

    const checkIsUUID = () => {
        const isUUID = utils.validateUUID(personId)
        if (!isUUID) {
            endResponse({
                response,
                code: 400,
                message: `Provided id: ${personId} is not uuid`,
            })
        }
        return isUUID
    }

    try {
        switch (request.method) {
            case 'GET':
                if (personId) {
                    if (checkIsUUID()) {
                        personService.getById({ id: personId, response })
                    }
                } else {
                    personService.getAll({ response })
                }
                break
            case 'POST':
                request.on('data', (chunk) => {
                    personService.setPerson({
                        data: JSON.parse(chunk),
                        response,
                    })
                })
                break
            case 'PUT':
                if (checkIsUUID()) {
                    request.on('data', (chunk) => {
                        personService.editPerson({
                            id: personId,
                            data: JSON.parse(chunk),
                            response,
                        })
                    })
                }
                break
            case 'DELETE':
                if (checkIsUUID()) {
                    personService.deletePerson({ response, id: personId })
                }
                break
            default: {
                endResponse({
                    response,
                    code: 400,
                    message: `Bad request`,
                })
            }
        }
    } catch (error) {
        endResponse({
            response,
            code: 500,
            message: `Server error: ${error}`,
        })
    }
}

module.exports = personController
