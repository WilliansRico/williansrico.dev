 /*
    2. Interactive Terminal Logic
*/

const termBody = document.getElementById('term-body');
const delay = ms => new Promise(res => setTimeout(res, ms));
const promptString = "willians@portfolio: ~/about$";

const fileSystem = {
    "bio.txt": "I am passionate about automation, data analysis and engeneering as well as DevOps work. I enjoy a lot working with complex tools that challenge me to a deep level",
    "hobbies.txt": "Learn new on-damand tools to keep me ahead, planning side projects and when I am not coding, I am usually playin chess or video games to keep my mind sharp. I also enjoy reading books and articles on technology, science and philosophy as I find them interesting.",
    "passion.txt": "My passion lies in analysing complex data, engineering pipelines solutions and challenging myself with the most complex tool out there. I love automating/building great stuff as a mind workout.",
    "services.txt": "Data Pipeline Architecturing, Cloud Deployments (AWS/GCP), CI/CD (Tasks/Systems) Automation, Dashboards, Data Analytics, Software/Web Development & Systems Maintenance/Administration."
};

const commands = {
    "help": "Show all available commands",
    "ls": "List available files",
    "cat <file>": "Display the contents of a file",
    "clear": "Clear the terminal"
};

function createTermLine(prompt, cmd) {
    let div = document.createElement('div');
    div.className = "term-line";
    div.innerHTML = `<span class="term-prompt">${prompt}</span><span class="term-cmd">${cmd}</span>`;
    return div;
}

async function typeTermText(element, text, speed) {
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text.charAt(i);
        await delay(speed);
    }
}

async function initTerminal() {
    await delay(1000);
    
    let line1 = createTermLine(promptString, "");
    termBody.appendChild(line1);
    await typeTermText(line1.querySelector('.term-cmd'), "cat bio.txt", 40);
    await delay(300);
    
    let out1 = document.createElement('div');
    out1.className = "term-output";
    out1.innerText = fileSystem["bio.txt"];
    termBody.appendChild(out1);
    
    await delay(600);
    let line2 = createTermLine(promptString, "");
    termBody.appendChild(line2);
    await typeTermText(line2.querySelector('.term-cmd'), "ls", 60);
    await delay(200);
    
    let out2 = document.createElement('div');
    out2.className = "term-files";
    out2.innerText = "bio.txt services.txt hobbies.txt passion.txt";
    termBody.appendChild(out2);
    
    await delay(400);
    let hint = document.createElement('div');
    hint.className = "term-hint";
    hint.innerHTML = 'This terminal is interactive, try typing <strong><em>cat services.txt</em></strong> or any file name listed above.';
    termBody.appendChild(hint);
    
    setupInteractiveInput();
}

function setupInteractiveInput() {
    let wrapper = document.createElement('div');
    wrapper.className = "term-input-wrapper";
    wrapper.innerHTML = `<span class="term-prompt">${promptString}</span><input type="text" class="term-input" autocomplete="off" spellcheck="false">`;
    termBody.appendChild(wrapper);
    
    const input = wrapper.querySelector('input');
    
    termBody.parentElement.addEventListener('click', () => input.focus());

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const val = this.value.trim();

            if (val !== "") {
                let staticLine = createTermLine(promptString, val);
                termBody.insertBefore(staticLine, wrapper);
                
                if (val === "help") {
                    let out = document.createElement('div');
                    out.className = "term-output";

                    let helpText = '<div>Available commands:</div>';

                    for (const [command, description] of Object.entries(commands)) {
                        helpText += `<div><strong>${command}</strong> — ${description}</div>`;
                    }

                    out.innerHTML = helpText;
                    termBody.insertBefore(out, wrapper);

                } else if (val.startsWith("cat ")) {
                    const filename = val.split(" ")[1];

                    let out = document.createElement('div');
                    out.className = "term-output";

                    if (fileSystem[filename]) {
                        out.innerText = fileSystem[filename];
                    } else {
                        out.innerText = `cat: ${filename}: No such file or directory`;
                    }

                    termBody.insertBefore(out, wrapper);

                } else if (val === "ls") {
                    let out = document.createElement('div');
                    out.className = "term-files";
                    out.innerText = "bio.txt services.txt hobbies.txt passion.txt";
                    termBody.insertBefore(out, wrapper);

                } else if (val === "clear") {
                    while (termBody.firstChild && termBody.firstChild !== wrapper) {
                        termBody.removeChild(termBody.firstChild);
                    }

                } else {
                    let out = document.createElement('div');
                    out.className = "term-output";
                    out.innerHTML = `bash: ${val}: command not found<br>Try '<strong>help</strong>' for available commands.`;
                    termBody.insertBefore(out, wrapper);
                }
            } else {
                let staticLine = createTermLine(promptString, "");
                termBody.insertBefore(staticLine, wrapper);
            }
            
            this.value = '';
            termBody.scrollTop = termBody.scrollHeight;
        }
    });

    input.focus();
}

initTerminal();