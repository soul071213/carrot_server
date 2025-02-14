// database.js에서 생성한 pool 객체를 가져옴 (MySQL 연결을 위한 설정)
const { pool } = require('../../database');

// 게시글 목록을 가져오는 함수 (페이지네이션 및 검색 기능 포함)
exports.index = async (page, size, keyword) => {
    // 페이지네이션을 위한 offset 계산 (몇 개의 데이터를 건너뛸지 결정)
    const offset = (page - 1) * size;

    // 기본 SQL 쿼리: feed 테이블에서 게시글 정보를 가져오고, 
    // user 테이블과 files 테이블을 조인하여 작성자 이름과 이미지 정보를 추가
    let query = `SELECT feed.*, u.name AS user_name, image_id FROM feed
    LEFT JOIN user u ON u.id = feed.user_id
    LEFT JOIN files f ON feed.image_id = f.id
    `;

    // SQL 쿼리에 바인딩할 매개변수를 저장하는 배열
    const params = [];

    // 검색어(keyword)가 존재하는 경우 제목(title) 또는 내용(content)에서 검색
    if (keyword) {
        query += `WHERE LOWER(feed.title) LIKE ? OR LOWER(feed.content) LIKE ?`;
        const keywordParams = `%${keyword}%`; // 키워드를 소문자로 변환하여 검색 (대소문자 구분X)
        params.push(keywordParams, keywordParams); // 같은 값 2번 삽입 (title, content 검색)
    }

    // 게시글을 ID 기준 내림차순 정렬하고, 페이지네이션 적용 (limit, offset 사용)
    query += ` ORDER BY feed.id DESC LIMIT ? OFFSET ? `;
    params.push(size, offset); // 한 번에 가져올 데이터 개수(size)와 시작 위치(offset) 추가

    // SQL 실행 후 결과 반환 (비동기 처리)
    return await pool.query(query, params);
};


exports.create =async(user,title,content,price,image)=>{
    const query =`insert into feed (user_id,title,content,price,image_id) values(?,?,?,?,?)`;

    //image가 undefined인 경우 null로 설정
    const imageId=image===undefined?null:image;

    return await pool.query(query,[user,title,content,price,imageId]);
}

exports.show = async(id)=>{
    const query = `select feed.*, u.name user_name, u.profile_id user_profile,image_id from feed
    left join user u on u.id = feed.user_id
    left join files f1 on feed.image_id=f1.id
    left join files f2 on u.profile_id = f2.id
    where feed.id=?
    `
    let result = await pool.query(query,[id]);
    return (result.length<0)?null:result[0];
}

exports.update = async (title,content,price,imgid,id)=>{
    const query = `update feed set title=?,content=?,price=?,image_id=? where id =?`;
    return await pool.query(query,title,content,price,imgid,id);
}

exports.delete = async id =>{
    return await pool.query(`delete from feed where id=?`,[id]);
}