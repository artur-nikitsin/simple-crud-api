const { spawn } = require('child_process')
const http = require('http')

describe('Test server requests scenarios', () => {
    const testServer = spawn('node', ['server.js'])

    beforeAll((done) => {
        testServer.stdout.on('data', () => {
            done()
        })
    })
    afterAll((done) => {
        testServer.kill()
        done()
    })

    const host = 'localhost'
    const port = 3001
    const testPerson = { age: 26, name: 'Artur', hobbies: [] }
    let testPersonIdafterCreation = ''

    it('Get all persons. On init equal []', (done) => {
        const options = {
            host,
            port,
            path: '/person',
            method: 'GET',
        }
        http.request(options, (response) => {
            let data = ''
            response.on('data', (chunk) => {
                data += chunk
            })

            response.on('end', () => {
                expect(JSON.parse(data)).toEqual([])
                done()
            })
        }).end()
    })

    it('Post new person and get it in response', (done) => {
        const options = {
            host,
            port,
            path: '/person',
            method: 'POST',
        }
        const request = http.request(options, (response) => {
            let data = ''
            response.on('data', (chunk) => {
                data += chunk
            })

            response.on('end', () => {
                const testResponse = JSON.parse(data)
                const { id } = testResponse
                testPersonIdafterCreation = id
                const withSubstitutedId = { ...testResponse, id: '123' }

                expect(withSubstitutedId).toEqual({ ...testPerson, id: '123' })
                done()
            })
        })
        request.write(JSON.stringify(testPerson))
        request.end()
    })
    it('Get person by id', (done) => {
        const options = {
            host,
            port,
            path: `/person/${testPersonIdafterCreation}`,
            method: 'GET',
        }
        const request = http.request(options, (response) => {
            let data = ''
            response.on('data', (chunk) => {
                data += chunk
            })

            response.on('end', () => {
                expect(JSON.parse(data)).toEqual({
                    ...testPerson,
                    id: testPersonIdafterCreation,
                })
                done()
            })
        })
        request.write(JSON.stringify(testPerson))
        request.end()
    })
})
