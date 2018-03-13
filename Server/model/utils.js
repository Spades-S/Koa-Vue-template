const mysql = require('mysql')
const config = require('../config/mysql')

const pool = mysql.createPool({
    connectionLimit: config.connectionLimit,
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database
})


module.exports = function (sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, (err, result) => {
                    if(err){
                        reject(err)
                    }else{
                        resolve(result)
                        connection.release()
                    }
                })
            }
        })
    })

}