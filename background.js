(() => {

const folder = "bg/";
const totalImages = 50;

const changeTime = 10000;
const fadeTime = 2000;

let history = [];
let active = 0;


const container =
document.getElementById("bg-container");


const loading =
document.getElementById("loading");



const layers = [];


for(let i=0;i<2;i++){

    const img =
    document.createElement("img");

    img.className="bg";

    img.style.transition =
    `opacity ${fadeTime}ms ease`;

    container.appendChild(img);

    layers.push(img);

}




function randomImage(){


    let n;


    do{

        n =
        Math.floor(
            Math.random()*totalImages
        )+1;


    }while(history.includes(n));


    history.push(n);


    if(history.length>10){

        history.shift();

    }


    return (
        folder+
        "bg-"+
        String(n).padStart(3,"0")+
        ".webp"
    );

}




function loadImage(src){


    return new Promise(resolve=>{


        const img=new Image();


        img.onload=()=>resolve(true);

        img.onerror=()=>resolve(false);


        img.src=src;


    });


}





async function change(){


    const next =
    layers[1-active];


    const old =
    layers[active];


    const src =
    randomImage();



    const ok =
    await loadImage(src);


    if(!ok){

        return;

    }



    next.src=src;


    next.style.opacity="0";


    next.style.transform="scale(1)";



    requestAnimationFrame(()=>{


        next.style.opacity="1";


        next.animate(

        [
            {
                transform:"scale(1)"
            },
            {
                transform:"scale(1.06)"
            }

        ],

        {
            duration:changeTime,
            easing:"ease",
            fill:"forwards"
        }

        );


        old.style.opacity="0";


    });



    active = 1-active;




    if(loading){

        loading.classList.add("hide");

    }


}




change();


setInterval(

change,

changeTime

);


})();
