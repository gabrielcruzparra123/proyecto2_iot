
var Kafka   = require('no-kafka');
var consumer = new Kafka.SimpleConsumer();
var request = require('request');
var redis = require("redis"),
    pub = redis.createClient();

console.log('start consumer service');

var dataHandler = function (messageSet, topic, partition) {
    messageSet.forEach(function (m) {

	/*request('https://gapiu3fax4.execute-api.us-east-2.amazonaws.com/prod/arduinodata', 
			{ 	method:"POST", 
				json: true, 
				body: m.message.value.toString('utf8')
			}, (err, res, body) => 
				{
  					if (err) { return console.log(err); }
  						console.log("Error: "+err);
  						console.log(body.explanation);
				}
			);*/

		request({
            	url: " https://gapiu3fax4.execute-api.us-east-2.amazonaws.com/prod/arduinodata",
            	method: "POST",
            	json: true,
            	body: m.message.value.toString('utf8'),
        		}, 
        		function (error, response, body){
            		console.log('respuesta - '+response);
        		});
        console.log("Publish to redis: " + m.message.value.toString('utf8') + " from topic " + topic);
                pub.publish(topic, m.message.value.toString('utf8'));
    });
};

return consumer.init().then(function () {

    return consumer.subscribe('temperature', dataHandler);
});