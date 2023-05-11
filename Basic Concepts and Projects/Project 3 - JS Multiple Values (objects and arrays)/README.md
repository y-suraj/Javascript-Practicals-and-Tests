# JS Arrays
## Arrays and their properties
### Creating arrays
```js
let arr = ["hello", 6, true];
console.log(typeof arr[0]); // string
console.log(typeof arr[1]); //number
console.log(typeof arr[2]); // boolean
```
Constant array
```js
const arr1 = ["hi there"];
arr1[0] = "new value";
console.log(arr1[0]); // new value

// arr1 = ["overwriting"]; 
// Uncaught TypeError: invalid assignment to const 'arr1'
```
> You can change the *values* of a constant array, but you cannot change the array itself.

### Overwriting elements
```js
let cars = ['Tesla', 'Jaguar', 'Urus'];
cars[0] = 'Maserati';
console.log(cars); 
// [ "Maserati", "Jaguar", "Urus" ]

cars[-1] = "Ford"; // negative index not recommended
console.log(cars[-1]);
```
### Built-in length property
```js
colors = ["red", "blue", "green"];
booleans = [true, false, false, true];
emptyArray = [];

console.log("Length of colors: ", colors.length);
console.log("Length of booleans: ", booleans.length);
console.log("Length of empty array: ", emptyArray.length);
```
Output:
```
Length of colors:  3
Length of booleans:  4
Length of empty array:  0
```
```js
numbers = [12, 24, 36];
numbers[5] = 48;
console.log(numbers.length); // 6
console.log("numbers", numbers); 
// numbers [ 12, 24, 36, <2 empty slots>, 48 ]
```
Because we added an element, `48`, at index 5, it also created 2 elements at index positions 3 and 4 containing empty values.


## Array methods
### Adding and replacing elements
#### `push()` method
```js
favoriteFruits = ["grapes", "orange", "lemon"];
favoriteFruits.push("tangerine");
```
The value gets added to the end of the array. The push method returns the new length of the array, four in this case. You can store this length in a variable like this:

```js
let lengthOfFavoriteFruits = favoriteFruits.push("lime"); // 5
```
The value `5` gets stored in the `lengthOfFavoriteFruits` variable. 

```js
console.log(favoriteFruits);
// [ "grapes", "orange", "lemon", "tangerine", "lime" ]
```

#### `splice()` method
```js
let arrOfShapes = ["circle", "triangle", "rectangle", "pentagon"];
// arrOfShapes.splice(2, 0, "square", "trapezoid");
console.log(arrOfShapes);
// [ "circle", "triangle", "squate", "trapezoid", "rectangle", "pentagon" ]
```
As you can see, the square and trapezoid get inserted on index 2. The rest of the array is shifting to the right. The `splice()` method takes multiple parameters. The first parameter, 2 in our case, is the index of the array on which we want to start inserting. The second parameter, 0 in our case, is the number of elements we want to delete starting at our previously defined starting index. The parameters after these first two, square and trapezoid in our case, are whatever should be inserted starting at the start index.

So, had we said this instead:
```js
arrOfShapes.splice(2, 2, "square", "trapezoid");
console.log(arrOfShapes);
// [ "circle", "triangle", "square", "trapezoid" ]
```

If you were to increase the second parameter to a number higher than our array, it would not affect the result as JavaScript would simply stop as soon as it runs out of values to delete. Try the following code:
```js
arrOfShapes.splice(2, 12, "square", "trapezoid");
console.log(arrOfShapes);
// [ 'circle', 'triangle', 'square', 'trapezoid' ]
```

