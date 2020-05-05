var that;
class Tab{
    constructor(id) {
        that=this;
        this.main=document.querySelector(id);
        this.add=this.main.querySelector(".tabadd");
        this.ul=this.main.querySelector(".firstnav ul:first-child");
        this.fsection=this.main.querySelector(".tabscon");
        this.init();
    }
    init(){
        // console.log(this);
        this.updateNode();
        // init 初始化操作让相关的元素绑定事件
        this.add.onclick=this.addTab;
        for(var i=0;i<this.lis.length;i++){
            this.lis[i].index=i;
            this.lis[i].onclick=this.toggleTab;
            this.remove[i].onclick=this.removeTab;
            this.spans[i].ondblclick=this.editTab;
            this.sections[i].ondblclick=this.editTab;
        }
    }
    // 切换功能
    toggleTab(){
        that.clearClass();
        this.className="liactive";
        that.sections[this.index].className="conactive";
    }
    // 删除功能
    removeTab(e){
        // 阻止冒泡 防止触发li 的切换点击事件
        e.stopPropagation();
        var index=this.parentNode.index;
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        // 当我们删除的不是选中状态的li 的时候,原来的选中状态li保持不变
        if(document.querySelector(".liactive")) return;
        // 当我们删除了选中状态的这个li 的时候, 让它的前一个li 处于选定状态
        index--;
        if(index<0){
            index=0;
        }
        // 手动调用我们的点击事件  不需要鼠标触发
        console.log(that.lis[index]);
        that.lis[index]&&that.lis[index].click();
    }
    // 修改功能
    editTab(){
        var str=this.innerHTML;
        // 双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // console.log(this);
        this.innerHTML="<input type='text'/>";
        var input=this.children[0];
        // console.log(input);
        input.value=str;
        input.select();// 文本框里面的文字处于选定状态
        // 当我们离开文本框就把文本框里面的值给span 
        input.onblur=function(){
            this.parentNode.innerHTML=this.value;
        }
        input.onkeyup=function(e){
            if(e.keyCode===13){
                // 手动调用表单失去焦点事件  不需要鼠标离开操作
                this.blur();
            }
        }
    }
    updateNode(){
        this.lis=this.main.querySelectorAll("li");
        this.sections=this.main.querySelectorAll("section");
        this.remove=this.main.querySelectorAll(".icon-guanbi");
        this.spans=this.main.querySelectorAll(".firstnav li span:first-child");
    }
    // 添加功能
    addTab(){
        that.clearClass();
        var random=Math.random();
        var li="<li class='liactive'><span>新选项卡</span><span class='iconfont icon-guanbi'></span></li>";
        var section="<section class='conactive'>测试"+random+"</section>";
        // console.log(this);
        // console.log(that);
        that.ul.insertAdjacentHTML("beforeend",li);
        that.fsection.insertAdjacentHTML("beforeend",section);
        that.init();
    }
    // 清除所有li 和section 的类
    clearClass(){
        // console.log(this);//是Tab
        for(var i=0;i<this.lis.length;i++){
            this.lis[i].className="";
            this.sections[i].className="";
        }
    }
}
new Tab("#tab");