# hapi-alexa

Hapi plugin for building Amazon Alexa apps on NodeJS.

[![NPM](https://nodei.co/npm/hapi-alexa.png)](https://nodei.co/npm/hapi-alexa/)

## Installation

Install with npm

    $ npm install --save hapi-alexa

## Example Usage

Setup a new hapi app: [Hapijs](http://hapijs.com/)

Install Plugin:

``` javascript
    var Hapi = require('hapi');
    var server = new Hapi.Server();

    server.connection({
        port: 5000
    });

    server.register([{
    register: require('hapi-alexa'),
    options: {
       speechlet: {
           launch: function(){
               return {} // response
           },
           HelloWorld: function(slot1) {
               return {}; // response from hello world intent
           }
       }
    }
    }],
    function(err) {
        if (err) {
            console.error(err);
        }
        else {
            server.start(function() {
            console.info('Server started at ' + server.info.uri);
        });
    }
    });

    server.start(function() {
        console.log('Server running at:', server.info.uri);
    });
```

## Implementing speechlet
You need to implement a javascript object to represent your speechlet. This object should respond with a json object as per the SDK documentation.

The service will automatically map intents to functions on your speechlet, the only required function is a launch function that will initialize your app.

Example "Hello World" speechlet:

``` javascript
module.exports = function() {
    return {
        setup: function(done) {
            done({
                outputSpeech: {
                    type: 'PlainText',
                    text: "Hello World"
                },
                shouldEndSession: false
            });
        },
        helloIntent: function(name, done) { // maps hello intent with a "name" slot
            done({
                outputSpeech: {
                    type: 'PlainText',
                    text: 'Hello ' + name
                },
                shouldEndSession: false;
            });
        },
        tearDown: function(done) {
            done({
                outputSpeech: {
                    type: 'PlainText',
                    text: 'Good bye.'
                },
                shouldEndSession: true
            });
        }
    }
}
```
