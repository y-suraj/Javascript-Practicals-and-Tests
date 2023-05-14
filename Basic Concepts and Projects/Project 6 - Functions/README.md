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