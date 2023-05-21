# Classes
## Object-oriented programming
Object-oriented programming (OOP) is a very important programming paradigm wherein code is structured in objects, leading to more maintainable and reusable code. Working with OP teaches you to really try to think of all sorts of topics in objects, by bundling properties in such a way that they can be wrapped in a *blueprint* called a class. This in turn might be inheriting properties from a parent class.

## Classes and objects
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
In a class, we can specify functions. This means that out object can start doing things using the object's own properties - for example, printing name. Functions on a class are called methods. When defining these methods, we don't use the `function` keyword. We start directly with the name:
```js
class PersonM {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    greet() {
        console.log("Hi there! I'm", this.firstName);
    }

    compliment(name, object) {
        return "That's a wonderful " + object + ", " + name;
    }
}
let p3 = new PersonM("John", "DOE");
p3.greet();
// Hi there! I'm John
```
You can specify as many methods on a class as you want. In this example, we are using the firstname property. We do so by saying this.property. 

Just like functions, methods can also take parameters and return results.

The `compliment` function does not output anything itself, so we are logging it:
```js
let compliment = p3.compliment("Harry", "hat");
console.log(compliment);
// That's a wonderful hat, Harry
```
In this case we are sending parameters into our method, because you don't usually compliment your own properties. However, whenever the method doesn't require external input but only the properties of the object, no parameters will work and the method can use its object's properties.

#### Practice exercise 2
```js
class PersonP2 {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    fullname() {
        return this.firstName + " " + this.lastName;
    }
}
let person1 = new PersonP2("Harry", "Potter");
let person2 = new PersonP2("John", "Doe");

console.log(person1.fullname()); // Harry Potter
console.log(person2.fullname()); // John Doe
```

### Properties
**Properties**, sometimes also called **fields**, hold the data of the class.

The `PersonP2` class gets two properties from the constructor: `firstName` and `lastName`. Properties can be added or removed just like we did for objects. These properties can be accessed from outside the class, as we logged them outside the class by accessing them on the instance.

Often, it is not desirable to provide direct access to out properties. **We want our class to be in control of the values of properties** for several reasons - perhaps we want to do validation on a property to assure it has a certain value. We can achieve this by making direct access to the property from outside the class impossible.

This is how to add properties that aren't accessible from outside. We prefix them with a # symbol:
```js
class PersonProp {
    #firstname;
    #lastname;
    constructor(firstname, lastname) {
        this.#firstname = firstname;
        this.#lastname = lastname;
    }
}
```
Right now, the firstname and lastname properties cannot be accessed from outside the class. This is done by adding `#` in front of the property. If we try it:
```js
let pp1 = new PersonProp("Adam", "Doe");
console.log(pp1.firstName);
// undefined
```

If we want to make sure we could only create objects with names starting with an "M", we could modify our constructor a bit:
```js
class PersonProp2 {
    #firstname;
    #lastname;
    constructor(firstname, lastname) {
        if (firstname.startsWith("M")) {
            this.#firstname = firstname;
        } else {
            this.#firstname = "M" + firstname;
        }
        this.#lastname = lastname;
    }
}
```

Now when you try to create a person that has a firstname value that doesn't start with an "M," it will add an M in front. So for example, the value of the following first name is Mkay:
```js
let pp2 = new PersonProp2("kay", "Moon");
```

At this point, we cannot access it from outside the class at all after the constructor. We can only access it from inside the class. This is where getters and setters come into play.

#### Getters and setters
- Getters and setters are special properties that we can use to get data from a class and to set data fields on the class. 

- Getters and setters are computed properties. So, they are more like properties than they are like functions. We call them *accessors*. They do look a bit like functions, because they have `()` behind them, but they are not!

- These accessors start with the `get` and `set` keywords. It is considered good practice to make fields private as much as possible and provide access to them using getters and setters. This way, the properties cannot be set from outside without the object itself being in control. This principle is called **encapsulation**. The class encapsulates the data, and the object is in control of its own fields.
```js
class PersonGS {
    #firstName;
    #lastName;
    constructor(firstName, lastName) {
        this.#firstName = firstName;
        this.#lastName = lastName;
    }

    get firstName() {
        return this.#firstName;
    }

    set firstName(firstName) {
        this.#firstName = firstName;
    }

    get lastName() {
        return this.#lastName;
    }

    set lastName(lastName) {
        this.#lastName = lastName;
    }
}
```
- The **getter** is used to **get the property**. Therefore, it **doesn't take any parameters, but simply returns the property**. 

