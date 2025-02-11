const jwt = require('jsonwebtoken');
const util=require('util');

//jwt.sign 함수를 비동기적으로 사용할 수 있게 변환
const signAsync = util.promisify(jwt.sign);
const privateKey = process.env.JWT_KEY;  ///환경 변수 JWT_KEY를 이용한 모습입니다.

async function generateToken(payload){
    return await signAsync(payload,privateKey);
}

module.exports = generateToken;

//애플리케이션에 토큰 기반 인증 시스템을 효율저긍로 통합하기 위해 먼저 인증과 검증에 필요한 privateKey를 .env 파일에 저장합니다.
//이는 JWT_KEY라는 환경 변수로 설정되며, 버전 관리 시스템에 포함되지 않아야 합니다.

//api/user 디렉터리에서 JWT 관련 함수들을 관리하기 쉽게 jwt.js라는 모듈 파일을 생성합니다.
//이 파일에서는 jsonwebtoken 라이브러리를 사용하여 토큰을 생성하는 함수를 정의하고, 비동기저긍로 토큰을 생성할 수 있도록 util.promisify를 사용합니다.