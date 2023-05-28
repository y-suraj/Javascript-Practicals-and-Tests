// Built-In JS Methods

/// Introduction
// The difference between a method and a function is that a function is defined anywhere in the script, and a method is defined inside a class. So methods are pretty much functions on classes and instances.

let s = "Hello";
console.log(
    s.concat(" there!")
        .toUpperCase()
        .replace("THERE", "you")
        .concat(" You're amazing")
);
// HELLO you! You're amazing

/// Global methods
// The global JS methods can be used without referring to the built-in object they are part of. This means that we can just use the method name as if it is a function that has been defined inside the scope we are in, without the "object" in front of it.
// For example, instead of writing:
let x = 7;
console.log(Number.isNaN(x)); // false
// You can also write:
console.log(isNaN(x)); // false

//// Decoding and encoding URIs
// Encoding is simply converting from one shape to another. In this case we will be dealing with percent encoding, also called URL encoding.

// A *URI (uniform resource identifier)* is an identifier of a certain resource. *URL (uniform resource locator)* is a subcategory of URI that is not only an identifier, but also holds the information on how to access it (location).

// An example of when you'd need encoding and decoding these URIs (and URLs) is when you are sending variables over the URL using the `get` method in a form. These variables that you are sending via the URL are called query parameters.

// If something contains a space, this will be decoded, because you cannot use spaces in your URL. The will be converted to `%20`. The URL might look something like:

// `https://github.com/y-suraj/Javascript-Practicals-and-Tests/tree/main/Basic%20Concepts%20and%20Projects`

// All characters can be converted to some `%`-starting format. However, this is not necessary in most cases. URIs can contain number of alphanumeric characters. The special characters need to be encoded. 
// An example, before encoding, is:
// `https://github.com/y-suraj/Javascript-Practicals-and-Tests/tree/main/Basic Concepts and Projects`

// The same URL after encoding is:
// `https://github.com/y-suraj/Javascript-Practicals-and-Tests/tree/main/Basic%20Concepts%20and%20Projects`

///// `decodeUri()` and `encodeUri()`
// The decodeUri() and encodeUri() are actually not really encoding and decoding, they are more so *fixing broken URIs*.
// This method pair is really good at fixing broken URIs and decoding them back intoa string. Here you can see them in action:
let uri = "https://www.example.com/submit?name=abc def xyz";
let encoded_uri = encodeURI(uri);
console.log("Encoded:", encoded_uri);

let decoded_uri = decodeURI(encoded_uri);
console.log("Decoded:", decoded_uri);
// Console:
// Encoded: https://www.example.com/submit?name=abc%20def%20xyz
// Decoded: https://www.example.com/submit?name=abc def xyz

// This is great for fixing broken URIs, but it's actually a bit useless whenever you needto encode strings that contain any of these characters: `/` `,` `?` `:` `@` `&` `=` `+` `$` `#`.

///// `decodeUriComponent()` and `encodeUriComponent()`
// So, the methods `decodeURI()` and `encodeURI()`, can be very useful to fix a broken URI, but they are useless when you only want to encode or decode a string that contains a character with a special meaning, such as `=` or `&`. Take the following example:
// `https://www.example.com/submit?name=this&that=some thing&code=love`

// Using encodeURI on this will leave us with
// `https://www.example.com/submit?name=this&that=some%20thing&code=love`

// There are actually 3 variables in here according to URI standards:
// - `name` (value is `this`)
// - `that` (value is `some thing`)
// - `code` (value is `love`)

// While we intended to send in one variable, `name`, with the value `this&that=some thing&code=love`.

// In this case, you will need `decodeUriComponent()` and `encodeUriComponent()`,because you would need the `=` and `&` in the variable part encoded as well. Rightnow, this is not the case and it will actually cause problems in interpreting the queryparameters (the variables after the `?`). We only wanted to send in one parameter:`name`. But instead we sent in three.

