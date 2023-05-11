/*
In this project, you will implement a data structure for a product catalog and create queries to retrieve data.
1. Create an array to hold an inventory of store items.
2. Create three items, each having the properties of name, model, cost, and quantity.
3. Add all three objects to the main array using an array method, and then log the inventory array to the console.
4. Access the quantity element of your third item, and log it to the console.
Experiment by adding and accessing more elements within your data structure.
*/

const inventory = [];

const items1 = {
    name: "Name1",
    model: "MOdel1",
    cost: 500,
    quantity: 20
}
const items2 = {
    name: "Name2",
    model: "MOdel2",
    cost: 1000,
    quantity: 5
}
const items3 = {
    name: "Name3",
    model: "MOdel3",
    cost: 5000,
    quantity: 10
}

inventory.push(items1, items2, items3);
console.log(inventory);
console.log(inventory[2].quantity); // 10