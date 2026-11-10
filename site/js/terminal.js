/* 2. Interactive Terminal Logic */

const termBody = document.getElementById('term-body');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const promptString = "willians@portfolio: ~/about$";

/* How long the terminal can remain inactive before returning to its animated cursor state. */
const TERMINAL_IDLE_TIMEOUT = 12000;

const fileSystem = {

    "bio.txt": "I'm a backend developer who covers the full path from raw data to production. I build the services, APIs and data pipelines, analyze the numbers behind them, and use DevOps and automation to deploy and run everything reliably. Python, Docker, AWS and Linux are my daily tools, and I do my best work on complex problems that push me to understand things deeply.",

    "services.txt": "Data Pipeline Architecture, Cloud Deployments (AWS/GCP), CI/CD (Tasks/Systems) Automation, Metric Dashboards, Data Analytics, Software/Web Development, and Web Systems Maintenance/Administration.",

    "passion.txt": "My passion lies in analysing complex data, engineering pipeline solutions, automating everything I can, developing websites and all kind of systems. I'm most of the time challenging myself with the most complex tools out there.",

    "hobbies.txt": "I enjoy learning new in-demand tools to stay ahead, planning side projects, and, when I am not coding, I am usually playing chess or video games to keep my mind sharp. I also enjoy reading books and articles about technology, science, and philosophy, as I find these subjects fascinating."
};

const commands = {
    "help": "Show all available commands",
    "ls": "List available files",
    "cat <file>": "Display the contents of a file",
    "clear": "Clear the terminal"
};

const usystemfilenames = Object.keys(fileSystem).join(' ');


/* TERMINAL VALIDATION */

if (!termBody) {
    console.warn('Terminal initialization skipped: #term-body was not found.');
} else {
    initTerminal();
}


/* TERMINAL LINE CREATION */

function createTermLine(prompt, cmd) {
    const div = document.createElement('div');

    div.className = "term-line";

    const promptSpan = document.createElement('span');

    promptSpan.className = "term-prompt";
    promptSpan.textContent = prompt;

    const cmdSpan = document.createElement('span');

    cmdSpan.className = "term-cmd";
    cmdSpan.textContent = cmd;

    div.appendChild(promptSpan);
    div.appendChild(cmdSpan);

    return div;
}


/* TERMINAL TEXT ANIMATION */

async function typeTermText(element, text, speed) {
    for (let i = 0; i < text.length; i++) {
        element.textContent += text.charAt(i);

        await delay(speed);
    }
}


/* TERMINAL INITIALIZATION */

async function initTerminal() {
    await delay(1000);

    /* First command */

    const line1 = createTermLine(promptString, "");

    termBody.appendChild(line1);

    await typeTermText(
        line1.querySelector('.term-cmd'),
        "cat bio.txt",
        40
    );

    await delay(300);

    const out1 = document.createElement('div');

    out1.className = "term-output";
    out1.textContent = fileSystem["bio.txt"];

    termBody.appendChild(out1);


    /* Second command */

    await delay(600);

    const line2 = createTermLine(promptString, "");

    termBody.appendChild(line2);

    await typeTermText(
        line2.querySelector('.term-cmd'),
        "ls",
        60
    );

    await delay(200);

    const out2 = document.createElement('div');

    out2.className = "term-files";
    out2.textContent = usystemfilenames;

    termBody.appendChild(out2);


    /* Interactive terminal hint */

    await delay(400);

    const hint = document.createElement('div');

    hint.className = "term-hint";

    hint.innerHTML = 'This terminal is interactive, try typing <strong><em>cat services.txt</em></strong> or any file name listed above.';

    termBody.appendChild(hint);


    /* Enable user interaction */

    setupInteractiveInput();
}


/* TERMINAL SCROLL MANAGEMENT */

/* Scroll immediately after adding a command or output. */

function scrollTerminalToBottom() {
    requestAnimationFrame(() => {
        termBody.scrollTop = termBody.scrollHeight;
    });
}


/*
   TERMINAL INTERACTION
*/

