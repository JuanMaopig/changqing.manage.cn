// const dbpool=require("../config/dbpoolConfig");//引入数据库连接池

const orderModule=require("../dao/orderDao");//引入Dao层

const methods=require("../config/methods");//引入方法

const orderController={
    //使用promise
    //查询订单信息
    getorder(req,res){
        /*[req.query.order_hao,req.query.room_type_name,req.query.room_number,req.query.guest_tel,req.query.guestname,req.query.order_state,req.query.order_time]*/
        orderModule.daoSelectOrder().then(function (data) {//data查询回来的结果
            console.log("========getorderController========");
            // console.log(data[0].id);
            res.send(data);
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        })
    },
    //修改订单信息
    editorder(req,res){
        console.log("=======editorder======");
        let temp=req.query;
        // console.log(temp.order_state);
        orderModule.daoUpdateOrder([temp.room_type_name,temp.room_number,temp.guest_name,temp.guest_tel,temp.order_state,temp.order_id]).
        then(function (data) {
            console.log("========editorderController========");
            // console.log(data[0].id);
            res.send(data);
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        })
    },
    deleteorder(req,res){
        // console.log("ddddddddddddddddddddddddddddddddddddd")
        // console.log(req.query);
        orderModule.daoDeleteOrder([req.query.order_id]).
        then(function (data) {
            console.log("========deleteorderController========");
            // console.log(data[0].id);
            res.send(data);
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        })
    },
    addorder(req,res){//增加订单
        let temp=req.query;
        temp.order_time=methods.getOrderTime();//获取当前下单时间
        temp.order_state="已完成";//默认为已完成
        temp.order_hao=methods.getOrderHao();//获取订单号
        console.log("=========addorder==========");
        console.log(temp);
        orderModule.daoAddOrder([temp.order_hao,temp.order_state,
            temp.order_time,temp.in_date,temp.out_date,temp.room_number,temp.user_id,temp.room_type_name,
            temp.room_consume_id,temp.guest_name,temp.guest_tel,temp.guest_email,temp.adultNum,temp.childNum,
            temp.order_price,temp.pay,temp.tax,temp.server_money,temp.contact_name,temp.contact_phone,
            temp.subscription,temp.sex,temp.specials,temp.hotel,temp.hotel_id,temp.room_type_id]).
        then(function (data) {
            console.log("========addorderController========");
            // console.log(data[0].id);
            res.send(data);
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        })
    },
    showprice(req,res){
        orderModule.daoShowPrice([]).then(function (data) {
            console.log("=========showpriceController=====");
            res.send(data);
        }).catch(function (err) {
            res.send(err)
        })
    }

};

module.exports=orderController;