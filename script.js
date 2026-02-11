/* =====================================================
   CT BOB TEAM — JAVASCRIPT ULTRA PREMIUM (FINAL)
   Arquitetura profissional • UX refinada • Estável
   BUG DO INSTAGRAM 100% CORRIGIDO
===================================================== */

(() => {
    "use strict";

    /* =====================================================
       UTILITÁRIOS
    ===================================================== */

    const $ = (el, scope = document) => scope.querySelector(el);
    const $$ = (el, scope = document) => [...scope.querySelectorAll(el)];

    const debounce = (fn, delay = 100) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(null, args), delay);
        };
    };

    /* =====================================================
       LOADING SCREEN
    ===================================================== */

    const Loading = {
        element: $("#loading"),

        init() {
            if (!this.element) return;

            window.addEventListener("load", () => {
                setTimeout(() => {
                    this.element.style.opacity = "0";
                    this.element.style.pointerEvents = "none";
                }, 600);
            });
        }
    };

    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const MobileMenu = {
        button: $("#menuToggle"),
        menu: $("#menu"),
        activeClass: "active",

        init() {
            if (!this.button || !this.menu) return;

            this.button.addEventListener("click", () => this.toggle());

            $$("a", this.menu).forEach(link => {
                link.addEventListener("click", () => this.close());
            });

            window.addEventListener("resize", () => {
                if (window.innerWidth > 900) this.reset();
            });
        },

        open() {
            this.menu.classList.add(this.activeClass);
            this.button.classList.add(this.activeClass);
            document.body.style.overflow = "hidden";
        },

        close() {
            this.menu.classList.remove(this.activeClass);
            this.button.classList.remove(this.activeClass);
            document.body.style.overflow = "";
        },

        toggle() {
            this.menu.classList.contains(this.activeClass)
                ? this.close()
                : this.open();
        },

        reset() {
            this.close();
        }
    };

    /* =====================================================
       HEADER INTELIGENTE
    ===================================================== */

    const Header = {
        element: $("#header"),

        init() {
            if (!this.element) return;

            window.addEventListener(
                "scroll",
                debounce(() => this.onScroll(), 10)
            );
        },

        onScroll() {
            this.element.classList.toggle("scrolled", window.scrollY > 40);
        }
    };

    /* =====================================================
       SCROLL REVEAL (FAILSAFE TOTAL)
    ===================================================== */

    const Reveal = {
        items: $$(".reveal"),

        init() {
            if (!this.items.length) return;

            if (!("IntersectionObserver" in window)) {
                this.items.forEach(item => item.classList.add("active"));
                return;
            }

            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("active");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.18 }
            );

            this.items.forEach(item => observer.observe(item));
        }
    };

    /* =====================================================
       DEPOIMENTOS — CARROSSEL
    ===================================================== */

    const Testimonials = {
        items: $$(".testimonial"),
        dotsContainer: $("#testimonialDots"),
        index: 0,
        timer: null,
        delay: 6500,

        init() {
            if (!this.items.length) return;

            this.createDots();
            this.show(this.index);
            this.autoPlay();

            this.items.forEach(item => {
                item.addEventListener("mouseenter", () => this.pause());
                item.addEventListener("mouseleave", () => this.autoPlay());
            });
        },

        createDots() {
            if (!this.dotsContainer) return;

            this.items.forEach((_, i) => {
                const dot = document.createElement("span");
                dot.className = "dot";
                dot.addEventListener("click", () => this.goTo(i));
                this.dotsContainer.appendChild(dot);
            });
        },

        show(i) {
            this.items.forEach((item, index) => {
                item.classList.toggle("active", index === i);
                item.style.display = index === i ? "block" : "none";
            });

            if (this.dotsContainer) {
                $$(".dot", this.dotsContainer).forEach((dot, index) => {
                    dot.classList.toggle("active", index === i);
                });
            }

            this.index = i;
        },

        next() {
            this.show((this.index + 1) % this.items.length);
        },

        goTo(i) {
            this.show(i);
            this.restart();
        },

        autoPlay() {
            this.timer = setInterval(() => this.next(), this.delay);
        },

        pause() {
            clearInterval(this.timer);
        },

        restart() {
            this.pause();
            this.autoPlay();
        }
    };

    /* =====================================================
       SCROLL SUAVE — CORRIGIDO (SEM BLOQUEAR LINKS EXTERNOS)
    ===================================================== */

    const SmoothScroll = {
        init() {
            $$("a[href^='#']").forEach(anchor => {
                anchor.addEventListener("click", e => {
                    const href = anchor.getAttribute("href");

                    // Proteção absoluta
                    if (!href || href === "#" || href.length < 2) return;

                    const target = document.querySelector(href);
                    if (!target) return;

                    e.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                });
            });
        }
    };

    /* =====================================================
       GALERIA — 100% HTML (SEM JS)
    ===================================================== */

    const Gallery = {
        init() {
            // intencionalmente vazio
        }
    };

    /* =====================================================
       VÍDEO — AUTOPAUSE
    ===================================================== */

    const VideoControl = {
        init() {
            const section = $("#treinos");
            if (!section) return;

            const video = section.querySelector("video");
            if (!video) return;

            if (!("IntersectionObserver" in window)) return;

            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        entry.isIntersecting ? video.play() : video.pause();
                    });
                },
                { threshold: 0.6 }
            );

            observer.observe(video);
        }
    };

    /* =====================================================
       ESTILOS INJETADOS
    ===================================================== */

    const InjectedStyles = {
        init() {
            const style = document.createElement("style");
            style.innerHTML = `
                .header.scrolled {
                    background: rgba(0,0,0,0.96);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.85);
                }
            `;
            document.head.appendChild(style);
        }
    };

    /* =====================================================
       INIT GLOBAL
    ===================================================== */

    document.addEventListener("DOMContentLoaded", () => {
        Loading.init();
        MobileMenu.init();
        Header.init();
        Reveal.init();
        Testimonials.init();
        SmoothScroll.init();
        Gallery.init();
        VideoControl.init();
        InjectedStyles.init();
    });

})();
// ...seu JS atual aqui em cima

document.addEventListener("DOMContentLoaded", function () {
    const credito = document.getElementById("credito-fotografo");

    if (!credito) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    credito.classList.add("visivel");
                }
            });
        },
        { threshold: 0.3 }
    );

    observer.observe(credito);
});

/* =========================================================
BOB TEAM — CINEMATIC LIGHT EFFECT
Microinteração premium / alta performance / sem glitches
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".conduta-item");

    if (!cards.length) return;

    cards.forEach(card => {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty("--mouse-x", `${x}%`);
            card.style.setProperty("--mouse-y", `${y}%`);
        });

        /* Reset suave quando sai */
        card.addEventListener("mouseleave", () => {
            card.style.setProperty("--mouse-x", `50%`);
            card.style.setProperty("--mouse-y", `50%`);
        });

    });

});

/* =========================================================
   FADE-IN SUAVE — CONDUTA
========================================================= */

const condutaItems = document.querySelectorAll('.conduta-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.15
});

condutaItems.forEach(item => observer.observe(item));