# Built-In JS Methods

## Introduction
The difference between a method and a function is that a function is defined anywhere in the script, and a method is defined inside a class. So methods are pretty much functions on classes and instances.
```js
let s = "Hello";
console.log(
    s.concat(" there!")
        .toUpperCase()
        .replace("THERE", "you")
        .concat(" You're amazing")
);
// HELLO you! You're amazing
```

## Global methods
The global JS methods can be used without referring to the built-in object they are part of. This means that we can just use the method name as if it is a function that has been defined inside the scope we are in, without the "object" in front of it.
For example, instead of writing:
```js
let x = 7;
console.log(Number.isNaN(x)); // false
```
You can also write:
```js
console.log(isNaN(x)); // false
```

### Decoding and encoding URIs
Encoding is simply converting from one shape to another. In this case we will be dealing with percent encoding, also called URL encoding.

A *URI (uniform resource identifier)* is an identifier of a certain resource. *URL (uniform resource locator)* is a subcategory of URI that is not only an identifier, but also holds the information on how to access it (location).

An example of when you'd need encoding and decoding these URIs (and URLs) is when you are sending variables over the URL using the `get` method in a form. These variables that you are sending via the URL are called query parameters.

If something contains a space, this will be decoded, because you cannot use spaces in your URL. The will be converted to `%20`. The URL might look something like:

`https://github.com/y-suraj/Javascript-Practicals-and-Tests/tree/main/Basic%20Concepts%20and%20Projects`

All characters can be converted to some `%`-starting format. However, this is not necessary in most cases. URIs can contain number of alphanumeric characters. The special characters need to be encoded. 
An example, before encoding, is:

`https://github.com/y-suraj/Javascript-Practicals-and-Tests/tree/main/Basic Concepts and Projects`

The same URL after encoding is:

`https://github.com/y-suraj/Javascript-Practicals-and-Tests/tree/main/Basic%20Concepts%20and%20Projects`

#### `decodeUri()` and `encodeUri()`
The `decodeUri()` and `encodeUri()` are actually not really encoding and decoding, they are more so *fixing broken URIs*.
This method pair is really good at fixing broken URIs and decoding them back into a string. Here you can see them in action:
```js
let uri = "https://www.example.com/submit?name=abc def xyz";
let encoded_uri = encodeURI(uri);
console.log("Encoded:", encoded_uri);

let decoded_uri = decodeURI(encoded_uri);
console.log("Decoded:", decoded_uri);
```
Console:

```
Encoded: https://www.example.com/submit?name=abc%20def%20xyz
Decoded: https://www.example.com/submit?name=abc def xyz
```

This is great for fixing broken URIs, but it's actually a bit useless whenever you needto encode strings that contain any of these characters: `/` `,` `?` `:` `@` `&` `=` `+` `$` `#`.

#### `decodeUriComponent()` and `encodeUriComponent()`
So, the methods `decodeURI()` and `encodeURI()`, can be very useful to fix a broken URI, but they are useless when you only want to encode or decode a string that contains a character with a special meaning, such as `=` or `&`. Take the following example:

`https://www.example.com/submit?name=this&that=some thing&code=love`

Using encodeURI on this will leave us with

`https://www.example.com/submit?name=this&that=some%20thing&code=love`

There are actually 3 variables in here according to URI standards:
- `name` (value is `this`)
- `that` (value is `some thing`)
- `code` (value is `love`)

While we intended to send in one variable, `name`, with the value `this&that=some thing&code=love`.

In this case, you will need `decodeUriComponent()` and `encodeUriComponent()`,because you would need the `=` and `&` in the variable part encoded as well. Rightnow, this is not the case and it will actually cause problems in interpreting the queryparameters (the variables after the `?`). We only wanted to send in one parameter:`name`. But instead we sent in three.
```js
let uri1 = "https://www.example.com/submit?name=john wick";
let encoded_uri1 = encodeURIComponent(uri1);
console.log("Encoded:", encoded_uri1);
let decoded_uri1 = decodeURIComponent(encoded_uri1);
console.log("Decoded:", decoded_uri1);
```
Console:
```
Encoded: https%3A%2F%2Fwww.example.com%2Fsubmit%3Fname%3Djohn%20wick
Decoded: https://www.example.com/submit?name=john wick
```

