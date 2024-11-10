function logger(request, response, next){
    console.log(`ada request dari ${request.url}`);

    next();
};

module.exports = {logger};