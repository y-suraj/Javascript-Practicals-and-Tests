# Classes
### Classes and objects
Here is an example of an object `dogOb`
```js
let dogOb = {
    dogName: "Javascript",
    weight: 2.5,
    color: "brown",
    breed: "chihuahua"
};
```

Classes in JS enscapsulate data and functions that are part of that class. If you create a class, you can later create objects using that class using the following syntax:
```js
class ClassName {
    constructor(prop1, prop2) {
        this.prop1 = prop1;
        this.prop2 = prop2;
    }
}
let objClass = new ClassName("arg1", "arg2");
```
This code defines a **class** with `ClassName` as a name, declares an `objClass` variable, and initializes this with a new instance of the object.
Two **arguments** are provided. These arguments will be used by the *constructor* to initialize the properties. 
As you can see, the **paremeters** are the *contructor* and *properties* of the class (`prop1` and `prop2`) have the same name.
The `this` keyword refers to the object it belongs to, so it is the first property of the instance of `ClassName`.

Classes are just special function beneath the surface. We could create the object with a special function like this:
```js
function DogF(dogName, weight, color, breed) {
    this.dogName = dogName;
    this.weight = weight;
    this.color = color;
    this.breed = breed;
}
let dog1 = new DogF("Jacky", 30, "brown", "labrador");
```
The dog example could have been made using a **class** syntax as well. It could have looked like this:
```js
class DogClass {
    constructor(dogName, weight, color, breed) {
        this.dogName = dogName;
        this.weight = weight;
        this.color = color;
        this.breed = breed;
    }
}
let dog2 = new DogClass("JS", 2.5, "brown", "chihuahua");

console.log(dog2.dogName, "is a", dog2.breed, "and weighs",  dog2.weight, "kg.");
// JS is a chihuahua and weighs 2.5 kg.
```
## Classes
### Constructors
The `constructor` method is a special method that we use to initialize objects with our class blueprint. There can only be one constructor in a class. This constructor contains properties that will be set when initiating the class.
```js
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
```
Beneath the surface, JavaScript creates a special function based on this constructor.
This function gets the class name, and it will create an object with the given properties. With this special function, you can create instances (objects) of the class.
```js
let p = new Person("Mike", "Doe");
```
The `new` word is what tells JavaScript to look for the special constructor function in the `Person` class and create a new object. The constructor gets called and returns an instance of the person object with the specified properties. This object gets stored in the `p` variable.
```js
console.log("Hi", p.firstName);
// Hi Mike

let p2 = new Person("John");
console.log("Hi", p2.firstName, p2.lastName);
// Hi John undefined
```
You can specify default values in constructor. You would do it like this:
```js
constructor(firstName, lastName = "Doe") {
    this.firstName = firstName;
    this.lastName = lastName;
}
```
This way, it would not have printed `Hi John undefined`, but `Hi John Doe`.

#### Practice exercise 1
Take the following steps to create a person class, and print instances of friends' names:
```js
class PersonP {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
let pVar = new PersonP("Harry", "Potter");
let pVar2 = new PersonP("James", "Bond");

console.log("hello", pVar.firstName, pVar.lastName, "and", pVar2.firstName, pVar2.lastName);
// hello Harry Potter and James Bond
```

### Methods