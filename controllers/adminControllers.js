const con = require('../config/db');
const fs = require('fs');

const dashboard = (req, res) => {
    res.render('admin/index');
}

const getAll = (req, res) => {
    con.query('select * from user', (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.render('admin/list-personal-info', {result});
        }
    }) 
}

const create_get = (req, res) => {
    res.render('admin/create-personal-info');
}

const create_post = (req, res) => {
    let img = null;

    if(req.files){
        var timestamp = Date.now();
        var file = req.files.file;
        var filename = timestamp + file.name;
        
        file.mv('./public/uploads/' + filename, (err) => {
            if(err){
                console.log(err);
            }
        })
        img = filename;
    }

    const body = req.body;
    const sql = 'INSERT INTO `user`(`fullname`, `nick_name`, `avarta`, `current_position`, `status`, `email`, `phone`, `about_me`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const myarr = [body.fullname, body.nickname, img, body.currentposition, body.status, body.email, body.phone, body.aboutme];

    con.query(sql, myarr, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.redirect('/admin/personal-info');
        }
    })
}

const edit_get = (req, res) =>  {
    con.query('select * from user where id = ?', [req.params.id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.render('admin/edit-personal-info', {result});
        }
    })
}

const edit_post = (req, res) =>  {
    console.log(req.params.id)
    console.log(req.body);
    let body = req.body;
    let img = req.body.img;

    if(req.files){
        var timestamp = Date.now();
        var file = req.files.file;
        var filename = timestamp + file.name;
        file.mv('./public/uploads/' + filename, (err) => {
            if(err){
                console.log(err);
            }
        });
        fs.unlinkSync('public/uploads/' + img);
        img = filename;
    }

    const sql = 'UPDATE `user` SET `fullname`= ?,`nick_name`= ?,`avarta`=?,`current_position`=?,`status`=?,`email`=?,`phone`=?,`about_me`=? WHERE id = ?';
    const myarr = [body.fullname, body.nickname, img, body.currentposition, body.status, body.email, body.phone, body.aboutme, body.id];
    con.query(sql, myarr, (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.redirect('/admin/personal-info');
        }
    });
}

const delete_get = (req, res) => {
    con.query('delete from user where id = ?', [req.params.id], (err, data) => {
        if(err){
            console.log(err)
        }

        res.redirect('/admin/personal-info/create');
    })
}

const getall_skill = (req, res) =>{
    con.query('select * from skill', (err, result) =>{
        if(err){
            console.log(err)
        }
        else{
            res.render('admin/list-skill', {result})
        }
    })
}

const create_skill_get = (req, res) =>{
    res.render('admin/create-skill');
}

const create_skill_post = (req, res) =>{
    var sql = 'INSERT INTO `skill` (`nameskill`, `value`) values (?,?)'
    var body = req.body;
    var arr = [body.nameskill, body.value]
    con.query(sql,arr,(err, result) =>{
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/admin/skill-info')
        }
    })
}

const edit_skill_get = (req, res) =>{
    con.query('select * from skill where id = ?', [req.params.id], (err, result) =>{
        if(err){
            console.log(err)
        }
        else{
            res.render('admin/edit-skill', {result})
        }
    })
}

const edit_skill_post = (req, res) =>{
    var sql = 'UPDATE `skill` SET `nameskill` = ?, `value` = ? where `id` = ?';
    var body = req.body;
    var arr = [body.nameskill, body.value, body.hiddenid]
    con.query(sql, arr, (err, result) => {
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/admin/skill-info')
        }
    })
}

const delete_skill = (req, res) =>{
    var sql = 'delete from skill where id =?';
    con.query(sql, [req.params.id], (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/admin/skill-info');
        }
    })
}

module.exports = {
    dashboard,
    getAll,
    create_get,
    create_post,
    edit_get,
    edit_post,
    delete_get,
    getall_skill,
    create_skill_get,
    create_skill_post,
    edit_skill_get,
    edit_skill_post,
    delete_skill
}