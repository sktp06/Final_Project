const express = require('express');
const app = express();


app.use(express.static('public'));


//call ejs template
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/login.html');
});

app.get('/table', function(req, res) {
    res.sendFile(__dirname + '/table.html');
});

app.get('/sign_up', function(req, res) {
    res.sendFile(__dirname + '/sign_up.html');
});

app.get('/menu', function(req, res) {
    res.sendFile(__dirname + '/menu.html');
});

app.get('/cart', function(req, res) {
    res.sendFile(__dirname + '/cart.html');
});

app.get('/myOrder', function(req, res) {
    res.sendFile(__dirname + '/myOrder.html');
});


//running on port 3000
app.listen(3000);
console.log('Server is listening on port 3000');