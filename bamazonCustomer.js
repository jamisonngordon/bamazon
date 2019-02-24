var mysql = require('mysql');
const cTable = require('console.table');
require('dotenv').config();

let products = [];

var connection = mysql.createConnection({
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
  // When done with the connection, release it.

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

  // Handle error after the release.
  if (error) throw error;

  // Don't use the connection here, it has been returned to the pool.
});

connection.end();