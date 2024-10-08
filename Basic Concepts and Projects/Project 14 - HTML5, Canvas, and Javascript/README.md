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

### Adding lines and circles to the canvas

Here we will see how to draw a line and a circle.

```html
<head>
    <style>
        #canvas1 {
            border: 1px solid black;
        }

        #canvas2 {
            border: 1px solid black;
        }

        #canvas-circle {
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <canvas id="canvas1"></canvas>
    <canvas id="canvas2"></canvas>
    <canvas id="canvas-circle"></canvas>
    <script>
        // canvas 1
        let canvas = document.getElementById("canvas1");
        let ctx = canvas.getContext("2d");
        canvas.width = 100;
        canvas.height = 100;
        ctx.lineWidth = 2;
        ctx.moveTo(0, 20);
        ctx.lineTo(50, 100);
        ctx.stroke();

        // canvas 2
        let canvas2 = document.getElementById("canvas2");
        let ctx2 = canvas2.getContext("2d");
        canvas2.width = 100;
        canvas2.height = 100;
        ctx2.lineWidth = 2;
        ctx2.moveTo(0, 20);
        ctx2.lineTo(50, 10);
        ctx2.stroke();

        // for more understandingN
        let ctx3 = canvas2.getContext("2d");
        ctx3.lineWidth = 2;
        ctx3.moveTo(50, 300);
        ctx3.lineTo(50, 20);
        ctx3.stroke();

        // canvas circle
        let canvasCircle = document.getElementById("canvas-circle");
        let ctxCrcl = canvasCircle.getContext("2d");
        canvasCircle.width = 150;
        canvasCircle.height = 200;
        ctxCrcl.beginPath();
        ctxCrcl.arc(75, 100, 50, 0, Math.PI * 2);
        ctxCrcl.stroke();
    </script>
</body>
```

Output:<br>

![dynamic canvas output](./assets/dynamic%20canvas%20output.png)

In the **first canvas**, the line width is set to `2` pixels. 

This puts the focus to `0` (*x*) and `20` (*y*). 

This means it is at the very left edge of the canvas, `20` pixels from the top. 

This canvas is smaller; it is `100` by `100` pixels. 

The second point is at `50` (*x*) and `100` (*y*). 


For the **third canvas (circle)**, we use the `arc()` method to create a curve or a circle. It takes five parameters:

- start position *x* on canvas
- start position *y* on canvas
- radius of the circle
- starting angle in radians
- ending angle in radians

So, if we don't want a circle, but a semicircle, for example, we'll have to specify a different starting and end angle in radians. This time we used the `stroke()` method to do the actual drawing instead of the `fill()` method.

`stroke()` is only drawing the line, whereas `fill()` colors the full shape.

In the canvas, the shapes and lines will be added on top of each other, based on the order in which they're drawn. 

The first one you draw is underneath the latter ones. Exactly what happens when you paint on a real canvas.

#### Practice exercise 14.3

In this exercise, you will be drawing a stick person using canvas.

```html
<head>
    <style>
        #canvas1 {
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <canvas id="canvas1"></canvas>
    <script>
        const canvas = document.getElementById("canvas1");
        const ctx = canvas.getContext("2d");
        canvas.width = 640;
        canvas.height = 640;
        ctx.beginPath();
        ctx.fillStyle = "#FFCC33";
        ctx.arc(300, 130, 100, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(250, 120, 20, 0, Math.PI * 2);
        ctx.moveTo(370, 120);
        ctx.arc(350, 120, 20, 0, Math.PI * 2);
        ctx.moveTo(240, 160);
        ctx.arc(300, 160, 60, 0, Math.PI);
        ctx.fill();
        ctx.moveTo(300, 130);
        ctx.lineTo(300, 150);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(300, 230);
        ctx.lineTo(300, 270);
        ctx.lineTo(400, 270);
        ctx.lineTo(200, 270);
        ctx.lineTo(300, 270);
        ctx.lineTo(300, 350);
        ctx.lineTo(400, 500);
        ctx.moveTo(300, 350);
        ctx.lineTo(200, 500);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "brown";
        ctx.moveTo(200, 50);
        ctx.lineTo(400, 50);
        ctx.lineTo(300, 20);
        ctx.lineTo(200, 50);
        ctx.fill();
        ctx.stroke();
    </script>
</body>
```

