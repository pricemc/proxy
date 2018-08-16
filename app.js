var proxy = require('redbird')({port: 80});
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var git_hash;


async function run() {
    mongoose.connect('mongodb://localhost/proxy');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Connected to DB.");
        var ProxySchema = new Schema({
            url: String,
            port: String,
            created_at: Date
        });
        ProxySchema.methods.register = function() {
            proxy.register(this.url + ".mattcprice.com", "http://localhost:" + this.port);
        }
        ProxySchema.methods.unregister = function() {
            proxy.unregister(url + ".mattcprice.com");
        }
        var ProxyObject = mongoose.model('ProxyObject', ProxySchema);

        ProxyObject.find(function (err, proxies) {
            if (err) return console.error(err);
            proxies.forEach(async element => {
                element.register();
            });
        })
        
    });
    require('child_process').exec('git rev-parse HEAD', function(err, stdout) {
        git_hash = stdout;
        console.log('Last commit hash on this branch is:', stdout);
    });

};

run();