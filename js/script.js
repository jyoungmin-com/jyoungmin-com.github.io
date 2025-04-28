window.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // Handle navbar active link on scroll
    // ==========================================
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links li");

    function updateActiveLink() {
        let current = "";
        const scrollMidpoint = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollMidpoint >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(li => {
            const anchor = li.querySelector("a");
            const href = anchor.getAttribute("href").substring(1);
            li.classList.toggle("active", href === current);
        });
    }

    window.addEventListener("scroll", updateActiveLink);

    // ==========================================
    // Scroll to top when clicking "Home"
    // ==========================================
    const homeLink = document.querySelector("a[href='#home']");
    if (homeLink) {
        homeLink.addEventListener("click", e => {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: "smooth"});
        });
    }

    // ==========================================
    // Initial dark mode setup
    // ==========================================
    const body = document.body;
    const themeToggle = document.getElementById("theme-toggle");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
        body.classList.toggle("dark-mode", savedTheme === "dark");
    } else {
        body.classList.toggle("dark-mode", systemPrefersDark);
    }

    // ==========================================
    // Update theme toggle icon (moon/sun)
    // ==========================================
    function setThemeIcon() {
        const isDark = body.classList.contains("dark-mode");
        themeToggle.innerHTML = `<i data-lucide="${isDark ? "sun" : "moon"}"></i>`;
        lucide.createIcons();
    }

    setThemeIcon();

    // ==========================================
    // Toggle dark mode on click
    // ==========================================
    themeToggle.addEventListener("click", () => {
        const isDark = body.classList.toggle("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        setThemeIcon();
    });

    // ==========================================
    // Language dropdown toggle and selection
    // ==========================================
    const langToggle = document.getElementById("lang-toggle");
    const langMenu = document.querySelector(".lang-menu");

    // Toggle dropdown menu on button click
    langToggle.addEventListener("click", () => {
        langMenu.classList.toggle("hidden");
    });

    // Handle language selection
    langMenu.querySelectorAll("li").forEach(item => {
        item.addEventListener("click", () => {
            const lang = item.dataset.lang;
            console.log(lang);
            localStorage.setItem("preferredLang", lang);

            switch (lang) {
                case "ko":
                    window.location.href = "../index/index_ko.html";
                    break;
                case "ja":
                    window.location.href = "../index/index_ja.html";
                    break;
                default:
                    window.location.href = "../index/index_en.html";
            }
        });
    });

    // ==========================================
    // Close dropdown when clicking outside
    // ==========================================
    document.addEventListener("click", (e) => {
        if (!langMenu.contains(e.target) && !langToggle.contains(e.target)) {
            langMenu.classList.add("hidden");
        }
    });

    // ==========================================
    // Smooth scroll for navbar links (except Home)
    // ==========================================
    document.querySelectorAll('.nav-links a[href^="#"]:not([href="#home"])').forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();

            const targetId = link.getAttribute("href").substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                const offset = target.offsetTop - 100; // Offset for navbar height
                window.scrollTo({top: offset, behavior: "smooth"});
            }
        });
    });
});