Output: <br>
![practice ex 3](./assets/practice%20ex%203.png)


### Adding text to the canvas

```html
<head>
    <style>
        #canvas1 {
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <canvas id="canvas1"></canvas>
    <script>
        let canvas = document.getElementById("canvas1");
        let ctx = canvas.getContext("2d");
        canvas.width = 200;
        canvas.height = 200;
        ctx.font = "24px Arial";
        let txt = "Hi canvas!";
        ctx.fillText(txt, 10, 35);
    </script>
</body>
```

Output: <br>
![adding text](./assets/adding%20text.png)


We have specified `35` px from the top for the text to start. We can specify other aspects of the text, for example, like this:

```
ctx.textAlign = "center";
```

Here, we used the `textAlign` property on the canvas to specify how the text should be aligned.


#### Practice exercise 14.4

We will work with text and add text to your canvas element. The following exercise will demonstrate how to dynamically add text and position it within your canvas element.

```html
<head>
    <style>
        #canvas1 {
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <canvas id="canvas1"></canvas>
    <script>
        let canvas = document.getElementById("canvas1");
        let ctx = canvas.getContext("2d");
        canvas.width = 640;
        canvas.height = 640;
        ctx.font = "italic 50px Times New Roman";
        ctx.fillStyle = "Blue";
        ctx.fillText("Hello world", 150, 80);

        for (let counter = 1; counter <= 10; counter++) {
            ctx.font = "bold 15px Arial";
            ctx.fillStyle = "red";
            ctx.fillText("counter:" + counter, 100, 130 + counter * 23);
        }
    </script>
</body>
```

Output: <br>
![practice exercise 14.4](./assets/practice%20exercise%2014.4.png)


### Adding and uploading images to the canvas


We can add an image to the canvas. We can simply get an image from out page, and add it to out canvas.

```html
<head>
    <style>
        #c1 {
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <canvas id="c1"></canvas>
    <img id="rice" src="mu cang chai rice field.jpg" alt="rice field">
    <script>
        window.onload = function () {
            let canvas = document.getElementById("c1");
            canvas.height = 300;
            canvas.width = 300;
            let ctx = canvas.getContext("2d");
            let myImage = document.getElementById("rice");
            ctx.drawImage(myImage, 10, 10);
        }
    </script>
</body>
```

Output: <br>
![rice field output](./assets/rice%20field%20output.png)


We wrap it all in an onload event listener here because we want to be sure that the image is loaded before getting it from the DOM, else the canvas will remain empty. We use the `drawImage()` method to add an image to the canvas. It takes three arguments: the *image*, the *x* position, and the *y* position.


We can use one canvas inside another canvas as well. We do this exactly like we did when we were using the image. This is a very powerful feature, because it enables us to use a part of the drawing from the user input, for example. 


```html
<head>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <canvas id="canvas1"></canvas>
    <canvas id="canvas2"></canvas>
    <canvas id="canvas3"></canvas>
    <script>
        let canvas1 = document.getElementById("canvas1");
        let ctx1 = canvas1.getContext("2d");
        ctx1.strokeRect(5, 5, 150, 100);

        let canvas2 = document.getElementById("canvas2");
        let ctx2 = canvas2.getContext("2d");
        ctx2.beginPath();
        ctx2.arc(60, 60, 20, 0, 2 * Math.PI);
        ctx2.stroke();

        let canvas3 = document.getElementById("canvas3");
        let ctx3 = canvas3.getContext("2d");
        ctx3.drawImage(canvas1, 10, 10);
        ctx3.drawImage(canvas2, 10, 10);
    </script>
```

Output: <br>
![adding images](./assets/adding%20images.png)


We also can **upload images to the canvas**.

This can be of greate use when you want to show a preview to your user of something that was just uploaded, for example, a profile picture. 

This is very similar to grabbing the `<img>` element from the webpage and using that element, but this time we need to read our data from the uploaded file, create a new image element, and then draaw that image to the canvas.

