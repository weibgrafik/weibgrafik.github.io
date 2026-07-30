(() => {


const folder="bg/";
const totalImages=50;


let history=[];
let active=0;


const layers=[
document.getElementById("bg1"),
document.getElementById("bg2")
];



function randomImage(){

let n;

do{

n=Math.floor(
Math.random()*totalImages
)+1;

}while(history.includes(n));


history.push(n);


if(history.length>10){
history.shift();
}


return folder+
"bg-"+
String(n).padStart(3,"0")+
".webp";

}




function change(){


const next =
layers[1-active];

const old =
layers[active];


const src =
randomImage();



const preload=new Image();


preload.onload=function(){


next.src=src;



next.classList.remove(
"zoom"
);


void next.offsetWidth;



next.classList.add(
"show",
"zoom"
);



old.classList.remove(
"show"
);



active=1-active;


};



preload.src=src;


}



change();


setInterval(
change,
10000
);



})();
