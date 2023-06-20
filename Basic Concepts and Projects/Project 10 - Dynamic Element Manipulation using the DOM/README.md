# Dynamic Element Manipulation using the DOM

## Random color generator (using event listeners on elements)
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random Color Generator</title>
</head>

<body>
    <script>
        window.onload = function () {
            document.getElementById("square").addEventListener("mouseover", changeColor);
        }
        function changeColor() {
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            this.style.backgroundColor = `rgb(${r},${g},${b})`;
        }

    </script>
    <div id="square" style="width:500px; height:500px;background-color:grey; border: 1px solid;"></div>

</body>

</html>
```