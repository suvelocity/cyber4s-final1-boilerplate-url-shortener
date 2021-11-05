function errorHandler(err, req, res, next){
    console.log(err);
    if(!err) return
    switch (err) {
        case '404':
            res.status(404).json({message: "Page not found"});
            break;
        default:
            res.status(500).json({message: "Server Error"})
            break;
    }
    res.send();
    next();
}

module.exports = errorHandler;
