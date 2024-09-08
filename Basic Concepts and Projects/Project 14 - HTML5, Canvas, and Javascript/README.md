# HTML5, Canvas, and Javascript

## Local file reader

Since HTML5 we can finally interact with local files using the JavaScript that runs in our browser, which is really an amazing feature. 

Using this feature, we can upload files from our device to our web app and read from them in our app.

This means we can attach files to forms for example, which is great in many cases whenever we  need to upload some sort of file for whatever purpose, for example, adding a resume to your online job application.

We can run a sample script to check whether the browser you are using supports this.

```html
<body>
    <div id="message"></div>
    <script>
        let message = document.getElementById("message");

        if (window.FileReader) {
            message.innerText = "Good to go";
        } else {
            message.innerText = "File reader not found";
        }
    </script>
</body>
```

If you open this file in your browser it should say **Good to go** when your browser supports file reading.

Try updating your browser or using another one if it says "File reader not found".

Browsers that will work are, for example, Chrome and Firefox.


### Uploading files

```html
<body>
    <input type="file" multiple onchange="uploadFile(this.files)">
    <div id="message"></div>
    <script>
        let message = document.getElementById("message");

        function uploadFile(files) {
            console.log(files[0]);
            message.innerText = files[0].name;
        }
    </script>
</body>
```

Output (on uploading a file):<br>
![uploading files](./assets/uploading%20files.png)

It gives a blank HTML page with a **Choose file** button and the **No file chosen** comment behind it.

Clicking on the button pops up the filesystem and you can select a file.

After selecting the file, the JavaScript gets triggered. And as you can see, we are sending in the property files that are active in our body. This is a list of files.

Therefore, we are grabbing the 0th index, the first element in the list. Files are represented as objects.

The file object gets logged to the console. here, which enables you to see all the properties and associated values. 

**Some of the important are the `name`, `size`, `type`, and `lastModified`, but there are many more.**


Here is **how to upload multiple files at the same time**:

```html
<body>
    <input type="file" multiple onchange="uploadFile(this.files)">
    <div id="message"></div>
    <script>
        let message = document.getElementById("message");

        function uploadFile(files) {
            for (let i = 0; i < files.length; i++) {
                message.innerHTML += files[i].name + "<br>";
            }
        }
    </script>
</body>
```

Output(after uploading files):<br>
![upload multiple files](./assets/upload%20multiple%20files.png)


### Reading files

There is a special JS object for reading files. It has very suitable name: `FileReader`

Here is how we can use it to read a file.

```html
<body>
    <input type="file" multiple onchange="uploadAndReadFile(this.files)">
    <div id="message"></div>
    <script>
        let message = document.getElementById("message");

        function uploadAndReadFile(files) {
            let fr = new FileReader();
            fr.onload = function (e) {
                message.innerHTML = e.target.result;
            };
            fr.readAsText(files[0]);
        }
    </script>
</body>
```

Output (after uploading file): <br>
![reading files](./assets/reading%20files.png)


As you can see, we have to specify what needs to happen in order to connect our HTML and JavaScript to a file. We do this by adding the `onload` event as an anonymous function that is sending on the event data.

Reading the data can then be done using one of the `readAs()` methods on the `FileReader` object. We have used `readAsText()` here, because we are dealing with a text file. This triggers the actual reading and the onload function that comes with it gets triggered when it's done, adding the result of the reading to our message. This accepts all file types, but not all file types will make sense.

In order to see something sensible, we will have to upload something that contains plain text, such as `.txt`, `.json`, and `.xml`. With this we can also send a file to the server or process the contents of a log file.

### Practice exercise 14.1

This exercise will demonstrate the process of uploading and displaying local image files in your webpage.

```html
<body>
    <input type="file" multiple accept="image/*">
    <div class="output"></div>
    <script>
        let imgInput = document.querySelector("input");
        let output = document.querySelector(".output");
        // const message = document.getElementById("message");
        imgInput.addEventListener("change", uploadAndReadFile);

        function uploadAndReadFile(e) {
            const files = e.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const img = document.createElement("img");
                img.classList.add("thumb");
                img.file = file;
                output.appendChild(img);
                const reader = new FileReader();
                reader.onload = (function (myImg) {
                    return function (e) {
                        myImg.src = e.target.result;
                    }
                })(img);
                reader.readAsDataURL(file);
            }
        }
    </script>
</body>
```

## Getting position data with GeoLocation

We can have a look at the `GeoLocation` by inspecting `navigator.geolocation`.

```js
<script>
    window.onload = init;
    
    function init() {
        console.dir(navigator.geolocation);
    }
</script>
```

Output:<br>
![geolocation 1](./assets/geolocation%201.png)


If you check out the log, you can see what the GeoLocation object contains, and one of these methods is to get the current position of the user.

Here is how to use it:

```html
<script>
    window.onload = init;

    function init() {
        navigator.geolocation.getCurrentPosition(showGeoPosition);
    }
    function showGeoPosition(data) {
        console.dir(data);
    }
</script>
```

The `getCurrentPosition()` method takes another method as an argument.

The position data gets sent to this function and that function will use the data as input. 

Therefore, we will have to wrap `console.dir` in an external function (called `showGeoPosition()`) that takes a parameter and outputs this data so that we can see the data in the console.

