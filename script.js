// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');

    if (toggle && links) {
        toggle.addEventListener('click', function () {
            const open = links.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    // Lightbox for gallery images
    const items = Array.from(document.querySelectorAll('a.lightbox'));
    if (items.length === 0) return;

    const overlay = document.createElement('div');
    overlay.className = 'lb-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
        '<button class="lb-close" aria-label="Close">&times;</button>' +
        '<button class="lb-prev" aria-label="Previous">&#8249;</button>' +
        '<figure class="lb-figure"><img class="lb-img" alt=""><figcaption class="lb-caption"></figcaption></figure>' +
        '<button class="lb-next" aria-label="Next">&#8250;</button>';
    document.body.appendChild(overlay);

    const img = overlay.querySelector('.lb-img');
    const cap = overlay.querySelector('.lb-caption');
    let current = -1;

    function show(i) {
        current = (i + items.length) % items.length;
        const a = items[current];
        const thumb = a.querySelector('img');
        const caption = a.parentElement.querySelector('.gallery-caption');
        img.src = a.getAttribute('href');
        img.alt = thumb ? thumb.alt : '';
        cap.textContent = caption ? caption.textContent : '';
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        img.src = '';
    }

    items.forEach(function (a, i) {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            show(i);
        });
    });

    overlay.querySelector('.lb-close').addEventListener('click', close);
    overlay.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
    overlay.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay || e.target.classList.contains('lb-figure')) close();
    });
    document.addEventListener('keydown', function (e) {
        if (!overlay.classList.contains('open')) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowLeft') show(current - 1);
        else if (e.key === 'ArrowRight') show(current + 1);
    });
});
