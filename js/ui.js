// ======================================
// InkLog UI
// ======================================

// Toast
// ======================================

function showToast(message,type="success"){

    const container=document.getElementById("toastContainer");

    if(!container)return;

    const toast=document.createElement("div");

    toast.className=`toast ${type}`;

    toast.textContent=message;

    container.appendChild(toast);

    requestAnimationFrame(()=>{

        toast.classList.add("show");

    });

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },300);

    },2500);

}

// ======================================
// Loading
// ======================================

function showLoading(){

    const loading=document.getElementById("loadingOverlay");

    if(loading){

        loading.style.display="flex";

    }

}

function hideLoading(){

    const loading=document.getElementById("loadingOverlay");

    if(loading){

        loading.style.display="none";

    }

}

// ======================================
// Modal
// ======================================

function openModal(html){

    const modal=document.getElementById("modal");

    const body=document.getElementById("modalBody");

    if(!modal||!body)return;

    body.innerHTML=html;

    modal.classList.add("show");

}

function closeModal(){

    const modal=document.getElementById("modal");

    if(modal){

        modal.classList.remove("show");

    }

}

// ======================================
// Confirm
// ======================================

function confirmDialog(message){

    return new Promise(resolve=>{

        openModal(`

            <h2>確認</h2>

            <p>${message}</p>

            <div class="modalButtons">

                <button
                    id="confirmYes"
                    class="primaryButton">

                    OK

                </button>

                <button
                    id="confirmNo"
                    class="secondaryButton">

                    キャンセル

                </button>

            </div>

        `);

        document.getElementById("confirmYes").onclick=()=>{

            closeModal();

            resolve(true);

        };

        document.getElementById("confirmNo").onclick=()=>{

            closeModal();

            resolve(false);

        };

    });

}

// ======================================
// Image Viewer
// ======================================

function openImageViewer(src){

    const viewer=document.getElementById("imageViewer");

    const image=document.getElementById("viewerImage");

    if(!viewer||!image)return;

    image.src=src;

    viewer.classList.add("show");

}

function closeImageViewer(){

    const viewer=document.getElementById("imageViewer");

    if(viewer){

        viewer.classList.remove("show");

    }

}

// ======================================
// Event
// ======================================

document.addEventListener("click",e=>{

    if(e.target.id==="modal"){

        closeModal();

    }

    if(e.target.id==="imageViewer"){

        closeImageViewer();

    }

});

// ======================================
// Window
// ======================================

window.UI={

    showToast,

    showLoading,

    hideLoading,

    openModal,

    closeModal,

    confirmDialog,

    openImageViewer,

    closeImageViewer

};
