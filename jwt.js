const jwt = require('jsonwebtoken');

//비동기 방식을 사용ㅎ라 경우에는 util.promisify를 사용해야합니다.
const util=require('util');
const signAsync = util.promisify(jwt.sign);
const verifyAsync = util.promisify(jwt.verify);

const privateKey = 'my_private_key';

async function generateAndVerifyToken(){
    try{
        //토큰 생성
        let token= await signAsync({foo:'bar'},privateKey); //{foo:'bar'}는 토큰에 포함할 페이로드로 사용자의 식별 정보나 권한 정보 등 필요에 따라 저장하고자 하는 데이터를 JSON 객체 형태로 포함합니다.
        //이 페이로드는 토큰이 검증될 때 함께 반환되어 필요한 곳에서 사용할 수 있습니다. 사용자의 고유 ID나 이름 등을 포함하여 사용한다면 편하게 사용할 수 있습니다.

        //privateKey는 토큰의 서명과 검증에 사용되는 비밀키로, 매우 중요한 정보입니다.
        //이 키는 복잡한 구성의 문자열을 사용해야 하며, 보안을 위해 외부에 유출되어서는 안됩니다. 일반저긍로 최소 256비트의 랜덤 데이터를 포함한 키를 사용하는 것이 좋습니다.

        //decoded 변수에 검증된 토큰의 페이로드가 담기게 됩니다. 이를 통해 토큰이 담고 있는 정보를 얻을 수 있습니다.
        //이 정보를 이용하여 서버에서는 사용자의 인증 상태를 확인하거나, 사용자에게 특정 권한을 부여하는 등의 로직을 처리할 수 있습니다.

        //토큰 검증
        let decoded = await verifyAsync(token,privateKey);
    
        console.log(decoded) //페이로드 정보 출력
    }
    catch(error){
        console.log('Error handling token:',error);
    }
}

generateAndVerifyToken();