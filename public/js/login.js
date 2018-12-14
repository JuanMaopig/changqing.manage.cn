$("#login").on("click",function () {
    let user=$("#user").val();
    let password=$("#password").val();
    $.post({
        url:"/login.do",
        data:`user=${user}&password=${password}`,
        dataType:"json",
        success(result){
            console.log(result);
            if(result.state==1){
                window.location.href="/index.html";
            }
            if(result.state==0){
                alert("账号密码错误!")
            }
            if(result.state==100){

            }
        }
    })
})