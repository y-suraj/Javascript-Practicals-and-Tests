# JavaScript Code Execution

## What happends when javascript executes (runs) my code?

```js
const num = 1;
function multiplyBy2 (inputNumber) {
    const result = inputNumber;
    return result;
}
const name = "Will";
```

As soon as we start running our code, we create a <i>global execution context</i>.

- Thread of execution (parsing and executing the code line after line)
- Live memory of variables with data (known as a Global Variable Environment)

## Running/calling/invoking a function

This is not same as defining a funciton

```js
const num = 1;
function multiplyBy2 (inputNumber) {
    const result = inputNumber;
    return result;
}

const output = multiplyBy2(3);
const newOutput = multiplyBy2(20);
```

When you execute a function you create a new execution context comprising:
1. The thread of execution (we go throught the code in the function line by line)
2. A local memory ('Variable environment') where anything defined in the function is stored.

<b>We keep track of the functions being called in JavaScript with a Call stack</b>

Tracks which execution context we are in - that is, what function is currently being run and where to return to after an execution context is popped off the stack.

One global execution context, a new function execution context for every time we run a function.

# Introducing Asynchronicity

## Asynchronicity is the backbone of modern web development in JavaScript

JavaScript is single threaded (one command executing at a time) and has a synchronous execution model (each line is executed in order the code appears).

So what if we need to <b>wait some time before we can execute certain bits of code</b>? Perhaps we need to wait on fresh data from an API/server request or for a timer to complete and then execute our code.

We have a conundrum - a tension between wanting to <b>delay some code execution</b> but <b>not wanting to block the thread from any further</b> from any further code running while we wait.

The **problem** with this model is it's fundamentally untenable - blocks our single javascript theread from running any further code while the task completes.

**Benefits** - it's easy to reason about.<hr>

<i>Promises, Web APIs, the Callback & Microtask Queues and Event loop allow us to defer our actions until the 'work' (an API request, timer etc) is completed and continue running our code line by line in the meantime</i>

<b>Asynchronous JavaScript is the backbone of the modern web - letting us build fast 'non-blocking' applications.</b>

## Return Next ELement with a Function (function within a function)

```js
function createNewFunction() {
    function add2(num) {
        return num+2;
    }
    return add2;
}
const newFunction = createNewFunction();
const result = newFunction(3); // 5
```
<br>
<b> We want to crate a function that holds both our array, the position we are currently at in our 'stream' of elements and has the ability to return the next element.</b>

```js
function createFunction(array) {
    let i = 0;
    function inner() {
        const element = array[i];
        i++;
        return element;
    }
    return inner;
}

const returnNextElement = createFunction([4,5,6]); // function inner()
```

<b>By calling the `returnNextElement`</b>

```js
function createFunction(array) {
    let i = 0;
    function inner() {
        const element = array[i];
        i++;
        return element;
    }
    return inner;
}

const returnNextElement = createFunction([4,5,6]); // function inner()
const element1 = returnNextElement(); // 4
const element2 = returnNextElement(); // 5
```

<b>The bond</b>
- When the function `inner` is defined, it gets a bond to the surrounding Local Memory in which it has been defined.
- When we return out `inner`, the surrounding live data is returned out too - attached on the 'back' of the function definition itself (which we now give a new global label `returnNextElement`).
- When we call `returnNextElement` and don't find  `array` or `i` in the immediate execution context, we look into the function definition's 'backpack' of persistent live data.
- The 'backpack' is officially known as C.O.V.E(closure, outer function, variables, execution context) or 'closure'.

<b>`returnNextElement` has everything we need all bundled up in it</b>

1. Our underlying array itself
2. The position we are currently at in our 'stream' of elements
3. The ability to return the next element

This relies completely on the special property of functions in javascript that when they are born inside other functions and returned - they get a backpack (closure).

<b>So iterators turn our data into 'streams' of actual values we can access one after another.</b>

Now we have functions that hold our underlying array, the position we're currently at in the array, *and* return out the next item in the 'stream' of elements from our array when run.

This lets us have for loops that show us the element itself in the body on each loop *and more deeply* allows us to rething arrays as flows of elements themselves which we can interact with by calling a function that switches that flow on to give us our next element.

We have truly 'decoupled' the process of accessing each element from what we want to do to each element.

