// ======================================
// App
// ======================================

window.addEventListener("load",()=>{

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

});
