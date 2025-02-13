// const generateToken=require('./jwt');
const repository = require('./repository');
const jwt = require('./jwt');
const crypto =require('crypto');

exports.phone =(req,res)=>{
    const now = new Date();
    now.setMinutes(now.getMinutes()+3);

    const expiredTime = now.toISOString().replace('T',' ').substring(0,19);

    res.json({result:'ok',expired:expiredTime});
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
    const {phone,password,name} = req.body;

    let {count} = await repository.findByPhone(phone);

    if(count > 0){
        return res.send({result:"fail",message:'중복된 휴대폰 번호가 존재합니다.'});
    }

    const result = await crypto.pbkdf2Sync(password,process.env.SALT_KEY,50,100,'sha512');

    const {affectedRows,insertId}= await repository.register(phone,result.toString('base64'),name);

    if(affectedRows>0){
        const data= await jwt({id:insertId,name});
        res.send({result:'ok',access_token:data});
    }
    else{
        res.send({result:'fail',message:'알 수 없는 오류'})
    }

    //사용자 정보 검증 로직이 들어갈 위치
    // try{
    //     const userInfo = {id:1,name:'홍길동'}; //가정된 사용자 정보
    //     const token = await generateToken(userInfo);

    //     res.json({result :"ok",access_token:token});
    // }catch(error){
    //     res.status(500).json({result:"error",message:"토큰 발급 실패"});
    // }
}

exports.login = async (req,res)=>{
    const {phone,password} =req.body;

    const result = await crypto.pbkdf2Sync(password,process.env.SALT_KEY,50,100,'sha512');
    const item=await repository.login(phone,result.toString('base64'));

    if(item==null){
        res.send({result:'fail',message:'휴대폰 번호 혹은 비밀번호를 확인해 주세요'});
    }
    else{
        const data = await jwt({id:item.id,name:item.name});
        return res.send({result:'ok',access_token:data});
    }
}

exports.update =(req,res)=>{
    res.send('마이페이지 수정');
}

exports.show = async (req,res)=>{
    const user = req.user;  // 미들웨어에서 추가된 사용자 정보

    //데이터베이스에서 사용자 정보 조회
    const item =await repository.findId(user.id);

    if(item==null){
        res.send({result:'fail' , message:'회원을 찾을 수 없습니다.'});
    }
    else{
        res.send({result:'ok',data:item});
    }
}

exports.update = async(req,res)=>{
    const {name,profile_id}=req.body;
    const user=req.user;

    const result =await repository.update(user.id,name,profile_id);

    if(result.affectedRows>0){
        const item=await repository.findId(user.id);
        res.send({result : 'ok',data:item});
    }

    else{
        res.send({result : 'fail',message:'오류가 발생하였습니다.'});
    }
}