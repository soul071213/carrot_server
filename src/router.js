const express = require('express');
const router = express.Router();

const multer =require('multer');
const upload = multer({dest:'storage/'});

router.post('/file',upload.single('file'),(req,res)=>{
    console.log(req.file);
    res.json(req.file);
});


const webController=require('./web/controller');
const apiFeedController=require('./api/feed/controller');
const apiUserController=require('./api/user/controller');


const {logReguestTime}=require('./middleware/log');

router.get('/',webController.home);
//특정 라우트에 대해 로그 미들웨어 적용
router.get('/page/:route',logReguestTime,webController.page);

//전역적으로 미들웨어 적용
// router.use(logReguestTime);

router.post('/auth/phone',apiUserController.phone);
router.put('/auth/phone',apiUserController.phoneVerify);
router.post('/auth/register',apiUserController.register);
router.post('/auth/login',apiUserController.login);
router.post('/api/user/my',apiUserController.update);

const authenticateToken = require('./middleware/authenticate');

//피드 관련 라우트, 모든 요청에 인증 필요
router.use(authenticateToken); // 이후 모든 라우트에 인즈 필요

//마이페이지 라우트 인증 필요
router.get('/api/user/my',authenticateToken,apiUserController.show);
router.put('api/user/my',authenticateToken, apiUserController.update);

router.get('/api/feed',apiFeedController.index);
router.post('/api/feed',apiFeedController.store);
router.get('/api/feed/:id',apiFeedController.show);
router.put('/api/feed/:id',apiFeedController.update);
router.delete('/api/feed/:id',apiFeedController.delete);


const fileController = require('./api/file/controller')

router.post('/fileUpload',upload.single('file'),fileController.upload);
router.get('/file/:id',fileController.download);

module.exports= router;