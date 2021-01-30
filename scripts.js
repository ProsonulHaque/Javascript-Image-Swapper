// Initialize Global variables
let n=0, adj=0;
let total=0, hor=0, ver=0;

// Helper functions
function isCornerValue(x){
    return (x==1 || x==hor || x==hor+ver+1 || x==2*hor+ver);
}


function randomNumbers(){
    // Choose an image randomly
    n = Math.round(Math.random()*100)%(total+1);
    // Avoid n==0
    while(n==0){
        n = Math.round(Math.random()*100)%(total+1);
    }
    // Choose it's adjacent image
    adj = 0;
    if(isCornerValue(n)){
        switch(n){
            case 1:
                adj = 2;
                break;
            case hor:
                adj = hor-1;
                break;
            case hor+ver+1:
                adj = hor+ver+2;
                break;
            case 2*hor+ver:
                adj = 2*hor+ver-1;
                break;
        }
    }
    else if(n==total) adj = 1;
    else adj = (Math.random() < 0.5) ? n-1 : n+1;
    return [n, adj];
}


function renderImage(){
    const windowWidth     = window.innerWidth;
    const windowHeight    = window.innerHeight;
    const col             = windowWidth>1000 ? 12:6;
    const containerWidth  = Math.round(windowWidth*0.9);
    const width           = Math.round(containerWidth/col);
    const height          = width;
    const containerHeight = Math.floor((windowHeight*0.8)/height)*height;
    const row             = Math.floor((windowHeight*0.8)/height);

    hor   = col;
    ver   = row-2;
    total = 2*(hor+ver);

    document.querySelector('.container').style.width  = containerWidth + 4  + 'px';
    document.querySelector('.container').style.height = containerHeight+ 4  + 'px';
    document.querySelector('.content').style.width    = containerWidth-2*width + 'px';
    document.querySelector('.content').style.height   = containerHeight-2*height + 'px';
    document.querySelector('.content').style.left     = width + 'px';
    document.querySelector('.content').style.top      = height + 'px';

    
    let left = 0;
    let top  = 0;

    let i=0, j=0;
    let k=0 ,l=0;
    
    // Top Row
    for(i=1; i<=col; i++){
        document.querySelector('.container').innerHTML += 
    `<div class="image" data-key="${i}" style="width: ${width}px; height: ${height}px; left: ${left}px; top: ${top}px;">
        <img src="grid/${i}.jpg" alt="">
     </div>`;
     left += width;
    }
    
    // Right Column
    left = width*(col-1);
    top  = height;
    for(j=i; j<=col+row-1; j++){
        document.querySelector('.container').innerHTML += 
    `<div class="image" data-key="${j}" style="width: ${width}px; height: ${height}px; left: ${left}px; top: ${top}px;">
        <img src="grid/${j}.jpg" alt="">
     </div>`;
     top+=height;
    }

    // Bottom Row
    top  = height*(row-1);
    left = width*(col-2);
    for(k=j; k<=2*col+row-2; k++){
        document.querySelector('.container').innerHTML += 
    `<div class="image" data-key="${k}" style="width: ${width}px; height: ${height}px; left: ${left}px; top: ${top}px;">
        <img src="grid/${k}.jpg" alt="">
     </div>`;
     left-=width;
    }

    // Left Row
    top  = height*(row-2);
    left = 0;
    for(l=k; l<=2*(row+col)-4; l++){
        document.querySelector('.container').innerHTML += 
    `<div class="image" data-key="${l}" style="width: ${width}px; height: ${height}px; left: ${left}px; top: ${top}px;">
        <img src="grid/${l}.jpg" alt="">
     </div>`;
     top-=height;
    }
}


function setStyle(img1, img2){
    const imgWidth  = parseInt(img1.style.width);
    const imgHeight = parseInt(img1.style.height);
    
    const left1 = parseInt(img1.style.left);
    const left2 = parseInt(img2.style.left);
    const top1  = parseInt(img1.style.top);
    const top2  = parseInt(img2.style.top);

    // Exception: n==total and adj==1
    if(n==total){
        img1.style.top = top1-imgHeight+'px';
        img2.style.top = top2+imgHeight+'px';
    }
    // Top Row
    else if(n>=1 && n<=hor){
        if(n<adj){
            img1.style.left = left1+imgWidth+'px';
            img2.style.left = left2-imgWidth+'px';
        }
        else{
            img2.style.left = left2+imgWidth+'px';
            img1.style.left = left1-imgWidth+'px';
        }
    }
    // Bottom Row
    else if(n>=hor+ver+1 && n<=2*hor+ver){
        if(n<adj){
            img1.style.left = left1-imgWidth+'px';
            img2.style.left = left2+imgWidth+'px';
        }
        else{
            img2.style.left = left2-imgWidth+'px';
            img1.style.left = left1+imgWidth+'px';
        }
    }
    // Left Comumn
    else if(n>=2*hor+ver+1 && n<=total){
        if(n<adj){
            img1.style.top = top1-imgHeight+'px';
            img2.style.top = top2+imgHeight+'px';
        }
        else{
            img2.style.top = top2-imgHeight+'px';
            img1.style.top = top1+imgHeight+'px';
        }
    }
    // Right Column
    else{
        if(n<adj){
            img1.style.top = top1+imgHeight+'px';
            img2.style.top = top2-imgHeight+'px';
        }
        else{
            img2.style.top = top2+imgHeight+'px';
            img1.style.top = top1-imgHeight+'px';
        }
    }

    // Interchange data-key attribute
    if(img1.hasAttribute('data-key'))
        img1.setAttribute('data-key', adj);
    if(img2.hasAttribute('data-key'))
        img2.setAttribute('data-key', n);
}

function refresh() {    
    setTimeout(() => {location.reload();}, 10);
}

// Main function 
function swapImage(){
    const random_numbers = randomNumbers();
    n   = random_numbers[0]; 
    adj = random_numbers[1];

    const img1 = document.querySelector(`div[data-key="${n}"]`);
    const img2 = document.querySelector(`div[data-key="${adj}"]`);

    setStyle(img1, img2);
}


renderImage();
setInterval(swapImage, 1000);
window.addEventListener('resize', refresh);