# bamazon
A simple app that is more useful as an example of using my sql in node than in it's functionality.
The app itself is a conceptual store stock tracker that allows 'customers' to 'purchase' various goods.
## Requirements
- node
## Usage
The user must navigate to the base directory of the project and run: <br>
```npm install``` <br>
Followed by: <br>
```node bamazonCustomer.js``` <br>
The user is presented with a stock of items and given the choice of which item they would like to 'purchase' as such: <br>
![alt text](https://github.com/jamisonngordon/bamazon/raw/master/images/question1.png "question 1") <br>
And then as a follow up question: <br>
![alt text](https://github.com/jamisonngordon/bamazon/raw/master/images/question2.png "question 2") <br>
If however, the user has requested more stock that is available, they'll be presented with this error: <br>
![alt text](https://github.com/jamisonngordon/bamazon/raw/master/images/error.png "error") <br>
## Technologies used
- console.table
- dotenv
- inquirer
- mysql