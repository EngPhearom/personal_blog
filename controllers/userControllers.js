const con = require('../config/db');

const getAll = (req, res) => {
    con.query('SELECT * FROM `user` join skill', (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.render('user/index', {result});
        }
    }) 
}

module.exports = {
    getAll
}