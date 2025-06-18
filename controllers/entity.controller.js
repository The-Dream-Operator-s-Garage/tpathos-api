


/**
 * [Function that returns an entity from system]
 * @param request.body.username
 * @param response/error 
 */
module.exports.GET = (request, response) => {
    // Buscamos usuario
    let token = request.headers['x-access-token'];

    /* Sample user to avoid db */
    const sample_user = {
        "usertag": "DRAG010803MDFRVNA7",
        "birth": "03-08-2001:4500",
        "parent_usertag": "",
        "password": "$2a$10$EYzb8objNwuUoCHMwgQbQekCN6psiRQiMKKd7V0PmIBnKzl.qBHu2" // coco, 10 rounds
    }

    response.json({
        mensaje: "Get protegido",
        token: token,
        results: sample_user
    })
}