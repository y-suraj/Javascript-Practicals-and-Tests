# Dynamic Element Manipulation using the DOM

## Projects
### Random color generator (using event listeners on elements)
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

### Collapsible accordion component
Build a collapsing and expanding accordion component that will open page elements, hiding and showing content when the title tab is clicked.
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Collapsible accordion component</title>
    <style>
        .active {
            display: block !important;
        }

        .myText {
            display: none;
        }

        .title {
            font-size: 1.5em;
            background-color: #ddd;
        }
    </style>
</head>

<body>

    <div class="container">
        <div class="title">Title #1</div>
        <div class="myText">Just some text #1</div>
        <div class="title">Title #2</div>
        <div class="myText">Just some text #2</div>
        <div class="title">Title #3</div>
        <div class="myText">Just some text #3</div>
    </div>
    <script>
        let titles = document.querySelectorAll(".title");
        let texts = document.querySelectorAll(".myText");

        titles.forEach((el) => {
            el.addEventListener("click", (e) => {
                console.log(el.nextElementSibling);
                remover();
                el.nextElementSibling.classList.toggle("active");
            });
        });
        function remover() {
            texts.forEach((ele) => {
                ele.classList.remove("active");
            })
        }
    </script>
</body>

</html>
```

### Interactive voting system
The below code will create a dynamic list of people that can be clicked, and it will update the corresponding value with the number of times that name was clicked. It also includes an input field that will allow you to add more users to the list, each of which will create another item in the list that can be interacted with the same as the default list items.
![Interactive voting system](./assets/Interactive%20voting%20system.png)

Code: 

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive voting system</title>
</head>

<body>
    <div>
        <input type="text" id="addFriend">
        <input type="button" id="addNew" value="Add Friend">
    </div>
    <table id="output"></table>
    <script>
        window.onload = build;
        // Create an array of people's names called `myArray`. This will be the default original list of names.
        const myArray = ["Mike", "Chris", "James", "Rick", "Rocky"];

        // Select the page elements as JS objects so they can easily be selected withing the code
        const addNew = document.getElementById("addNew");
        const newInput = document.getElementById("addFriend");
        const output = document.getElementById("output");

        // Add event listener to the Add Friend button. Once clicked, this will get the value from the input field and pass the values to a function that will add the friend list to the page. Additionally, add the new friend's name into the people's names array you created. Get the current value in the input field and push that value into the array so the array mathces the values on the page.
        addNew.onclick = function () {
            const newFriend = newInput.value;
            adder(newFriend, myArray.length, 0);
            myArray.push(newFriend);
        }

        // Run a function to build the content on the page, using the `forEach()` loop get all the items within the array and add them to the page. Include 0 as a default for the vote count, as all individuals should start on zero votes.
        function build() {
            myArray.forEach((item, index) => {
                adder(item, index, 0);
            });
        };

        // Create a main function that will create the page elements, starting with the parent table row, `tr`. Then create three table cell, `td`, elements. Add content to the table cells, including the vote count in the last column, the person name in the middle, and the index plus 1 in the first column.
        function adder(name, index, counter) {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");

            td1.textContent = index+1;

            const td2 = document.createElement("td");
            td2.textContent = name;

            const td3 = document.createElement("td");
            td3.textContent = counter;

            // Append all table cells to the table row and append the table row to the output area on the page.
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            // You can also write `tr.append(td1, td2, td3);` as an alternative to above three lines.

            // Add an event listener that will increase the vote counter for that row when the user clicks.
            tr.onclick = function() {
                console.log(tr.lastChild);
                // Get the text content from the last column in the row. It should be the value of the current counter. Increment the counter by one and make sure the datatype is a number so you can add to it.
                let val = Number(tr.lastChild.textContent);
                val++;
                // Update the last column with the new click counter
                tr.lastChild.textContent = val;
            }
            output.appendChild(tr);
        }

    </script>
</body>

</html>
```
