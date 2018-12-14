const con=require("../config/dbConfig");
const userDao={
    query(){
        return new Promise((resolve, reject) => {
            let sql="select * from user";
            con.connect(sql,[],(err,data)=>{
                if (err){
                    reject({state:"err",err})
                } else{
                    resolve({state:"ok",data})
                }
            })

        })
    },
    delete(value){
        return new Promise((resolve, reject) => {
            // console.log("进入Dao层");
            let sql="delete from user where user_id=?";
            con.connect(sql,value,(err,data)=>{
                if (err){
                    reject({state:"err",err})
                } else{
                    resolve({state:"ok",info:"删除成功"})
                }
            })
        })
    },
    search(value){
        console.log("进入Dao层"+value);
        return new Promise((resolve, reject) => {
            let sql="select * from user where username like \"%\"?\"%\"";
            con.connect(sql,value,(err,data)=>{
                if (err){
                    reject({state:"err",err});
                    console.log(err);
                    console.log(sql);
                }else{
                    resolve(data);
                    console.log("ok",data)
                }
            })
        })
    },
    login(Params){
        return new Promise(resolve => {
            let sql="select *from cq.admin where user=? and password=?";
            con.connect(sql,[Params.user,Params.password],(err,result)=>{
                if(err){
                    console.log(err);
                    resolve({status:"err",state:100,msg:"服务器错误!"});
                }else {
                    if(result.length==1){
                        resolve({status:"ok",state:1,data:result[0]});
                    }else {
                        resolve({status:"err",state:0,msg:"账号密码错误!"});
                    }
                }
            })
        })
    }
};
module.exports=userDao;