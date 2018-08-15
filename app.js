var proxy = require('redbird')({port: 80});
const mongoose = require('mongoose'); 

proxy.register("dev.mattcprice.com", "http://localhost:81");