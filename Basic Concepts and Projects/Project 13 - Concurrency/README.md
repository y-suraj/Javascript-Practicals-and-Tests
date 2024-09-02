# Concurrency

## Introducing concurrency

**Concurrency** is whenever things are happening "at the same time" or *in parallel*.

There are three strategies in JS that you'll need to know of when working with concurrency: **callbacks**, **Promises**, and the **async** and **await** keywords.


## Callbacks

**Callbacks** are the first thing we should understand when we are talking about concurrency.

**It is just a function that takes another function as an argument, which is then called when the rest of the initial function has finished.**

```js
function doSomething(callback) {
    callback();
}
function sayHi() {
    console.log("Hi!");
}
doSomething(sayHi);
```


Callbacks become really valuable in an asynchronous context, for example, when one function is still waiting for the results of a call to the database before calling the `callback` function that is going to process the data.

Some JavaScript built-in functions work with this callback principle, for example, the setTimeOut() and setInterval() functions. They will take a function that is executed after a certain time in the case of a timeout and every certain amount of time for the specified interval.

```js
setInterval(encourage, 500);

function encourage() {
    console.log("You're doing great, keep going!");
}
```

The functions that are inserted as arguments are called callbacks here.
Understanding concurrency really starts with callbacks, but multiple nested callbacks make code difficult to read.

When this is all written as one function with anonymous functions inside, this gets very indented as well. We call this **callback hell** or the **Christmas tree problem** (because the code gets nested so much, it looks like a Christmas tree on its side).

Callbacks are a great concept, but they can create ugly code very fast. There is often a better solution, we *promise*.

### Practice exercise 13.1

This exercise will demonstrate how to use a callback function, creating a way to pass a value from one function to another by invoking a callback function. We will create a greeting callback using a full name in a string.

```js
function greet(fullName) {
    console.log(`Hello, ${fullName[0]} ${fullName[1]}`);

}
function processCall(user, callback) {
    const fullName = user.split(" ");
    callback(fullName);
}
processCall("ABCD XYZ", greet);
```

Output:<br>
![callback practice](./assets/callbacks%20practice.png)

## Promises

**----- BY ChatGPT (better answer than claude) -----**

> **PROMPT**: <br>
Explain me about Promises in javascript and everything about it, in an easy to understand manner with realistic examples and applications.

**RESPONSE**: <br>
### What are Promises in JavaScript?

Imagine you're in a restaurant, and you order a pizza. The waiter takes your order and tells you it will be ready in 20 minutes. In this scenario, you don’t just sit and wait without doing anything for those 20 minutes, right? You might chat with friends, scroll through your phone, or grab a drink. The waiter’s promise is that your pizza will be ready after some time, and when it’s ready, they’ll let you know.

In JavaScript, a **Promise** works similarly. It’s a way to handle asynchronous operations—things that take time to complete, like fetching data from a server, reading a file, or waiting for user input.

### The Basics of a Promise

A **Promise** in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

- **Pending:** The initial state, when the Promise is neither fulfilled nor rejected.
- **Fulfilled:** The operation completed successfully, and the Promise has a value (like the pizza being ready).
- **Rejected:** The operation failed, and the Promise has a reason for the failure (like the restaurant running out of ingredients).

### Creating a Promise

Here’s how you create a simple Promise:

```javascript
let pizzaPromise = new Promise((resolve, reject) => {
    let pizzaReady = true; // Let's assume the pizza will be ready

    if (pizzaReady) {
        resolve("Pizza is ready!"); // If the operation is successful
    } else {
        reject("We ran out of dough."); // If the operation fails
    }
});
```

In this example:

- The `resolve` function is called when the operation is successful.
- The `reject` function is called when the operation fails.

### Handling Promises

You can handle the outcome of a Promise using `.then()` and `.catch()` methods.

```javascript
pizzaPromise
    .then((message) => {
        console.log(message); // "Pizza is ready!"
    })
    .catch((error) => {
        console.log(error); // "We ran out of dough."
    });
```

- `.then()` is used to handle a fulfilled Promise.
- `.catch()` is used to handle a rejected Promise.

### Chaining Promises

Promises can be chained to handle multiple asynchronous operations in sequence. For example:

```javascript
let orderPizza = new Promise((resolve, reject) => {
    resolve("Pizza order placed.");
});

orderPizza
    .then((message) => {
        console.log(message); // "Pizza order placed."
        return "Pizza is being prepared.";
    })
    .then((message) => {
        console.log(message); // "Pizza is being prepared."
        return "Pizza is out for delivery.";
    })
    .then((message) => {
        console.log(message); // "Pizza is out for delivery."
        return "Pizza delivered!";
    })
    .then((message) => {
        console.log(message); // "Pizza delivered!"
    });
```

