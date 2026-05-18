/* ========================================================
   PDP v4 — Editorial layout interactions
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initShadeSelector();
    initQty();
    initAddToCart();
    initShadeCardJump();
    initFaqAccordion();
    initResponsiveHeaderPadding();
    initMobileGallery();
});

/* ===== 視窗縮放時重算 header padding（修正手機端空白） ===== */
function initResponsiveHeaderPadding() {
    const header = document.getElementById('siteHeader');
    const bar = document.getElementById('announcementBar');
    if (!header || !bar) return;
    const recompute = () => {
        const barH = bar.offsetHeight;
        header.style.top = barH + 'px';
        document.body.style.paddingTop = (barH + header.offsetHeight) + 'px';
    };
    let raf;
    window.addEventListener('resize', () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(recompute);
    });
    // 初始延後再算一次，確保 CSS media queries 已生效
    setTimeout(recompute, 50);
}

/* ===== 手機端圖廊滑塊（主圖 + 箭頭 + dots + 縮圖條） ===== */
function initMobileGallery() {
    const track = document.getElementById('epMgTrack');
    if (!track) return;
    const slides = Array.from(track.querySelectorAll('.ep-mg-slide'));
    const thumbs = Array.from(document.querySelectorAll('.ep-mg-thumb'));
    const dotsEl = document.getElementById('epMgDots');
    const prev = document.getElementById('epMgPrev');
    const next = document.getElementById('epMgNext');
    const viewport = document.getElementById('epMgViewport');
    let current = 0;
    if (dotsEl) {
        dotsEl.innerHTML = slides.map((_, i) => `<button class="ep-mg-dot${i === 0 ? ' active' : ''}" data-idx="${i}" aria-label="第 ${i + 1} 張"></button>`).join('');
    }
    const dots = Array.from(document.querySelectorAll('.ep-mg-dot'));
    const goTo = idx => {
        if (idx < 0) idx = slides.length - 1;
        if (idx >= slides.length) idx = 0;
        current = idx;
        track.style.transform = `translateX(-${current * 100}%)`;
        slides.forEach((s, i) => s.classList.toggle('active', i === current));
        thumbs.forEach((t, i) => t.classList.toggle('active', i === current));
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        const activeThumb = thumbs[current];
        if (activeThumb) activeThumb.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
    };
    thumbs.forEach((t, i) => t.addEventListener('click', () => goTo(i)));
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
    prev?.addEventListener('click', () => goTo(current - 1));
    next?.addEventListener('click', () => goTo(current + 1));
    if (viewport) {
        let sx = 0, dx = 0, active = false;
        viewport.addEventListener('touchstart', e => { sx = e.touches[0].clientX; dx = 0; active = true; }, { passive: true });
        viewport.addEventListener('touchmove', e => { if (active) dx = e.touches[0].clientX - sx; }, { passive: true });
        viewport.addEventListener('touchend', () => { if (!active) return; active = false; if (Math.abs(dx) > 40) dx < 0 ? goTo(current + 1) : goTo(current - 1); });
    }
}

/* ===== FAQ 手風琴：一個展開時自動收起其他 ===== */
function initFaqAccordion() {
    const items = Array.from(document.querySelectorAll('.ep-faq-item'));
    items.forEach(item => {
        item.addEventListener('toggle', () => {
            if (item.open) {
                items.forEach(other => { if (other !== item && other.open) other.open = false; });
            }
        });
    });
}

