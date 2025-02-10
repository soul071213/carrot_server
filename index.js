const express = require('express');
const app=express();
const port=process.env.port || 3000;
const router=require('./src/router'); //Router 파일을 메인 애플리케이션 파일인 index.js 에서 불러와 사용하는 방법

//라우터를 애플리케이션에 등록
app.use('/',router);

//서버 시작
app.listen(port,()=>{
    console.log(`웹 서버 구동 중... ${port}`);
});