let uri1 = "https://www.example.com/submit?name=john wick";
let encoded_uri1 = encodeURIComponent(uri1);
console.log("Encoded:", encoded_uri1);
let decoded_uri1 = decodeURIComponent(encoded_uri1);
console.log("Decoded:", decoded_uri1);
// Console:
// Encoded: https%3A%2F%2Fwww.example.com%2Fsubmit%3Fname%3Djohn%20wick
// Decoded: https://www.example.com/submit?name=john wick

// Clearly, you don't want this as your URI, but the component methods are useful to encode, for example, a URL variable. If the URL variable were to contain a special character, like = and &, this would change the meaning and break the URI if these characters don't get encoded.

// Practice exercise 1
let encoded_uriP = "How's%20it%20going%3F";
console.log("Decoded:", decodeURIComponent(encoded_uriP));

let decoded_uriP = "How's it going?";
console.log("Encoded:", encodeURIComponent(decoded_uriP));

let sample_url = "https://www.somesampleurl.com?=This is a sample url.";
console.log("Encoded sample url:", encodeURIComponent(sample_url));

const uriP1 = "http://www.basescripts.com?=Hello World";
const encoded_uriP1 = encodeURI(uriP1);
console.log(encoded_uriP1);

// Console:
// Decoded: How's it going?
// Encoded: How's%20it%20going%3F
// Encoded sample url: https%3A%2F%2Fwww.somesampleurl.com%3F%3DThis%20is%20a%20sample%20url.
// http://www.basescripts.com?=Hello%20World

//// Parsing numbers
///// Making integers with `parseInt()`
// With the global method `parseInt()` a string will be changed to an integer.

let str_int = "6";
let int_int = parseInt(str_int);
console.log("Type of", int_int, "is", typeof int_int);
// Type of 6 is number

let str_float = "7.6";
let int_float = parseInt(str_float);
console.log("Type of", int_float, "is", typeof int_float);
// Type of 7 is number

let str_bin = "010b101";
let int_bin = parseInt(str_bin);
console.log("Type of", int_bin, "is", typeof int_bin);
// Type of 10 is number

let str_nan = "Hello!";
let int_nan = parseInt(str_nan);
console.log("Type of", int_nan, "is", typeof int_nan);
// Type of NaN is number

///// Making floats with `parseFloat()`

let str_float1 = "7.6";
let float_float = parseFloat(str_float1);
console.log("Type of", float_float, "is", typeof float_float);
// Type of 7.6 is number

let str_version_nr = "2.3.4";
let float_version_nr = parseFloat(str_version_nr);
console.log("Type of", float_version_nr, "is", typeof float_version_nr);
// Type of 2.3 is number

let str_int1 = "6";
let float_int = parseFloat(str_int1);
console.log("Type of", float_int, "is", typeof float_int);
// Type of 6 is number

let str_binary = "012b101";
let float_binary = parseFloat(str_binary);
console.log("Type of", float_binary, "is", typeof float_binary);
// Type of 12 is number

let str_nan1 = "hello!";
let float_nan1 = parseFloat(str_nan1);
console.log("Type of", float_nan1, "is", typeof float_nan1);
// Type of NaN is number

//// Array methods
///// Performing a certain action for every item
// `forEach()` method takes the function that needs to be executed for every element as input.

let arr = ["grapefruit", 5, "hello", 5.7, true];

function printStuff(element, index) {
    console.log("Printing stuff:", element, "on array position:", index);
}
arr.forEach(printStuff);

// Console:
// Printing stuff: grapefruit on array position: 0
// Printing stuff: 5 on array position: 1
// Printing stuff: hello on array position: 2
// Printing stuff: 5.7 on array position: 3
// Printing stuff: true on array position: 4

// As you can see, it called the **`printStuff()` function for every element in the array**. 
// And we can also use the **index, it is the second parameter**.
// We don't need to control the flow of the loop here and we cannot get stuck at a certain point.
// We just need to specify what function needs to be executed for every element. And the element will be input fro this function.
// This is used a lot, especially for a more funcitonal programming style in which many methods get chained, for example, to process data.

///// Filtering an array
// We can use the built-in `filter()` method on an array to alter which values are in the array. 
// The filter method takes a function as an argument, and this function should return a Boolean. 
// If the Boolean has the value `true`, the element will end up in the filtered array. If the Boolean has the value `false`, the element will be left out. You can see how it works here:

