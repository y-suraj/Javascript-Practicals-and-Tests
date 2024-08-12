# Intermediate Javascript

## Regular expressions (Regex)
Regular expressions, also known as regex, are simply ways to describe text patterns.

The regex pattern is specified between two slashes. This is a valid regex expression:
```js
/Javascript/
```
The above expression will match if a given string contains the word `JavaScript`.
When it matches, this means the result is positive. And this can be used to do many
things.

We can use the JavaScript built-in `match()` function for this. This function returns the regex match on the result (if there is one) in the form of the substring that matched the starting position of this string and the input string.

`match()` is just a convenient function to demonstrate how regex works. 
```js
let text = "I like Javascript!";
console.log(text.match(/javascript/));
```
Console:

```
null
```
This logs `null` because it is **case-sensitive** by default and therefore is not a match.

If you want it to be **case-insensitive**, you can specify this using an `i` after the slash. In this case-insensitive example, the expression will match the previous string:
```js
console.log(text.match(/javascript/i));
```
Console:

```
[
    'JavaScript',
    index: 7,
    input: 'I love JavaScript!',
    groups: undefined
]
```
The result is an **object**, containing the found match and the index it started on, as well as the input that was looked through. 

### Specifying multiple options for words

```js
console.log(text.match(/javascript|nodejs|react/i));
```
Console:

```
[
    'JavaScript',
    index: 7,
    input: 'I love JavaScript!',
    groups: undefined
]
```
Here, the expression matches either `javascript`, `nodejs`, or `react`. At this point, we are only matching for the first encounter and then we quit. So this is not going to find two or more matches right now—it will output the same thing as before:

```js
text = "I love React and JavaScript!";
console.log(text.match(/javascript|nodejs|react/i));
```

Console:

```
[
    'React',
    index: 7,
    input: 'I love React and JavaScript!',
    groups: undefined
]
```

If we wanted to find all matches, we could specify the global modifier, `g`. It is very similar to what we did for case-insensitive searches. 

In this example, we are checking for all matches, and it is case-insensitive. All the modifiers are behind the last slash. You can use multiple modifiers at the same time as we do below, or you could decide to only use `g`:

```js
text = "I love React and JavaScript!";
console.log(text.match(/javascript|nodejs|react/gi));
```

Console:

```
[ "React", "JavaScript" ]
```

### Character options
```js
text = "d";
console.log(text.match(/[abc]/));
```
This will return `null` because d is not `a`, `b`, or `c`. We can include `d` like this:
```js
console.log(text.match(/[abcd]/));
```

Console:

```
[ 'd', index: 0, input: 'd', groups: undefined ]
```

Since this is a range of characters, we can write it shorter, like this:
```js
text = "d";
console.log(text.match(/[a-d]/));
```

Console:

```
['d', index: 0, input: 'd', groups: undefined]
```

And if we wanted **any letter, lowercase or uppercase**, we would write this:
```js
let text = "t";
console.log(text.match(/[a-zA-Z]/));
```

Console:

```
['t', index: 0, input: 't', groups: undefined]
```

We could actually also use the **case-insensitive modifier to achieve the same thing**, but this would apply to the regex pattern as a whole, and you might only need it to apply for the specific character:
```js
console.log(text.match(/[a-z]/i));
```

Console:

```
['t', index: 0, input: 't', groups: undefined]
```

We would get a match on both of the preceding options. 

If we wanted to include **numbers** as well, we would write:
```js
console.log(text.match(/[a-zA-Z0-9]/));
```

Console:

```
['t', index: 0, input: 't', groups: undefined]
```

However, these **special characters** won't match:
```js
let text = "äé!";
console.log(text.match(/[a-zA-Z0-9]/));
```

Console:

```
null
```

To address the difficulty of complex characters not matching an expression, the **dot functions** as a special **wildcard character in regex that can match any character**. 
```js
console.log(text.match(/./g));
```

Console:

```
[ "ä", "é", "!" ]
```

```js
text = "Just some text.";
console.log(text.match(/./g));
```

Console:

```
[
    'J', 'u', 's', 't',
    ' ', 's', 'o', 'm',
    'e', ' ', 't', 'e',
    'x', 't', '.'
]
```

To find a match for the **dot character itself** or a **special character (one that is used in regex to specify a pattern)**, you can escape it using the backslach:

```js
let text = "Just some text.";
console.log(text.match(/\./g));
```

Console:

```
[
    '.'
]
```

The `\d` is a special character sequence in regex that represents a **digit**. It is used to match any single digit from 0 to 9.

```js
let text = "I'm 29 years old.";
console.log(text.match(/\d/g));
```

Console:

```
[
    [ '2', '9' ]
]
```

We can also escape the s, `\s`, which matches **all whitespace characters**:
```js
let text = "Coding is a lot of fun!";
console.log(text.match(/\s/g));
```

Console:

```
[
    [ ' ', ' ', ' ', ' ', ' ' ]
]
```

`\b`, which **matches text only when it's at the beginning of a word**.

So, in the following example, it is not going to match the instances of in `in beginning`:
```js
let text = "In the end or at the beginning?";
console.log(text.match(/\bin/gi));
```

Console:

```
[
    [ 'In' ]
]
```

Even though you can check for characters being numbers, the **`match()` method belongs to the `string`** object, so you implement it on numeric variables. For example, try the following:
```js
let nr = 357;
console.log(nr.match(/3/g));
```
You should receive a `TypeError` saying that `nr.match()` is not a function.

### Groups
If you want to **match a group of characters**, you can surround them with parentheses.

Example:
```js
let text = "I love JavaScript!";
console.log(text.match(/(love|dislike)\s(javascript|spiders)/gi));
```
Here it is going to look for either `love` or `dislike`, followed by whitespace character, followed by `javascript` or `spiders`, and it will do so for all occurences while ignoring whether they are in uppercase of lowercase. This is the log:

Console:

```
['love JavaScript']
```

Let's just say we can match on roughly four combinations here. Two of them seem to make more sense:
- Love spiders
- Dislike spiders
- Love JavaScript
- Dislike JavaScript

