//绑定每个li标签
let box = document.getElementsByClassName("container")[0];
let wrap = document.getElementsByClassName("wrap")[0];
let list = wrap.querySelectorAll("li");

//绑定下面四个a标签
let buttonUL = document.getElementsByClassName("bottom-button")[0];
let alist = buttonUL.querySelectorAll("a")

//给按钮绑定点击事件
let next = document.getElementsByClassName("next")[0];
let prev = document.getElementsByClassName("prev")[0];
let index = 0;

next.onclick = function () {
    index++;
    if (index > 3) {
        index = 0;
    }
    //点击之后，下一张显现，其他隐没
    for (let i = 0; i < list.length; i++) {
        if (i == index) {
            list[i].className = "active";
            alist[i].className = "show"
        } else {
            list[i].className = "";
            alist[i].className = ""
        }
    }
}
prev.onclick = function () {
    index--;
    if (index < 0) {
        index = 3;
    }
    //点击之后，下一张显现，其他隐没
    for (let i = 0; i < list.length; i++) {
        if (i == index) {
            list[i].className = "active";
            alist[i].className = "show"
        } else {
            list[i].className = "";
            alist[i].className = ""
        }
    }
}
// 用添加属性的方式将底部四个点与li联系起来
Array.prototype.forEach.call(alist, (item, index) => item["data-queue"] = index)

//四个点：点谁给谁哪个a标签哪个a添加class属性,对应的li也添加class属性
for (let i = 0; i < alist.length; i++) {
    alist[i].onclick = function () {
        let DATA = this["data-queue"];
        for (let i = 0; i < alist.length; i++) {
            if (DATA === i) {
                alist[i].className = "show";
                list[i].className = "active"
            } else {
                alist[i].className = "";
                list[i].className = ""
            }
        }
    }
}
function move() {
    let time = setInterval(() => {
        index++;
        if (index > 3) {
            index = 0;
        }
        //点击之后，下一张显现，其他隐没
        for (let i = 0; i < list.length; i++) {
            if (i == index) {
                list[i].className = "active";
                alist[i].className = "show"
            } else {
                list[i].className = "";
                alist[i].className = ""
            }
        }
    }, 2000)
    window.time = time
}
move()

//当鼠标hover到container上时，停止定时器
box.onmouseenter = function () {
    clearInterval(time);
}
box.onmouseleave = function () {
    clearInterval(time);
    move();
}