Clearly, you don't want this as your URI, but the component methods are useful to encode, for example, a URL variable. If the URL variable were to contain a special character, like `=` and `&`, this would change the meaning and break the URI if these characters don't get encoded.

#### Practice exercise 1
```js
let encoded_uriP = "How's%20it%20going%3F";
console.log("Decoded:", decodeURIComponent(encoded_uriP));

let decoded_uriP = "How's it going?";
console.log("Encoded:", encodeURIComponent(decoded_uriP));

let sample_url = "https://www.somesampleurl.com?=This is a sample url.";
console.log("Encoded sample url:", encodeURIComponent(sample_url));

const uriP1 = "http://www.basescripts.com?=Hello World";
const encoded_uriP1 = encodeURI(uriP1);
console.log(encoded_uriP1);
```

Console:
```
Decoded: How's it going?
Encoded: How's%20it%20going%3F
Encoded sample url: https%3A%2F%2Fwww.somesampleurl.com%3F%3DThis%20is%20a%20sample%20url.
http://www.basescripts.com?=Hello%20World
```

### Parsing numbers
#### Making integers with `parseInt()`
With the global method `parseInt()` a string will be changed to an integer.
```js
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
```

### Making floats with `parseFloat()`
Similarly, we can use `parseFloat()` to parse a string to a float.
```js
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
```

## Array methods
### Performing a certain action for every item
 `forEach()` method takes the function that needs to be executed for every element as input.
```js
let arr = ["grapefruit", 5, "hello", 5.7, true];

function printStuff(element, index) {
    console.log("Printing stuff:", element, "on array position:", index);
}
arr.forEach(printStuff);
```
Console:
```
Printing stuff: grapefruit on array position: 0
Printing stuff: 5 on array position: 1
Printing stuff: hello on array position: 2
Printing stuff: 5.7 on array position: 3
Printing stuff: true on array position: 4
```

As you can see, it called the **`printStuff()` function for every element in the array**. 

And we can also use the **index, it is the second parameter**.

We don't need to control the flow of the loop here and we cannot get stuck at a certain point.

We just need to specify what function needs to be executed for every element. And the element will be input fro this function.

This is used a lot, especially for a more funcitonal programming style in which many methods get chained, for example, to process data.

### Filtering an array
We can use the built-in `filter()` method on an array to alter which values are in the array. 

The filter method takes a function as an argument, and this function should return a Boolean. 

If the Boolean has the value `true`, the element will end up in the filtered array. If the Boolean has the value `false`, the element will be left out. You can see how it works here:
```js
let arr1 = ["squirrel", 5, "Jed", new Date(), true];

function checkString(element, index) {
    return typeof element === "string";
}

let filterArr = arr1.filter(checkString);
console.log(filterArr);
// [ "squirrel", "Jed" ]
```
It is important to realize that the original array has not changed, the `filter()` method returns a new array with the elements that made it through the filter. We capture it here in the variable `filterArr`.

### Checking a condition for all elements
You can use the `every()` method to see whether something is true for all elements in the array. If that is the case, the `every()` method will return `true`, else it will return `false`. We are using the `checkString()` function and array from the previous example here:
```js
console.log(arr1.every(checkString));
// false

This will log `false`, since not all elements are of type `string` in the array.
```

### Replacing part of an array with another part of the array
The `copyWithin()` method can be used to replace a part of the array with another part of the array. In the first example we specify 3 arguments. 

The **first one is the target position, to which the values get copied**. 

The **second one is the start of what to copy to the target position** and the **last one is the end of the sequence that will be copied to the target position; this last index is not included**. 

Here we are only going to override position 0 with whatever is in position 3:
```js
arr = ["grapefruit", 5, "hello", 5.7, true];
arr.copyWithin(0, 3, 4);
console.log(arr)
// [ 5.7, 5, "hello", 5.7, true ]
```
If we specify a range with length 2, the first two elements after the starting position get overridden:
```js
arr = ["grapefruit", 5, "hello", 5.7, true];
arr.copyWithin(0, 3, 5);
console.log(arr);
// [ 5.7, true, "hello", 5.7, true ]
```
It is important to keep in mind that this function changes the *content* of the original array, but will never change the *length* of the original array.

### Mapping the values of an array
With the `map()` method you can change all the values in an array. This method will return a new array with all the new values.