Each `.then()` returns a new Promise, allowing you to chain additional `.then()` calls.

### Realistic Application: Fetching Data from an API

One of the most common uses of Promises in JavaScript is fetching data from an API.

```javascript
fetch('https://api.example.com/data')
    .then(response => response.json()) // Process the response and convert it to JSON
    .then(data => {
        console.log(data); // Use the fetched data
    })
    .catch(error => {
        console.error('Error fetching data:', error); // Handle any errors
    });
```

In this example:

1. `fetch()` returns a Promise that resolves to a response object.
2. The first `.then()` converts this response into JSON.
3. The second `.then()` handles the JSON data.
4. The `.catch()` handles any errors that might occur during the fetch.

### Why Use Promises?

1. **Avoid Callback Hell:** Without Promises, asynchronous code often ends up nested deeply, making it hard to read and maintain (a problem known as "callback hell").
2. **Better Error Handling:** With Promises, you can handle errors more gracefully using `.catch()`.
3. **Chaining:** Promises allow you to chain multiple asynchronous operations, making the code more readable and logical.

#### Summary

Promises in JavaScript are like promises in real life: a way to handle tasks that will complete in the future. They make asynchronous programming more manageable, readable, and easier to handle, especially when dealing with tasks like fetching data, reading files, or waiting for user input. By using `.then()` and `.catch()`, you can manage what happens when a task is completed or if it fails, making your code more robust and easier to understand.

> **PROMPT**: <br>
How can we use `setTimeout()` or `setInterval()` methods in handling or chaining promises?

**RESPONSE**: <br>
`setTimeout()` and `setInterval()` are commonly used to delay or repeat operations in JavaScript. While these functions aren't directly related to Promises, you can combine them to create delays or periodic actions within a promise chain. Here’s how you can use them:

### Using `setTimeout()` with Promises

`setTimeout()` is used to delay the execution of a function by a specified number of milliseconds. When combined with Promises, you can introduce a delay in a promise chain.

##### Example: Delaying a Promise

Suppose you want to simulate a delayed operation, like waiting for a certain amount of time before proceeding to the next step in your promise chain.

```javascript
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

delay(2000) // Delay for 2 seconds
    .then(() => {
        console.log("2 seconds have passed.");
        return delay(1000); // Delay for another 1 second
    })
    .then(() => {
        console.log("Another 1 second has passed.");
        // You can continue chaining more Promises here
    });
```

In this example:

- The `delay()` function returns a Promise that resolves after a specified delay (in milliseconds).
- By chaining `.then()`, you can perform actions after each delay.

#### Using `setInterval()` with Promises

`setInterval()` is used to repeatedly execute a function at specified intervals. Combining it with Promises allows you to create periodic actions in a promise-based flow.

##### Example: Repeating an Action with a Delay

Let’s say you want to perform an action every 3 seconds for 3 times.

```javascript
function repeatEveryInterval(fn, interval, times) {
    return new Promise((resolve) => {
        let counter = 0;
        const intervalId = setInterval(() => {
            fn(); // Execute the function
            counter++;

            if (counter >= times) {
                clearInterval(intervalId); // Stop the interval after the specified number of times
                resolve(); // Resolve the Promise
            }
        }, interval);
    });
}

repeatEveryInterval(() => {
    console.log("Action performed!");
}, 3000, 3)
    .then(() => {
        console.log("Action completed 3 times.");
    });
```

In this example:

- The `repeatEveryInterval()` function returns a Promise that executes a function `fn` at regular intervals (in milliseconds) for a specified number of times.
- The Promise resolves after the action has been performed the desired number of times, allowing you to chain further actions.

#### Chaining Promises with `setTimeout()`

You can also use `setTimeout()` to simulate operations that take time and chain them together.

```javascript
function task(message, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(message);
            resolve();
        }, delay);
    });
}

task("Task 1 completed", 1000)  // Delays for 1 second
    .then(() => task("Task 2 completed", 2000)) // Delays for 2 seconds
    .then(() => task("Task 3 completed", 3000)) // Delays for 3 seconds
    .then(() => {
        console.log("All tasks completed.");
    });
```

#### Summary

- **`setTimeout()`** is useful for creating delays within a promise chain. You can wrap it in a Promise to make it part of the chain, allowing you to pause execution for a specific time.
- **`setInterval()`** can be used to repeat actions at set intervals, and you can control how many times this repetition happens by combining it with Promises.

