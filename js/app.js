// ======================================
// App
// ======================================

window.addEventListener("load",()=>{

　　　await Storage.openDatabase();
    
    const loading = document.getElementById("loadingScreen");

    setTimeout(()=>{

        if(loading){

            loading.style.opacity="0";

            setTimeout(()=>{

                loading.remove();

            },400);

        }

    },500);

    showPage("home");

    UI.showToast("InkLogへようこそ！");

});

if("serviceWorker" in navigator){

    navigator.serviceWorker.register("sw.js");

}
