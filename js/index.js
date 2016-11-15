/**
 * Created by Lenovo on 2016/9/13.
 */
window.onload = function () {
    //需求：点击左右按钮实现旋转木马
    //原理：点击右侧按钮 让3号盒子的样式赋值给2号盒子，然后2→1，1→5，5→4，4→3.。。
    // 左侧同理
    //步骤
    //1.鼠标放到轮播图上，两侧的按钮显示，移开隐藏
    //2 让页面加载出所有的盒子的样式
    //3 把两侧按钮绑定事件(调用同一个方法，只有一个参数 true为正向旋转，false为反向旋转)
    //4 书写函数
        //操作数组 正向旋转 删除数组中第一个样式，添加到数组中的最后一位
        //操作数组 反向旋转 删除数组中最后一个样式，添加到数组中的第一位

    var json = [
        {   //  1
            width:200,
            top:20,
            left:30,
            opacity:20,
            z:1
        },
        {   //  2
            width:400,
            top:40,
            left:70,
            opacity:40,
            z:2
        },
        {  // 3
            width:600,
            top:90,
            left:0,
            opacity:60,
            z:3
        },
        {   // 4
            width:750,
            top:70,
            left:200,
            opacity:100,
            z:4
        },
        {  // 5
            width:600,
            top:90,
            left:500,
            opacity:60,
            z:3
        },
        {   //  6
            width:400,
            top:40,
            left:600,
            opacity:40,
            z:2
        },
        {   //  7
            width:200,
            top:20,
            left:850,
            opacity:20,
            z:1
        },


    ];
    //0 获取元素
    var slide = document.getElementById("slide");
    var arrow = slide.children[1];
    var liArr = slide.getElementsByTagName("li");
    var arrowChildren = arrow.children;
    //设置一个开闭原则变量 点击以后修改这个值
    var flag = true;

    //鼠标放到轮播涂上 两侧按钮显示 移开隐藏
    slide.onmouseenter = function(){
        animate(arrow,{"opacity":100});
    }
    slide.onmouseleave = function(){
        animate(arrow,{"opacity":0});
    }
    //让页面加载出所有的盒子的样式
    for(var i = 0 ;i<liArr.length;i++){
        animate(liArr[i],{
            "width":json[i].width,
            "top":json[i].top,
            "left":json[i].left,
            "opacity":json[i].opacity,
            "zIndex":json[i].z
        });
    }
    //把两侧按钮绑定事件
    //利用for...in...绑定事件
    for(var k in arrowChildren){
        arrowChildren[k].onclick=function(){
            if(this.className === "prev"){
                if(flag === true){
                    flag = false;
                    move(true);
                }
            }else{
                if(flag){
                    flag = false;
                    move(false);
                }
            }
        }
    }


    //书写函数
    function move(bool){
        if(bool !== undefined){
            if(bool){
                //json.push(); //在最后添加
                //json.pop();  //删除最后一位
                //json.unshift(); //在最前面添加
                //json.shift();   //删除第一位
                json.unshift(json.pop());
            }else{
                json.push(json.shift());
            }
        }
        //再次为页面上所有li赋值属性
        for(var i = 0;i<liArr.length;i++){
            animate(liArr[i],{
                "width":json[i].width,  //第一个li，必须对应第一个数组元素中的第一个的指定属性
                "top":json[i].top,
                "left":json[i].left,
                "opacity":json[i].opacity,
                "zIndex":json[i].z
            },function(){
                flag=true;
            });
        }
    }




}