By combining `setTimeout()` and `setInterval()` with Promises, you gain precise control over the timing of your asynchronous operations, making your code more flexible and powerful.

> **PROMPT**: <br>
can we call pizzaPromise in between orderPizza, like after the "pizza is being prepared"

**RESPONSE**: <br>

Yes, you can absolutely call the `pizzaPromise` (or any other Promise) in between the steps of the `orderPizza` chain. This allows you to handle different asynchronous operations at various stages in your chain. Let’s modify your example to include the `pizzaPromise` after the "Pizza is being prepared" stage.

### Example: Inserting `pizzaPromise` into the Chain

Let’s assume `pizzaPromise` is a Promise that resolves when the pizza is ready, and we want to check the status of the pizza after it’s been prepared.

```javascript
let pizzaPromise = new Promise((resolve, reject) => {
    let pizzaReady = true; // Simulate the pizza being ready

    if (pizzaReady) {
        resolve("Pizza is ready!");
    } else {
        reject("We ran out of dough.");
    }
});

let orderPizza = new Promise((resolve, reject) => {
    resolve("Pizza order placed.");
});

orderPizza
    .then((message) => {
        console.log(message); // "Pizza order placed."
        return "Pizza is being prepared.";
    })
    .then((message) => {
        console.log(message); // "Pizza is being prepared."
        return pizzaPromise;  // Insert pizzaPromise here
    })
    .then((message) => {
        console.log(message); // "Pizza is ready!" (from pizzaPromise)
        return "Pizza is out for delivery.";
    })
    .then((message) => {
        console.log(message); // "Pizza is out for delivery."
        return "Pizza delivered!";
    })
    .then((message) => {
        console.log(message); // "Pizza delivered!"
    })
    .catch((error) => {
        console.log(error); // Handle any errors from pizzaPromise or earlier steps
    });
```

### What’s Happening Here:

1. **`orderPizza` is placed:**
   - The chain begins with `"Pizza order placed."` being logged.

2. **`Pizza is being prepared`:**
   - The next `.then()` logs `"Pizza is being prepared."`.

3. **Inserting `pizzaPromise`:**
   - Instead of returning another string or value, the chain returns `pizzaPromise`, which is another Promise.
   - The chain waits for `pizzaPromise` to resolve or reject.

4. **Handling the outcome of `pizzaPromise`:**
   - If `pizzaPromise` resolves, its resolved value (`"Pizza is ready!"`) is passed to the next `.then()` in the chain.
   - If `pizzaPromise` rejects, the `.catch()` block will handle the error.

5. **Continuing the chain:**
   - If `pizzaPromise` resolves, the chain continues with the next steps: `"Pizza is out for delivery."` and `"Pizza delivered!"`.

### Summary

By inserting `pizzaPromise` into the `orderPizza` chain, you can seamlessly integrate different asynchronous operations. This approach is powerful because it allows you to handle multiple stages of an operation that may depend on various async tasks. If any Promise in the chain fails, you can handle the error in a centralized `.catch()` block.

> **PROMPT**: <br>
also add the `setTimeout` methods into it

**RESPONSE**: <br>
Let's integrate `setTimeout()` to simulate delays between different stages of the pizza order process. We'll create a `delay()` function using `setTimeout()` and use it in the promise chain to introduce pauses between each step.

### Example: Chaining Promises with `setTimeout()` and `pizzaPromise`

Here’s the complete example with `pizzaPromise`, `orderPizza`, and `setTimeout()` delays:

```javascript
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

let pizzaPromise = new Promise((resolve, reject) => {
    let pizzaReady = true; // Simulate the pizza being ready

    delay(2000).then(() => { // Simulate a 2-second delay before the pizza is ready
        if (pizzaReady) {
            resolve("Pizza is ready!");
        } else {
            reject("We ran out of dough.");
        }
    });
});

let orderPizza = new Promise((resolve, reject) => {
    delay(1000).then(() => { // Simulate a 1-second delay before the order is placed
        resolve("Pizza order placed.");
    });
});

orderPizza
    .then((message) => {
        console.log(message); // "Pizza order placed."
        return delay(1000).then(() => "Pizza is being prepared."); // 1-second delay before preparation starts
    })
    .then((message) => {
        console.log(message); // "Pizza is being prepared."
        return pizzaPromise;  // Insert pizzaPromise here
    })
    .then((message) => {
        console.log(message); // "Pizza is ready!" (from pizzaPromise)
        return delay(1500).then(() => "Pizza is out for delivery."); // 1.5-second delay before delivery
    })
    .then((message) => {
        console.log(message); // "Pizza is out for delivery."
        return delay(2000).then(() => "Pizza delivered!"); // 2-second delay before delivery is completed
    })
    .then((message) => {
        console.log(message); // "Pizza delivered!"
    })
    .catch((error) => {
        console.log(error); // Handle any errors from pizzaPromise or earlier steps
    });
```

