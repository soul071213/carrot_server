const generateToken=require('./jwt');

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

exports.register = async (req,res)=>{
    //사용자 정보 검증 로직이 들어갈 위치
    try{
        const userInfo = {id:1,name:'홍길동'}; //가정된 사용자 정보
        const token = await generateToken(userInfo);

        res.json({result :"ok",access_token:token});
    }catch(error){
        res.status(500).json({result:"error",message:"토큰 발급 실패"});
    }
}

exports.login =(req,res)=>{
    res.send('마이페이지');
}

exports.update =(req,res)=>{
    res.send('마이페이지 수정');
}