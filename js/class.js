

//输入（标签class名）包括：轮播图的大盒子、下一个按钮（a标签形式）、上一个按钮（a标签形式）、包裹图片的大盒子（里面是li标签）、底部四个a标签
//即可得到一个轮播图
class BaseLine {
    //用公共的部分获取元素
    constructor(container, next, prev, list, alist) {
        this.container = document.getElementsByClassName(`${container}`)[0];
        this.next = document.getElementsByClassName(`${next}`)[0];
        this.prev = document.getElementsByClassName(`${prev}`)[0];
        this.list = document.querySelectorAll(`.${list}>li`);
        this.alist = document.querySelectorAll(`.${alist}>a`);
        this.index = 0;
    }
    start() {
        //绑定左右点击事件
        this.next.onclick = () => this.nextone();
        // this.next=onclick =this.nextone;
        this.prev.onclick = () => this.prevone();
        this.click();//绑定下方四个按钮的点击事件
        this.move();//定时器
        this.mouseenter();
        this.mouseleave();
    }
    nextone() {
        this.index++;
        if (this.index > 3) {
            this.index = 0;
        }
        //点击之后，下一张显现，其他隐没
        for (let i = 0; i < this.list.length; i++) {
            if (i == this.index) {
                this.list[i].className = "active";
                this.alist[i].className = "show"
            } else {
                this.list[i].className = "";
                this.alist[i].className = ""
            }
        }
    }
    prevone() {
        this.index -= 1;
        if (this.index < 0) {
            this.index = 3;
        }
        //点击之后，下一张显现，其他隐没
        for (let i = 0; i < this.list.length; i++) {
            if (i == this.index) {
                this.list[i].className = "active";
                this.alist[i].className = "show"
            } else {
                this.list[i].className = "";
                this.alist[i].className = "";
            }
        }
    }
    click() {
        //双层循环，最内层this不再是circleOne,单独拿出来保证this
        let clear = () => {
            for (let i = 0; i < this.alist.length; i++) {
                this.alist[i].className = "";
                this.list[i].className = ""
            }
        }
        let showImage = index => {
            this.list[index].className = "active"
        }
        //四个按钮绑定点击事件,先清再添(因为内层不好用循环,找不到this.alist了就)
        [].forEach.call(this.alist, (item, index) => {
            item.onclick = function () {
                clear();
                item.className = "show"
                showImage(index)
            }
        })
    }
    move() {
        let change = () => {
            for (let i = 0; i < this.list.length; i++) {
                if (i == this.index) {
                    this.list[i].className = "active";
                    this.alist[i].className = "show"
                } else {
                    this.list[i].className = "";
                    this.alist[i].className = ""
                }
            }
        }
        let time = setInterval(() => {
            this.index++;
            if (this.index > 3) {
                this.index = 0;
            }
            change();
        }, 2000)
        window.time = time;
    }
    mouseenter() {
        this.container.onmouseenter = () => {
            clearInterval(time)
        }
    }
    mouseleave() {
        this.container.onmouseleave = () => {
            clearInterval(time);
            this.move();
        }
    }
}

// class Circle extends BaseLine {
//     constructor(container, next, prev, list, alist) {
//         super(container, next, prev, list, alist)
//     }
// }

// const circleOne = new Circle("container", "next", "prev", "wrap", "bottom-button");
// circleOne.start();
export{BaseLine}