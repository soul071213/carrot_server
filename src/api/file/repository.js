//repository.js 는 데이터베이스와의 모든 상호작용을 처리하는 중요한 역할을 합니다.
//이 파일에서 정의된 pool.query 함수는 데이터베이스 쿼리르 실행하는 주요 메서드입니다.
// 이 함수의 첫번째 파라미터는 SQL 쿼리 문자열이며 두 번째 파라미터는 쿼리에서 사용될 데이터의 배열입니다.
//예를 들어서 INSERT INTO files(original_name,file_path,file_size) VALUES(?.?.?); 쿼리에서 ?는 첫번째 파라미터인 쿼리 문자열에 포함되며,
//실젯값은 두 번째 파라미터인 배열  [name,path,size] 에 의해 제공됩니다.
// 이 구조는 SQL 인젝션 공격을 방지하는데도 도움이 됩니다.

const {pool} = require('../../database')

exports.create=async (name,path,size)=>{
    const query=`INSERT INTO files (original_name, file_path, file_size) VALUES (?,?,?)`;
    return await pool.query(query,[name,path,size]);
}

//controller.js는 클라이언트의 요청을 처리하고 적절한 응답을 반환하는 핵심적인 컴포넌트입니다.
//이 파일에서는 데이터베이스에 데이터를 저장하는 로직을 관리하며, 저장 과정에서 발생하는 결과를 활용해 피드백을 제공합니다.

//affectedRow는 쿼리에 의해 영향 받은 행의 수를 나타내며, insertId는 새로 삽입된 행의 고유 ID를 나타냅니다.
//affectedRows가 0이면 데이터 삽입이 실패한 것을 의미합니다.
//이는 요청에 올바르게 처리되지 않았음을 나타내므로, 오류 메시지와 함께 응답을 반환할 수 있습니다.
// 반대로 , affetedRow가 1이상이면 데이터가 성공적으로 삽입되었음을 의미합니다.

