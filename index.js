exports.register = function(server, options, next) {
    var endpoint = options.endpoint || '/';
    var alexaService = options.speechlet;

    server.route({
        method: 'POST',
        path: endpoint,
        handler: function(req, reply) {
            var payload = req.payload;
            var type = payload.request.type;


            if(type === 'LaunchRequest') {
                var response = alexaService.launch();
                reply(response);
            }

            if(type === 'IntentRequest') {
            var intent = payload.request.intent;

            alexaService[intent.name](intent.slots)
                .then(function(response) {
                    reply(response);
                });
            }
        },
        config: {
            description: 'Takes in requests posted from Amazon Alexa.'
        }
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
