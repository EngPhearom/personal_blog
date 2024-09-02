const express = require('express');
const adminController = require('../controllers/adminControllers');

const router = express();

router.get('/admin', adminController.dashboard);

//Read
router.get('/admin/personal-info', adminController.getAll);
router.get('/admin/skill-info', adminController.getall_skill);

//Create
router.get('/admin/personal-info/create', adminController.create_get);
router.post('/admin/personal-info/create', adminController.create_post);
router.get('/admin/skill-info/create', adminController.create_skill_get);
router.post('/admin/skill-info/create', adminController.create_skill_post);

//Edit
router.get('/admin/personal-info/edit/:id', adminController.edit_get);
router.post('/admin/personal-info/edit', adminController.edit_post);
router.get('/admin/skill-info/edit/:id', adminController.edit_skill_get);
router.post('/admin/skill-info/edit', adminController.edit_skill_post);

//Delete
router.get('/admin/personal-info/delete/:id', adminController.delete_get);
router.get('/admin/skill-info/delete/:id', adminController.delete_skill);


module.exports = router;