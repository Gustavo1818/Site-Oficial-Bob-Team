/* =====================================================
   CT BOB TEAM — JAVASCRIPT ULTRA PREMIUM (CORRIGIDO)
   Arquitetura profissional • UX refinada • Estável
   Galeria e vídeo ISOLADOS corretamente
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
            if (window.scrollY > 40) {
                this.element.classList.add("scrolled");
            } else {
                this.element.classList.remove("scrolled");
            }
        }
    };

    /* =====================================================
       SCROLL REVEAL (COM FAILSAFE)
    ===================================================== */

    const Reveal = {
        items: $$(".reveal"),

        init() {
            if (!this.items.length) return;

            /* Failsafe total para navegadores antigos */
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
            this.show(this.index + 1 >= this.items.length ? 0 : this.index + 1);
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
       SCROLL SUAVE INTERNO
    ===================================================== */

    const SmoothScroll = {
        init() {
            $$("a[href^='#']").forEach(anchor => {
                anchor.addEventListener("click", e => {
                    const target = $(anchor.getAttribute("href"));
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
       GALERIA — CONTROLADA SOMENTE PELO HTML
       (BUG DEFINITIVAMENTE CORRIGIDO)
    ===================================================== */

    const Gallery = {
        init() {
            // Galeria é 100% HTML.
            // JS propositalmente não injeta nada
            // Evita duplicação, quebra de layout e bugs no Acode.
        }
    };

    /* =====================================================
       VÍDEO — ISOLADO NA GALERIA
    ===================================================== */

    const VideoControl = {
        init() {
            const section = $("#galeria");
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
       ESTILOS INJETADOS (CONTROLADOS)
    ===================================================== */

    const InjectedStyles = {
        init() {
            const style = document.createElement("style");
            style.innerHTML = `
                .header.scrolled {
                    background: rgba(0,0,0,0.96);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.85);
                }

                .reveal {
                    opacity: 0;
                    transform: translateY(45px);
                    transition: opacity 0.9s ease, transform 0.9s ease;
                }

                .reveal.active {
                    opacity: 1;
                    transform: translateY(0);
                }

                .testimonial {
                    opacity: 0;
                    transition: opacity 0.6s ease;
                }

                .testimonial.active {
                    opacity: 1;
                }

                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #444;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .dot.active {
                    background: #c00000;
                    transform: scale(1.3);
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