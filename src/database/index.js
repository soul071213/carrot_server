//데이터 베이스 연결의 핵심

const { query } = require('express');
const mysql = require('mysql2/promise');

exports.pool=mysql.createPool(
    {
        host:process.env.DB_HOST,
        user:process.env.DB_USERNAME,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_DATABASE,
        waitForConnections:true,
        connectionLimit:10,
        queueLimit:0
    }
);


exports.pool.query = async (queryString,params)=>{
    const [result] = await this.pool.execute(queryString,params);
    return result;
}