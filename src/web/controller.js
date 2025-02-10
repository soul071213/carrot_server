//웹 페이지의 기본 경로 '/', '/page/terms', '/page/policy' 등의 요청을 처리할 컨트롤러를 분리해 보겠습니다
//src/web/controller.js 디렉토리에 다음의 코드를 작성하여 기본 경로의 처리를 위한 home 함수와 '/page/:name' 경로를 처리할 수 있는 page 함수를 각 각 모듈로 내보냅니다.

exports.home =(req,res)=>{
    res.send('애플리케이션 소개');
}

exports.page=(req,res)=>{
    const route=req.params.route;


    if(route=='policy'){
        res.send('개인 정보 처리 방침');
    }
    if(route=='terms'){
        res.send('이용약관');
    }
}

