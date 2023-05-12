// Ask the user to enter a number and check whether it's greater than, equal to, or less than a dynamic number value in your code. Output the result to the user.

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
