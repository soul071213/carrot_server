const {pool} = require('../../database');

exports.register = async (phone,password,name)=>{
    const query = `insert into user (phone,password,name) values (?,?,?)`;

    return await pool.query(query,[phone,password,name]);
}

exports.login = async (phone,password)=>{
    const query = `select * from user where phone=? and password=?`;
    let result = await pool.query(query,[phone,password]);

    return (result.length<0) ? null : result[0];
}

exports.findByPhone = async (phone)=>{
    let result = await pool.query(`select count(*) count from user where phone=?`,[phone]);

    return (result.length<0)?null:result[0];
}

exports.findId =async (id)=>{
    const result = await pool.query(
        `select id,name,phone,created_at from user where id=?`,[id]
    );

    return (result.length<0)?null : result[0];
}

exports.update =async (id,name,image)=>{
    const profileId=image === undefined ? null : image;

    const query = `update user set name = ?,profile_id = ? where id = ?`;

    return await pool.query(query,[name,profileId,id]);
}