var Person = {
    name: 'John',
    age: 15,
    gender: 'Male',
    interest: 'Coding',

    greeting: function () {
        console.log('hi I am ' + Person['name'])
    }
}

console.log(Person.name)
console.log(Person['age'])
Person.greeting()