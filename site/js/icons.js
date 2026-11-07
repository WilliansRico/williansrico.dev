/*
 * Scroll animation for the icons.
 */

const iconLayer = document.getElementById('icon-layer');
const techStackSection = document.getElementById('tech-stack');

if (iconLayer && techStackSection) {

    const iconsData = [
        // VISIBLE IN HERO / GREETINGS SECTION
        {
            name: 'Terraform',
            url: 'assets/icons/terraform.svg',
            hX: 7, hY: 26,
            mHX: 44, mHY: 15.7,
            tX: 40, tY: 25
        },
        {
            name: 'GitHub',
            url: 'assets/icons/GitHub.svg',
            hX: 88, hY: 18,
            mHX: 89.5, mHY: 23.5,
            tX: 55, tY: 26
        },
        {
            name: 'Linux',
            url: 'assets/icons/Linux.svg',
            hX: 51, hY: 21.5,
            mHX: 93, mHY: 41.8,
            tX: 35.5, tY: 44
        },
        {
            name: 'Docker',
            url: 'assets/icons/Docker.svg',
            hX: 15, hY: 85,
            mHX: 69, mHY: 19.5,
            tX: 70, tY: 70
        },
        {
            name: 'Amazon Web Services',
            url: 'assets/icons/AWS.svg',
            hX: 64, hY: 91,
            mHX: 54, mHY: 36.8,
            tX: 25, tY: 66
        },
        {
            name: 'Python',
            url: 'assets/icons/Python.svg',
            hX: 36, hY: 32,
            mHX: 93, mHY: 15.8,
            tX: 27, tY: 50
        },
        {
            name: 'Kubernetes',
            url: 'assets/icons/Kubernetes.svg',
            hX: 38, hY: 75,
            mHX: 77, mHY: 39,
            tX: 38, tY: 78
        },
        {
            name: 'PostgreSQL',
            url: 'assets/icons/PostgreSQL.svg',
            hX: 96, hY: 65,
            mHX: 32, mHY: 80,
            tX: 62, tY: 82
        },

        // HIDDEN INITIALLY IN HERO ON MOBILE
        {
            name: 'Jupyter',
            url: 'assets/icons/Jupyter.svg',
            hX: -20, hY: 50,
            mHX: -20, mHY: 50,
            tX: 55, tY: 85
        },
        {
            name: 'Cloudflare',
            url: 'assets/icons/cloudflare.svg',
            hX: -20, hY: 50,
            mHX: -20, mHY: 50,
            tX: 61, tY: 56.5
        },
        {
            name: 'Jira',
            url: 'assets/icons/Jira.svg',
            hX: 120, hY: 50,
            mHX: 120, mHY: 50,
            tX: 28, tY: 28
        },
        {
            name: 'Kibana',
            url: 'assets/icons/Kibana.svg',
            hX: 120, hY: 120,
            mHX: 120, mHY: 120,
            tX: 65, tY: 35
        },
        {
            name: 'Oracle',
            url: 'assets/icons/Oracle.svg',
            hX: 50, hY: 120,
            mHX: 50, mHY: -10,
            tX: 50, tY: 72
        },
        {
            name: 'Bash',
            url: 'assets/icons/Bash.svg',
            hX: 50, hY: -20,
            mHX: 50, mHY: -20,
            tX: 72, tY: 47
        },
        {
            name: 'MySQL',
            url: 'assets/icons/MySQL.svg',
            hX: 120, hY: 80,
            mHX: 120, mHY: 80,
            tX: 42, tY: 88
        },
        {
            name: 'Git',
            url: 'assets/icons/git.svg',
            hX: 80, hY: -5,
            mHX: 80, mHY: -5,
            tX: 33, tY: 65
        },
        {
            name: 'Nginx',
            url: 'assets/icons/Nginx.svg',
            hX: 70, hY: -40,
            mHX: 70, mHY: -40,
            tX: 47, tY: 80
        },
        {
            name: 'Tableau',
            url: 'assets/icons/Tableau.svg',
            hX: 120, hY: 20,
            mHX: 120, mHY: 20,
            tX: 48, tY: 25
        },
        {
            name: 'Power BI',
            url: 'assets/icons/PowerBI.svg',
            hX: 120, hY: 120,
            mHX: 120, mHY: 120,
            tX: 70, tY: 57
        },
        {
            name: 'Excel',
            url: 'assets/icons/excel.svg',
            hX: 123, hY: 123,
            mHX: 123, mHY: 123,
            tX: 70, tY: 37
        }
    ];


    /*
     * MOBILE LANDING POSITIONS
     */

    const mobileLandingPositions = {
        // --- TOP ROW ---
        'Git': { x: 30, y: 65 },
        'GitHub': { x: 35, y: 41 },
        'Linux': { x: 22.5, y: 46.5 },
        'Docker': { x: 71, y: 39 },
        'Amazon Web Services': { x: 73, y: 33 },

        // --- UPPER SIDES ---
        'Python': { x: 20, y: 38 },
        'Kubernetes': { x: 90, y: 38 },

        // --- MIDDLE SIDES ---
        'PostgreSQL': { x: 8, y: 46 },
        'Jupyter': { x: 90, y: 46 },
        'Cloudflare': { x: 77, y: 46 },

        'Jira': { x: 10, y: 55 },
        'Kibana': { x: 89, y: 54 },

        'Oracle': { x: 45, y: 62 },
        'Bash': { x: 92, y: 62 },

        // --- BOTTOM ROW ---
        'MySQL': { x: 15, y: 60 },
        'Terraform': { x: 55, y: 40 },
        'Nginx': { x: 50, y: 69 },
        'Tableau': { x: 65, y: 65 },
        'Power BI': { x: 80, y: 67 },

        // --- CENTER TOP ---
        'Excel': { x: 45, y: 32 }
    };


    /* ELEMENT CREATION */

    const iconElements = [];
    const mobileQuery = window.matchMedia('(max-width: 600px)');

    iconsData.forEach((icon) => {

        const wrapper = document.createElement('div');

        wrapper.className = 'icon-wrapper';
        wrapper.setAttribute('aria-hidden', 'true');

        const img = document.createElement('img');

        img.src = icon.url;
        img.className = 'float-inner';
        img.alt = '';
        img.decoding = 'async';

        const tooltip = document.createElement('span');

        tooltip.className = 'icon-tooltip';
        tooltip.textContent = icon.name;

        wrapper.appendChild(img);
        wrapper.appendChild(tooltip);

        iconLayer.appendChild(wrapper);

        iconElements.push(wrapper);
    });


    /* ANIMATION TIMING */

    const DESKTOP_LEAD_SCREENS = 1.4;

    /* MOBILE REFERENCE CANVAS */
    const MOBILE_REFERENCE_WIDTH = 390;
    const MOBILE_REFERENCE_HEIGHT = 844;

    // Interpolation speed.
    const DESKTOP_LERP_FACTOR = 0.15;

    // Mobile acceleration.
    const MOBILE_FINAL_LERP_FACTOR = 0.90;
    const MOBILE_FINAL_ACCELERATION_START = 0.65;

    const SETTLE_THRESHOLD = 0.0005;

    const TOUCH_SETTLE_WINDOW = 400;

    let targetProgress = 0;
    let currentProgress = 0;

    let animationFrameActive = false;

    let cachedTechStackDocumentTop = 0;
    let cachedTechStackHeight = 0;

    /* Stable mobile starting positions. */

    let cachedViewportHeight = window.innerHeight;
    let cachedViewportWidth = document.documentElement.clientWidth;

    let cachedOrientation = getOrientation();

    /* Touch tracking. */

    let touchActive = false;

    let lastScrollY = window.scrollY;
    let lastScrollChangeTime = 0;


    /* UTILITIES */

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function getDocumentTop(element) {
        return element.getBoundingClientRect().top + window.scrollY;
    }

    function getOrientation() {
        return window.matchMedia('(orientation: portrait)')
            .matches ? 'portrait' : 'landscape';
    }

    function refreshMobileGeometry() {
        cachedTechStackDocumentTop = getDocumentTop(techStackSection);
        cachedTechStackHeight = techStackSection.offsetHeight;
    }


    /* ICONS RENDERING */

    function renderIcons(progress) {

        const isMobile = mobileQuery.matches;

        /* Mobile uses linear easing for quick movement. */

        const easedProgress = isMobile
            ? progress
            : (
                progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2
            );

        const viewportWidth = document.documentElement.clientWidth;

        const techStackDocumentTop = isMobile
            ? cachedTechStackDocumentTop
            : techStackSection.offsetTop;

        const techStackHeight = isMobile
            ? cachedTechStackHeight
            : techStackSection.offsetHeight;

        /*
         On mobile, preserve the same icon composition across screen sizes by mapping the fixed reference canvas into the visible viewport.
         */
        const mobileLayoutScale = isMobile
            ? Math.min(
                viewportWidth / MOBILE_REFERENCE_WIDTH,
                window.innerHeight / MOBILE_REFERENCE_HEIGHT
            )
            : 1;

        const mobileCanvasWidth = MOBILE_REFERENCE_WIDTH * mobileLayoutScale;
        const mobileCanvasHeight = MOBILE_REFERENCE_HEIGHT * mobileLayoutScale;

        const mobileCanvasOffsetX = isMobile
            ? (viewportWidth - mobileCanvasWidth) / 2
            : 0;

        const mobileCanvasOffsetY = isMobile
            ? (window.innerHeight - mobileCanvasHeight) / 2
            : 0;

        const referenceHeight = isMobile
            ? MOBILE_REFERENCE_HEIGHT
            : window.innerHeight;


        iconsData.forEach((icon, index) => {

            const wrapper = iconElements[index];

            /* Select greeting coordinates. */

            const greetingX = isMobile ? icon.mHX : icon.hX;
            const greetingY = isMobile ? icon.mHY : icon.hY;

            const startX = isMobile
                ? mobileCanvasOffsetX
                    + (greetingX / 100) * MOBILE_REFERENCE_WIDTH
                        * mobileLayoutScale
                : (greetingX / 100) * viewportWidth;

            const startY = isMobile
                ? mobileCanvasOffsetY
                    + (greetingY / 100) * MOBILE_REFERENCE_HEIGHT
                        * mobileLayoutScale
                : (greetingY / 100) * referenceHeight;

            let targetX;
            let targetY;


            /* MOBILE DESTINATIONS */

            if (isMobile) {

                const destination = mobileLandingPositions[icon.name];

                if (!destination) {

                    console.warn(
                        `Missing mobile destination for icon: ${icon.name}`
                    );

                    return;
                }

                targetX = mobileCanvasOffsetX
                    + (destination.x / 100) * MOBILE_REFERENCE_WIDTH
                        * mobileLayoutScale;

                /* Keep landing positions relative to the real Tech Stack section. */
                targetY = techStackDocumentTop
                    + (destination.y / 100) * techStackHeight;

            } else {

                /* DESKTOP DESTINATIONS */

                targetX = (icon.tX / 100) * viewportWidth;

                targetY = techStackDocumentTop
                    + (icon.tY / 100) * techStackHeight;
            }


            /* INTERPOLATED POSITION */

            const x = startX + (targetX - startX) * easedProgress;
            const y = startY + (targetY - startY) * easedProgress;


            /* ICON SCALE */

            const scale = isMobile
                ? 1 - (0.08 * easedProgress)
                : 1 - (0.15 * easedProgress);

            wrapper.style.transform =
                `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;

        });
    }


    /* TARGET CALCULATION */

    function calculateTarget() {

        const isMobile = mobileQuery.matches;

        if (isMobile) {

            const techCenterDocY = cachedTechStackDocumentTop
                + cachedTechStackHeight / 2;

            /* Keep the original destination calculation. */

            const animationEnd = Math.max(
                1,
                techCenterDocY - window.innerHeight / 2
            );

            targetProgress = clamp(
                window.scrollY / animationEnd,
                0,
                1
            );

        } else {

            /* DESKTOP: animation timing. */

            const sectionTop = techStackSection.offsetTop;
            const sectionHeight = techStackSection.offsetHeight;

            const techCenterDocY = sectionTop + sectionHeight / 2;

            const naturalEnd = Math.max(
                1,
                techCenterDocY - window.innerHeight / 2
            );

            const start = naturalEnd
                - (window.innerHeight * DESKTOP_LEAD_SCREENS);

            targetProgress = clamp(
                (window.scrollY - start)
                    / Math.max(1, naturalEnd - start),
                0,
                1
            );
        }
    }


    /* SCROLL POSITION */

    function sampleScrollPosition() {

        const currentScrollY = window.scrollY;

        if (currentScrollY !== lastScrollY) {

            lastScrollY = currentScrollY;

            lastScrollChangeTime = performance.now();
        }

        calculateTarget();
    }


    /* ANIMATION LOOP */

    function tick() {

        if (mobileQuery.matches) {

            const recentlyScrolling =
                performance.now() - lastScrollChangeTime
                < TOUCH_SETTLE_WINDOW;

            if (touchActive || recentlyScrolling) {
                sampleScrollPosition();
            }
        }

        const mobileFinalProgress = mobileQuery.matches
            ? clamp(
                (targetProgress - MOBILE_FINAL_ACCELERATION_START) /
                (1 - MOBILE_FINAL_ACCELERATION_START),
                0,
                1
            )
            : 0;

        const lerpFactor = mobileQuery.matches
            ? DESKTOP_LERP_FACTOR +
                (MOBILE_FINAL_LERP_FACTOR - DESKTOP_LERP_FACTOR)
                * mobileFinalProgress
            : DESKTOP_LERP_FACTOR;


        /* ORIGINAL LERP INTERPOLATION */

        currentProgress +=
            (targetProgress - currentProgress) * lerpFactor;

        renderIcons(currentProgress);

        const recentlyScrolling = mobileQuery.matches &&
            (
                touchActive ||
                performance.now() - lastScrollChangeTime
                    < TOUCH_SETTLE_WINDOW
            );

        if (
            Math.abs(targetProgress - currentProgress) > SETTLE_THRESHOLD ||
            recentlyScrolling
        ) {

            requestAnimationFrame(tick);

        } else {

            currentProgress = targetProgress;

            renderIcons(currentProgress);

            animationFrameActive = false;
        }
    }


    /* START ANIMATION */

    function startAnimation() {

        if (!animationFrameActive) {

            animationFrameActive = true;

            requestAnimationFrame(tick);
        }
    }


    /* UPDATE TARGET */

    function updateTarget() {

        calculateTarget();

        startAnimation();
    }


    /* MOBILE TOUCH HANDLING */

    function handleTouchStart() {

        if (!mobileQuery.matches) {
            return;
        }

        touchActive = true;

        lastScrollY = window.scrollY;

        lastScrollChangeTime = performance.now();

        updateTarget();
    }

    function handleTouchMove() {

        if (!mobileQuery.matches || !touchActive) {
            return;
        }

        sampleScrollPosition();

        startAnimation();
    }

    function handleTouchEnd() {

        if (!touchActive) {
            return;
        }

        touchActive = false;

        lastScrollY = window.scrollY;

        lastScrollChangeTime = performance.now();

        updateTarget();
    }


    /* SCROLL EVENT HANDLING */

    function handleScroll() {

        const currentScrollY = window.scrollY;

        if (currentScrollY !== lastScrollY) {

            lastScrollY = currentScrollY;

            lastScrollChangeTime = performance.now();
        }

        updateTarget();
    }

    window.addEventListener(
        'scroll',
        handleScroll,
        { passive: true }
    );


    /* TOUCH EVENT LISTENERS */

    window.addEventListener(
        'touchstart',
        handleTouchStart,
        { passive: true }
    );

    window.addEventListener(
        'touchmove',
        handleTouchMove,
        { passive: true }
    );

    window.addEventListener(
        'touchend',
        handleTouchEnd,
        { passive: true }
    );

    window.addEventListener(
        'touchcancel',
        handleTouchEnd,
        { passive: true }
    );


    /* VIEWPORT CHANGE HANDLING */

    function handleViewportChange() {

        const newWidth = document.documentElement.clientWidth;
        const newOrientation = getOrientation();

        const widthChanged = Math.abs(
            newWidth - cachedViewportWidth
        ) > 1;

        const orientationChanged =
            newOrientation !== cachedOrientation;

        if (
            !mobileQuery.matches ||
            widthChanged ||
            orientationChanged
        ) {

            cachedViewportHeight = window.innerHeight;
        }

        cachedViewportWidth = newWidth;
        cachedOrientation = newOrientation;

        refreshMobileGeometry();

        updateTarget();

        renderIcons(currentProgress);
    }


    window.addEventListener(
        'resize',
        handleViewportChange
    );

    if (mobileQuery.addEventListener) {

        mobileQuery.addEventListener(
            'change',
            handleViewportChange
        );

    } else if (mobileQuery.addListener) {

        mobileQuery.addListener(handleViewportChange);
    }


    /* INITIALIZATION */

    refreshMobileGeometry();

    calculateTarget();

    currentProgress = targetProgress;

    renderIcons(currentProgress);


    /* LAYOUT OBSERVER */

    const layoutObserver = typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {

            if (mobileQuery.matches) {

                refreshMobileGeometry();

                updateTarget();
            }

        })
        : null;

    if (layoutObserver) {

        const heroSection = document.getElementById('hero');
        const terminalBody = document.querySelector('.terminal-body');

        if (heroSection) {
            layoutObserver.observe(heroSection);
        }

        if (terminalBody) {
            layoutObserver.observe(terminalBody);
        }

        layoutObserver.observe(techStackSection);
    }


    /* PAGE LOAD */

    window.addEventListener('load', () => {

        if (mobileQuery.matches) {
            handleViewportChange();
        }

    }, { once: true });


    /* FONT LOADING */

    if (document.fonts && document.fonts.ready) {

        document.fonts.ready.then(() => {

            if (mobileQuery.matches) {
                refreshMobileGeometry();
                updateTarget();
            }

        });
    }


    /* FOOTER YEAR */

    const footerYear = document.getElementById('footer-year');

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
}


/* ACCESSIBLE MOBILE NAVIGATION */

(() => {

    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.getElementById('primary-navigation');

    if (!toggle || !menu) return;

    const mobileViewport = window.matchMedia('(max-width: 600px)');

    function setMenuOpen(open) {

        toggle.classList.toggle('is-open', open);
        menu.classList.toggle('is-open', open);

        toggle.setAttribute('aria-expanded', String(open));

        toggle.setAttribute(
            'aria-label',
            open ? 'Close navigation menu' : 'Open navigation menu'
        );
    }

    toggle.addEventListener('click', () => {

        setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');

    });

    menu.querySelectorAll('a').forEach((link) => {

        link.addEventListener('click', () => setMenuOpen(false));

    });

    document.addEventListener('keydown', (event) => {

        if (
            event.key === 'Escape' &&
            toggle.getAttribute('aria-expanded') === 'true'
        ) {

            setMenuOpen(false);
            toggle.focus();
        }
    });

    document.addEventListener('click', (event) => {

        if (
            mobileViewport.matches &&
            toggle.getAttribute('aria-expanded') === 'true' &&
            !toggle.contains(event.target) &&
            !menu.contains(event.target)
        ) {

            setMenuOpen(false);
        }
    });

    function handleViewportChange() {

        if (!mobileViewport.matches) {
            setMenuOpen(false);
        }
    }

    if (mobileViewport.addEventListener) {

        mobileViewport.addEventListener(
            'change',
            handleViewportChange
        );

    } else if (mobileViewport.addListener) {

        mobileViewport.addListener(handleViewportChange);
    }

})();