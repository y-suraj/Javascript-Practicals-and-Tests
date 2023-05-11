/*
Manipulate your array using various methods, such as pop(), push(), shift(), and unshift(), and transform it into the following:
["FIRST", "Svekis", "MIDDLE", "hello World", "LAST"]
*/
const theList = ['Laurence', 'Svekis', true, 35, null, undefined, {test: 'one', score: 55}, ['one', 'two']];

theList.pop();
theList.shift();
theList.unshift("FIRST");
theList[3] = "hello world";
theList[2] = "MIDDLE";
theList.push("LAST");
console.log(theList);