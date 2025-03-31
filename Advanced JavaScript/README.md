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

**Benefits** - it's easy to reason about.