```html
<head>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <!-- File input for selecting an image -->
    <input type="file" id="imgLoader">
    <br>
    <!-- Canvas element where the image will be displayed -->
    <canvas id="canvas"></canvas>
    <script>
        // Get references to the canvas and file input elements
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let imgLoader = document.getElementById("imgLoader");

        // Add an event listener to the file input
        imgLoader.addEventListener("change", upImage, false);

        function upImage() {
            // Create a FileReader object to read the selected file
            let fr = new FileReader();

            // Read the selected file as a data URL
            fr.readAsDataURL(event.target.files[0]);

            // When the file is loaded...
            fr.onload = function (e) {
                // Create a new Image object
                let img = new Image();

                // Set the source of the image to the loaded file
                img.src = event.target.result;

                // When the image is loaded...
                img.onload = function () {
                    // Set the canvas dimensions to match the image
                    canvas.width = img.width;
                    canvas.height = img.height;
                    // Draw the image on the canvas
                    ctx.drawImage(img, 0, 0);
                };
                // lot the FileReader object to the console (for debugging)
                console.log(fr);
            };
        }
    </script>
</body>
```

Output: <br>
![canvas images](./assets/canvas%20images.png)


Every time the input of the input field changes, the `upImage()` method gets executed.

This method does a few things, so let's break them down. 

First of all, we create a new `FileReader` and add the uploaded file. 

There is only one in this case, so we use index `0`. 

Instead of `readAsText()` that we have already seen, we are now using `readAsDataURL()`, which we can use to read images.

This will trigger the onload event. And in our case, this creates a new image that can be added to the canvas later. 

As a source, we add the result of our read action and when the image is loaded, we change the size of our canvas to the size of our picture and then add the picture in there.


**-----code explanation by Claude-----**
Let's break down the `upImage()` function in detail:

Here's a detailed explanation of what's happening in this function:

1. `let fr = new FileReader();`
   - This creates a new FileReader object. FileReader is a built-in JavaScript object that allows web applications to asynchronously read the contents of files stored on the user's computer.

2. `fr.readAsDataURL(event.target.files[0]);`
   - This line tells the FileReader to read the first file (`files[0]`) from the file input element.
   - `readAsDataURL()` is a method that reads the file and converts it into a base64 encoded string. This string represents the file's data and can be used as the source for an image.

3. `fr.onload = function (e) { ... };`
   - This sets up an event handler for when the FileReader finishes loading the file.
   - The function inside will be called once the file is fully loaded.

4. Inside the `onload` function:
   - `let img = new Image();` creates a new Image object. This is used to hold the loaded image data.
   
   - `img.src = event.target.result;` sets the source of the Image object to the loaded file data. At this point, `event.target` refers to the FileReader, and `result` contains the base64 encoded string of the image data.

   - Another `onload` event handler is set up for the Image object: `img.onload = function () { ... };`
     This ensures we only try to draw the image once it's fully loaded.

5. Inside the image's `onload` function:
   - `canvas.width = img.width;` and `canvas.height = img.height;` set the canvas dimensions to match the loaded image. This ensures the entire image fits on the canvas.

   - `ctx.drawImage(img, 0, 0);` draws the loaded image onto the canvas. The `0, 0` parameters mean it starts drawing from the top-left corner of the canvas.

6. Finally, `console.log(fr);` logs the FileReader object to the console, which can be useful for debugging.

This function effectively creates a pipeline: file selection → file reading → image creation → canvas resizing → image drawing. Each step waits for the previous one to complete before proceeding, ensuring that the image is fully loaded and processed before it's displayed on the canvas.
**-----End of explanation-----**

#### Practice exercise 14.5

We will practice uploading a local image to the canvas. The following exercise will demonstrate how to upload images from your local computer and have them displayed within the canvas element within your browser.


```html
<head>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <!-- File input for selecting an image -->
    <input type="file" id="imgLoader">
    <br>
    <!-- Canvas element where the image will be displayed -->
    <canvas id="canvas"></canvas>
    <script>
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let imgLoader = document.getElementById("imgLoader");

        imgLoader.addEventListener("change", upImage, false);

        function upImage(e) {
            console.log(e);
            const reader = new FileReader();
            reader.onload = function (e) {
                console.log(e);
                const img = new Image();
                img.onload = function () {
                    canvas.width = img.width / 2
                    canvas.height = img.height / 2
                    ctx.drawImage(img, 0, 0, img.width / 2, img.height / 2);
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    </script>
</body>
```

