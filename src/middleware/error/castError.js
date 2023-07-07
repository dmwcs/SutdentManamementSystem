module.exports = (err, req, res, next) => {
    if(err.name === 'CastError'){
        res.status(400).json({error: err.message});
        return;
    }
    next(err);
}
