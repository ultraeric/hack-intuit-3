const { spawn } = require('child_process');
let today = 30;

function returnAll(initMsg, repeatMsg, rows) {
  let returnStr = '' + initMsg;
  for (var i in rows) {
    returnStr += rows[i];
  }
  return returnStr;
}

function processing(id, msg, db, sendTextMessage) {
  if (msg.includes('spending')
        && msg.includes('over')
        && (msg.includes('past') || msg.includes('last'))) {
          if (msg.includes('week')) {
            console.log('hit');
            db.all('SELECT amount FROM transactions WHERE date > 24 AND date <= 30 AND id=' + id.toString(),
            (rows) => {
              if (rows) {
                sendTextMessage(id, returnAll('Your past week\'s transactions: ', ',   Used $', rows));
              } else {
                sendTextMessage(id, 'No transactions.');
              }
            });
          } else {
            db.all('SELECT * FROM transactions WHERE id='  + id.toString(),
            (rows) => {
              if (rows) {
                sendTextMessage(id, returnAll('Your past week\'s transactions: ', ' Used $', rows));
              } else {
                sendTextMessage(id, 'No transactions');
              }
            });
          }
  }
  if (msg.includes('recurring expenses')) {
    db.all('SELECT amount FROM transactions WHERE id=' + id.toString(),
      (rows) => {
        let passObj = {};
        passObj.duration = {start: 0, end: 10000000};
        passObj.query = 'recurring';
        passObj.transactions = rows;

        const python = spawn('python3', ['./dataProcessing/dataProcessing.py',
          JSON.stringify(passObj)]);
        python.on('data', (data) => {
          var data = JSON.parse(data).data;
          if (data[0] && data[1]) {
            'Recurs every: ' + data[0].toString() + ' days.  ' +
            'Spending of: ' + data[1].toString();
          } else {
            sendTextMessage(id, 'Data not found.');
          }
        });
      });
  }
  if (msg.includes('top expenses')) {
    db.all('SELECT amount FROM transactions WHERE id=' + id.toString(),
      (rows) => {
        let passObj = {};
        passObj.duration = {start: 0, end: 10000000};
        passObj.query = 'max';
        passObj.transactions = rows;

        const python = spawn('python3', ['./dataProcessing/dataProcessing.py',
          JSON.stringify(passObj)]);
        python.on('data', (data) => {
          var data = JSON.parse(data).data;
          if (data[0]) {
            sendTextMessage(id, 'Max spent of: ' + data[0].toString());
          } else {
            sendTextMessage(id, 'Data not found.');
          }
        });
      });
  }
}
export default processing;
export {processing};
