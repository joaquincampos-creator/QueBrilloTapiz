document.addEventListener("DOMContentLoaded", () => {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("BTsvLI4v3HyzBQBOF");
    }

    const interactiveElements = document.querySelectorAll(".btn-animated, button");
    interactiveElements.forEach(btn => {
        btn.addEventListener("click", function(e) {
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add("ripple-effect");

            const existingRipple = this.querySelector(".ripple-effect");
            if (existingRipple) {
                existingRipple.remove();
            }

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
            const icon = menuBtn.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
                const icon = menuBtn.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            });
        });
    }

    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            navbar?.classList.add("shadow-lg", "bg-white/95");
            navbar?.classList.remove("shadow-sm");
        } else {
            navbar?.classList.remove("shadow-lg");
            navbar?.classList.add("shadow-sm");
        }
    });

    const serviceButtons = document.querySelectorAll('#servicios a[href="#contacto"]');
    const serviceSelect = document.getElementById("service_type");

    serviceButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest("div.bg-slate-50");
            const serviceTitle = card?.querySelector("h4")?.textContent?.trim();

            if (serviceTitle && serviceSelect) {
                Array.from(serviceSelect.options).forEach(option => {
                    if (serviceTitle.toLowerCase().includes(option.value.toLowerCase()) || 
                        option.value.toLowerCase().includes(serviceTitle.toLowerCase())) {
                        option.selected = true;
                    }
                });
            }
        });
    });

    const dateInput = document.getElementById("preferred_date");
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.setAttribute("min", today);
    }

    const bookingForm = document.getElementById("booking-form");
    const submitBtn = document.getElementById("submit-btn");
    const btnText = document.getElementById("btn-text");
    const btnIcon = document.getElementById("btn-icon");
    const formAlert = document.getElementById("form-alert");

    if (bookingForm) {
        bookingForm.addEventListener("submit", function(e) {
            e.preventDefault();

            submitBtn.disabled = true;
            submitBtn.classList.add("opacity-80", "cursor-not-allowed");
            btnText.textContent = "Enviando solicitud...";
            btnIcon.className = "fa-solid fa-circle-notch fa-spin text-sm";
            
            if (formAlert) {
                formAlert.classList.add("hidden");
            }

            const serviceID = "service_948qf9k";
            const templateID = "template_jgaykub";

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    mostrarExito();
                })
                .catch((error) => {
                    console.error("Error EmailJS:", error);
                    mostrarError("Hubo un error al enviar la solicitud. Inténtalo de nuevo o contáctanos por WhatsApp.");
                })
                .finally(() => {
                    restaurarBoton();
                });
        });
    }

    function mostrarExito() {
        if (!formAlert) return;
        formAlert.innerHTML = `<i class="fa-solid fa-circle-check text-base mr-2"></i><strong>¡Solicitud de cita enviada con éxito!</strong> Queda pendiente de confirmación. Nos pondremos en contacto contigo.`;
        formAlert.className = "p-4 rounded-xl text-sm font-medium text-center bg-emerald-50 text-emerald-700 border border-emerald-200 block";
        bookingForm.reset();
    }

    function mostrarError(mensaje) {
        if (!formAlert) return;
        formAlert.innerHTML = `<i class="fa-solid fa-circle-exclamation text-base mr-2"></i> ${mensaje}`;
        formAlert.className = "p-4 rounded-xl text-sm font-medium text-center bg-rose-50 text-rose-700 border border-rose-200 block";
    }

    function restaurarBoton() {
        submitBtn.disabled = false;
        submitBtn.classList.remove("opacity-80", "cursor-not-allowed");
        btnText.textContent = "Solicitar Cita";
        btnIcon.className = "fa-solid fa-paper-plane text-sm";
    }
});