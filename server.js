import express from 'express';
import favicon from 'serve-favicon';
import {MongoClient, ObjectID} from 'mongodb';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

import https from 'https';
import http from 'http';

import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router';
const { spawn } = require('child_process');

import {addMessengerHooks, sendTextMessage} from './messenger-bot/bot.js';
import {addIO, db} from './rest/rest';
import decisionHandler from './decisionHandling/decisionHandler';

var certificate = fs.readFileSync('/etc/letsencrypt/live/www.csua.berkeley.edu/fullchain.pem');
var privateKey = fs.readFileSync('/etc/letsencrypt/live/www.csua.berkeley.edu/privkey.pem');
var sslOpts = { key: privateKey, cert: certificate, requestCert: true, rejectUnauthorized: false,
                ca: [ fs.readFileSync('/etc/letsencrypt/live/www.csua.berkeley.edu/cert.pem') ] };

const app = express();
const regApp = express();
const server = http.createServer(regApp);
const sslServer = https.createServer(sslOpts, app);

var sslPort = 9443;
var port = 9080;
var legacyPort = 8080;

global.window = {
  addEventListener: () => {},
  scrollTo: () => {}
};
global.document = {
  addEventListener: () => {}
};

// var AppComponent = require('./src/App').default;

/* GZIP everything */
function sendBase(req, res, next) {
  fs.readFile(__dirname + '/../public/index.html', 'utf8', function (error, docData) {
    if (error) throw error;
    res.writeHead(200, {'Content-Type': 'text/html', 'Content-Encoding': 'gzip'});
 //   const AppElement = ReactDOMServer.renderToString(
 //                       <StaticRouter location={req.url} context={{}}>
 //                         <AppComponent/>
 //                       </StaticRouter>
 //                     );
 //   const document = docData.replace(/<div id="app"><\/div>/,`<div id="app">${AppElement}</div>`);
    zlib.gzip(docData, function (_, result) {
      res.end(result);
    });
  });
}

// Gets called whenever a message / image is received.
function callback(id, json) {
  if (id === 1476525979102735) {
    return;
  }
  if (json.type === 'text') {
    let msg = json.payload.text;
    sendTextMessage(id, decisionHandler(id, msg));
  } else {
    sendTextMessage(id, 'Processing your receipt now.');
    const python = spawn('python3', ['./receipt_processing/scan.py', json.payload.url]);
    python.stdout.on('data', (data) => {
      var total = JSON.parse(data).total;
      if (total) {
        sendTextMessage(id, 'Total Spent: ' + JSON.parse(data).total.toString());
      } else {
        sendTextMessage(id, 'Your receipt could not be parsed.');
      }
    });
    python.stderr.on('data', (data) => {
      console.log(data.toString());
    })
  }
}

addIO(sslServer);
addMessengerHooks(app, callback);

app.all('*', function(req, res, next) {
  if (req.path.startsWith('/newuser') || req.path.startsWith('/computers')) {
    res.redirect('https://' + req.hostname + ':' + legacyPort + req.path);
    return;
  }
  if (req.secure) {
    return next();
  }
});


app.use(favicon(path.join(__dirname, '/../public/static/images/logos/favicon.ico')));

// app.get('/bundle.js', function (req, res, next) {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'application/javascript');
//   next();
// });
//
// app.get('/bundle.css', function (req, res, next) {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/css');
//   next();
// });

app.get('/', function() {
  sendBase(...arguments);
});

app.use(express.static('public'));

app.get('*', function() {
  sendBase(...arguments);
});

sslServer.listen(sslPort,
  () => console.log('Node/express SSL server started on port ' + sslPort)
);

regApp.get('*', function(req, res) {
  res.redirect('https://' + req.hostname + ':' + sslPort);
});

server.listen(port);