let arr1 = ["squirrel", 5, "Jed", new Date(), true];

function checkString(element, index) {
    return typeof element === "string";
}

let filterArr = arr1.filter(checkString);
console.log(filterArr);
// [ "squirrel", "Jed" ]

// It is important to realize that the original array has not changed, the `filter()` method returns a new array with the elements that made it through the filter. We capture it here in the variable `filterArr`.

///// Checking a condition for all elements
// You can use the `every()` method to see whether something is true for all elements in the array. If that is the case, the `every()` method will return `true`, else it will return `false`. We are using the `checkString()` function and array from the previous example here:

console.log(arr1.every(checkString));
// false

// This will log `false`, since not all elements are of type `string` in the array.

///// Replacing part of an array with another part of the array
// The `copyWithin()` method can be used to replace a part of the array with another part of the array. In the first example we specify 3 arguments. 
// The **first one is the target position, to which the values get copied**. 
// The **second one is the start of what to copy to the target position** and the **last one is the end of the sequence that will be copied to the target position; this last index is not included**. 
// Here we are only going to override position 0 with whatever is in position 3:

arr = ["grapefruit", 5, "hello", 5.7, true];
arr.copyWithin(0, 3, 4);
console.log(arr)
// [ 5.7, 5, "hello", 5.7, true ]

// If we specify a range with length 2, the first two elements after the starting position get overridden:
arr = ["grapefruit", 5, "hello", 5.7, true];
arr.copyWithin(0, 3, 5);
console.log(arr);
// [ 5.7, true, "hello", 5.7, true ]

// It is important to keep in mind that this function changes the *content* of the original array, but will never change the *length* of the original array.

///// Mapping the values of an array
// With the `map()` method you can change all the values in an array. This method will return a new array with all the new values.
// You'll have to say how to create these new values. This can be done with the arrow function. It is going to execute the arrow function for every element in the array, so for example:

arr = [1, 2, 3, 4];
mapped_arr = arr.map(x => x + 1);
console.log(mapped_arr);
// [ 2, 3, 4, 5 ]

///// Finding the last occurance in an array
// We can find the first occurrences with `indexOf()`.
// To find the last occurance, we can use the `lastIndexOf()` method on an array, just as we did for `string`.

let bb = ["so", "bye", "bye", "love"];
console.log(bb.lastIndexOf("bye"));
// 2

console.log(bb.lastIndexOf("hi"));
// -1

///// Practice exercise 2
// Remove duplicates from the array using `filter()` and `indexOf()`. The starting array is: ["Laurence", "Mike", "Larry", "Kim", "Joanne", "Laurence", "Mike", "Laurence", "Mike", "Laurence", "Mike"]

// Using the array filter() method, this will create a new array using the elements that pass the test condition implemented by the function. The final result will be: [ 'Laurence', 'Mike', 'Larry', 'Kim', 'Joanne' ]

const names = ["Laurence", "Mike", "Larry", "Kim", "Joanne", "Laurence", "Mike", "Laurence", "Mike", "Laurence", "Mike"];

const res = names.filter((val, id, array) => {
    console.log(val, id, array.indexOf(val));
    return array.indexOf(val) === id;
});
console.log(res);

// Console:

// Laurence 0 0 
// Mike 1 1 
// Larry 2 2 
// Kim 3 3 
// Joanne 4 4 
// Laurence 5 0 
// Mike 6 1 
// Laurence 7 0 
// Mike 8 1 
// Laurence 9 0 
// Mike 10 1 
//  [ "Laurence", "Mike", "Larry", "Kim", "Joanne" ]

///// Practice exercise 3
// Using the array `map()` method, update an array's contents. Take the following steps:

const arrNum = [1, 2, 3, 4, 5, 6];

const resNum = arrNum.map(function(el){
    return el*2;
});
console.log(resNum);
// [ 2, 4, 6, 8, 10, 12 ]

const resNum2 = arrNum.map((el)=>el*2);
console.log(resNum2);
// [ 2, 4, 6, 8, 10, 12 ]

//// String methods