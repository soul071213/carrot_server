//코드의 중복을 줄이기 위하여 토큰을 인증하는 코드를 미들웨어로 만들어 코드 중복을 줄인다

const jwt =require('jsonwebtoken');

function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];

    //Bearer 토큰에서 실제 토큰 값 추출
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).send({meesage:'토큰이 없습니다.'});
    }

    jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
        if(err){
            return res.status(403).send({message:'유효하지 않은 토큰'});
        }

        //토큰이 유효하지 사용자 정보를 요청 객체에 추가
        req.user=decoded;
        next();
    });
}

module.exports=authenticateToken;