function setupInteractiveInput() {
    const terminalContainer = termBody.closest('.terminal-container');

    if (!terminalContainer) {
        console.warn('Terminal container was not found.');

        return;
    }

    const wrapper = document.createElement('div');

    wrapper.className = "term-input-wrapper";

    wrapper.innerHTML = `
        <span class="term-prompt">${promptString}</span>
        <input
            type="text"
            class="term-input"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            aria-label="Terminal command input"
        >
    `;

    termBody.appendChild(wrapper);

    const input = wrapper.querySelector('.term-input');

    let idleTimer = null;


    /* FOCUS MANAGEMENT */

    function focusTerminalInput() {
        try {
            input.focus({
                preventScroll: true
            });
        } catch (error) {
            input.focus();
        }
    }


    /*IDLE TIMER */

    function clearIdleTimer() {
        if (idleTimer !== null) {
            clearTimeout(idleTimer);

            idleTimer = null;
        }
    }

    function resetIdleTimer() {
        clearIdleTimer();

        idleTimer = setTimeout(() => {

            input.blur();
        }, TERMINAL_IDLE_TIMEOUT);
    }


    /* ACTIVE and INACTIVE STATES */

    input.addEventListener('focus', () => {
        wrapper.classList.add('is-active');

        resetIdleTimer();
    });

    input.addEventListener('blur', () => {
        clearIdleTimer();

        wrapper.classList.remove('is-active');
    });

    input.addEventListener('keydown', () => {
        resetIdleTimer();
    });

    input.addEventListener('input', () => {
        resetIdleTimer();
    });

    input.addEventListener('pointerdown', () => {
        resetIdleTimer();
    });

    /* Clicking or touching anywhere inside the terminal activates the input. works for both mouse and touch interactions. */

    terminalContainer.addEventListener('click', event => {
        if (event.target !== input) {
            focusTerminalInput();
        }
    });

    terminalContainer.addEventListener('pointerleave', event => {
        if (event.pointerType !== 'touch' && document.activeElement === input) {
            input.blur();
        }
    });


    /* On both desktop and mobile, clicking or touching outside the terminal ends the active interaction. */

    document.addEventListener('pointerdown', event => {
        if (!terminalContainer.contains(event.target)) {
            input.blur();
        }
    });

    /* Restore the animated state when the tab switches tabs or leaves the page. */

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            input.blur();
        }
    });


    /* COMMAND HANDLING */

    input.addEventListener('keydown', function (event) {

        if (event.key !== 'Enter') {
            return;
        }

        const val = this.value.trim();

        if (val !== "") {

            /* Insert the submitted command */

            const staticLine = createTermLine(promptString, val);

            termBody.insertBefore(staticLine, wrapper);


            /* HELP */

            if (val === "help") {
                const out = document.createElement('div');

                out.className = "term-output";

                let helpText = '<div>Available commands:</div>';

                for (const [command, description] of Object.entries(commands)) {
                    helpText += `<div><strong>${command}</strong> — ${description}</div>`;
                }

                out.innerHTML = helpText;

                termBody.insertBefore(out, wrapper);
            }


            /* CAT */

            else if (val.trimStart().startsWith("cat ")) {
                const filename = val.trim().split(/\s+/)[1];

                const out = document.createElement('div');

                out.className = "term-output";

                if (fileSystem[filename]) {
                    out.textContent = fileSystem[filename];
                } else {
                    out.textContent = `cat: ${filename}: No such file or directory`;
                }

                termBody.insertBefore(out, wrapper);
            }


            /* LS */

            else if (val === "ls") {
                const out = document.createElement('div');

                out.className = "term-files";
                out.textContent = usystemfilenames;

                termBody.insertBefore(out, wrapper);
            }


            /* CLEAR */

            else if (val === "clear") {
                while (
                    termBody.firstChild &&
                    termBody.firstChild !== wrapper
                ) {
                    termBody.removeChild(termBody.firstChild);
                }
            }


            /* UNKNOWN COMMAND */

            else {
                const out = document.createElement('div');

                out.className = "term-output";

                out.appendChild(
                    document.createTextNode(`bash: ${val}: command not found`)
                );

                out.appendChild(document.createElement('br'));

                out.appendChild(
                    document.createTextNode("Try '")
                );

                const strong = document.createElement('strong');

                strong.textContent = "help";

                out.appendChild(strong);

                out.appendChild(
                    document.createTextNode("' for available commands.")
                );

                termBody.insertBefore(out, wrapper);
            }

        } else {

            /* Empty command */

            const staticLine = createTermLine(promptString, "");

            termBody.insertBefore(staticLine, wrapper);
        }


        /* Clear input */

        this.value = '';


        /* Keep the terminal active while testing */

        resetIdleTimer();


        /* Scroll after the DOM has updated */

        scrollTerminalToBottom();
    });
}