// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));



/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

/*
this works functionally but doesn't pass the mocha test
*/
app.get('/api/todos/search', function search(req, res) {
  newArray = [];
  for (var i=0; (i<todos.length); i++) {
    if (todos[i].task === req.query.q) {
      newArray.push(todos[i]);
    }
  }
  res.send(newArray);
});

app.get('/api/todos', function index(req, res) {
  res.send({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  var newTodo = {_id: todos[todos.length-1]._id+1, task: req.body.task, description: req.body.description};
  todos.push(newTodo);
  res.send(newTodo);
});

app.get('/api/todos/:id', function show(req, res) {
  paramId = parseInt(req.params.id);
  var found = false;
  var savedHit;
  for (var i=0; (i<todos.length&&!found); i++) {
    if (todos[i]._id === paramId) {
      found = true;
      savedHit = i;
    }
  }
  if (found === true) {
    res.send(todos[savedHit]);
  } else {
    res.send("error");
  }
});

app.put('/api/todos/:id', function update(req, res) {
  paramId = parseInt(req.params.id);
  console.log(paramId)
  var found = false;
  var savedHit;
  for (var i=0; (i<todos.length&&!found); i++) {
    if (todos[i]._id === paramId) {
      found = true;
      savedHit = i;
    }
  }
  if (found === true) {
    todos[savedHit] = {_id: paramId, task: req.body.task, description: req.body.description};
    console.log(todos);
    res.send(todos[savedHit]);
  } else {
    res.send("Todo Not Found");
  }
});

app.delete('/api/todos/:id', function destroy(req, res) {
  paramId = parseInt(req.params.id);
  var found = false;
  var savedHit;
  for (var i=0; (i<todos.length&&!found); i++) {
    if (todos[i]._id === paramId) {
      found = true;
      savedHit = i;
    }
  }
  if (found === true) {
    todos.splice(savedHit,1);
    res.send({});
  } else {
    res.send("Todo Not Found");
  }
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
