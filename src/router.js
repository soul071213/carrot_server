const express = require('express');
const router = express.Router();

const webController=require('./web/controller');
const apiFeedController=require('./api/feed/controller');
const apiUserController=require('./api/user/controller');

router.get('/',webController.home);
router.get('/page/:route',webController.page);


router.post('/auth/phone',apiUserController.phone);
router.put('/auth/phone',apiUserController.phoneVerify);
router.post('/auth/register',apiUserController.phone);
router.post('/auth/login',apiUserController.login);
router.post('/api/user/my',apiUserController.update);

router.get('/api/feed',apiFeedController.index);
router.post('/api/feed',apiFeedController.store);
router.get('/api/feed/:id',apiFeedController.show);
router.put('/api/feed/:id',apiFeedController.update);
router.delete('/api/feed/:id',apiFeedController.delete);

module.exports= router;