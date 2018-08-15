var proxy = require('redbird')({port: 80});

proxy.register("dev.mattcprice.com", "http://google.com");