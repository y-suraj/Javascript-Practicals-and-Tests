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