You'll have to say how to create these new values. This can be done with the arrow function. It is going to execute the arrow function for every element in the array, so for example:
```js
arr = [1, 2, 3, 4];
mapped_arr = arr.map(x => x + 1);
console.log(mapped_arr);
// [ 2, 3, 4, 5 ]
```

### Finding the last occurance in an array
We can find the first occurrences with `indexOf()`.
To find the last occurance, we can use the `lastIndexOf()` method on an array, just as we did for `string`.
```js
let bb = ["so", "bye", "bye", "love"];
console.log(bb.lastIndexOf("bye"));
// 2

console.log(bb.lastIndexOf("hi"));
// -1
```

### Practice exercise 2
Remove duplicates from the array using `filter()` and `indexOf()`. The starting array is: 
`["Laurence", "Mike", "Larry", "Kim", "Joanne", "Laurence", "Mike", "Laurence", "Mike", "Laurence", "Mike"]`

Using the array filter() method, this will create a new array using the elements that pass the test condition implemented by the function. The final result will be: 
`[ 'Laurence', 'Mike', 'Larry', 'Kim', 'Joanne' ]`
```js
const names = ["Laurence", "Mike", "Larry", "Kim", "Joanne", "Laurence", "Mike", "Laurence", "Mike", "Laurence", "Mike"];

const res = names.filter((val, id, array) => {
    console.log(val, id, array.indexOf(val));
    return array.indexOf(val) === id;
});
console.log(res);
```
Console:
```
Laurence 0 0 
Mike 1 1 
Larry 2 2 
Kim 3 3 
Joanne 4 4 
Laurence 5 0 
Mike 6 1 
Laurence 7 0 
Mike 8 1 
Laurence 9 0 
Mike 10 1 
 [ "Laurence", "Mike", "Larry", "Kim", "Joanne" ]
```

### Practice exercise 3
Using the array `map()` method, update an array's contents. Take the following steps:
```js
const arrNum = [1, 2, 3, 4, 5, 6];

const resNum = arrNum.map(function (el) {
    return el * 2;
});
console.log(resNum);
// [ 2, 4, 6, 8, 10, 12 ]

const resNum2 = arrNum.map((el) => el * 2);
console.log(resNum2);
// [ 2, 4, 6, 8, 10, 12 ]
```

## String methods
#### Combining strings - `concat()`
```js
let s1 = "Hello ";
let s2 = "JS";
let result_c = s1.concat(s2);
console.log(result_c);
// Hello JS
```

### Converting a string to an array - `split()`
With the `split()` method we can convert a string to an array. 

Again, we will have to capture the result; it is not changing the original string.
```js
let arr_res = result_c.split(" ");
console.log(arr_res);
// [ "Hello", "JS" ]
```

As you can see, it creates an array of all the elements separated by a space. We can split by any character, for example a comma:
```js
let favFruits = "strawberry,watermelon,grapefruit";
let arr_fruits = favFruits.split(",");
console.log(arr_fruits);
// [ "strawberry", "watermelon", "grapefruit" ]
```
You can split on anything, and the string you are splitting on is left out of the result.

### Converting an array to a string - `join()`
```js
let letters = ["a", "b", "c"];
let x1 = letters.join();
console.log(x1);
// a,b,c
```
The type of `x` is string. If you want something else other than a comma, you can specify that, like this:
```js
x1 = letters.join('-');
console.log(x1);
// a-b-c
```
This can be nicely combined with the `split()` method that we covered in the previous section, which does the reverse and converts a string into an array.

### Working with index and positions - `indexOf()`, `search()`, `lastIndexOf()`, `charAt()`
When you need to search for a certain word through the user input of a log file and create a substring starting at that index. Here is an example of how to find the index of a string. The `indexOf()` method returns the index, a single number, of the first character of the substring:
```js
let poem = "Roses are red, violets are blue, if I can do JS, then you can too!";
let index_re = poem.indexOf("re");
console.log(index_re); // 7
```
This is logging `7` to the console, because the first occurrence of `re` is in `are`, and the re begins at index `7`. When it can't find an index, it will return `-1`, like this example:
```js
let indexNotFound = poem.indexOf("python");
console.log(indexNotFound); // -1
```
It is logging `-1` to indicate that the string we are searching for doesn't occur in the target string. Often you will write an `if` check to see whether it's `-1` before dealing with the result. For example:
```js
if (poem.indexOf("python") != -1) {
    // do stuff
}
```
An alternative way of searching for a particular substring within a string is to use the `search()` method:
```js
let searchStr = "When I see my fellow, I say Hello";
let pos = searchStr.search("lo");
console.log(pos); // 17
```
This will log `17`, because that is the index of `lo` in `fellow`. Much like `indexOf()`, if it cannot find it, it will return `-1`.

