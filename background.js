(() => {


const folder = "bg/";

let images = [];

let playList = [];

let playIndex = 0;

let active = 0;


const layers = [
    document.getElementById("bg1"),
    document.getElementById("bg2")
];



/* =========================
   images.json 読み込み
========================= */

async function loadImages(){

    const response = await fetch(
        folder + "images.json"
    );

    images = await response.json();

}



/* =========================
   画像順番をシャッフル
========================= */

function shuffleImages(){

    playList = [...images];


    for(
        let i = playList.length - 1;
        i > 0;
        i--
    ){

        const j =
        Math.floor(
            Math.random() * (i + 1)
        );


        [
            playList[i],
            playList[j]
        ] =
        [
            playList[j],
            playList[i]
        ];

    }


    playIndex = 0;

}



/* =========================
   次の画像取得
========================= */

function nextImage(){


    if(
        playList.length === 0 ||
        playIndex >= playList.length
    ){

        shuffleImages();

    }


    return folder + playList[playIndex++];

}




/* =========================
   背景切替
========================= */

function change(){


    const next =
    layers[1 - active];


    const old =
    layers[active];


    const src =
    nextImage();



    const preload =
    new Image();



    preload.onload = function(){


        next.src = src;



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
        1 - active;



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



    preload.src = src;


}




/* =========================
   START
========================= */

async function start(){


    await loadImages();


    shuffleImages();


    change();



    setInterval(
        change,
        10000
    );


}



start();



})();
