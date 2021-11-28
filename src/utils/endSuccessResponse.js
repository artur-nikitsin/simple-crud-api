const endResponse = ({ response, code, data, message }) => {
    response.writeHead(code, { 'Content-Type': 'application/json' })
    response.write(message || JSON.stringify(data, null, 2))
    response.end()
}

module.exports = endResponse
