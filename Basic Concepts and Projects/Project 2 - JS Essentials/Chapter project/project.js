// Miles to kilometers
// 1 mile = 1.60934 kilometers
let miles = window.prompt("Enter distance in miles: ");
miles = Number(miles);
let kms = miles * 1.60934;
let result = `The distance of ${kms} kms is equal to ${miles} miles`;
console.log(result);