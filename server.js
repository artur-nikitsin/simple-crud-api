const http = require('http')
const url = require('url')
const personController = require('./src/personController')
const utils = require('./src/utils')
require('dotenv').config()

const hostname = 'localhost'
const port = process.env.PORT || 3000
const { endResponse } = utils

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
                endResponse({
                    response,
                    code: 400,
                    message: `Cannot found path: ${parsedUrl.pathname}`,
                })
        }
    } catch (error) {
        endResponse({
            response,
            code: 500,
            message: `Server error: ${error}`,
        })
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
