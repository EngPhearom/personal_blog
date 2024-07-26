const express = require('express');
const adminController = require('../controllers/adminControllers');

const router = express();

router.get('/admin', adminController.dashboard);

//Read
router.get('/admin/personal-info', adminController.getAll);

//Create
router.get('/admin/personal-info/create', adminController.create_get);
router.post('/admin/personal-info/create', adminController.create_post);

//Edit
router.get('/admin/personal-info/edit/:id', adminController.edit_get);
router.post('/admin/personal-info/edit', adminController.edit_post);

//Delete
router.get('/admin/personal-info/delete/:id', adminController.delete_get);


module.exports = router;