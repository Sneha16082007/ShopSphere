// =========================================
// ShopSphere Contact Form
// =========================================

const contactForm = document.getElementById("contactForm");

// =========================================
// Initialize
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    contactForm.addEventListener("submit", submitForm);

});

// =========================================
// Submit Form
// =========================================

function submitForm(e){

    e.preventDefault();

    const name =
    document.getElementById("name").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const subject =
    document.getElementById("subject").value.trim();

    const message =
    document.getElementById("message").value.trim();

    if(name==="" || email==="" || message===""){

        showToast("⚠ Please fill all required fields.");

        return;

    }

    if(!validateEmail(email)){

        showToast("❌ Enter a valid email address.");

        return;

    }

    showToast("✅ Message sent successfully!");

    contactForm.reset();

}

// =========================================
// Email Validation
// =========================================

function validateEmail(email){

    const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}

// =========================================
// Toast Notification
// =========================================

function showToast(message){

    const toast =
    document.createElement("div");

    toast.innerHTML = message;

    Object.assign(toast.style,{

        position:"fixed",

        top:"30px",

        right:"30px",

        padding:"16px 24px",

        background:"linear-gradient(135deg,#6C63FF,#00E5FF)",

        color:"#fff",

        borderRadius:"12px",

        fontWeight:"600",

        boxShadow:"0 15px 35px rgba(0,0,0,.25)",

        opacity:"0",

        transform:"translateY(-20px)",

        transition:".35s",

        zIndex:"99999"

    });

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.style.opacity="1";

        toast.style.transform="translateY(0)";

    },100);

    setTimeout(()=>{

        toast.style.opacity="0";

        toast.style.transform="translateY(-20px)";

        setTimeout(()=>{

            toast.remove();

        },350);

    },2500);

}