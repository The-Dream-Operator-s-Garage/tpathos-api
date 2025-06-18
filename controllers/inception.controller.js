const {
    response
} = require('express');

// mysql connection
var config = require('../helpers/config');
var pool = config.pool;

// messages
var msg = require('../helpers/messages')

// the pathchain
const pathchain = require("pathchain");

/**
 * INCEPT_ENTITY
 * [Function that incepts new entities into the pathchain]
 * @return response/error 
 */

module.exports.INCEPT_ENTITY = (request, response) => {
    // the entity creation
    var entity_buff = pathchain.makeEntity(request.body.secret);
    var entity_obj = pathchain.getEntityObj(entity_buff);

    var ancestor_secret_buff = pathchain.makeSecret(); // Default secret for the pioneer
    var ancestor_secret_obj = pathchain.getSecretObj(request.body.secret);

    response.json({
        status: 200,
        message: "Successfully connected to the tpathos API",
        response: {
            entity_buff: entity_buff,
            entity_obj: entity_obj,
            ancestor_secret_buff: ancestor_secret_buff,
            ancestor_secret_obj: ancestor_secret_obj,
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
 * INCEPT_PIONEER
 * [Function that incepts new entities into the pathchain]
 * @return response/error 
 */
module.exports.INCEPT_PIONEER = (request, response) => {
    var pioneer_buff = pathchain.makePioneer();
    var pioneer_obj = pathchain.getPioneerObj();

    var pioneer_secret_buff = pathchain.makeSecret(); // Default secret for the pioneer
    var pioneer_secret_obj = pathchain.getSecretObj(pioneer_secret_buff);

    // Check that the pioneer does not already exist
    var sql_check = "SELECT COUNT(`path`) AS entities FROM entity WHERE path = '" + pioneer_buff + "'";
    var sql_response = {};
    // the primal inception
    var sql = "INSERT INTO `entity`(`path`, `ancestor_id`) VALUES ('" + pioneer_buff + "', '" + pioneer_buff + "')";
    pool.query(sql_check, function (err, response) {
        if (err) throw err;
        sql_response = response;
        console.log("Pioneer inception SQL response: ", sql_response[0].entities);
        if (sql_response[0].entities == 0) {
            pool.query(sql, function (err, response) {
                if (err) throw err;
                console.log("Pioneer inception successful: ", response);
            });
        } else {
            console.log("Pioneer already exists, skipping inception");
        }
    });
    
    response.json({
        status: 200,
        message: "Successfully connected to the tpathos API",
        response: {
            pioneer_buff: pioneer_buff,
            pioneer_obj: pioneer_obj,
            pioneer_secret_buff: pioneer_secret_buff,
            pioneer_secret_obj: pioneer_secret_obj,
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
 * INCEPT_NODE
 * [Function that incepts new nodes into the pathchain]
 * 
 * @param body.owner [optional]
 * @param body.ancestor [optional]
 * @param body.content [required]
 * 
 * @return response/error 
 */
/*
module.exports.INCEPT_NODE = (body, response) => {
    
    console.log("Node body: ", body);

    // origin verification
    if(body.owner == null || body.owner == ""){
        body.owner = pathchain.makePioneer();
    }

    if(body.content == null || body.content == ""){
        return msg.inc_node_missing_content;
    }

    // the node creation
    body.id = pathchain.makeNode(body.owner, body.content);

    // ancestor verification
    if(body.ancestor == null || body.ancestor == ""){
        body.ancestor = body.id;
    }

    var pioneer_verification = this.INCEPT_PIONEER();
    console.log("Pioneer verification: ", pioneer_verification);

    // the actual inception
    var sql = "INSERT INTO node VALUES ('" + body.id + "', '" + body.owner + "', '" + body.ancestor + "')";
    pool.query(sql, function (err, response) {
        if (err) throw err;
        response.json({
            message: msg.inc_node_succ,
        })
    });
}*/
