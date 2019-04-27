const mysql = require('mysql');
const cTable = require('console.table');
const inquirer = require('inquirer');
require('dotenv').config();

let products = [];

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : process.env.SQL_PASSWORD,
  database : 'bamazon'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
});
 
connection.query('SELECT * FROM products', function (error, results, fields) {

  // Handle error after the release.
  if (error) throw error;

  for(product of results) {
    products.push([
      product.item_id,
      product.product_name,
      product.department_name,
      product.price,
      product.stock_quantity
    ]);
  }
  console.log("\n\nCurrent Stock:\n");
  console.table(['item_id', 'product_name', 'department_name', 'price', 'stock_quantity'], products);

  getPurchase();

});

function getPurchase() {
  var questions = [{
    type: 'input',
    name: 'item_id',
    message: "What is the product by item_id that you would like to purchase?",
  },
  {
    type: 'input',
    name: 'amount',
    message: "How many would you like to purchase?",
  }];
  
  inquirer.prompt(questions).then(answers => {
    doPurchase(answers.item_id, answers.amount);
  });
}

function doPurchase (item_id, amount) {
  connection.query('SELECT * FROM products WHERE item_id = ?', [item_id], function (error, results) {
    
    // Handle error
    if (error) throw error;

    let product = results[0];

    if(product.stock_quantity < amount)
    {
      console.log('\nInsufficient quantity!');
      connection.end();
    }
    else {
      completeTransaction(item_id, amount, product.price);
    }

  });
}

function completeTransaction(item_id, amount, price) {
  connection.query('UPDATE products SET stock_quantity = stock_quantity - ?  WHERE item_id = ?', [amount, item_id], function (error) {
    
    // Handle error after the release.
    if (error) throw error;

    //Calculate amount * price and force 2 decimal places
    console.log(`\nYour total comes to: ${ (price * amount).toFixed(2) }`);

  });

  //don't wan't to keep dat connection open
  connection.end();
}