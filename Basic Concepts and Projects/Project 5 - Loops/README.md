# Loops
## `while` loops

### Practical exercise 1
In this exercise we will create a number guessing game that takes user input and replies based on how accurate the user's guess was.
```js
const max = 5;
const ranNum = Math.floor(Math.random() * max) + 1;
// console.log(ranNum);
let correct = false;

while(!correct) {
    let guess = prompt("Guess a Number 1 - " + max);
    guess = Number(guess);

    if(guess===ranNum) {
        correct = true;
        console.log("You got it " + ranNum);
    } else if (guess > ranNum) {
        console.log("Too high");
    } else {
        console.log("Too low");
    }
}
```

## `do while` loops
### Practical exercise 2
In this exercise, we will create a basic counter that will increase a dynamic variable by a consistent step value, up to an upper limit.
```js
let counter = 0;
let step = 1;

do {
    console.log(counter);
    counter += step;
} while (counter <= 100)
// prints 0 to 100
```

## `for` loop
### Practical exercise 3
In this exercise we will use a `for` loop to create an array that holds objects. Starting with creating a blank array, the block of code withing the loop will create an object that gets inserted into the array.
```js
const myWork = [];

for (let i = 1; i <= 10; i++) {

    let lesson = {
        name: 'Lesson ' + i,
        status: (i % 2 ? true : false)
    };
    myWork.push(lesson);
}
console.log(myWork);
```
Output:
```
Array(10) [ {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…} ]
​
0: Object { name: "Lesson 1", status: true }
​
1: Object { name: "Lesson 2", status: false }
​
2: Object { name: "Lesson 3", status: true }
​
3: Object { name: "Lesson 4", status: false }
​
4: Object { name: "Lesson 5", status: true }
​
5: Object { name: "Lesson 6", status: false }
​
6: Object { name: "Lesson 7", status: true }
​
7: Object { name: "Lesson 8", status: false }
​
8: Object { name: "Lesson 9", status: true }
​
9: Object { name: "Lesson 10", status: false }
​
length: 10
​
<prototype>: Array []
loops.js:51:9
```

