class Student {
    constructor(name, hobby) {
        this.name = name
        this.hobby = hobby

        this.display = function () {
            console.log(`I am ${this.name}. I like ${this.hobby}.`)
        }
    }
}

var student1 = new Student('Ander', 'reading')
var student2 = new Student('Bella', 'cooking')
var student3 = new Student('Caka', 'gaming')
var student4 = new Student('Davina', 'coding')
var student5 = new Student('Ivan', 'basketball')


student1.display()
student2.display()
student3.display()
student4.display()
student5.display()