- The **setter** is the other way around: it **takes a parameter, assigns this new value to the property, and returns nothing**. The setter can contain more logic, for example, some validation, as we'll see below.

- The **getter can be used outside the object as if it were a property**. The **properties are no longer directly accessible from outside the class**, but **can be accessed via the getter to get the value** and **via the setter to *update* the value**. Here is how to use it outside the class instance:
```js
let pp3 = new PersonGS("Maria", "Sage");
console.log(pp3.firstName);
// Maria
```

The output is showing the first name, which is only possible because we have a getter accessor. We can also set the value to something else, because there is a setter.
```js
pp3.firstName = "Adnane";
```

We could do a validation as in the constructor before, like this:
```js
set firstName(firstName) {
    if (firstName.startsWith("M")) {
        this.#firstName = firstName;
    } else {
        this.#firstName = "M" + firstName;
    }
}
```

This will check whether `firstName` starts with an `M`, and if it does it will update the value to whatever the `firstName` parameter is. It it doesn't, it will concatenate an `M` in front of the parameter.

> Please note that we do not access `firstName` as if it was a function. If you put two parentheses `()` after it, you would actually get an error telling you that it is not a function.

### Inheritance
Inheritance is one of the key concepts of OOP. It is the concept that classes can have child classes that inherit the properties and methods from the parent class. 
```js
class Vehicle {
    constructor(color, currentSpeed, maxSpeed) {
        this.color = color;
        this.currentSpeed = currentSpeed;
        this.maxSpeed = maxSpeed;
    }

    move() {
        console.log("moving at", this.currentSpeed);
    }

    accelerate(amount) {
        this.currentSpeed += amount;
    }
}
```

Here we have two methods in our `Vehicle` class: move and `accelerate`. And this could be a `Motorcycle` class inheriting from this class using the `extends` keyword:
```js
class Motorcycle extends Vehicle {
    constructor(color, currentSpeed, maxSpeed, fuel) {
        super(color, currentSpeed, maxSpeed);
        this.fuel = fuel;
    }
    doWheelie() {
        console.log("Driving on one wheel!");
    }
}
```

With the `extends` keyword we specify that a certain class is the child of another class. In this case, `Motorcycle` is a child class of `Vehicle`. This means that we'll have access to properties and methods from `Vehicle` in our `Motorcycle` class. We have added a special `doWheelie()` method. This is not something that makes sense to add to the `Vehicle` class, because this is an action that is specific to certain vehicles.

The `super` word in the constructor is calling the constructor from the parent, the `Vehicle` constructor in this case. This makes sure that the fields from the parent are set as well and that the methods are available without having to do anything else: they are automatically inherited. **Calling `super()` is not optional, you must do it when you are in a class that is inheriting from another class, else you will get a `ReferenceError`**.

Because we have access to the fields of `Vehicle` in `Motorcycle`, this will work:
```js
let motor = new Motorcycle("Black", 0, 250, "gasoline");
console.log(motor.color);
// Black
motor.accelerate(50);
motor.move(); // moving at 50
```
We cannot access any Motorcycle specific properties or methods in our Vehicle class. This is because not all vehicles are motorcycles, so we cannot be sure that we would have the properties or methods from a child.

Right now, we don't use any getters and setters here, but we clearly could. If there are getters and setters in the parent class, they are inherited by the child class as well. This way we could influence which properties could be fetched and changed (and how) outside our class. This is generally a good practice.

## Prototypes
A prototype is the mechanism in JavaScript that makes it possible to have objects.

When nothing is specified when creating a class, the objects inherit from the `Object.prototype` prototype. 

There is a `prototype` property available on all classes, and it is always named "prototype." We can access it like this:
```
ClassName.prototype
```
```js
class PersonProto {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }

    greet() {
        console.log("Hi there!");
    }
}
```

And here is how to add a function to this class using `prototype`:
```js
PersonProto.prototype.introduce = function () {
    console.log("Hi, I'm", this.firstname);
}
```

