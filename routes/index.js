const express = require('express');
const router = express.Router();
const multiparty=require("connect-multiparty");
const connectmultiparty=multiparty();

const userController=require("../controller/userController");
const manage=require('../controller/manage');
const RoomListController=require("../controller/RoomListController");
const apartmentController=require("../controller/apartmentController");
const staffController=require("../controller/staffController");
const orderController=require("../controller/orderController");
const roomController=require('../controller/roomController');
/* GET home page. */
router.get('/login.html',);
router.get('/', function(req, res, next) {

    res.send(`<script>
  window.location.href="index.html"
</script>`);
});
// router.all('/*',function (req,res,next) {
//     if(!req.session.user){
//         res.send(`<script>
//   window.location.href="index.html"
// </script>`);
//     }else {
//         next();
//     }
//
// })
router.all('/consume/*.do',function (req,res,next) {
    let url=req.url;
    url=url.substr(9);
    url=url.substring(0,url.indexOf('.do'));
    console.log(url);
    if(manage[url]){
        manage[url](req,res);
    }else {
        next();
    }
    console.log(url);
});
/*对订单的操作*/
router.get("/order/getorder.do",orderController.getorder);
router.get("/order/editorder.do",orderController.editorder);
router.get("/order/deleteorder.do",orderController.deleteorder);
router.get("/order/addorder.do",orderController.addorder);
//后台人员管理列表
router.get('/staff/*.do',function (req,resp) {
    let url=req.url;
    url=url.substr(7);
    url=url.substring(0,url.indexOf('.do'));
    console.log("548978787867687");
    staffController[url](req,resp);
});
//用户
// router.post("/login.do",controller.controllerLogin);
router.get("/user/*.do",function (req,resp) {
    // console.log("hahahhaha4444444");
    let url=req.url;
    url=url.substr(6);
    url=url.substring(0,url.indexOf('.do'));
    userController[url](req,resp);
    console.log(url);
});

//后台部门列表
// router.get('/apartmentList.do',apartmentCtroller.operateApart);
// router.get('/addNewForm.do',apartmentCtroller.addApart);
// router.get('/deleteForm.do',apartmentCtroller.deleteApart);
// router.get('/editForm.do',apartmentCtroller.editApart);
router.get('/department/*.do',function (req,res) {
    let url=req.url;
    url=url.substr(12);
    // console.log("556"
    url=url.substring(0,url.indexOf('.do'))
    console.log(url);
    apartmentController[url](req,res);
});
// 房间列表的页面数据查询
router.get('/room/roomInformation.do',RoomListController.roomInformation);
// 房间列表的页面弹框修改
router.get('/room/roomModify.do',RoomListController.roomModify);
//房间列表的页面数据删除
router.get('/room/roomDelete.do',RoomListController.roomDelete);
//房间号搜索
router.get('/room/selectRoom.do',RoomListController.selectRoom);
//新增
router.get('/room/roomNew.do',RoomListController.roomNew);

//============查询所有房型=============================
router.get("/room/roomTypeCastle.do",roomController.queryRoomTypeCastle);
router.get("/room/roomTypeStables.do",roomController.queryRoomTypeStables);

//=============删除数据====================================
router.get("/room/deleteRoomCastle.do",roomController.deleteRoomCastle);

//=============增加房型===================================
router.get("/room/addRoomCastle.do",roomController.addRoomCastle);
router.all("/upimg/",connectmultiparty,function (req,res) {//上传照片
    console.log("888888888888");
    console.log(req.body);
    res.send("ok");
});


//==============修改房型=========================================
router.get("/room/updateRoomCastle.do",roomController.updateRoomCastle);
module.exports = router;
