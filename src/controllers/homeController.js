import db from '../models/index';

let getHomePage = async (req, res) => {
    return res.render('homepage.ejs');
}

module.exports = {
    getHomePage: getHomePage,
}