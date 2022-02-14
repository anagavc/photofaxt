//requiring the express error class
const ExpressError = require('./utils/ExpressError');
//middleware to prevent unauthorized access to the admin contents
module.exports.isAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.orginalUrl
        req.flash('error', 'You do not have admin access');
        return res.redirect('login')
    }
    next()
};
