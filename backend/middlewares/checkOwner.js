async function chackOwner(req, res, next) {
    try {
        const tokenId = req.user.userId
        const id  = req.params.id
        

    next();
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
        })
    }
}

module.exports = {
    chackOwner,
}