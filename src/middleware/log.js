exports.logReguestTime=(req,res,next)=>{
    const start=Data.now();
    res.on('finish',()=>{
        const durantion=Data.now()-start;
        console.log(`${req.method} ${req.originUrl} - ${durantion}`);
    });
    next();
}

// 주요 미들웨어 사용 예
//express.static
// 정적 파일을 서비스하기 위해 사용됩니다. 예를 들어 이미지 CSS파일 자바스크립트 파일 들을 클라이언트에 제공하려면 express.static 미들웨어를 통해
//지정된 디렉터리의 파일들을 클라이언트에 직접 제공할 수 있습니다.

//body-parser
//클라이언트로부터 오는 요청의 본문을 쉽게 파싱할 수 있게 해주는 미들웨어입니다. JSON 형식의 데이터나 URL 인코딩된 데이터를 처리할 때 필수적으로 사용됩니다.

//cookie-parser : 쿠키를 파싱하고 클라이언트와 서버 간의 쿠키 데이터를 쉽게 주고 받을 수 있도록 합니다 이를 통해 사용자 인증이나 세션 관리 드으이 기능을 보다 효율적으로 구현할 수 있습니다.

//morgan
//HTTP 요청에 대한 로깅을 담당하는 미들웨어로 서버에 들어오는 모든 요청의 세부 사항을 기록합니다.