## Nested loops
### Practical exercise 4
In this exercise we will be generating a table of values. We will be using loops to generate rows and also columns, which will be nested within the rows. Nested arrays, can be used to represent rows in a table. This is a common structure in spreadsheets, where each row is a nested array within a table and the contents of these rows are the cells in the table. The columns will align as we are creating an equal number of cells in each row.
```js
const myTable = [];
const rows = 10, cols = 5;
let counter4 = 0;

for (let i = 0; i < rows; i++) {
    let tempTable = [];

    for (let j = 0; j < cols; j++) {
        counter4++;
        tempTable.push(counter4);
    }
    myTable.push(tempTable);
}
console.table(myTable);
```
Console:
![myTable table view](/assets/Untitled.png)
## Loops and arrays
### Practical exercise 5
Explore how to create a table grid that contains nested arrays as rows within a table. The rows will each contain the number of cells needed for the number of columns set in the variables. This grid table will dynamically adjust depending on the values for the variables.
```js
const grid = [];
const noOfCells = 64;
let counter5 = 0;
let row;

for (let i = 0; i < noOfCells + 1; i++) {
    if (counter5 % 8 === 0) {
        if (row != undefined) {
            grid.push(row);
        }
        row = [];
    }
    counter5++;
    let temp = counter5;
    row.push(temp);
}
console.table(grid);
```
Console:
![grid table view](https://github.com/y-suraj/Javascript-Practicals-and-Tests/blob/main/Basic%20Concepts%20and%20Projects/Project%205%20-%20Loops/Untitled2.png)
## for of loop
It cannot be used to change the value associated with the index as we can do with the regular loop, but for processing values it is a very nice and readable loop.
Syntax:
```js 
let arr = [some array];
for (let variableName of arr) {
// code to be executed
// value of variableName gets updated every iteration
// all values of the array will be variableName once
}
```
```js
let names = ["John", "Max", "Chris", "James"];

for (let name of names) {
    console.log(name);
}
```
Output
```
John
Max
Chris
James
```

> There are some limitations here; we cannot modify the array, but we could write all the elements to a database or a file, or send it somewhere else. The advantage of this is that we cannot accidentally get stuck in an infinite loop or skip values.

### Practical exercise 6
This exercise will construct an array as it loops through the incrementing values of `i`. Once the array is done, this exercise also will demonstrate several ways to output array contents.
```js
const arr = [];
for (let i = 0; i < 10; i++) {
    arr.push(i + 1);
}
console.log(arr);

for (let val of arr) {
    console.log(val);
}
```
Output:
```
[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
1
2
3
4
5
6
7
8
9
10
```

## Loops and objects
Looping over an object can be done in a few ways. We can use the `for in` loop to loop over the object directly, or we can convert the object to an array and loop over the array. 

### for in loop
Manipulating objects with loops can also be done with another variation of the `for` loop, the for in loop. The `for in` loop is somewhat similar to the `for of` loop. Again here, we need to specify a temporary name, also referred to as a **key**, to store each property name in. We can see it in action here:
```js
let car = {
    model: "Golf",
    make: "Volkswagen",
    year: 1999,
    color: "black"
};
for (let prop in car) {
    console.log(prop);
}
for (let prop in car) {
    console.log(car[prop]);
}
```
Output:
```
model
make
year
color
Golf
Volkswagen
1999
black
```

#### Practical exercise 7
In this exercise, we will experiment with looping over objects and internal arrays.
```js
const obj = {
    a: 1,
    b: 2,
    c: 3
};
for (let prop in obj) {
    console.log(prop, obj[prop]);
}
const arr7 = ["a", "b", "c"];
for (let i = 0; i < arr7.length; i++) {
    console.log(i, arr7[i]);
}
for (el in arr7) {
    console.log(el, arr7[el]);
}
```
Output:
```
a 1
b 2 
c 3
0 a
1 b
2 c
0 a
1 b
2 c
```

### Looping over objects by converting to an array

You can use any loop on objects, as soon as you convert the object to an array. This can be done in three ways:
    - Convert the keys of the object to an array
    - Convert the values of the object to an array
    - Convert the key-value entries to an array (containing arrays with two elements: object key and object value)

```js
let arrKeys = Object.keys(car);
console.log(arrKeys);
// [ "model", "make", "year", "color" ]
```

We can loop over the properties of this array like this using the `for of` loop:
```js
for (let key of Object.keys(car)) {
    console.log(key);
}
```
Output: 
```
model
make
year
color
```

Similarly, we can use the `for of` loop to loop over the values of the object by converting the values to an array. The main difference here is that we use `Object. values(nameOfObject)`:
```js
for (let key of Object.values(car)) {
    console.log(key);
}
```
Output:
```
Golf
Volkswagen
1999
black
```

You can loop over these arrays in the same way you loop over any array. You can use the length and index strategy like this in a regular `for` loop:
```js
for (let i = 0; i < arrKeys.length; i++) {
    console.log(arrKeys[i] + ": " + car[arrKeys[i]]);
}
```
Output:
```
model: Golf
make: Volkswagen
year: 1999
color: black
```

More interesting is how to loop over both arrays at the same time using the `for of` loop. In order to do so, we will have to use `Object.entries()`. Let's demonstrate what it does:
```js
let arrEntries = Object.entries(car);
console.log(arrEntries);
```
```
[
    [ 'model', 'Golf' ],
    [ 'make', 'Volkswagen' ],
    [ 'year', 1999 ],
    [ 'color', 'black' ]
]
```

As you can see, it is returning a two-dimensional array, containing key-value pairs. We can loop over it like this:
```js
for (const [key, value] of Object.entries(car)) {
    console.log(key, ":", value);
}
```
```
model : Golf
make : Volkswagen
year : 1999
color : black
```
