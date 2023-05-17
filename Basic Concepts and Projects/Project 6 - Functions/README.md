# Functions
## Basic functions
### Writing functions
Template:
```js
function nameOfTheFunction() {
    // content of the function
}
```
The above function can be called like this:
```js
nameOfTheFunction();
```

Here's a function that asks for your name and then greets you:
```js
function sayHello() {
    let you = prompt("What's your name? ");
    console.log("Hello", you + "!");
}
sayHello();
```
It will propmpt:

`What's your name? >`

Output:

`Hello name`

Variables can contain functions.
Here you can see an example of a variable containing a function `(varContainingFunction)` and a variable inside a function `(varInFunction)`:
```js
let varContainingFunction = function() {
    let varInFunction = "I'm in a function.";
    console.log("hi there!", varInFunction);
}
varContainingFunction();
// hi there! I'm in a function.
```

Variables contain a certain value and are something; they do not do anything. Functions are actions. They are a bundle of statements that can be executed when they get called.

### Practice exercise 1
A function that adds two numbers.
```js
function addTwoNums(num1, num2) {
    return num1+num2;
}
let val1 = 5, val2 = 9;
console.log(addTwoNums(val1, val2)); // 14
console.log(addTwoNums(-11, 92)); // 81
```

### Practice exercise 2
A program that will randomly describe an inputted name.
```js
let words = ["powerful", "intelligent", "super", "strong", "rich"];
function askName() {
    let askUserName = prompt("Name: ");

    let val3 = Math.floor(Math.random() * words.length);
    console.log(words[val3] + " " + askUserName);
}
askName();
```

```
Name: >
```

```
intelligent askUserName
```

## Parameters and arguments
```js
function tester(para1, para2) {
    return para1 + " " + para2;
}
const arg1 = "argument 1";
const arg2 = "argument 2";
tester(arg1, arg2);
```
A **parameter** is defined as the *variable* listed inside the parentheses of the function definition, which defines the *scope* of the function.

Example:
```js
function addTwoNumbers(x, y) {
    console.log(x + y);
}
addTwoNumbers(3, 5); // 8
addTwoNumbers(11, -92); // -81
```

### Practice exercise 3
A basic calculator that takes two numbers and one string value indicating an operation.
```js
let numm1 = 55;
let numm2 = 11;
let operator = '+';
function cal(vall1, vall2, op) {
    if (op==='-')
        return vall1 - vall2;
    else
        return vall1 + vall2;
}
console.log(cal(numm1, numm2, operator)); 
// 66
operator = '-';
console.log(cal(numm1, numm2, operator)); 
// 44
operator = '*';
console.log(cal(numm1, numm2, operator));
// 66
```

### Default or unsuitable parameters
Calling `addTwoNumbers()` function without any arguments:
```js
addTwoNumbers(); // NaN
```
JavaScript just gives the variables a default type, which is undefined. And `undefined` + `undefined` equals `NaN`

Instead, we could tell JavaScript to take different *default parameters*. And that can be done like this:
```js
function addTwoNumbers(x = 2, y = 3) {
    console.log(x + y);
}
```

If you call the function with no arguments now, it will automatically assign `2` to `x` and `3` to `y`, unless you override them by calling the function with arguments. The values that are used for invoking are prioritized over hardcoded arguments.
```js
addTwoNumbers(); // 5
addTwoNumbers(6, 6); // 12
addTwoNumbers(10); // 13
```
The third one simply assigns the value to the first parameter, `x`. Therefore, `x` becomes `10` and `y` gets its default value `3`, and together that makes `13`.

```js
addTwoNumbers(1,2,3,4); // 3
```
It is just adding `1` and `2` and ignoring the last two arguments (`3` and `4`).

## Special functions and operators
### Arrow functions
Template:
```js
(param1, param2) => body of the function;

// Or for no parameters:
() => body of the function;

// Or for one parameter (no parentheses are needed here):
param => body of the function;

// Or for a multiline function with two parameters:
(param1, param2) => {
    // line 1;
    // any number of lines;
}
```

Arrow functions are useful whenever you want to write an implementation on the spot, such as inside another function as an argument. This is because they are a shorthand notation for writing functions. They are most often used for functions that consist of only one statement. Let's start with a simple function that we will rewrite to an arrow function:
```js
function doingStuff(x) {
    console.log(x);
}

// We can write it like this:
let doingArrowStuff = x => console.log(x);

// And invoke it like this:
doingArrowStuff("Great!"); // Great!

// If there is more than one argument, use parenthesis:
let addTwoNumberss = (x, y) => console.log(x + y);
addTwoNumberss(5, 4); // 9

// If there are no arguments, you must use the parenthesis, like this:
let sayHi = () => console.log("hi");
sayHi(); // hi
```

We can conbine the arrow function with certain built-in methods. For example, we can use the `foreach()` method on an array. This method executes a certain function for every element in the array.
```js
const arr1 = ["squirrel", "alpaca", "bud"];
arr1.forEach(e => console.log(e));
```
Output:
```
squirrel
alpaca
bud
```

For every element in the array, it takes the element as input and executing the arrow function for it. In this case, the function is to log the element. So the output is every single element in the array.

Using arrow functions combined with built-in functions is very powerful. **We can do something for every element in the array, without counting or writing a complicated loop**. We'll see more examples of great use cases for arrow functions later on.

### Spread operator
It consists of three dots used before a referenced expression or string, and it spreads out the arguments or elements of an array.
```js
let spread = ["so", "much", "fun"];
let message = ["Javascript", "is", ...spread, "and", "very", "powerful"];
console.log(message);
// [ "Javascript", "is", "so", "much", "fun", "and", "very", "powerful" ]
```