/* ===== 色號選擇：URL 同步 + 馬賽克切換 + pill/desc 更新 ===== */
function initShadeSelector() {
    const swatches = Array.from(document.querySelectorAll('.ep-swatch'));
    const pillName = document.getElementById('epCurrentShade');
    const pillDot = document.getElementById('epShadePillDot');
    const desc = document.getElementById('epShadeDesc');
    const cellA = document.querySelector('.ep-cell-a img');
    const cellB = document.querySelector('.ep-cell-b img');
    const mgSlides = Array.from(document.querySelectorAll('.ep-mg-slide img'));
    const mgThumbs = Array.from(document.querySelectorAll('.ep-mg-thumb img'));

    const apply = (s, { pushUrl = true, animate = true } = {}) => {
        swatches.forEach(x => x.classList.remove('active'));
        s.classList.add('active');
        const { shade, name, desc: descText, color, imgA, imgB } = s.dataset;
        if (pillName) pillName.textContent = name;
        if (pillDot && color) pillDot.style.background = color;
        if (desc) desc.textContent = descText || '';
        const swap = (img, src) => {
            if (!img || !src) return;
            if (!animate) { img.src = src; return; }
            img.style.transition = 'opacity .25s ease';
            img.style.opacity = '0';
            setTimeout(() => { img.src = src; img.style.opacity = '1'; }, 180);
        };
        swap(cellA, imgA);
        swap(cellB, imgB);
        // 手機端圖廊：同步前兩張主圖和縮圖
        if (mgSlides[0]) swap(mgSlides[0], imgA);
        if (mgSlides[1]) swap(mgSlides[1], imgB);
        if (mgThumbs[0]) mgThumbs[0].src = imgA;
        if (mgThumbs[1]) mgThumbs[1].src = imgB;
        if (pushUrl) {
            const url = new URL(window.location.href);
            url.searchParams.set('shade', shade);
            history.replaceState({}, '', url);
        }
    };

    swatches.forEach(s => s.addEventListener('click', () => apply(s)));

    // 初始化：讀 URL ?shade=N，自動選對應色號
    const initial = new URL(window.location.href).searchParams.get('shade');
    if (initial) {
        const match = swatches.find(x => x.dataset.shade === initial);
        if (match) apply(match, { pushUrl: false, animate: false });
    }

    // 暴露給色號矩陣卡片使用
    window.__epApplyShadeByCode = (code) => {
        const target = swatches.find(x => x.dataset.shade === String(code));
        if (target) apply(target);
    };
}

/* ===== 點擊色號矩陣卡片 → 滾到頂部並同步 swatch ===== */
function initShadeCardJump() {
    document.querySelectorAll('.ep-shade-card').forEach(c => {
        c.addEventListener('click', () => {
            const code = c.dataset.shade;
            if (window.__epApplyShadeByCode) window.__epApplyShadeByCode(code);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

/* ===== 數量 +/− ===== */
function initQty() {
    const dec = document.getElementById('epQtyDec');
    const inc = document.getElementById('epQtyInc');
    const val = document.getElementById('epQtyVal');
    const priceEl = document.getElementById('epAddPrice');
    if (!dec || !inc || !val) return;
    let q = 1;
    const unit = 690;
    const render = () => {
        val.textContent = q;
        if (priceEl) priceEl.textContent = `NT$ ${(unit * q).toLocaleString('en-US')}`;
        dec.style.opacity = q <= 1 ? '.4' : '1';
    };
    dec.addEventListener('click', () => { if (q > 1) { q--; render(); } });
    inc.addEventListener('click', () => { q++; render(); });
    render();
}

/* ===== 加入購物車 toast ===== */
function initAddToCart() {
    const add = document.getElementById('epAdd');
    const buy = document.getElementById('epBuy');
    const toast = document.getElementById('epToast');
    const cartCount = document.querySelector('.cart-count');
    if (!toast) return;
    const showToast = (msg) => {
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(showToast._t);
        showToast._t = setTimeout(() => toast.classList.remove('show'), 2200);
    };
    add?.addEventListener('click', () => {
        const shade = document.querySelector('.ep-shade.active')?.dataset.name || '';
        const q = document.getElementById('epQtyVal')?.textContent || '1';
        if (cartCount) cartCount.textContent = String((parseInt(cartCount.textContent) || 0) + parseInt(q));
        showToast(`已加入購物車：${shade} × ${q}`);
    });
    buy?.addEventListener('click', () => showToast('前往結帳…'));
}
