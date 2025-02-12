const crypto =require('crypto');

const saltRounds =50;
const password='123456';

const result=await crypto.pbkdf2Sync(
    password,process.env.SALT_KEY,saltRounds,100,'sha512'
);

const hash=result.toString('base64');

console.log(hash);