Output: <br>
![canvas images 1](./assets/canvas%20img%202.png)


### Adding animations to the canvas

With the methods we have seen so far, we can already start creating animations. We do this by using loops and recursion, conbined with `timeout()`.

These drawings with (short) time interval result in an animation.

```html
<head>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <canvas id="canvas"></canvas>
    <script>
        window.onload = init;
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        canvas.height = 500;
        canvas.width = 500;

        var pos = {
            x: 0,
            y: 50
        };

        function init() {
            draw();
        }

        function draw() {
            pos.x = pos.x + 5;
            if (pos.x > canvas.width) {
                pos.x = 0;
            }
            if (pos.y > canvas.height) {
                pos.y = 0;
            }

            ctx.fillRect(pos.x, pos.y, 100, 100);
            window.setTimeout(draw, 50);
        }
    </script>
</body>
```

Output:<br>

https://github.com/user-attachments/assets/864c0628-6f4f-443d-b3e4-8ea45d2fa8f3




This will start drawing a square at position `5`, `50`. And after `50` ms, it will draw *another square* at position `10`, `50`, and after that at `15`, `50`. And it will keep on changing this *x* value by `5` up to the point that *x* gets bigger than the width of the canvas, when it is then set to zero. This way, the last bit of white canvas on that line gets colored black too.

Right now, *it is more creating a line, and not a moving square*. This is because we keep on adding the colored part to the canvas, but not resetting it to the previous color. We can do this with the `clearRect()` method. This method takes four parameters. The first two are the starting point to draw the rectangle to be cleared (so *x*, *y*). The third one is the `width` of the rectangle to be cleared and the last one is the `height`. In order to clear the full canvas, we'll have to write:

```
ctx.clearRect(0, 0, canvas.width, canvas.height);
```

```js
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // this clears the full canvas
    pos.x = pos.x + 1;
    if (pos.x > canvas.width) {
        pos.x = 0;
    }
    if (pos.y > canvas.height) {
        pos.y = 0;
    }

    ctx.fillRect(pos.x, pos.y, 100, 100);
    window.setTimeout(draw, 1);
}
```

Adding this to the beginning of the draw function in our previous example results in a moving square instead of a fat line being drawn because the previous square is not kept, but the canvas resets every time and the square gets drawn from scratch.

Output: <br>



https://github.com/user-attachments/assets/6aeec839-2e23-45dc-be8e-25ae47c9d756



#### Practice exercise 14.6

We will practice animating shapes and moving objects on the page. This exercise will demonstrate how to move an object on the page using HTML5 canvas element and JS.

```html
<head>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <canvas id="canvas"></canvas>
    <script>
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        const ballSize = 10;

        let x = canvas.width / 2;
        let y = canvas.height / 2;

        let dirX = 1;
        let dirY = 1;

        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballSize, 0, Math.PI * 2);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        }

        function move() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBall();
            if (x > canvas.width - ballSize || x < ballSize) {
                dirX *= -1;
            }
            if (y > canvas.height - ballSize || y < ballSize) {
                dirY *= -1;
            }
            x += dirX;
            y += dirY;
        }
        setInterval(move, 10);
    </script>
</body>
```

Output: <br>

https://github.com/user-attachments/assets/1eedf8a9-9451-45e4-970a-55cb8955ac2a

### Drawing on canvas with a mouse

