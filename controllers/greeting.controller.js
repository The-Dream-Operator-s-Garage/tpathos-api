
const {
    response
} = require('express');

// mysql connection
var config = require('../helpers/config.js');
var pool = config.pool;

/**
 * [Function that returns a greeting response message in JSON format]
 * 
 * @param {object} request - Request object from Express.js
 * @param {object} response - Response object from Express.js
 */
module.exports.GET = (request, response) => {
    const greeting = {
        "Greeting": "Hello from the protected tpathos API!",
    }

    response.json({
        status: 200,
        message: "Successfully connected to the tpathos API",
        version: "1.0.0",
        response: {
            greeting: greeting,
            request: {
                method: request.method,
                url: request.url,
                headers: request.headers,
                body: request.body,
            },
        }
    }).status(200).end();
}

/**
 * [Function that returns a greeting response message in JSON format]
 * 
 * @param {object} request - Request object from Express.js
 * @param {object} response - Response object from Express.js
 */
module.exports.GET_OWNER_TYPES = (request, response) => {
    var sql = "SELECT * FROM owner_type";
    
    pool.query(sql, function (err, sql_response) {
        if (err) throw err;
        response.json({
            status: 200,
            message: "Successfully connected to the tpathos API",
            version: "1.0.0",
            response: {
                response: sql_response,
                request: {
                    method: request.method,
                    url: request.url,
                    headers: request.headers,
                    body: request.body,
                },
            }
        }).status(200).end();
    });

}