`search()` will accept a regex format as input, whereas `indexOf()` just takes a string. **`indexOf()` is faster than the `search()` method, so if you just need to look for a string, use `indexOf()`. If you need to look for a string pattern, you'll have to use the `search()` method**.

**`lastIndexOf()`** method returns the index where the argument string occurs last. If it cannot find it, it returns `-1`. Here is an example:
```js
let lastIndex_re = poem.lastIndexOf("re");
console.log(lastIndex_re); // 24
```
To know what character is at a certain index position, **`charAt(index)`** method comes in handy, where the **specified index position is taken as an argument**:
```js
let pos1 = poem.charAt(11);
console.log(pos1); // e
```
If you are asking for the position of an index that is out of the range of the string, it will return an empty string, as is happening in this example:
```js
let pos2 = poem.charAt(1000);
console.log(pos2);
// <empty string>
```
This will log an empty line to the screen, and if you ask for the type of `pos2`, it will return `string`.

### Creating substrings - `slice()`
```js
let str1 = "Creating a substring";
let substr1 = str1.slice(4);
let substr2 = str1.slice(2, 8);
console.log("1:", substr1);
console.log("2:", substr2);
// 1: ting a substring
// 2: eating
```

### Replacing parts of the string - `replace()`

If you need to replace a part of the string, you can use the replace(old, new) method. It takes two arguments, one string to look for in the string and one new value to replace the old value with. 
```js
let hi = "Hi there";
let new_hi = hi.replace("there", "Pascal");
console.log(new_hi);
// Hi Pascal
```
If the string you are targeting doesn't appear in the original string, the replacement doesn't take place and the original string will be returned:
```js
let new_hi2 = hi.replace("not there", "never there");
console.log(new_hi2);
// Hi there
```
It is only changing the first occurrence by default. So this example will only replace the first `hello` in the new string:
```js
let s3 = "hello hello";
let new_s3 = s3.replace("hello", "oh");
console.log(new_s3);
//  oh hello
```
If we wanted to replace all the occurences, we could use the `replaceAll()` method.
```js
s3 = "hello hello";
new_s3 = s3.replaceAll("hello", "hi");
console.log(new_s3);
// hi hi
```

### Uppercase and lowercase - `toUpperCase()`, `toLowerCase()`
We can change the letters of a string with the `toUpperCase()` and `toLowerCase()` built-in methods on string. Again, this is not changing the original string, so we'll have to capture the result:
```js
let low_bye = "bye!";
let up_bye = low_bye.toUpperCase();
console.log(up_bye);
// BYE!
```
It converts all the letters to uppercase. We can do the opposite with `toLowerCase()`:
```js
let caps = "HI HOW ARE YOU?";
let fixed_caps = caps.toLowerCase();
console.log(fixed_caps);
// hi how are you?
```
Capitalizing the first letter letter of the sentence:
```js
let first_cap = fixed_caps.charAt(0).toUpperCase().concat(fixed_caps.slice(1));
console.log(first_cap);
```
We are chaining the methods here; we first grab the first character of `fixed_caps` with `charAt(0)` and then make it uppercase by calling `toUpperCase()` on it. We then need the rest of the string and we get it by concatenating `slice(1)`.

### The start and end of a string - `startsWith()`, `endsWith()`
```js
let encouragement = "You are doing great, keep up the good work!";
let bool_start = encouragement.startsWith("You");
console.log(bool_start);
// true
```

It is case sensitive
```js
let bool_start2 = encouragement.startsWith("you");
console.log(bool_start2);
// false
```

