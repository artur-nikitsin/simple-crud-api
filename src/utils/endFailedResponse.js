const endFailedResponse = ({ response, code, message }) => {
    response.writeHead(code, { 'Content-Type': 'application/json' })
    response.write(message)
    response.end()
}
module.exports = endFailedResponse
