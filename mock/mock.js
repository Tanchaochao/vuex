// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
    let articles = [];
    for (let i = 0; i < 10; i++) {
        let newArticleObject = {
            title: Random.csentence(5, 30), //  Random.csentence( min, max )
            thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        }
        articles.push(newArticleObject)
    }
 
    return {
        articles: articles
    }
}
// 登录
const Login=function(req){
    let user={
        name:'Tom',
        password:123456
    }
    let body=JSON.parse(req.body);
    if(body.name==user.name&&body.password==user.password){
        return {
            info:'登录成功！',
            success:true
        }
    }else{
        return {
            info:'用户信息错误！',
            success:false
        }
    }
    
}
// 获取菜单
const Menu=function(){
    let menu=[];
    for (let i = 0; i < 5; i++) {
        let menuObject = {
            name: '菜单'+(i+1), //  Random.csentence( min, max )
            id: Random.integer(10,5000), 
            active: i==0 ? true :false,
            sub:[]
        };
        let sub={
            img: Random.dataImage('100x100', 'mock的图片'),
            title: Random.csentence(5, 30),
            current:i==0 ? true :false,
            id: Random.integer(10,5000),
            key:menuObject.id
        }
        menuObject.sub.push(sub);
        menu.push(menuObject)
    }
    return {
        menu: menu
    }
}
// 
Mock.mock('/api/produce', 'post', produceNewsData);
Mock.mock('/api/login', 'post', Login);
Mock.mock('/api/menu', 'post', Menu);