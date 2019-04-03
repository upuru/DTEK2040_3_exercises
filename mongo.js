const mongoose = require('mongoose')

const url = "mongodb+srv://kokopakka:tietokanta@Cluster0-suogd.mongodb.net/kokopakka-persons"

mongoose.connect(url, {useNewUrlParser: true})

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

/**If we've been blessed with command parameters, 
let's use them to create a new contact in our phonebook*/
if (process.argv.length>2) {
    if (process.argv[2] === undefined || process.argv[3] === undefined) {
        console.log('Please type in name AND phone number')
        mongoose.connection.close()
        process.exit(1)
    }
    else {
        const person = new Person({
            name: process.argv[2],
            number: process.argv[3]
        })
        person
        .save()
        .then(result => {
        console.log("Added person " + person.name + 
        " number " + person.number 
        + " to the directory.")
        mongoose.connection.close()
        })
    }
}

/**If no command parameters, 
let's just print out the current phonebook*/
else {
console.log('Puhelinluettelo:')
Person
.find({})
.then(result => {
    result.forEach(person => {
        console.log(person.name + " " + person.number)
    })
    mongoose.connection.close()
})
}