///////////////////////////////////////////////////////////////////////////////
//
// Might be deprecated when a real server is installed. But could always use
// firebase in addition to the web server; web server only used for serving
// app and not worrying about db stuff
//
///////////////////////////////////////////////////////////////////////////////
'use strict';

var config = require('../config');
var Firebase = require('firebase');
var log = require('debug')('app:api');

var db = new Firebase(config.dbroot);
var info = new Firebase(config.dbinfo);

// auth wrapper
function auth(email, token) {
  return db.authWithPassword({
    email : email,
    password : token
  });
};

// create a new user
function create(email, password) {
  return new Promise((resolve, reject) => {
    db.createUser({
      email : email,
      password : password
    }, (err, payload) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(payload);
      }
    });
  })
};

// send token in email
function token(email) {
  return new Promise((resolve, reject) => {
    db.resetPassword({
      email : email
    }, (err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve("sent");
      }
    })
  })
};

// update data at the specified path
function update(path, value) {
  return new Promise((resolve, reject) => {
    db.child(path).update(value, (err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve("success");
      }
    })
  })
}

// if only path is specified, return a new push reference to the path given,
// otherwise, push the give data to the given path and return a promise
function push(path, data) {
  if (!data) {
    return db.child(path).push();
  }

  return new Promise((resolve, reject) => {
    db.child(path).push(data, (err) => {
      if (err){
        reject(err);
      }
      else {
        resolve();
      }
    })
  })
}

// create random password
function generatePass() {
  let chars = "0123456789abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let pass = "";

  for (let i = 0; i < 32; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }

  return pass;
}

// login flow
function login(email) {
  var pass = generatePass();

  return create(email, pass).then((auth) => {
    localStorage.setItem("__cm_character_app_new_user__", "new_user_times_yeah");
    return token(email);
  }).catch((err) => {
    if (err.code === "EMAIL_TAKEN") {
      return token(email);
    }

    throw new Error(err);
  })
}

// detect changes in network
info.child('connected').on('value', (snap) => {
  if (snap.val() === true) {
    log('connected');
  }
  else {
    log('disconnected');
  }
})


// api
exports.ref = db;
exports.update = update;
exports.token = token;
exports.create = create;
exports.auth = auth;
exports.login = login;
exports.push = push;