```html
<head>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <canvas id="canvas"></canvas>
    <input type="color" id="bgColor" />
    <script>
        window.onload = init;

        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        canvas.width = 700;
        canvas.height = 700;

        let bgColor = "pink";
        let bgC = document.getElementById("bgColor");
        bgC.addEventListener("change", function () {
            bgColor = event.target.value;
        });

        let pos = {
            x: 0,
            y: 0
        };

        // to set the current position of the mouse
        function setPosition(e) {
            pos.x = e.pageX;
            pos.y = e.pageY;
            // get the cordinates
            mousePos.innerHTML = `<p>PageX = ${pos.x}</p><p>PageY = ${pos.y}</p>`;
        }

        // to get the cordinates of the mouse position
        let mousePos = document.createElement("div");
        document.body.appendChild(mousePos);

        // function to draw
        function draw(e) {
            if (e.buttons != 1) return; // this checks checks 
            // if the left mouse button is not pressed. 
            // This prevents drawing to occur when mouse not clicked.
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            setPosition(e);
            ctx.lineTo(pos.x, pos.y);
            ctx.lineWidth = 5;
            ctx.lineCap = "round";
            ctx.strokeStyle = bgColor;
            ctx.stroke();
        }

        function init() {
            // draw on canvas when the mouse is moving
            canvas.addEventListener("mousemove", draw);
            // change the current position on the canvas when the mouse enters the canvas and is moving
            canvas.addEventListener("mousemove", setPosition);
            canvas.addEventListener("mouseenter", setPosition);
        }
    </script>
</body>
```

Output: <br>

