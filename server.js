const http = require('http')
const url = require('url')
const personController = require('./src/personController')
const utils = require('./src/utils')

const hostname = 'localhost'
const port = +process.env.PORT || 3001

const server = http.createServer(function (request, response) {
    try {
        const parsedUrl = url.parse(request.url, true)
        const splitPath = utils.splitPath(parsedUrl.path, '/')
        const rootPath = splitPath[1]

        switch (rootPath) {
            case 'person':
                personController(request, response, parsedUrl)
                break
            default:
                response.writeHead(400, { 'Content-Type': 'application/json' })
                response.end(`Cannot found path: ${splitPath.pathname}`)
        }
    } catch (error) {
        response.writeHead(500, { 'Content-Type': 'application/json' })
        response.end(`Server error`)
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