If you don't care about uppercase or lowercase, you can use the previously discussed `toLowerCase()` method here, so that it will not take uppercase or lowercase into account:
```js
let bool_start3 = encouragement.toLowerCase().startsWith("you");
console.log(bool_start3);
// true
```
We are now converting the string to lowercase first, so we know we are only working with lowercase characters here. However, an important side note here is that this will affect performance for huge strings.
```js
let bool_end = encouragement.endsWith("Something else");
console.log(bool_end);
// false
```

### Practice exercise 4
Using string manipulation, create a function that will return a string with the first letter of all the words capitalized and the rest of the letters in lowercase. You should transform the sentence `thIs will be capiTalized for each word` into `This Will Be Capitalized For Each Word`:
```js
const given_str = "thIs will be capiTalized for each word";

function convert_str(str_arg) {
    let resStr = str_arg.toLowerCase();
    const arStr = [];
    let words_ = resStr.split(" ");

    words_.forEach(word => {
        let temp = word.slice(0, 1).toUpperCase() + word.slice(1);
        arStr.push(temp);
    });
    return arStr.join(" ");
}
console.log(convert_str(given_str));
// This Will Be Capitalized For Each Word
```

### Practice exercise 5
Using the `replace()` string method, complete this vowel replacer exercise by replacing the vowels in a string with numbers. You can start with this string:
```
I love JavaScript
```
And turn it into something like the following:
```
2 l3v1 j0v0scr2pt
```
```js
let given_str2 = "thIs will be capiTalized for each word";

given_str2 = given_str2.toLocaleLowerCase();
console.log(given_str2);

const vowels = ['a', 'e', 'i', 'o', 'u'];

vowels.forEach((el, id) => given_str2 = given_str2.replaceAll(el, id));

console.log(given_str2);
// th2s w2ll b1 c0p2t0l2z1d f3r 10ch w3rd
```

## Number methods

### Checking if something is (not) a number - `isNaN()`
`isNaN()` is a global function.
```js
let num1 = 30;
console.log(isNaN(x)); // false

// Often you will want to do the opposite, you can negate the function with an ! in front of it
console.log(!isNaN(x)); // true

let str2 = "hi";
console.log(isNaN(str2)); // true

let str3 = "5";
console.log(isNaN(str3)); // false
```

### Checking if something is finite - `isFinite()`
`isFinite()` is a global function

It checks whether something is finite. It returns `false` for `NaN`, `Infinity`, and `undefined`, and `true` for all other values:
```js
let x2 = 3;
let str4 = "finite";
console.log(isFinite(x)); // true
console.log(isFinite(str4)); // false
console.log(isFinite(Infinity)); // false
console.log(isFinite(10 / 0)); // false
```

### Checking if something is an integer - `isInteger()`
`isInteger()` is not a global method. We will have to refer to the `Number` object to use it. 

It returns `true` if the value is an integer and `false` when it's not:
```js
let x3 = 3;
let str5 = "integer";
console.log(Number.isInteger(x)); // true
console.log(Number.isInteger(str5)); // false
console.log(Number.isInteger(Infinity)); // false
console.log(Number.isInteger(2.4)); // false
```

### Specifying a number of decimals - `toFixed()`
We can tell JS how many decimals to use with the `toFixed()` method.

This is different from the rounding methods in `Math`, since we can **specify the number of decimals** here. It doesn't change the original value, so we'll have to store the result:
```js
let x4 = 1.23456;
let newX = x4.toFixed(3);
console.log(x4, newX);
// 1.23456 1.235
```

### Specifying precision - `toPrecision()`
This is different from the rounding methods in the `Math` class, since we can **specify the total number of numbers to look at**.  This comes down to JS looking at the total number of numbers. It is also counting the ones before the dot: 
```js
let x5 = 1.23456;
let newX5 = x5.toPrecision(4);
console.log(x5, newX5);
// 1.23456 1.235
```

## Math methods

### Finding the highest and lowest number - `Math.max()`, `Math.min()`
There is a built-in method `max()` to find the highest number among the arguments.
```js
let highest = Math.max(51, 98, 1694, 161, 3, 894);
console.log(highest);
// 1694
```

Similarly, we can find the lowest number with `min()`:
```js
let lowest = Math.min(51, 98, 1694, 161, 3, 894);
console.log(lowest);
// 3

let highestOfWords = Math.max("hi", 3, "bye");
console.log(highestOfWords);
// NaN
```

