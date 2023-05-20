// Classes
// Classes and objects
// Here is an example of an object `dogOb`
let dogOb = {
    dogName: "Javascript",
    weight: 2.5,
    color: "brown",
    breed: "chihuahua"
};

// Classes in JS enscapsulate data and functions that are part of that class. If you create a class, you can later create objects using that class using the following syntax:
class ClassName {
    constructor(prop1, prop2) {
        this.prop1 = prop1;
        this.prop2 = prop2;
    }
}
let objClass = new ClassName("arg1", "arg2");

// This code defines a **class** with `ClassName` as a name, declares an `objClass` variable, and initializes this with a new instance of the object.
// Two **arguments** are provided. These arguments will be used by the *constructor* to initialize the properties. 
// As you can see, the **paremeters** are the *contructor* and *properties* of the class (`prop1` and `prop2`) have the same name.
// The `this` keyword refers to the object it belongs to, so it is the first property of the instance of `ClassName`.

// Classes are just special function beneath the surface. We could create the object with a special funcition like this:

function DogF(dogName, weight, color, breed) {
    this.dogName = dogName;
    this.weight = weight;
    this.color = color;
    this.breed = breed;
}
let dog1 = new DogF("Jacky", 30, "brown", "labrador");

// The dog example could have been made using a **class** syntax as well. It could have looked like this:
class DogClass {
    constructor(dogName, weight, color, breed) {
        this.dogName = dogName;
        this.weight = weight;
        this.color = color;
        this.breed = breed;
    }
}
let dog2 = new DogClass("JS", 2.5, "brown", "chihuahua");

console.log(dog2.dogName, "is a", dog2.breed, "and weighs", dog2.weight, "kg.");
// JS is a chihuahua and weighs 2.5 kg.

// Classes
// Constructors
// The `constructor` method is a special method that we use to initialize objects with our class blueprint. There can only be one constructor in a class. This constructor contains properties that will be set when initiating the class.

class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

// Beneath the surface, JavaScript creates a special function based on this constructor.
// This function gets the class name, and it will create an object with the given properties. With this special function, you can create instances (objects) of the class.

let p = new Person("Mike", "Doe");

// The `new` word is what tells JavaScript to look for the special constructor function in the `Person` class and create a new object. The constructor gets called and returns an instance of the person object with the specified properties. This object gets stored in the `p` variable.

console.log("Hi", p.firstName);
// Hi Mike

let p2 = new Person("John");
console.log("Hi", p2.firstName, p2.lastName);
// Hi John undefined

// You can specify default values in constructor. You would do it like this:
// constructor(firstName, lastName = "Doe") {
//     this.firstName = firstName;
//     this.lastName = lastName;
// }
// This way, it would not have printed `Hi John undefined`, but `Hi John Doe`.

// Practice exercise 1

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

// Methods
// In a class, we can specify functions. This means that out object can start doing things using the object's own properties - for example, printing name. Functions on a class are called methods. When defining these methods, we don't use the `function` keyword. We start directly with the name:
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

// You can specify as many methods on a class as you want. In this example, we are using the firstname property. We do so by saying this.property. 

// Just like functions, methods can also take parameters and return results.
// The `compliment` function does not output anything itself, so we are logging it:
let compliment = p3.compliment("Harry", "hat");
console.log(compliment);
// That's a wonderful hat, Harry

// In this case we are sending parameters into our method, because you don't usually compliment your own properties. However, whenever the method doesn't require external input but only the properties of the object, no parameters will work and the method can use its object's properties.

// Practice exercise 2
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

// Properties
// **Properties**, sometimes also called **fields**, hold the data of the class. 
// The `PersonP2` class gets two properties from the constructor: `firstName` and `lastName`. Properties can be added or removed just like we did for objects. These properties can be accessed from outside the class, as we logged them outside the class by accessing them on the instance.
// Often, it is not desirable to provide direct access to out properties. **We want our class to be in control of the values of properties** for several reasons - perhaps we want to do validation on a property to assure it has a certain value. We can achieve this by making direct access to the property from outside the class impossible.

// This is how to add properties that aren't accessible from outside. We prefix them with a # symbol:
class PersonProp {
    #firstname;
    #lastname;
    constructor(firstname, lastname) {
        this.#firstname = firstname;
        this.#lastname = lastname;
    }
}

// Right now, the firstname and lastname properties cannot be accessed from outside the class. This is done by adding `#` in front of the property. If we try it:
let pp1 = new PersonProp("Adam", "Doe");
console.log(pp1.firstName);
// undefined

// If we want to make sure we could only create objects with names starting with an "M", we could modify our constructor a bit:
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
// Now when you try to create a person that has a firstname value that doesn't start with an "M," it will add an M in front. So for example, the value of the following first name is Mkay:
let pp2 = new PersonProp2("kay", "Moon");
// At this point, we cannot access it from outside the class at all after the constructor. We can only access it from inside the class. This is where getters and setters come into play.

// Getters and setters
// Getters and setters are special properties that we can use to get data from a class and to set data fields on the class. 

// Getters and setters are computed properties. So, they are more like properties than they are like functions. We call them *accessors*. They do look a bit like functions, because they have `()` behind them, but they are not!

// These accessors start with the `get` and `set` keywords. It is considered good practice to make fields private as much as possible and provide access to them using getters and setters. This way, the properties cannot be set from outside without the object itself being in control. This principle is called **encapsulation**. The class encapsulates the data, and the object is in control of its own fields.

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

// The **getter** is used to **get the property**. Therefore, it **doesn't take any parameters, but simply returns the property**. 

// The **setter** is the other way around: it **takes a parameter, assigns this new value to the property, and returns nothing**. The setter can contain more logic, for example, some validation, as we'll see below.

// The **getter can be used outside the object as if it were a property**. The **properties are no longer directly accessible from outside the class**, but **can be accessed via the getter to get the value** and **via the setter to *update* the value**. Here is how to use it outside the class instance:

let pp3 = new PersonGS("Maria", "Sage");
console.log(pp3.firstName);
// Maria

// The output is showing the first name, which is only possible because we have a getter accessor. We can also set the value to something else, because there is a setter.

pp3.firstName = "Adnane";

