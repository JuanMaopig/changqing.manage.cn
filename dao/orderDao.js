const dbpool=require("../config/dbConfig");

const orderModule= {
    daoSelectOrder(params) {//order的查询
        return new Promise(function (resolve, reject) {
            dbpool.connect("select *from payorder",params, (err, data) => {
                console.log("=====DaoSelect=====");
                if (!err) {
                    console.log(data);
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    daoUpdateOrder(params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("update payorder set room_type_name=?,room_number=?,guest_name=?,guest_tel=?,order_state=? where order_id=?", params, (err, data) => {
                console.log("=====DaoUpdate====");
                if (!err) {
                    console.log(data);
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    daoDeleteOrder(params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("delete from payorder where order_id=?", params, (err, data) => {
                console.log("=====DaoDelete====");
                if (!err) {
                    console.log(data);
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    daoAddOrder(params){
        return new Promise(function (resolve, reject) {
            dbpool.connect("insert into payorder values (default,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", params, (err, data) => {
                console.log("=====DaoAdd====");
                if (!err) {
                    console.log(data);
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    daoShowPrice(params){

    }
};

module.exports=orderModule;