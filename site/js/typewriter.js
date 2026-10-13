 /*
    Dynamic Typewriter Effect
*/

        const typeWords = ["Data analysis", "Data engineering", "Automation", "DevOps"];
        let wordIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        const typeTarget = document.getElementById("typing-text");

        function typeEffect() {
            const currentWord = typeWords[wordIdx];
            
            if (isDeleting) {
                typeTarget.innerText = currentWord.substring(0, charIdx - 1);
                charIdx--;
            } else {
                typeTarget.innerText = currentWord.substring(0, charIdx + 1);
                charIdx++;
            }
            
            let typeSpeed = isDeleting ? 50 : 120;
            
            if (!isDeleting && charIdx === currentWord.length) {
                typeSpeed = 2000; 
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                wordIdx = (wordIdx + 1) % typeWords.length;
                typeSpeed = 500; 
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        typeEffect();