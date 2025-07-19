class Car {
    constructor(colour, type) {
        this.colour = colour
        this.type = type

        this.display = function(){
            console.log(this.colour+ " " +this.type);

        }
    }
}

var car1 = new Car('White', 'Tesla')
var car2 = new Car('Grey', 'BMW')
var car3 = new Car('Black', 'Mercedes')

car1.display()
car2.display()
car3.display()