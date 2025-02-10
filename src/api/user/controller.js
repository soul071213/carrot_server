exports.phone =(req,res)=>{
    res.send('인증 번호 발송');
}

exports.phoneVerify =(req,res)=>{
    res.send('인증 번호 검증');
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