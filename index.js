const cron = require('cron');
const http = require('http');
const webSocketServer = require('websocket').server;

var cronJob = cron.CronJob;

var server = http.createServer().listen(process.env.PORT || 3000);
var isRunning = false;
var job = {};

server.on('request', function (req, res) {
    res.writeHead('200', {'Content-Type': 'text/plain'});
    if (req.method == 'GET') {
        res.write('Bull shit !');
        res.end();
    }
    if (req.method == 'PUT') {
        if (!isRunning) {
            job = new cronJob('* * * * * *', function () {
                console.log('New job scheduled !!');
            }, null, false, null);
            job.start();
            isRunning = true;
            res.write('Job scheduled');
            res.end();
        } else {
            res.write('Job already scheduled');
            res.end();
        }
    } else if (req.method == 'DELETE') {
        if (isRunning) {
            job.stop();
            isRunning = false;
            job = {};
            res.write('Job cancelled !');
            res.end();
        } else {
            res.write('No job in system');
            res.end();
        }
    }
});

