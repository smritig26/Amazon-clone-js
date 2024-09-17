class Car{
    #brand;
    #model;
    speed = 0;
    isTrunkOpen;
    constructor(details){
        this.#brand = details.brand;
        this.#model = details.model;
        this.isTrunkOpen = false;
    }

    displayInfo(){
        console.log(this.#brand);
        console.log(this.#model);
        console.log(`speed : ${this.speed}`);
        console.log(this.isTrunkOpen);
    }

    go(){
        if(open)
        this.speed = this.speed + 5;

    }

    brake(){
        this.brake = this.brake - 5;
    }

    openTrunk(){
        if(this.speed === 0){
            this.isTrunkOpen = false;
        }
    }

    closeTrunk(){
        this.isTrunkOpen = false;
    }
}

class RaceCar extends Car{
    
    acceleration;
    constructor(details){
        super(details);
        this.acceleration = details.acceleration;
    }

    go(){
        this.speed += this.acceleration;
    }

}

const obj1 = new Car(
    {brand  :  'Toyota',
    model  : 'Corolla'}
);

const obj2 = new Car(
    {brand  :  'Tesla',
    model  :  'Model 3'}
);

const obj3 = new RaceCar(
    {
        brand : 'McLaren',
        model : 'F1',
        acceleration : 20
    }
);
console.log(obj3);

console.log(obj1);
console.log(obj2);
obj1.go();
obj1.go();
obj1.brake();
obj1.openTrunk();
obj1.displayInfo();
obj2.displayInfo();
