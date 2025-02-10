exports.phone =(req,res)=>{
    res.send('인증 번호 발송');
}

exports.phoneVerify =(req,res)=>{
    // console.log(req.body); // 서버 콘솔에 요청본문 출력
    // res.json(req.body); // 요청 받은 데이터를 그대로 응답으로 반환

    const {code} =req.body; //요청 본문에서 인증 번호 추철
    // const code =req.body.code; //앞의 코드와 동일

    if(code === '123456'){
        res.json({result:"ok",message:"성공"});
        return;
    }
    res.json({result:"fail",message:"인증 번호가 맞지 않습니다."});
}

exports.register =(req,res)=>{
    res.send('회원 가입');
}

exports.login =(req,res)=>{
    res.send('마이페이지');
}

exports.update =(req,res)=>{
    res.send('마이페이지 수정');
}