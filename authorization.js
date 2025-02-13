const jwt =require('jsonwebtoken');

exports.showUserProfile=async (req,res)=>{
    const authHeader=req.header['authorization'];
    //Bearer 토큰에서 실제 토근 값 추출

    const token = authHeader&&authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message:'토큰이 존재 하지 않습니다'});
    }

    jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
        if(err){
            return res.status(403).json({message:'토큰이 유효하지 않습니다.'});
        }

        //토큰이 유효하다면 토큰에 담긴 사용자 정보를 사용하여 다음 작업 수행
        console.log('User : ',user);
        //여기에 로직 추가하여 유저의 프로필 데이터 처리 등을 수행
    });
}