### What’s Happening Here:

1. **`delay(ms)` Function:**
   - The `delay()` function returns a Promise that resolves after a specified number of milliseconds. This simulates a pause or delay in the process.

2. **`orderPizza` with Delay:**
   - The order is placed after a 1-second delay using `delay(1000)`.

3. **`Pizza is being prepared` with Delay:**
   - After the order is placed, there’s another 1-second delay before moving to the preparation stage.

4. **Inserting `pizzaPromise` with Delay:**
   - `pizzaPromise` simulates a 2-second delay before the pizza is ready, and then either resolves with `"Pizza is ready!"` or rejects with an error.

5. **`Pizza is out for delivery` with Delay:**
   - After the pizza is ready, there’s a 1.5-second delay before it’s out for delivery.

6. **`Pizza delivered` with Delay:**
   - Finally, a 2-second delay simulates the time it takes to deliver the pizza.

### Summary

By combining `setTimeout()` delays with Promises, you can simulate real-world scenarios where different steps in a process take varying amounts of time to complete. This approach allows you to control the timing of each stage in your promise chain, making the flow of asynchronous operations more realistic and manageable.

**----- BY CLAUDE -----**

> **PROMPT**: <br>
Explain me about Promises in javascript and everything about it, in an easy to understand manner with realistic examples and applications.

**RESPONSE**: <br>
Promises in JavaScript are a way to handle asynchronous operations. Asynchronous operations are tasks that may take some time to complete, such as making an HTTP request, reading a file from disk, or waiting for a timer to finish.

In traditional JavaScript, dealing with asynchronous code can be challenging, often leading to a phenomenon called "callback hell" or "pyramid of doom." Promises provide a cleaner and more manageable way to handle asynchronous code.

A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

Here's a simple example of how Promises work:

```javascript
// Creating a new Promise
const myPromise = new Promise((resolve, reject) => {
  // Do some asynchronous operation
  setTimeout(() => {
    if (/* operation was successful */) {
      resolve("Success!");
    } else {
      reject("Error occurred.");
    }
  }, 2000);
});

// Consuming the Promise
myPromise
  .then((result) => {
    console.log(result); // Output: "Success!"
  })
  .catch((error) => {
    console.error(error); // Output: "Error occurred."
  });
```

In this example, we create a new Promise that simulates an asynchronous operation (in this case, a 2-second timeout). The Promise constructor takes a function with two parameters: `resolve` and `reject`. If the asynchronous operation is successful, we call `resolve()` with the resulting value. If the operation fails, we call `reject()` with an error message.

We then "consume" the Promise by calling its `then()` method, which takes a function that will be executed when the Promise is resolved. If the Promise is rejected, we can handle the error by calling the `catch()` method.

Promises also provide other useful methods, like `Promise.all()` and `Promise.race()`, which allow you to work with multiple Promises at once.

Here's an example of using `Promise.all()` to fetch data from multiple APIs:

```javascript
// Fetch data from multiple APIs
Promise.all([
  fetch('https://api.example.com/data1'),
  fetch('https://api.example.com/data2'),
  fetch('https://api.example.com/data3')
])
  .then((responses) => {
    // All promises resolved, process the data
    const [data1, data2, data3] = responses.map(response => response.json());
    console.log(data1, data2, data3);
  })
  .catch((error) => {
    // Handle any errors that occurred
    console.error(error);
  });
```

In this example, we use `Promise.all()` to wait for all three API calls to complete. When all Promises are resolved, we get an array of the response objects, which we can then process further.

Promises are widely used in modern JavaScript development, especially in the context of asynchronous operations like HTTP requests, database queries, file I/O, and more. They provide a cleaner and more manageable way to handle asynchronous code, making it easier to write and maintain complex applications.

### Practice exercise 13.2

In this exercise, you will create a counter that will output the values in sequence using Promises.

```js
const myPromise = new Promise((resolve, reject) => {
    resolve("Start Counting!");
});
function counter(val) {
    console.log(val);
}

myPromise
    .then(value => {
        counter(value);
        return "one";
    })
    .then(value => {
        counter(value);
        return "two";
    })
    .then(value => {
        counter(value);
        return "three";
    })
    .then(value => {
        counter(value);
    });
```

Output:<br>
![promises](./assets/promises%20practice.png)

## async and await