`prototype` is a property holding all the properties and methods of an object. So, adding a function to `prototype` is adding a function to the class. You can use `prototype` to add properties or methods to an object, like we did in the above example in our code with the `introduce` function. You can also do this for properties:
```js
PersonProto.prototype.favoriteColor = "green";
```
And then you can call them from instances of `Person`:
```js
let pProp = new PersonProto("Mike", "Sage");
console.log(pProp.favoriteColor); // green
pProp.introduce(); // Hi, I'm Mike
```

And it will be as if you had defined the class with a favorite color holding a **default** value, and a function, `introduce`. They have been added to the class and are available for all instances and future instances.

So the methods and properties defined via `prototype` are really as if they were defined in the class. This means that overwriting them for a certain instance doesn't overwrite them for all instances. For example, if we were to have a second Person object, this person could overwrite the `favoriteColor` value and this wouldn't change the value for our object with `firstname` as `Mike`.

This is something you should not be using when you have control over the class code and you want to change it permanently. In that case, just change the class.

However, you can expand existing objects like this and even expand existing objects conditionally. It is also important to know that the JavaScript built-in objects have prototypes and inherit from `Object.prototype`. However, be sure not to modify this prototype since it will affect how our JavaScript works.

### Practice exercise 3
Create a class that contains properties for different animal species and the sound that each species makes, and create two (or more) animals:
```js
class Animal {
    constructor(species, noOfLegs, sound) {
        this.species = species;
        this.noOfLegs = noOfLegs;
        this.sound = sound;
    }

    printSpecies() {
        console.log("Species:", this.species);
    }
    speak() {
        console.log("Sound:", this.sound);
    }
}

Animal.prototype.eat = function () {
    return this.species + " is eating";
}

let cat = new Animal("Cat", 4, "meow");
let duck = new Animal("Duck", 2, "quack");
cat.speak(); // Sound: meow
console.log(duck.eat()); // Duck is eating
console.log(duck);
// Object { species: "Duck", noOfLegs: 2, sound: "quack" }
```

## Chapter projects
### Employee tracking app
```js
// Create a class to track the employees of a company:
// 1. Use first names, last names, and the number of years worked as values in the constructor.
class Employee {
    constructor(firstname, lastname, noOfYears) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.noOfYears = noOfYears;
    }
}

// 2. Create two or more people with values for their first names, last names, and the number of years they've worked at the company. Add the people into an array.
const emp1 = new Employee("John", "Doe", 3);
const emp2 = new Employee("Neo", "Anderson", 5);
const empArr = [emp1, emp2];

// 3. Set up a prototype to return the details of the person's first and last names and how long they've worked at the company.
Employee.prototype.empDetails = function () {
    return this.firstname + " " + this.lastname + " is working here for " + this.noOfYears + " years.";
}

// 4. Iterate the contents of the array to output the results into the console, adding some text to make the output a full sentence.
empArr.forEach((emp) => {
    console.log(emp.empDetails());
});
// John Doe is working here for 3 years.
// Neo Anderson is working here for 5 years.
```

### Menu items price calculator
Create a class which will allow you to work out the combined price of a number of items, and interact with it to work out the total cost of different orders.
```js
// 1. Create a class that contains the prices of two menu items as private field declarations.
class Menu {
    #priceItem1 = 10;
    #priceItem2 = 20;

    // 2. Use the constructor in the class to get the argument values (how many of each item are being bought).
    constructor(noOfItems1, noOfItems2) {
        this.noOfItems1 = noOfItems1;
        this.noOfItems2 = noOfItems2;
    }

    // 3. Create a method to calculate and return the total cost depending on how many of each item the user selects.
    calTotal() {
        return (this.#priceItem1 * this.noOfItems1) + (this.#priceItem2 * this.noOfItems2);
    }

    // 4. Use a getter property to grab the value output by the calculation method.
    get total() {
        return this.calTotal();
    }
}

// 5. Create two or three objects with different combinations of menu selections, and output the total cost in the console.
const menu1 = new Menu(5, 2);
const menu2 = new Menu(10, 12);
console.log(menu1.total); // 90
console.log(menu2.total); // 340
```