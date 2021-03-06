var mysql = require('mysql');
var eventEmitter = require('events');

var connection = mysql.createConnection({
    host     : '39.106.67.112',
    user     : 'root',
    password : '123456',
    database : 'shelter'
});
connection.connect();

//对外异步通知接口

exports.emitter = new eventEmitter();

//登陆查询  事件方式
exports.login = function(userName, password){
    try {
        connection.query('select * from user where user_name="' + userName + '" and password="' + password + '"',
            function (error, results, fields) {
            if (error) throw error;

            if (results != null && results.length > 0) {
                console.log(JSON.stringify(results))
                exports.emitter.emit('loginUser', {'flag': true, 'msg': '登陆成功'});
            } else {
                console.log("查询无结果");
                exports.emitter.emit('loginUser', {'flag': false, 'msg': '登陆失败，请检查用户名密码'});
            }
        });
    } catch (e) {
        console.log("查询错误");
        exports.emitter.emit('loginUser', {'flag': false, 'msg': '查询异常'+e.stack});
    }
}

//登陆查询  回掉函数方式
exports.loginBack = function(userName, password, fn){
    try {
        connection.query('select * from user where user_name="' + userName + '" and password="' + password + '"',
            function (error, results, fields) {
                if (error) throw error;

                if (results != null && results.length > 0) {
                    console.log(JSON.stringify(results))
                    fn(true, '登陆成功', results);
                } else {
                    console.log("查询无结果");
                    fn(false, '登陆失败，请检查用户名密码', results);
                }
            });
    } catch (e) {
        console.log("查询错误");
        fn(false, '查询异常'+e.stack);
    }
}
