# Document Object Modeling
- Browser Object Modeling - Link: [w3shoools](https://www.w3schools.com/js/js_window.asp)
- Document Object Modeling - Link: [w3shoools](https://www.w3schools.com/js/js_htmldom.asp)

## Practice exercise
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Object Model</title>
</head>
<body>
    <h1>Practice exercise 1</h1>
    <div class="output"></div>
    <script>
        const output = document.querySelector('.output');
        output.textContent = "Hello world";
        output.classList.add("red");
        output.id = "tester";
        output.style.backgroundColor = "green";
        console.log(document.URL);
        output.textContent = document.URL;
    </script>
</body>
</html>
```
Output:

![Practice exercise](./assets/practice%20exercise.png)

## Chapter Project
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manipulating HTML elements with Javascript</title>
</head>

<body>
    <div class="output">
        <h1>Hello</h1>
        <div>Test</div>
        <ul>
            <li id="one">One</li>
            <li id="red">Two</li>
        </ul>
        <div>Test</div>
    </div>
    <script>
        const output = document.querySelector(".output");
        const mainList = output.querySelector("ul");
        mainList.id = "mainList";
        console.log(mainList);
        const eles = document.querySelectorAll("div");
        for (let i = 0; i < eles.length; i++) {
            console.log(eles[i].tagName);
            if (i % 2)
                eles[i].style.color = "red";
            else
                eles[i].style.color = "blue";
        }
    </script>
</body>

</html>
```
Output:

![Chapter Project](./assets/Chapter%20project.png)
