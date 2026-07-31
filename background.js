(() => {


const folder="bg/";

let images=[];

let history=[];

let active=0;


const layers=[
document.getElementById("bg1"),
document.getElementById("bg2")
];



/* =========================
   画像リスト読み込み
========================= */

async function loadImages(){


    const response =
    await fetch(
        folder+"images.json"
    );


    images =
    await response.json();


}




/* =========================
   ランダム画像取得
========================= */

function randomImage(){


    let n;


    do{

        n =
        Math.floor(
            Math.random()*images.length
        );


    }while(
        history.includes(n)
    );



    history.push(n);



    if(history.length>10){

        history.shift();

    }



    return folder + images[n];


}




/* =========================
   背景切替
========================= */

function change(){


    const next =
    layers[1-active];


    const old =
    layers[active];



    const src =
    randomImage();



    const preload =
    new Image();



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



        active =
        1-active;



        const loading =
        document.getElementById(
            "loading"
        );


        if(loading){

            loading.classList.add(
                "hide"
            );

        }


    };



    preload.src=src;


}




/* =========================
   START
========================= */


async function start(){


    await loadImages();


    change();



    setInterval(

        change,

        10000

    );


}



start();



})();
