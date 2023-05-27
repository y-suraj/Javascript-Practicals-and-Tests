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