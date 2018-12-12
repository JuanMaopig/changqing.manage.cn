/**
 * Created by Administrator on 2018/11/7 0007.
 */

//引用orderDao
const orderDao=require("../dao/orderDao");
const orderController={
    getorder(req,res){
        /*[req.query.order_hao,req.query.room_type_name,req.query.room_number,req.query.guest_tel,req.query.guestname,req.query.order_state,req.query.order_time]*/
        orderDao.daoSelectOrder().then(function (data) {//data查询回来的结果
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
        // console.log(editData);req.query.
        let temp=req.query;
        orderDao.daoUpdateOrder([temp.room_type_name,temp.room_number,temp.guestname,temp.guest_tel,temp.order_state,temp.order_id]).
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
        orderDao.daoDeleteOrder([req.query.order_id]).
        then(function (data) {
            console.log("========deleteorderController========");
            // console.log(data[0].id);
            res.send(data);
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        })
    },
    addorder(req,res){
        let temp=req.query;
        orderDao.daoAddOrder([temp.order_hao,temp.order_state,
            temp.order_time,temp.in_date,temp.out_date,temp.room_number,temp.user_id,temp.room_type_name,
            temp.room_consume_type_id,temp.guestname,temp.guest_tel,temp.guest_email,temp.adultNum,temp.childNum,
            temp.all_money,temp.pay,temp.tax,temp.server_money,temp.contact_name,temp.contact_phone,
            temp.subscription,temp.sex,temp.specials,temp.hotel]).
        then(function (data) {
            console.log("========addorderController========");
            // console.log(data[0].id);
            res.send(data);
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        })
    },
    async queryOrder(req,res){
       let orderID=req.query.orderID;
       try{
           let active = orderDao.asyncQueryAllDevice();
           let hotel = orderDao.queryAllHotelName();
           let order = await orderDao.queryOrder(orderID);
           let active_consume = await orderDao.asyncQueryActiveConsume(order.room_consume_id);
           let hotel_id = orderDao.getHotelID(order.room_type_id);
           order.active_consume=[];
           active = await active;
           for (let value of active_consume){
               order.active_consume.push(active[value]);
           }
           hotel = await hotel;
           hotel_id = await hotel_id;
           order.hotel_name=hotel[hotel_id];
           res.render("user1/order-detail",order);
       }catch (e) {
           console.log(e);
           res.send({status:"err",state:404,msg:"服务器数据异常，请稍微再试"})
       }

    }

};

module.exports=orderController;
