 /* =========================================
    3. Scroll Animation Logic for Icons
========================================= */
        const iconLayer = document.getElementById('icon-layer');
        const techStackSection = document.getElementById('tech-stack');

        const iconsData = [
            // --- VISIBLE IN HERO ---
            { name: 'Git', url: 'assets/icons/Git.svg', hX: 7, hY: 27, tX: 40, tY: 25 },
            { name: 'GitHub', url: 'assets/icons/GitHub.svg', hX: 88, hY: 18, tX: 55, tY: 26 },
            { name: 'Linux', url: 'assets/icons/Linux.svg', hX: 51, hY: 23, tX: 34.5, tY: 43 },
            { name: 'Docker', url: 'assets/icons/Docker.svg', hX: 15, hY: 85, tX: 70, tY: 70 },
            { name: 'Amazon Web Services', url: 'assets/icons/AWS.svg', hX: 64, hY: 91, tX: 25, tY: 65 },
            { name: 'Python', url: 'assets/icons/Python.svg', hX: 36, hY: 32, tX: 27, tY: 50 },
            { name: 'Kubernetes', url: 'assets/icons/Kubernetes.svg', hX: 38, hY: 75, tX: 38, tY: 78 },
            { name: 'PostgreSQL', url: 'assets/icons/PostgreSQL.svg', hX: 96, hY: 65, tX: 62, tY: 82 },

            // --- HIDDEN IN HERO ---
            { name: 'Jupyter', url: 'assets/icons/Jupyter.svg', hX: -20, hY: 50, tX: 55, tY: 85 },
            { name: 'Jira', url: 'assets/icons/Jira.svg', hX: 120, hY: 50, tX: 28, tY: 28 },
            { name: 'Kibana', url: 'assets/icons/Kibana.svg', hX: 120, hY: 120, tX: 65, tY: 35 },
            { name: 'Oracle', url: 'assets/icons/Oracle.svg', hX: 50, hY: 120, tX: 50, tY: 72 },
            { name: 'Bash', url: 'assets/icons/Bash.svg', hX: 50, hY: -20, tX: 72, tY: 47 },
            { name: 'MySQL', url: 'assets/icons/MySQL.svg', hX: 120, hY: 80, tX: 42, tY: 88 },
            { name: 'Terraform', url: 'assets/icons/Terraform.svg', hX: 80, hY: -5, tX: 33, tY: 65},
            { name: 'Nginx', url: 'assets/icons/Nginx.svg', hX: 70, hY: -40, tX: 47, tY: 80}
        ];

        const iconElements = [];
        iconsData.forEach((icon, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'icon-wrapper';
            
            const img = document.createElement('img');
            img.src = icon.url;
            img.className = 'float-inner';
            img.alt = icon.name;
            
            const tooltip = document.createElement('span');
            tooltip.className = 'icon-tooltip';
            tooltip.innerText = icon.name;
            
            wrapper.appendChild(img);
            wrapper.appendChild(tooltip);
            iconLayer.appendChild(wrapper);
            iconElements.push(wrapper);
        });

        function updateIconPositions() {
            const scrollY = window.scrollY;
            
            const techCenterDocY = techStackSection.offsetTop + techStackSection.offsetHeight / 2;
            const targetScrollY = Math.max(1, techCenterDocY - window.innerHeight / 2);
            
            let progress = scrollY / targetScrollY;
            progress = Math.max(0, Math.min(1, progress));
            
            const easeProgress = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            iconsData.forEach((icon, i) => {
                const wrapper = iconElements[i];
                
                const startX = (icon.hX / 100) * window.innerWidth;
                const startY = (icon.hY / 100) * window.innerHeight;
                
                const targetX = (icon.tX / 100) * window.innerWidth;
                const targetY = techStackSection.offsetTop + (icon.tY / 100) * techStackSection.offsetHeight;
                
                const currentDocX = startX + (targetX - startX) * easeProgress;
                const currentDocY = startY + (targetY - startY) * easeProgress;
                
                wrapper.style.left = `${currentDocX}px`;
                wrapper.style.top = `${currentDocY}px`;
                
                const scale = 1 - (0.15 * easeProgress);
                wrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
            });
        }

        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateIconPositions);
        });
        window.addEventListener('resize', () => {
            requestAnimationFrame(updateIconPositions);
        });

        updateIconPositions();

        document.getElementById('footer-year').textContent = new Date().getFullYear();