### Square root and raising to the power of - `Math.sqrt()`, `Math.pow()`
```js
let res1 = Math.sqrt(64);
console.log(res1); // 8

let res2 = Math.pow(5, 4);
console.log(res2); // 625
```

### Turning decimals into integers - `Math.round()`, `Math.ceil()`, `Math.floor()`

**Rounding a number - `round()`**
```js
let x6 = 6.78;
let y6 = 5.34;
console.log("X:", x6, "becomes", Math.round(x6));
console.log("Y:", y6, "becomes", Math.round(y6));
// X: 6.78 becomes 7
// Y: 5.34 becomes 5
```
**Round up - `ceil()`**
```js
console.log("X:", x6, "becomes", Math.ceil(x6));
console.log("Y:", y6, "becomes", Math.ceil(y6));
// X: 6.78 becomes 7
// Y: 5.34 becomes 6
```
Careful with negative numbers here, because -5 is higher than -6. This is how it works, as you can see in this example:
```js
let negativeX = -x6;
let negativeY = -y6;
console.log("negativeX:", negativeX, "becomes", Math.ceil(negativeX));
console.log("negativeY:", negativeY, "becomes", Math.ceil(negativeY));
// negativeX: -6.78 becomes -6
// negativeY: -5.34 becomes -5
```

**Round down - `floor()`**
```js
console.log("X:", x6, "becomes", Math.floor(x6));
console.log("Y:", y6, "becomes", Math.floor(y6));
// X: 6.78 becomes 6
// Y: 5.34 becomes 5

console.log("negativeX:", negativeX, "becomes", Math.floor(negativeX));
console.log("negativeY:", negativeY, "becomes", Math.floor(negativeY));
// negativeX: -6.78 becomes -7
// negativeY: -5.34 becomes -6
```

**trunc()**

This gives the exact same result as `floor()` for positive numbers, but it gets to these results differently. **It is *not rounding down*, it is simply only returning the integer part**:
```js
console.log("X:", x6, "becomes", Math.trunc(x6));
console.log("Y:", y6, "becomes", Math.trunc(y6));
// X: 6.78 becomes 6
// Y: 5.34 becomes 5
```
When we use negative numbers for `trunc()` we can see the difference:
```js
console.log("negativeX:", negativeX, "becomes", Math.trunc(negativeX));
console.log("negativeY:", negativeY, "becomes", Math.trunc(negativeY));
// negativeX: -6.78 becomes -6
// negativeY: -5.34 becomes -5
```

So whenever you need to round down, you'll have to use `floor()`, if you need the integer part of the number, you'll need `trunc()`.

### Exponent and logarithm
The exponent is the number to which a base is being raised. 

We use `e` (Euler's number) a lot in mathematics, this is what the `exp()` method in JS does. It returns the number to which `e` must be raised to get the input. 

We can use the `exp()` built-in method of Math to calculate the exponent, and the `log()` method to calculate the natural logarithm. You can see an example here:
```js
let x7 = 2;
let exp = Math.exp(x7);
console.log("Exp:", exp);
// Exp: 7.38905609893065

let log = Math.log(exp);
console.log("Log:", log);
// Log: 2
```

### Practice exercise 6
```js
console.log(Math.PI);
// 3.141592653589793

let pNum = 5.7;
console.log("Ceil:", Math.ceil(pNum), ", Floor:", Math.floor(pNum), ", Round:", Math.round(pNum));
// Ceil: 6 , Floor: 5 , Round: 6

console.log("Random value:", Math.random());
// Random value: 0.6167229694588592

// Generate a random number between 0 to 10
console.log("A number between 0 to 10:", Math.floor(Math.random() * 11));
// A number between 0 to 10: 1

// Generate a random number between 1 to 10
console.log("A number between 1 to 10:", Math.floor(Math.random() * 10) + 1);
// A number between 1 to 10: 3

// Generate a random number between 1 to 100
console.log("A number between 1 to 100:", Math.floor(Math.random() * 100) + 1);
// A number between 1 to 100: 98

// Create a function to generate a random number using the parameters of `min` and `max`. Run that function 100 times, returning into the console a random number from 1 to 100 each time.
function ranNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
for (let x = 0; x < 100; x++) {
    console.log(ranNum(1, 100));
}
// prints random numbers 100 times each
```

## Date methods

