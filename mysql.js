//mysql2 라이브러리를 통해 Node.js 환경에서 데이터베이스와의 통신을 구현하는 방법을 설명합니다

//npm install --save mysql2

//기본적인 SQL 쿼리 실행하는 기본적인 방법

//mysql2/promise 모듈을 사용하여 비동기 처리를 지원
const mysql=require('mysql2/promise');

//데이터베이스 연결 설정
async function connectDB(){
    try{
        const connection = await mysql.createConnection({
            host:'localhost',
            user:'root',
            database:'test'
        });

        //플레이스홀더를 사용한 SQL 쿼리 실행
        const [result,fields] = await connection.query(
            'Select * from `table` where `name` = ? AND `age` > ?',['Page',45]
        );


        console.log(result); //쿼리 결과
        console.log(fields); // 필드 정보
    }catch(error){
        console.error('Database connection error:',error);
    }
}

connectDB();
//이 코드는 비동기 방식으로 데이터베이스에 연결하고, 주어진 조건에 맞는 데이터를 검색하는 SQL 쿼리를 실행합니다.
// 플레이스홀더를 사용하여 쿼리를 안전하게 구성하고, SQL 인젝션 공격을 방지 할 수 있습니다.

//연결 방식과 차이점

//일반 연결
//일반연결은 데이터베이스 요청이 있을 때마다 새로운 연결을 생성하고 작업이 끝나면 연결을 종료하는 방식입니다.
//간단한 작업에 적합, 연결의 생성과 종료가 자주 발생하기 때문에 리소스 사용이 많고 대규모 사용자를 처리하기에는 효율성이 떨어질 수 있습니다.

//간단한 예
async function fetchData(){
    const connection = await mysql.createConnection({
        host:'localhost',
        user:'root',
        database:'test'
    });
    try{
        const [result] = await connection.query(
            'SELECT * FROM users'
        );


        console.log(result); //쿼리 결과
    }catch(error){
        console.error('Query error:',error);
    }finally{
        await connection.end();
    }
}

//PreparedStatement
//SQL 쿼리를 사전에 컴파일하고 같은 쿼리를 파라미터만 바꿔서 반복 실행할 수 있게 합니다.

//간단한 예
async function fetchUSerData(userId){
    const connection = await mysql.createConnection({
        host:'localhost',
        user:'root',
        database:'test'
    });
    try{
        const [result] = await connection.query(
            'SELECT * FROM users where id=?',[userId]
        );
        console.log(result); //쿼리 결과
    }catch(error){
        console.error('Query error:',error);
    }finally{
        await connection.end();
    }
}

fetchUSerData(1);

//커넥션 풀
//데이터베이스 연결을 풀에 미리 저장해두고 필요할 때마다 재사용하는 기술입니다.
// 이 방식은 연결 생성 미 종료에 따른 오버헤드를 크게 줄여줍니다.
//따라서 많은 사용자 요청을 빠르게 효율적으로 처리할 수 있습니다.

const pool =mysql.createPool({
    host:'localhost',
    user:'root',
    database:'test',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});

async function fetchPoolData(){
    try{
        const [results] =await pool.query('SELECT * FROM users');
        console.log(results);
    }catch(error){
        console.error('Pool query error:',error);
    }
}

fetchPoolData();