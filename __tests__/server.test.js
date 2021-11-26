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
    const port = process.env.PORT || 3001
    const testPerson = { age: 26, name: 'Artur', hobbies: [] }
    let testPersonIdAfterCreation = ''

    it('Test GET method. Get all persons. On init equal []', (done) => {
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
                expect(JSON.parse(data)).toMatchObject([])
                done()
            })
        }).end()
    })

    it('Test POST method. Post new person and get it in response', (done) => {
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
                testPersonIdAfterCreation = id
                const withSubstitutedId = { ...testResponse, id: '123' }

                expect(withSubstitutedId).toMatchObject({
                    ...testPerson,
                    id: '123',
                })
                done()
            })
        })
        request.write(JSON.stringify(testPerson))
        request.end()
    })
    it('Test GET method. Get person by id', (done) => {
        const options = {
            host,
            port,
            path: `/person/${testPersonIdAfterCreation}`,
            method: 'GET',
        }
        const request = http.request(options, (response) => {
            let data = ''
            response.on('data', (chunk) => {
                data += chunk
            })

            response.on('end', () => {
                expect(JSON.parse(data)).toMatchObject({
                    ...testPerson,
                    id: testPersonIdAfterCreation,
                })
                done()
            })
        })
        request.write(JSON.stringify(testPerson))
        request.end()
    })

    it('Test PUT method. Update person by id', (done) => {
        const options = {
            host,
            port,
            path: `/person/${testPersonIdAfterCreation}`,
            method: 'PUT',
        }
        const request = http.request(options, (response) => {
            let data = ''
            response.on('data', (chunk) => {
                data += chunk
            })

            response.on('end', () => {
                expect(JSON.parse(data)).toMatchObject({
                    ...testPerson,
                    name: 'Changed name',
                    id: testPersonIdAfterCreation,
                })
                done()
            })
        })
        request.write(JSON.stringify({ ...testPerson, name: 'Changed name' }))
        request.end()
    })

    it('Test DELETE method. Delete person by id', (done) => {
        const options = {
            host,
            port,
            path: `/person/${testPersonIdAfterCreation}`,
            method: 'DELETE',
        }
        const request = http.request(options)

        request.on('response', (response) => {
            expect(response.statusCode).toEqual(204)
            done()
        })
        request.end()
    })

    it('Test GET method. Get person by id, who not exists', (done) => {
        const options = {
            host,
            port,
            path: `/person/${testPersonIdAfterCreation}`,
            method: 'GET',
        }
        const request = http.request(options, (response) => {
            let data = ''
            response.on('data', (chunk) => {
                data += chunk
            })

            response.on('end', () => {
                expect(data).toEqual(`Not found: ${testPersonIdAfterCreation}`)
            })
        })

        request.on('response', (response) => {
            expect(response.statusCode).toEqual(404)
            done()
        })
        request.end()
    })
})
