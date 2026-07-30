/* =========================================================
   Weiß Grafik
   background.js draft ver.1

   背景画像管理
========================================================= */


(() => {


const CONFIG = {

    folder : "bg/",

    totalImages : 50,

    changeTime : 10000,

    fadeTime : 2000,

    zoomScale : 1.06,

    historyLength : 10

};



const container =
    document.getElementById("bg-container");


const loading =
    document.getElementById("loading");



let history = [];

let currentImage = null;

let currentNumber = 0;



/* =========================================================
   ランダム画像取得
========================================================= */


function getRandomNumber(){


    let num;


    do {

        num =
        Math.floor(
            Math.random() *
            CONFIG.totalImages
        ) + 1;


    } while(
        history.includes(num)
    );


    history.push(num);


    if(history.length >
       CONFIG.historyLength){

        history.shift();

    }


    currentNumber = num;


    return num;

}




function getImagePath(){


    const num =
    getRandomNumber();


    return (

        CONFIG.folder +

        "bg-" +

        String(num)
        .padStart(3,"0") +

        ".webp"

    );

}




/* =========================================================
   画像プリロード
========================================================= */


function preload(src){


    return new Promise(
        resolve => {


        const img =
        new Image();


        img.onload =
        () => resolve(img);


        img.onerror =
        () => resolve(null);


        img.src = src;


    });


}




/* =========================================================
   背景表示
========================================================= */


async function changeBackground(){


    const src =
    getImagePath();



    const loaded =
    await preload(src);



    if(!loaded){

        changeBackground();

        return;

    }



    const img =
    document.createElement("img");



    img.className =
    "bg";



    img.src =
    src;



    container.appendChild(img);




    /*
       強制描画
    */

    requestAnimationFrame(() => {


        img.style.transition =
        `opacity ${CONFIG.fadeTime}ms ease`;



        img.style.opacity = "1";



        img.animate(

            [

                {
                    transform:"scale(1)"
                },

                {
                    transform:
                    `scale(${CONFIG.zoomScale})`
                }

            ],

            {

                duration:
                CONFIG.changeTime,

                easing:
                "ease",

                fill:
                "forwards"

            }

        );


    });





    /*
       古い画像削除
    */

    if(currentImage){


        currentImage.style.opacity =
        "0";


        setTimeout(() => {


            currentImage.remove();


        },
        CONFIG.fadeTime);


    }



    currentImage = img;



    /*
       初回白背景解除
    */

    if(loading){


        setTimeout(() => {


            loading.classList.add(
                "hide"
            );


        },500);


    }


}





/* =========================================================
   START
========================================================= */


changeBackground();



setInterval(

    changeBackground,

    CONFIG.changeTime

);



})();
