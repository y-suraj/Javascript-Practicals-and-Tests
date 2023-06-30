# Interactive Contents and Event Listeners

## Practice Exercise 1
Regular mode and dark mode.
```html
<body>
    <p id="mode" onclick="darkMode()">Click here for dark mode</p>
    <script>
        let darkMode = false;
        document.getElementById("mode").onclick = () => {
            console.log(darkMode);
            if(!darkMode) {
                document.body.style.backgroundColor = "black";
                document.body.style.color = "white";
                document.getElementById("mode").innerText = "Click here for light mode";
                darkMode = true;
            } else {
                document.body.style.backgroundColor = "white";
                document.body.style.color = "black";
                document.getElementById("mode").innerText = "Click here for dark mode";
                darkMode = false;
            }
        }
    </script>
</body>
```

## Practice exercise 2
Create several divs with color names in `textContent`. Add JavaScript to add `click` event listeners to each element, and as each element is clicked, update the background color of the body to match the color name in the div.

```html
<body>
    <div id="text">Red</div>
    <div id="text">Orange</div>
    <div id="text">Yellow</div>
    <div id="text">Green</div>
    <div id="text">Blue</div>
    <div id="text">Violet</div>
    <script>
        let texts = document.querySelectorAll("#text");

        texts.forEach((el) => {
            el.style.color = el.innerText;
        });

        texts.forEach((el) => {
            el.addEventListener("click", () => {
                document.body.style.backgroundColor = el.textContent;
            })
        })
    </script>
</body>
```