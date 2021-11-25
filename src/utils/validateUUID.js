const { validate } = require('uuid')

const validateUUID = (uuid) => {
    return validate(uuid)
}

module.exports = validateUUID