We can then send this function to the `getCurrentPosition()` function and see the data.

If you run this, you should get a `GeolocationPosition` object, with a `coords` property containing your latitude and longitude. 

The browser might prompt whether you're okay with sharing your location. 

And if it doesn't show anything, make sure the preferences and settings of your computer allow the browser to use your location.


----- **Questions asked to Claude** -----

> **PROMPT**: give me the js code to type in console to get the coordinates of locatoin

**RESPONSE**:

Certainly! Here's a JavaScript code snippet you can use to get the coordinates of the user's current location using the browser's Geolocation API. You can type this directly into the browser's console:



```javascript
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log("Latitude: " + latitude + "°, Longitude: " + longitude + "°");
  }, function(error) {
    console.error("Error Code = " + error.code + " - " + error.message);
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}
```

Here's how this code works:

1. It first checks if geolocation is supported in the browser.
2. If supported, it calls `getCurrentPosition()` to get the current location.
3. If successful, it logs the latitude and longitude to the console.
4. If there's an error (e.g., user denied permission), it logs the error.
5. If geolocation isn't supported, it logs a message saying so.

When you run this in the console, the browser will ask for permission to access your location. If you allow it, you should see your current latitude and longitude printed in the console.

Remember that for privacy reasons, this will only work on secure origins (HTTPS) for most modern browsers. Also, the accuracy of the coordinates can vary depending on the method used to determine the location (GPS, WiFi, IP address, etc.).

Would you like me to explain any part of this code in more detail?

> **PROMPT**: so in the getCurrentPosition() method, the first argument is used to run an arrow function which can give you the coordinates of the location, and the second argument is used to catch any errors?

**RESPONSE**:

You're on the right track, but let me clarify a few points about the `getCurrentPosition()` method:

1. Function Arguments: 
   The `getCurrentPosition()` method actually takes up to three arguments:
   - A success callback function
   - An error callback function (optional)
   - An options object (optional)

2. Success Callback:
   - This is indeed the first argument.
   - In the example I provided, it's not an arrow function, but a traditional function expression. However, you're correct that it could be written as an arrow function.
   - This function receives a position object as its parameter, which contains the coordinates.

3. Error Callback:
   - This is the second argument.
   - It's called if there's an error getting the location (e.g., user denies permission, hardware issues).
   - It receives an error object as its parameter.

4. Function Types:
   - Both callbacks can be written as either traditional functions or arrow functions. The choice doesn't affect their behavior in this context.

Here's a version using arrow functions to illustrate:

```javascript
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}°, Longitude: ${longitude}°`);
    },
    (error) => {
      console.error(`Error Code = ${error.code} - ${error.message}`);
    }
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}
```

In this version:
- The success callback is the first arrow function, handling the position data.
- The error callback is the second arrow function, handling any errors.

You're correct that the first function gives you access to the coordinates (via the `position` object), and the second function allows you to handle any errors that might occur during the geolocation process.


## HTML5 canvas

`<canvas>` will help you create dynamic web apps.

The canvas element is, by default, a white rectangle that you cannot see against the white background.

You should add some CSS to add a border to the canvas or a background color to the body and your canvas will be revealed.

```html
<head>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>
<body>
    <canvas id="c1"></canvas>
    <script>
        let canvas = document.getElementById("c1");
        let ctx = canvas.getContext("2d");
        canvas.width = 500;
        canvas.height = 500;
        ctx.fillRect(10, 30, 100, 100);
    </script>
</body>
```

Output:<br>
![canvas 1](./assets/canvas%201.png)


The context of the canvas is read and stored in the `ctx` variable (a common shortened version of context).

We need this to be able to draw on the canvas. We change the dimensions of the canvas to `500` by `500` pixels.

This is not the same as using CSS for width and height; this adds the HTML attributes' `width` and `height`.

With the `fillRect()` method on the context of the canvas, we can draw a reactangle on the canvas. It takes four parameters. The first two are the *x* and *y* cordinate of where the figure should be added to the canvas. The last two are the width and height of the rectangle. In our case, it's a square. 


We can also change the color we are drawing with. You can get a pink square instead by replacing the JS of the previous HTML document with the following:

```html
<head>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>
<body>
    <canvas id="c1"></canvas>
    <script>
        let canvas = document.getElementById("c1");
        let ctx = canvas.getContext("2d");
        canvas.width = 500;
        canvas.height = 500;
        ctx.fillStyle = "pink"; // change color to pink
        ctx.fillRect(10, 30, 100, 100);
    </script>
</body>
```

Output:<br>
![canvas 2](./assets/canvas%202.png)


### Practice exercise 14.2

We will be implementing shapes and using the HTML5 canvas element to draw on a webpage with JS. Draw a rectangle using JS.

```js
<head>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <canvas id="c1" width="640" height="640"> Not supported</canvas>
    <script>
        let canvas = document.getElementById("c1");
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "red";
        ctx.fillRect(100, 100, 500, 300);
        ctx.strokeRect(90, 90, 520, 320);
        ctx.clearRect(150, 150, 400, 200);
    </script>
</body>
```

Output: <br>
![canvas exercise](./assets/canvas%20exercise.png)


## Dynamic canvas