[Watch this](https://x.com/ResilientCoder/status/1834921069649522770)


#### Practice exercise 14.7

We will create an online drawing board, and include a dynamic value for width, color, and ability to erase the current drawing. 

```html
<head>
    <style>
        body {
            margin: 100px;
        }

        canvas {
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <div class="controls">
        <button class="clear">Clear</button> <span>Color
            <input type="color" value="#ff0000" id="penColor"></span>
        <span>Width
            <input type="range" min="1" max="20" value="10" id="penWidth">
        </span>
    </div>
    <canvas id="canvas"></canvas>
    <script>
        window.onload = init;

        // select the page elements as variable objects
        // input fields
        let clearBtn = document.querySelector(".clear");
        let penColor = document.querySelector("#penColor");
        let penWidth = document.querySelector("#penWidth");
        // canvas
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        canvas.width = 500;
        canvas.height = 500;

        // initialize init() to add event listeners 
        // for mouse move and enter
        function init() {
            canvas.addEventListener("mousemove", draw);
            canvas.addEventListener("mousemove", setPosition);
            canvas.addEventListener("mouseenter", setPosition);
        }

        // define the coordinates of mouse
        let pos = {
            x: 0,
            y: 0
        }

        // function to get the coordinates of mouse for drawing
        function setPosition(e) {
            pos.x = e.pageX - 100; // 100 px reduced due to body margin
            pos.y = e.pageY - 100; // 100 px reduced due to body margin
        }

        let drawStart = false;
        // function to draw on canvas
        function draw(e) {
            if (e.buttons !== 1) return;
            drawStart = true;
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            setPosition(e);
            ctx.lineTo(pos.x, pos.y);
            ctx.strokeStyle = penColor.value;
            ctx.lineWidth = penWidth.value;
            ctx.lineCap = "round";
            ctx.stroke();
        }

        // clear the drawing
        clearBtn.addEventListener("click", clearImg);
        function clearImg() {
            if (!drawStart) {
                alert("draw something first!");
            } else {
                drawStart = false;
                const temp = confirm("Clear confirm?");
                if (temp) {
                    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
                }
            }
        }
    </script>
</body>
```

Output: <br>

[Watch this](https://x.com/ResilientCoder/status/1834970786903286089)

### Saving dynamic images

We can convert the canvas to an image, and this image can then be saved as a next step.

In orderto convert it to an image, we need to add the following to our script element.

```js
let dataURL = canvas.toDataURL();
document.getElementById("imageId").src = dataURL;
```

We are changing our canvas to a data URL, which then becomes the source of our image.

We want this to happend whenever a save button gets clicked. 

Here is the button:

```html
<input type="button" id="save" value="save" />
```

And the event listener:

```js
document.getElementById("save").addEventListener("click", function () {
    // convert the content within the canvas into 
    // base64 data image value
    let dataURL = canvas.toDataURL();
    // update the image with generated data URL 
    // from the canvas
    document.getElementById("holder").src = dataURL;
});
```

Now whenever the save button gets clicked, it is going to update the image with the generated data URL from the canvas. 

Whatever content is within the canvas element will be turned into a base64 data image value and added to the page within an img tag.

In the following example, there is a canvas of 200 by 200 pixels and an empty image of the same size. When a color gets selected, a square of 100 by 100 pixels in that color is drawn on the canvas. When the save button gets clicked, this canvas gets converted to an image. This image can then be saved. Here is the code for the example:

```html
<head>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <canvas id="canvas"></canvas>
    <input type="color" name="" id="squareColor">
    <br>
    <img src="" id="holder" width="200" , height="200" alt="img">
    <input type="button" value="save" id="save">
    <script>
        // create the canvas and define variable objects
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 200;
        canvas.height = 200;
        const penColor = document.getElementById("squareColor");
        // select the color of square
        penColor.addEventListener("change", function () {
            color = event.target.value;
            draw(color);
        });

        document.getElementById("save").addEventListener("click", function () {
            // convert the content within the canvas into 
            // base64 data image value
            let dataURL = canvas.toDataURL();
            // update the image with generated data URL 
            // from the canvas
            document.getElementById("holder").src = dataURL;
        });

        function draw(color) {
            ctx.fillStyle = color;
            ctx.fillRect(70, 70, 100, 100);
        }
    </script>
</body>
```

Output: <br>

https://github.com/user-attachments/assets/334418f8-eb69-406f-b33b-7c0964c2f1c1


### Media on the page

There are special elements for media on the page. 

Adding an audio player to a page is very simple:

```html
<body>
    <audio>
        <source src="sound.ogg" type="audio/ogg">
        <source src="sound.mp3" type="audio/mpeg">
    </audio>
</body>
```

- You specify the `controls` attribute if you want the user to be able to control pause and play and the volume.

- If you want it to start automatically, you'll have to add the attribute `autoplay`.

With the source element, you specify the audio files that can be played. The browser will choose only one and will choose the first one (from top to bottom) that it supports.

Adding a video to a webpage is very similar to adding audio. Here's how to do it:

```html
<video width="1024" height="576" controls>
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.ogg" type="video/ogg">
</video>
```

Often you would want to link to YouTube instead. Here's how to do that:

```html
<iframe
    width="1024"
    height="576"
    src="https://youtu.be/KWX8lzzzrzA?si=GjwEr3BhlxkSemcN"
>
</iframe>
```

You will have to use the `iframe` element. This is a special element that allows another webpage inside the current webpage. And you can then add the YouTube embed link as a source. The last code after `embed` comes from the video URL.

The height and width attributes of the video can be changed to make the video bigger or smaller.

If you want to show it fullscreen, you can change the width and height like this:

```html
<iframe
    width="100%"
    height="100%"
    src="https://youtu.be/kDinWUQ2NkA"
>
</iframe>
```

If you want it to be only a part of the screen, you can adjust the width and height attributes accordingly.

You can autoplay these as well with the autoplay attribute. If you use autoplay on more than one, none of them will autoplay to protect the visitor from getting all that noise from the webpage. It is typically considered annoying if your video starts making noise in the browser. Adding the attribute muted will avoid this.

### Digital accessibility in HTML

**Digital accessibility is of huge importance for visually impaired people or those unable to use a mouse.** In order to use the internet with little or no vision, screen readers are in place. This is a special piece of software that reads what is on the screen or converts it to braille using special devices connected to the computer. People that cannot use a mouse will often rely on speech to give the computer instructions.

Dynamic parts can be recognized if implemented correctly, and by adding semantics and metadata to the HTML, it's better useable for external tooling.

Semantics might be one of the most important parts here. This comes down to using the right HTML element for the right purpose. If something should be clicked, it is best to make it a `<button>` element and not a `<span>`, for example. If it is a button, it is possible to navigate to it with the *Tab* key and click it using *Enter*.

The same goes for headers. You can create something that looks like a header using a special class and give it a layout, but the screen readers are looking for `h1`, `h2`, and `h3`. 

**You should always use the header elements for headers. This helps the screen readers and improves the accessibility of your website. And as a bonus, it helps you rank higher in Google as well because bots also check out the headers to see what is
important on your site.**

It is also important to use labels and link text that is descriptive. If the link part is only **Click here**, that is not helpful. Something like **Click here to sign up for the summer event** is much better.

Throughout this book, we have also done something wrong with our input boxes.

In order to make input fields accessible, you'll have to add a label element. This will make it easier for screen readers to pick up on what the input box is about. So this is generally bad practice:

```html
<input type="text" id="address" />
```

And this is much better, because now screen readers can read it too (and therefore visually impaired people can understand it):

```html
<label for="address">Address:</label>
<input type="text" id="address" />
```

One last one that you may know already is the `alt` attribute for images. If the screen reader encounters an image, it will read the `alt` description. So make sure that these are descriptive, even if the image is not important. Since there is clearly no way to know it's not important if you cannot see the image, all you'll know is that you cannot see some picture. Here is how to add `alt` text:

```html
<img src="umbrella.jpg" width="200" height="200" alt="rainbow colored umbrella" />
```

### Chapter Projects

#### Create a Matrix effect

This exercise will create a continuous animation of text moving from top to bottom. The final effect produced will show characters moving down the screen within the canvas element and appearing to disappear and fade as they approach the bottom of the screen as more new characters will be added to the canvas in their place. The random character can be either a 0 or 1, and will be in place in the position according to the number, which will represent the vertical position of where the character is drawn.

The canvas will be filled with a black background, which is going to use opacity to create the fading effect once it's redrawn:

```html
<head>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <canvas id="canvas"></canvas>
    <script>
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        canvas.height = 800;
        canvas.width = 700;

        let colVal = [];

        for (let i = 0; i < canvas.width / 10; i++) {
            colVal.push(0);
        }
        // let count = 0;

        function matrix() {
            ctx.fillStyle = "rgba(0,0,0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#66ff33";
            colVal.forEach((posY, index) => {
                let output = Math.random() < 0.5 ? 0 : 1;
                // console.log(output); count++;
                let posX = (index * 10);
                ctx.fillText(output, posX, posY);
                if (posY > 100 + Math.random() * 800) {
                    colVal[index] = 0;
                } else {
                    colVal[index] = posY + 10;
                }
            })
        }

        setInterval(matrix, 50);
        // matrix();
        // console.log(count);
    </script>
</body>
```

[CLICK HERE TO READ FULL EXPLANATION OF THE CODE BY CHATGPT](https://chatgpt.com/share/66e687a9-71f0-8000-a3f6-1cf57ec8011d)

Output: <br>

![matrix img](./assets/matrix.png)

[Watch output video](https://x.com/ResilientCoder/status/1835188878480744523)

#### Countdown clock

This exercise will produce a real-time countdown clock that will display the amount of time in days, hours, minutes, and seconds left until the date value within the input date field. Adjusting the input date field will update the countdown clock. It will also use local storage to capture and save the value in the input field, so if the page is refreshed, the input field will still retain the date value and the countdown clock can continue to count down to that date value from the input field. 


```html
<head>
    <style>
        .clock {
            background-color: blue;
            width: 400px;
            text-align: center;
            color: white;
            font-size: 1em;
        }

        .clock>span {
            padding: 10px;
            border-radius: 10px;
            background-color: black;
        }

        .clock>span>span {
            padding: 5px;
            border-radius: 10px;
            background-color: red;
        }

        input {
            padding: 15px;
            margin: 20px;
            font-size: 1.5em;
        }
    </style>
</head>

<body>
    <div>
        <input type="date" name="endDate">
        <div class="clock">
            <span><span class="days">0</span> Days</span>
            <span><span class="hours">0</span> Hours</span>
            <span><span class="minutes">0</span> Minutes</span>
            <span><span class="seconds">0 </span> Seconds</span>
        </div>
    </div>
    <script>
        const endDate = document.querySelector("input[name='endDate']");
        const clock = document.querySelector(".clock");
        let timeInterval;
        let timeStop = true;
        const savedValue = localStorage.getItem("countdown") || false;
        if (savedValue) {
            startClock(savedValue);
            let inputValue = new Date(savedValue);
            endDate.valueAsDate = inputValue;
        }
        endDate.addEventListener("change", function (e) {
            e.preventDefault();
            clearInterval(timeInterval);
            const temp = new Date(endDate.value);
            localStorage.setItem("countdown", temp);
            startClock(temp);
            timeStop = true;
        });
        function startClock(d) {
            function updateCounter() {
                let tl = (timeLeft(d));
                if (tl.total <= 0) {
                    timeStop = false;
                }
                for (let pro in tl) {
                    let el = clock.querySelector("." + pro);
                    if (el) {
                        el.innerHTML = tl[pro];
                    }
                }
            }
            updateCounter();
            if (timeStop) {
                timeInterval = setInterval(updateCounter, 1000);
            } else {
                clearInterval(timeInterval);
            }
        }

        function timeLeft(d) {
            let currentDate = new Date();
            let t = Date.parse(d) - Date.parse(currentDate);
            let seconds = Math.floor((t / 1000) % 60);
            let minutes = Math.floor((t / 1000 / 60) % 60);
            let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            let days = Math.floor(t / (1000 * 60 * 60 * 24));
            return {
                "total": t,
                "days": days,
                "hours": hours,
                "minutes": minutes,
                "seconds": seconds
            };
        }
    </script>
</body>
```

Output: <br>
![countdown clock](./assets/countdown%20clock.png)



#### Online paint app

Create a drawing application where the user can draw using their mouse in the canvas element. When the user is within the canvas element and clicks down on the mouse button, holding the button down will add lines, producing a drawing effect within the canvas element. The color and width of the drawing pencil can be changed dynamically for more functionality. In addition, this app will include a button to save and download the image from the canvas element, as well as clearing the current canvas content.

```html
<body>
    <canvas id="canvas" width="600" height="400"></canvas>
    <div>
        <button class="save">Save</button>
        <button class="clear">Clear</button>
        <span>Color: <input type="color" name="penColor" id="penColor" value="#ffff00"></span>
        <span>Width: <input type="range" min="1" max="20" value="10" name="penWidth" id="penWidth"></span>
    </div>
    <div class="output"></div>
    <script>
        const canvas = document.querySelector("#canvas");
        const ctx = canvas.getContext("2d");
        const penColor = document.querySelector("#penColor");
        const penWidth = document.querySelector("#penWidth");
        const btnSave = document.querySelector(".save");
        const btnClear = document.querySelector(".clear");
        const output = document.querySelector(".output");
        const mLoc = {
            draw: false,
            x: 0,
            y: 0,
            lastX: 0,
            lastY: 0
        };
        canvas.style.border = "1px solid black";
        btnSave.addEventListener("click", saveImg);
        btnClear.addEventListener("click", clearCanvas);
        canvas.addEventListener("mousemove", (e) => {
            mLoc.lastX = mLoc.x;
            mLoc.lastY = mLoc.y;
            // console.log(e);
            mLoc.x = e.clientX;
            mLoc.y = e.clientY
            draw();
        });
        canvas.addEventListener("mousedown", (e) => {
            mLoc.draw = true;
        });
        canvas.addEventListener("mouseup", (e) => {
            mLoc.draw = false;
        });
        canvas.addEventListener("mouseout", (e) => {
            mLoc.draw = false;
        });
        function saveImg() {
            const dataURL = canvas.toDataURL();
            console.log(dataURL);
            const img = document.createElement("img");
            output.prepend(img);
            img.setAttribute("src", dataURL);
            const link = document.createElement("a");
            output.append(link);
            let fileName = Math.random().toString(16).substr(-8) + ".png";
            link.setAttribute("download", fileName);
            link.href = dataURL;
            link.click();
            output.removeChild(link);
        }
        function clearCanvas() {
            let temp = confirm("clear canvas?");
            if (temp) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
        function draw() {
            if (mLoc.draw) {
                ctx.beginPath();
                ctx.moveTo(mLoc.lastX, mLoc.lastY);
                ctx.lineTo(mLoc.x, mLoc.y);
                ctx.strokeStyle = penColor.value;
                ctx.lineWidth = penWidth.value;
                ctx.lineCap = "round";
                ctx.stroke();
                ctx.closePath();
            }
        }
    </script>
</body>
```

Output: <br>

![online paint app](./assets/online%20paint%20app.png)