As you can see, the elements of the spread operator become individual elements in the array. The spread operator spreads the array to individual elements in the new array. It can also be used to send multiple arguments to a function, like this:
```js
function addTwoNumz(x, y) {
    console.log(x + y);
}
let arr2 = [5, 9];
addTwoNumz(...arr2); // 14
```

This operator avoids having to copy a long array or string into a function, whichsaves time and reduces code complexity. You can call a function with multiple spread operators. It will use all the elements of the arrays as input. Here's an example:
```js
function addFourNums(x, y, z, a) {
    console.log(x + y + z + a);
}
let arr3 = [5, 10];
let arr4 = [6, 9];
addFourNums(...arr3, ...arr4); // 30
// This calls the function like this:
addFourNums(5, 10, 6, 9);
```

### Rest parameter
It has the same symbol as the spread operator, but it is used inside the function parameter list. 
```js
function someFunction(para1, para2) {
    console.log(para1, para2);
}
someFunction("hi", "there!", "How are you?");
// hi there!
```

If we use the rest parameter, **it allows us to send in any number of arguments and translate them into a parameter array**.
```js
function restFunction(para1, ...para2) {
    console.log(para1, para2);
}
restFunction("hi", "there!", "How are you?");
// hi [ "there!", "How are you?" ]
```

As you can see, the second parameter has changed into an array, containing our second and third arguments. This can be useful whenever you are not sure what number of arguments you will get. Using the rest parameter allows you to process this variable number of arguments, for example, using a loop.

## Returning function values
```js
let result = addTwoNumberss(4, 7);
console.log(result);
// 11
// undefined
```

The value `9` is written to the console because `addTwoNumbers()` contains a `console.log()` statement. The `console.log(result) `line outputs undefined, because nothing is inserted into the function to store the result, meaning our function `addTwoNumbers()` does not send anything back. Since JavaScript does not like to cause trouble and crash, it will assign `undefined`.

Returning a value:
```js
function addTwoNumberz(x, y) {
    return x + y;
}
result = addTwoNumberz(7, 6);
console.log(result); // 13

let resultsArr = [];
for (let i = 0; i < 10; i++) {
    let result1 = addTwoNumberz(i, 2 * i);
    resultsArr.push(result1);
}
console.log(resultsArr);
// [ 0, 3, 6, 9, 12, 15, 18, 21, 24, 27 ]
```

### Returning with arrow functions
If we have a one-line arrow function, we can return without using the keyword `return`.
```js
let addNums = (x, y) => x + y;
let result2 = addNums(13, 16);
console.log(result2); // 29
```

If it's a multiline function, you will have to use the keyword `return`:
```js
let addTwoNumzz = (x, y) => {
    console.log("Adding...");
    return x + y;
}
```

### Practice exercise 4
Modify the calculator that you made in Practice exercise 2 to return added values instead of printing them. Then, call the function 10 or more times in a loop, and store the results in an array. Once the loop finishes, output the final array into the console.
```js
let resArr = [];
let addVals = (x, y) => (x + y);
for (let i = 0; i < 10; i++) {
    let val_1 = i * 5;
    let val_2 = i * i;
    let response = addVals(val_1, val_2);
    resArr.push(response);
}
console.log(resArr);
// [ 0, 6, 14, 24, 36, 50, 66, 84, 104, 126 ]
```

## Variable scope in functions
### Local variables in functions
```js
function testAvailability(x) {
    console.log("Available here: ", x);
}
testAvailability("Hi!");
console.log("Not available here: ", x);
```
```
Available here: Hi!
Uncaught ReferenceError: x is not defined
```

```js
function testAvailability2() {
    let y = "Local variable!";
    console.log("Available here: ", y);
}
testAvailability2();
```
```
console.log("Not available here: ", y);
Available here:  Local variable!
Uncaught ReferenceError: y is not defined
```

Variables defined inside the function are not available outside the function either.

If you need their values outside a function, you can return the values. The key word here is *values*! You cannot return the variable itself. Instead, a value can be caught and stored in a different variable, like this:
```js
function testAvailability3() {
    let y = "I'll return";
    console.log("Available here:", y);
    return y;
}
let z1 = testAvailability3(); 
// Available here:  I'll return
console.log("Outside the function:", z1);
// Outside the function: I'll return
console.log("Not available here:", y);
// Uncaught ReferenceError: y is not defined
```

#### `let` versus `var` variables
```js
function doingStuf() {
    if (true) {
        var x = "local"; // var
    }
    console.log(x);
}
doingStuf(); // local
```

If we use `var`, the variable becomes function-scoped and **is available anywhere in the function block (even before defining with the value `undefined`)**. Thus, after the `if` block has ended, `x` can still be accessed.
```js
function doingStuf2() {
    if (true) {
        let x = "local";
    }
    console.log(x);
}
doingStuf2();
// Uncaught ReferenceError: x is not defined
```

A final difference between let and var relates to the order of declaration in a script.
Try using the value of x before having defined it with let:
```js
function doingStuf3() {
    if (true) {
        console.log(x);
        let x = "local";
    }
}
doingStuf3();
// Uncaught ReferenceError: can't access lexical declaration 'x' before initialization
```

variables declared with `let` cannot be accessed before being defined, even within the same block.
```js
function doingStuf4() {
    if (true) {
        console.log(x);
        var x = "local";
    }
}
doingStuf4();
// undefined
```

#### `const` scope
Constants are block-scoped, just like `let`. This is why the scope rules here are similar to those for `let`.
```js
function doingStuf5() {
    if (true) {
        const X = "local";
    }
    console.log(X);
}
doingStuf5();
// Uncaught ReferenceError: X is not defined
```

Using a `const` variable before having defined it will also give a `ReferenceError`, just as it does for a `let` variable.

### Global variables