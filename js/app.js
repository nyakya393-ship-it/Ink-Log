// ======================================
// InkLog Ultimate
// app.js
// ======================================

window.addEventListener("load", async()=>{

    try{

        // IndexedDB
        await Storage.openDatabase();

        // 最初のページ
        showPage("home");

        // ローディング終了
        const loading=document.getElementById("loadingScreen");

        if(loading){

            loading.style.opacity="0";

            setTimeout(()=>{

                loading.remove();

            },300);

        }

        // 起動メッセージ
        UI.showToast("InkLog Ultimate 起動完了");

    }catch(error){

        console.error(error);

        alert("起動中にエラーが発生しました。");

    }

    // Service Worker

    if("serviceWorker" in navigator){

        try{

            await navigator.serviceWorker.register("./sw.js");

            console.log("Service Worker OK");

        }catch(e){

            console.error(e);

        }

    }

});
