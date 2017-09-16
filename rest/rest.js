var socket = require('socket.io');
import sqlite3 from 'sqlite3';
var db = new sqlite3.Database(':memory:');
const { spawn } = require('child_process');

db.run("CREATE TABLE users (id TEXT, name TEXT, country TEXT, race TEXT, age TEXT,\
        citizenship TEXT, origin TEXT, housing TEXT, gender TEXT, income TEXT, state TEXT\
      )");
      //,riskFactor TEXT
db.run("CREATE TABLE transactions (id TEXT, date TEXT, amount TEXT)");
db.run("CREATE TABLE goals (id TEXT, item TEXT, cost TEXT)");

function addIO(server) {
  function parseDataToString(data) {
    return (data && data.toString()) || '';
  }
  var io = socket(server);
  io.on('connection', function (socket) {
    socket.on('checkUserExists', function(data) {
      db.get('SELECT id FROM users WHERE id = ' + parseDataToString(data.id), [],
        function(err, row) {
          if (row) {
            socket.emit('userExists', {data: true});
          } else {
            socket.emit('userExists', {data: false});
          }
        }
      );
    });
    socket.on('newUser', function(data) {
      const python = spawn('python3', ['../riskFactors/riskFactors.py',
        parseDataToString(data.state),
        parseDataToString(data.age)]);

      try {
        console.log('hello');
        python.stdout.on('data', function (data) {
        console.log('stdout data', data);
        var risk = JSON.parse(data).risk;
        db.run('INSERT INTO users VALUES ("' + parseDataToString(data.id) + '", "' +
                      parseDataToString(data.name) + '", "' +
                      parseDataToString(data.country) + '", "' +
                      parseDataToString(data.race) + '", "' +
                      parseDataToString(data.age) + '", "' +
                      parseDataToString(data.citizenship) + '", "' +
                      parseDataToString(data.origin) + '", "' +
                      parseDataToString(data.housing) + '", "' +
                      parseDataToString(data.gender) + '", "' +
                      parseDataToString(data.income) + '", "' +
                      parseDataToString(data.state)
                      + '", "' +
                      parseDataToString(risk)
                      + '")'
                    );
        python.stderr.on('data', (data) => {
          console.log('stderr data', data);
        })
        socket.emit('redirectHome', {data: true});
      });
    } catch (exception) {
      console.log('exception', exception);
    }
    });
    socket.on('getUser',
    function (data) {
      db.get('SELECT * FROM users WHERE id = ' + parseDataToString(data.id), [],
        function(err, row) {
          if (row) {
            socket.emit('getUser', row);
          } else {
            socket.emit('getUser', {data: false});
          }
        }
      );
    });
    socket.on('getGoal',
      function (data) {
        db.get('SELECT * FROM goals WHERE id = ' + parseDataToString(data.id), [],
          function(err, row) {
            if (row) {
              socket.emit('getUser', row);
            } else {
              socket.emit('getUser', {data: false});
            }
          }
        );
      }
    );
    socket.on('newGoal',
      function (data) {
        db.run('INSERT INTO goals VALUES ("' + parseDataToString(data.id) + '", "' +
                      parseDataToString(data.item) + '", "' +
                      parseDataToString(data.cost) + '")');
        socket.emit('redirectHome', {data: true});
      }
    );
  });
};

export default addIO;
export {addIO, db};