#### `concat()` method
```js
let arr2 = [1, 2, 3];
let arr3 = [4, 5, 6];
let arr4 = arr2.concat(arr3);
console.log(arr4); 
// [ 1, 2, 3, 4, 5, 6 ]

let arr5 = arr4.concat(7, 8, 9);
console.log(arr5); 
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

### Deleting elements
#### `pop()` method
```js
arr5.pop(); // remove the last element
// [ 1, 2, 3, 4, 5, 6, 7, 8 ]
```
#### `shift()` method
```js
arr5.shift(); 
// remove the *first* element. This causes all other indices to be reduced by one
// [ 2, 3, 4, 5, 6, 7, 8 ]
```

```js
arr5.splice(1, 3); 
// removes 3 elements starting from index value 1 (second position)
// [ 2, 6, 7, 8 ]
```

If you do not wish to change any of the later indices, you can also use the operator `delete`. This is not a method, but you can use it to change the value of a certain position of the array to `undefined`:

```js
delete arr5[0];
console.log(arr5);
// [ <1 empty slot>, 6, 7, 8 ]
```

### Finding elements
`find()` will be executed on every element in the array until it finds a match, and if it does not, then it will return `undefined`
```js
arr5 = [2, 6, 7, 8];
let findValue = arr5.find(function (e) { return e === 6 });
let findValue2 = arr5.find(e => e === 10);
console.log(findValue, findValue2); // 6 undefined
```

To find the index of the element use `indexOf()` method. This method returns the index on which the value is found. If a value occurs in an array more than once, it will return the first occurrence. If the value is not found, it will return `-1`.
```js
let findIndex = arr5.indexOf(6);
let findIndex2 = arr5.indexOf(10);
console.log(findIndex,findIndex2); // 1 -1
```

If you want to find the next occurrence of the specified number, you can add a second argument to `indexOf()`, specifying from which position it should start searching:
```js
let findIndex3 = arr5.indexOf(6, 2);
```
`findIndex3` will be `-1`, because `6` cannot be found starting from index `2`.

`lastIndexOf()` method can be used to find the *last* occurance (index) of an element.
```js
let animals = ["dog", "horse", "cat", "platypus", "dog"];
let lastDog = animals.lastIndexOf("dog"); // 4
```

### Sorting
`sort()` to sort an array for numbers from small to high and strings A-Z.
```js
let names = ["James", "John", "Alicia", "Bert"];
names.sort();
console.log(names); // [ "Alicia", "Bert", "James", "John" ]
let ages = [18, 72, 33, 56, 40];
ages.sort();
console.log(ages); // [ 18, 33, 40, 56, 72 ]
```

### Reversing
Reverse the elements of an array by calling `reverse()` on it.
```js
names.reverse();
console.log(names); 
// [ "John", "James", "Bert", "Alicia" ]
```

## Multidimentional arrays
```js
let someValues1 = [1, 2, 3];
let someValues2 = [4, 5, 6];
let someValues3 = [7, 8, 9];

let arrOfArrays = [someValues1, someValues2, someValues3];
console.log(arrOfArrays);
```

We can write it like this: 
```js
let arrOfArrays2 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
```

```js
arrOfArraysOfArrays = [arrOfArrays, arrOfArrays, arrOfArrays];
console.log(arrOfArraysOfArrays);
```
Output:
```
[
    [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ],
    [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ],
    [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
]
```

## Objects in JS
> Arrays are objects with indexed properties
```js
let arr6 = [0, 1, 2];
console.log(typeof arr6); // Object
```

```js
let dog = {
    dogName: "JS",
    weight: 2.4,
    color: "brown",
    breed: "chihuahua",
    age: 3,
    burglarBiter: true
}
```

Accessing properties:
```js
let dogColor1 = dog["color"];
// or
let dogColor2 = dog.color;
```
### Updating Objects
```js
dog["color"] = "blue";
dog.weight = 2.3;
console.log(dog);
```
Output:
```
{ dogName: "JS", weight: 2.3, color: "blue", breed: "chihuahua", age: 3, burglarBiter: true }
```

Changing the data type of properties
```js
dog["age"] = "three";

let variable = "age";
console.log(dog[variable]); // three

variable = "breed";
console.log(dog[variable]); // chihuahua

dog[variable] = "dachshund";
console.log(dog["breed"]); // dachshund
```

## Objects in arrays in objects
```js
let company = {
    companyName: "Healthy Candy",
    // array in object
    activities: ["food manufacturing", "improving kids' health", "manufacturing toys"],
    // objects in array
    address: [{
        street: "2nd street",
        number: "123",
        zipcode: "33116",
        city: "Miami",
        state: "Florida"
    },
    {
        street: "1st West avenue",
        number: "5",
        zipcode: "75002",
        city: "Addison", 
        state: "Texas"
    }],
    yearOfEstablishment: 2023
};
```

To access street name of Healthy Candy's second address, we can use the following code:
```js
let streetName = company.address[1].street;
console.log(streetName); // 1st West avenue
```