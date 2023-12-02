let body = document.body;
let circles = [];
let hits = 0;
let shots = 0; 

window.addEventListener('click',()=>{
    shots++;
    document.getElementById('missed').textContent = shots-hits;
})

class Circle{
    directions = {top:0,bottom:1,left:2,right:3,lefttop:4,leftbottom:5,righttop:6,rightbottom:7};
    constructor(Id){
        this.id = Id;
        this.item = document.getElementById(Id);

        this.height = this.item.clientHeight;
        this.width = this.item.clientWidth;
        
        this.direction = Math.floor(Math.random()*8);
        this.speed = Math.floor(Math.random()*(3-1)+1);

        this.item.addEventListener('click',this.Click);

        console.log(this.item)
        let func = this.UpdatePosition.bind(this);
        setInterval(()=>func(),5)
    }

    UpdatePosition() {
        console.log("q");
        let topPostiton = this.item.offsetTop;
        let bottomPosition = topPostiton+this.height;
        let leftPosition =  this.item.offsetLeft ;
        let rightPosition = leftPosition + this.width;

        switch(this.direction){
            case this.directions.top:{
                if(topPostiton - this.speed<=0){
                    this.SwitchDirection();
                    this.direction = this.directions.bottom;
                    return;
                }
                this.item.style.top= (topPostiton - this.speed) + 'px';
            }break;
            case this.directions.bottom:{
                if(bottomPosition + this.speed>=body.clientHeight){
                    this.SwitchDirection();
                    this.direction = this.directions.top;
                    return;
                }
                this.item.style.top=(topPostiton + this.speed) + 'px';
            }break;
            case this.directions.left:{
                if( leftPosition - this.speed<=0){
                    this.SwitchDirection();
                    this.direction = this.directions.right
                    return;
                }
        
                this.item.style.left = (leftPosition - this.speed) + 'px';
            }break;
            case this.directions.right:{
                if(rightPosition + this.speed>=body.clientWidth){
                    this.SwitchDirection();
                    this.direction = this.directions.left
                    return;
                }
                this.item.style.left=(leftPosition + this.speed) + 'px';
            }break;
            case this.directions.lefttop:{
                if(topPostiton - this.speed<=0 || leftPosition - this.speed<=0){
                    this.SwitchDirection();
                    if(topPostiton - this.speed<=0){
                        this.direction = this.directions.leftbottom;
                    }else if (leftPosition - this.speed<=0){
                        this.direction = this.directions.righttop;
                    }
                    return;
                }
        
                this.item.style.top = (topPostiton - this.speed) + 'px';
                this.item.style.left = (leftPosition - this.speed) + 'px';
            }break;
            case this.directions.leftbottom:{
                if( bottomPosition + this.speed>=body.clientHeight || leftPosition - this.speed<=0){
                    this.SwitchDirection();
                    if( bottomPosition + this.speed>=body.clientHeight){
                        this.direction = this.directions.lefttop;
                    }else if(leftPosition - this.speed<=0){
                        this.direction = this.directions.rightbottom;
                    }
                    return;
                }
        
                this.item.style.top=(topPostiton + this.speed) + 'px';
                this.item.style.left=(leftPosition - this.speed) + 'px';
            }break;
            case this.directions.righttop:{
                if(topPostiton - this.speed<=0 ||rightPosition + this.speed>=body.clientWidth){
                    this.SwitchDirection();
                    if(topPostiton - this.speed<=0){
                        this.direction = this.directions.rightbottom;
                    }else{
                        this.direction = this.directions.lefttop;
                    }
                    return;
                }
        
                this.item.style.top = (topPostiton - this.speed) + 'px';
                this.item.style.left = (leftPosition + this.speed) + 'px';
            }break;
            case this.directions.rightbottom:{
                if(bottomPosition + this.speed>=body.clientHeight ||rightPosition + this.speed>=body.clientWidth){
                    if(bottomPosition + this.speed>=body.clientHeight){
                        this.direction = this.directions.righttop;
                    }else{
                        this.direction = this.directions.leftbottom;
                    }
                    this.SwitchDirection();
                    return;
                }
        
                this.item.style.top = (topPostiton + this.speed) + 'px';
                this.item.style.left = (leftPosition + this.speed) + 'px';
            }break;
        }
    }
    SwitchDirection(){
        let colorR = Math.floor(Math.random()*256);
        let colorG = Math.floor(Math.random()*256);
        let colorB = Math.floor(Math.random()*256);
        this.item.style.background = `rgb(${colorR},${colorG},${colorB})`;
    }
    Click() {
        hits++;
        document.getElementById('killed').textContent = hits;
        let item = document.getElementById(this.id);
        document.body.removeChild(item);
    }
}

function CreateCircle(){

    if(document.querySelectorAll('.circle').length >=5)
        return;

    let div = document.createElement('div');
    div.className = 'circle';
    const {height,width} = window.innerHeight>0?
        {height:window.innerHeight,width:window.innerWidth}:
        {height:screen.height,width:screen.width}

    let size = Math.floor(Math.random()*(200-80)+80);

    let colorR = Math.floor(Math.random()*256);
    let colorG = Math.floor(Math.random()*256);
    let colorB = Math.floor(Math.random()*256);
    
    div.style.top=Math.max(0,Math.random()*height - size)+ 'px';
    div.style.left=Math.max(0,Math.random()*width - size) + 'px';
    div.style.height =`${size}px` ;
    div.style.width = `${size}px`;
    div.style.background = `rgb(${colorR},${colorG},${colorB})`;
    div.id = circles.length;

    document.body.appendChild(div);

    let circle = new Circle(circles.length);
    circles.push(circle);
}
setInterval(CreateCircle,1000)






