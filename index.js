//node js 만을 가지고 서버 구축한것

// const http =require('http');
// const port = process.env.PORT || 3000;

// http.createServer((req,res)=>{
//     res.setHeader("Content-Type","text/plain");

//     if(req.url==='/'){
//         res.statusCode=200;
//         res.end("Hello Wrold");
//     }
//     else if(req.url==='/about'){
//         res.statusCode=200;
//         res.end("About page");
//     }else{
//         res.statusCode=404;
//         res.end("404 Not Found");
//     }
// }).listen(port);

const express = require('express');
const app = express(); //Express 생성은 express() 함수를 호출하여 새로운 Express 애플리케이션 인스턴스를 생성합니다. 이 인스턴스는 애플리케이션의 여러 설정을 관리하고, 라우팅 같은 주요 기능을 처리합니다.
const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{ //라우팅 설정은 app.get 메서드를 사용해 특정 HTTP 경로에 대한 요청을 처리합니다. 예를 들어 '/' 경로로 들어오는 GET 요청에 대해 "Hello World" 라는 응답을 '/about' 경로에 대해서는 "About page" 라는 응답을 설정했습니다.
    res.send('정한울 개꼬치');
});
app.get('/about',(req,res)=>{
    res.send('About page');
});
app.listen(port,()=>{ //서버 시작은 app.listen 메서드를 사용하여 지정된 포트에서 Express 애플리케이션을 시작합니다. 서버가 정상적으로 시작되면, 콘솔에 "웹서버 구동..." 메서지와 함게 사용된 포트 번호를 출력합니다.
    console.log(`웹 서버 구동... ${port}`);
});

//URL 파라미엍 사용 예시
//URL의 일부를 변수로 사용하여 동적 데이터를 처리 할 수 있습니다.
app.get('/usersURLParams/:userId',(req,res)=>{
    res.send(`User ID: ${req.params.userId}`);
});

//쿼리 스트링 사용 예시
//URL에 포함되어 서버에 추가 정보를 전달하는 방법입니다.
//쿼리 스트링은 주로 '?' 기호 이후에 시작하며 여러 키-값 쌍을 포함할 수 있습니다. 각 키와 값은 =로 연결되고, 여러 키-값 쌍은 &로 구분됩니다.
//예를 들어 /users?name=john&age=30은 name과 age 라는 두 가지 정보를 서버에 전달합니다. 이러한 방식으로 데이터를 전달하믕로써 웹 페이지는 동적으로 내용을 변경하거나,
//사용자의 요청에 맞게 정보를 필터링하고 정렬할 수 있습니다.

app.get('/usersQuery',(req,res)=>{
    const {sortBy,order}=req.query;
    res.send(`Sorting by ${sortBy} in ${order} order`);
});

//http://localhost:3000/usersQuery?sortBy=2&order=6
//출력 : Sorting by 2 in 6 order

//바디 데이터 사용 예시
//HTTP POST나 PUT 메서드를 사용할 때 요청의 바디에 데이터를 포함하여 서버로 전송합니다.
//이 데이터는 폼 데이터, JSON,XML 등 다양한 형태로 구성될 수 있으며 주로 더 복잡하고 구조화된 정보를 전달할 때 사용됩니다.
// 서버에서 이러한 데이터를 읽기 위해서는 body-parser와 같은 미들웨어가 필요합니다. 
//body-parser는 요청의 바디를 파싱하여 쉽게 접근 할 수 있도록 해줍니다.

app.post('/usersBody',(req,res)=>{
    const {name,email} =req.body;
    res.send(`Creating user with name : ${name}, email: ${email}`);
});

// res.send : 가장 기본적인 응답으로, 다양한 유형의 데이터를 클라이언트에게 전송할 수 있습니다. 모든 종류의 데이터를 처리할 수 있습니다. Express는 자동으로 Content-Type을 설정하여 클라이언트가 해석할 수 있게 합니다

// res.json : JSON 형식의 데이터를 클라이언트에게 전송할 수 있습니다. API 개발 시 데이터 교환 포맷으로 널리 사용됩니다. 이 메서드는 자동으로 Content-Type을 application/json으로 설정합니다.

app.get('/api/data',(req,res)=>{
    res.json({message:"this is a json response"});
});

//res.sendFile : 서버의 파일 시스템에 있는 파일을 클라이언트에게 직접 전송합니다. 이미지 PDF 파일 HTML 문서 등을 전송할 때 사용됩니다. 파일 경로는 절대 경로나 상대 경로로 지정할 수 있습니다.
const path = require('path');

app.get('/files', (req, res) => {
    res.sendFile(path.join(__dirname, 'img', 'gamasin.webp'));
});

//res.redirect() : 클라이언트를 다른 URL로 리다이렉션 합니다. 이는 사용자가 잘못된 경로에 접근했을 때 올바른 페이지로 안내하거나 로그인 후 원래 요청했던 페이지로 돌아가게 하는 데 유용합니다.
app.get('/old-page',(res,req)=>{
    res.redirect('https://www.youtube.com/watch?v=SLV13ErV5F4');
});

//res.status : 응답의 HTTP 상태 코드를 명시적으로 설정할 수 있습니다. 이는 에러 페이지 전송 성공 응답의 상세화 등에 사용됩니다.
// 메서드 체이닝을 통해 send()나 json 등과 함께 사용될 수 있습니다.

app.post('/api/usersss',(req,res)=>{
    res.status(201).send('User create');
});

