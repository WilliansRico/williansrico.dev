// ONE BLOCK PER CERTIFICATION //

const certifications = [
    {
        title: "Data Engineering Crash Course Completion Certificate",
        issuer: "Luke Barousse",
        date: "June 2026",
        image: "assets/img/certs/data-engineering-crash-course.webp",
    },

    {
        title: "Intermediate Excel Skills",
        issuer: "Comfamiliar Atlantico",
        date: "November 2025",
        image: "assets/img/certs/intermediate-excel-skills.webp"
    },

    {
        title: "PoweR BI Carrier Booster Participation Certificate",
        issuer: "Daxus LATAM",
        date: "November 2025",
        image: "assets/img/certs/power-bi-carrier-booster.webp"
    },
];

const certsBtn = document.getElementById('certs-btn');
const certsModal = document.getElementById('certs-modal');
const certsClose = document.getElementById('certs-close');
const certGrid = document.getElementById('cert-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

certGrid.innerHTML = certifications.map(c => `
    <article class="cert-card" data-full="${c.image}" data-title="${c.title}">
        <img src="${c.image}" alt="${c.title}" loading="lazy">
        <div class="cert-info">
            <h3>${c.title}</h3>
            <p class="cert-issuer">${c.issuer}</p>
            <p class="cert-date">${c.date}</p>
        </div>
    </article>
`).join('');

function openModal() {
    certsModal.classList.add('open');
    document.body.classList.add('modal-open');
}

function closeModal() {
    certsModal.classList.remove('open');
    document.body.classList.remove('modal-open');
}

function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
}

certsBtn.addEventListener('click', e => {
    e.preventDefault();
    openModal();
});

certsClose.addEventListener('click', closeModal);
certsModal.addEventListener('click', e => {
    if (e.target === certsModal) closeModal();
});

certGrid.addEventListener('click', e => {
    const card = e.target.closest('.cert-card');
    if (!card) return;
    lightboxImg.src = card.dataset.full;
    lightboxImg.alt = card.dataset.title;
    lightbox.classList.add('open');
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (lightbox.classList.contains('open')) closeLightbox();
    else if (certsModal.classList.contains('open')) closeModal();
});

