

const protect = (req, res, next) => {

    const { user } = req.session;

    if(!user) {
        return res.status(404).json({
            status: 'fail session 4',
            message: 'unauthorized'
        })
    }

    req.user = user;
    next();
}
module.exports = protect;
