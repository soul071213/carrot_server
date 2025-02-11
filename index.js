require('dotenv').config(); // env호출
const express = require('express');
const app=express();
const port=process.env.port || 3000;
const router=require('./src/router'); //Router 파일을 메인 애플리케이션 파일인 index.js 에서 불러와 사용하는 방법
const bodyParser = require('body-parser');

//JSON 형식의 데이터 처리
app.use(bodyParser.json());

//URL 인코딩된 데이터 처리
app.use(bodyParser.urlencoded({extended:true}));

//라우터를 애플리케이션에 등록
app.use('/',router);

//서버 시작
app.listen(port,()=>{
    console.log(`웹 서버 구동 중... ${port}`);
});

//nodemon nodemon은 개발 중인 서버 코드에 어떤 변경이 발생하더라도 자동으로 서버를 재시작 해주는 유틸리티
//npm install --save-dev nodemon 설치

//다음 으로 개발 서버 실행을 용이하게 하기 위해 package.json 파일의 sciprt 부분에 새로운 스크립트를 추가합니다.
// 이 스크립트는 nodemon을 사용하여 index.js 파일과 src 디렉터리를 감시하게 설정합니다. 파일이나 디렉터리에 변화가 생기면 자동으로 서버를 재시작하도록 구성됩니다.
//또한 --inspect=0.0.0.0 옵션은 어느 컴퓨터에서든 원격 디버깅을 가능하게 해주어 차후 플러터 애플리케이션을 실행 할 대 사용자의 컴퓨터 IP를 호출해 성공저긍로 응답을 받는 등의 과정에서 필요합니다.


//multer
//파일 데이터 처리 특히 첨부파일이나 이미지 파일과 같은 멀티파트 데이터 처리에는 multer라는 미들웨어를 사용합니다.
//multer는 node js 의 강력한 파일 업로드 기능을 제공하는 미들웨어로 주로 이미지, 동영상 파일 등을 처리할 때 사용됩니다.
//이 미들웨어는 multiple/form-data 형식의 데이터를 쉽게 파싱할 수 있도록 해주며,  파일을 서버에 효율저그올 저장하고 관리할 수 있는 기능을 제공합니다.
//npm install --save multer