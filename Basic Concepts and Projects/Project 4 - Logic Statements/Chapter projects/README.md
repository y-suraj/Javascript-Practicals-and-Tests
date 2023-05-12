1. Ask the user to enter a number and check whether it's greater than, equal to, or less than a dynamic number value in your code. Output the result to the user.
```js
let val = prompt("Enter a number between 1 to 10: ");
val = Number(val);

let num = Math.floor(Math.random() * 10);

let message = "";

if (val > num)
    message = val + " is greater than " + num;
else if (val === num)
    message = val + " is equal to " + num;
else
    message = val + " is less than " + num;

console.log("Random number: ", num);
console.log(message);
```

2. Rock Paper Scissors game
This is a game between a player and the computer, where both will make a random selection of either Rock, Paper, or Scissors (alternatively, you could create a version using real player input!). Rock will beat out Scissors, Paper will beat out Rock, and Scissors will beat out Paper. You can use JavaScript to create your own version of this game, applying the logic with an if statement. Since this project is a little more difficult, here are some suggested steps:
    1. Create an array that contains the variables Rock, Paper, and Scissors.
    2. Set up a variable that generates a random number 0-2 for the player and then do the same for the computer's selection. The number represents the index values in the array of the 3 items.
    3. Create a variable to hold a response message to the user. This can show the random results for the player and then also the result for the computer of the matching item from the array.
    4. Create a condition to handle the player and computer selections. If both are the same, this results in a tie.
    5. Use conditions to apply the game logic and return the correct results. There are several ways to do this with the condition statements, but you could check which player's index value is bigger and assign the victory accordingly, with the exception of Rock beating Scissors.
    6. Add a new output message that shows the player selection versus the computer selection and the result of the game.
```js
const rps = ["Rock", "Paper", "Scissor"];

let compInput = Math.floor(Math.random() * 3);

let userInput = prompt("Choose any one between 1-Rock, 2-Paper, or 3-Scissor: ");
userInput = Number(userInput) - 1;

let message = "Your input: " + rps[userInput] + "\n" + "Computer's input: " + rps[compInput] + "\n";

if (userInput === compInput) {
    message += "It's a tie.";
} else if (userInput > compInput) {
    if (compInput == 0 && userInput == 2) {
        message += "Computer wins.";
    } else {
        message += "You win.";
    }
} else {
    if (compInput == 2 && userInput == 0) {
        message += "You win.";
    } else {
        message += "Computer wins.";
    }
}
console.log(message);
```