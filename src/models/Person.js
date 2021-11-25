const { v4: uuidv4 } = require('uuid')

class Person {
    constructor(name, age, hobbies) {
        this.id = uuidv4()
        this.name = name
        this.age = age
        this.hobbies = hobbies
    }
}

module.exports = Person
