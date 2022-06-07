const mongoose = require('mongoose');

const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const regWord = /^[a-zA-Z]{2}[a-zA-Z]*\s*\w*/;
const regCBU = /^[0-9]{16}\b/;
const regCUIL = /^[0-9]{11}\b/;

module.exports = { regEmail, regWord }