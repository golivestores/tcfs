/* ========================================================
   Product Detail Page — interactions
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initShadeSelector();
    initQty();
    initAccordions();
    initAddToCart();
    initStickyBarReveal();
});

/* ===== 公告欄輪播（複用首頁邏輯） ===== */
function initAnnouncementBar() {
    const msgs = document.querySelectorAll('.ab-msg');
    if (!msgs.length) return;
    let idx = 0;
    const go = dir => {
        msgs[idx].classList.remove('active');
        idx = (idx + dir + msgs.length) % msgs.length;
        msgs[idx].classList.add('active');
    };
    document.getElementById('abPrev')?.addEventListener('click', () => go(-1));
    document.getElementById('abNext')?.addEventListener('click', () => go(1));
    setInterval(() => go(1), 5000);
}

/* ===== 行動版抽屜 ===== */
function initMobileDrawer() {
    const btn = document.getElementById('mobileMenuBtn');
    const drawer = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('mdOverlay');
    const closeBtn = document.getElementById('mdClose');
    if (!btn || !drawer || !overlay) return;
    const open = () => {
        drawer.classList.add('open');
        overlay.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
    };
    const close = () => {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
    };
    btn.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    overlay.addEventListener('click', close);
    drawer.querySelectorAll('.md-link, .md-sublink').forEach(a => a.addEventListener('click', close));
}

/* ===== 滾動時收起 / 展開 header（複用首頁邏輯） ===== */
function initHeaderScroll() {
    const header = document.getElementById('siteHeader');
    const bar = document.getElementById('announcementBar');
    if (!header || !bar) return;
    header.style.top = bar.offsetHeight + 'px';
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
        const y = window.scrollY;
        const goingDown = y > lastY && y > 120;
        const offset = bar.offsetHeight;
        if (goingDown) {
            header.style.transform = `translateY(-${header.offsetHeight + offset}px)`;
            bar.style.transform = `translateY(-${offset}px)`;
        } else {
            header.style.transform = 'translateY(0)';
            bar.style.transform = 'translateY(0)';
        }
        lastY = y;
        ticking = false;
    };
    window.addEventListener('scroll', () => {
        if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
    });
}

/* ===== 圖廊：縮圖 ↔ 主圖 ↔ 點 ↔ 左右鍵 ↔ 觸控滑動 ===== */
let __pdGalleryGoTo = null;

function initGallery() {
    const thumbs = Array.from(document.querySelectorAll('.pd-thumb'));
    const slides = Array.from(document.querySelectorAll('.pd-stage-slide'));
    const track = document.getElementById('pdStageTrack');
    const dotsEl = document.getElementById('pdStageDots');
    const prev = document.getElementById('pdStagePrev');
    const next = document.getElementById('pdStageNext');
    const viewport = document.getElementById('pdStageViewport');
    if (!track || !slides.length) return;

    let current = 0;

    // 動態建立 dots
    if (dotsEl) {
        dotsEl.innerHTML = slides.map((_, i) =>
            `<button class="pd-stage-dot${i === 0 ? ' active' : ''}" data-idx="${i}" aria-label="第 ${i + 1} 張"></button>`
        ).join('');
    }
    const dots = Array.from(document.querySelectorAll('.pd-stage-dot'));

    const goTo = idx => {
        if (idx < 0) idx = slides.length - 1;
        if (idx >= slides.length) idx = 0;
        current = idx;
        track.style.transform = `translateX(-${current * 100}%)`;
        slides.forEach((s, i) => s.classList.toggle('active', i === current));
        thumbs.forEach((t, i) => t.classList.toggle('active', i === current));
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        // 滾動縮圖到可視區
        const activeThumb = thumbs[current];
        if (activeThumb) activeThumb.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
    };
    __pdGalleryGoTo = goTo;

    thumbs.forEach((t, i) => t.addEventListener('click', () => goTo(i)));
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
    prev?.addEventListener('click', () => goTo(current - 1));
    next?.addEventListener('click', () => goTo(current + 1));

    // 鍵盤左右
    document.addEventListener('keydown', e => {
        if (document.activeElement && /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
        if (e.key === 'ArrowLeft') goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
    });

    // 觸控
    if (viewport) {
        let sx = 0, dx = 0, active = false;
        viewport.addEventListener('touchstart', e => {
            sx = e.touches[0].clientX; dx = 0; active = true;
        }, { passive: true });
        viewport.addEventListener('touchmove', e => {
            if (!active) return;
            dx = e.touches[0].clientX - sx;
        }, { passive: true });
        viewport.addEventListener('touchend', () => {
            if (!active) return;
            active = false;
            if (Math.abs(dx) > 40) dx < 0 ? goTo(current + 1) : goTo(current - 1);
        });
    }
}

/* ===== 色號選擇 ===== */
function initShadeSelector() {
    const shades = Array.from(document.querySelectorAll('.pd-shade'));
    const display = document.getElementById('pdCurrentShade');
    const stickyDisplay = document.getElementById('pdSbShade');

    shades.forEach(s => s.addEventListener('click', () => {
        shades.forEach(x => x.classList.remove('active'));
        s.classList.add('active');
        const name = s.dataset.name;
        const code = s.dataset.shade;
        if (display) display.textContent = name;
        if (stickyDisplay) stickyDisplay.textContent = name;
        const targetThumb = document.querySelector(`.pd-thumb[data-shade-target="${code}"]`);
        if (targetThumb && typeof __pdGalleryGoTo === 'function') {
            __pdGalleryGoTo(Number(targetThumb.dataset.idx));
        }
    }));
}

/* ===== 數量加減 ===== */
function initQty() {
    const dec = document.getElementById('pdQtyDec');
    const inc = document.getElementById('pdQtyInc');
    const val = document.getElementById('pdQtyVal');
    if (!dec || !inc || !val) return;
    let q = 1;
    const render = () => {
        val.textContent = q;
        dec.style.opacity = q <= 1 ? '.4' : '1';
    };
    dec.addEventListener('click', () => { if (q > 1) { q--; render(); } });
    inc.addEventListener('click', () => { if (q < 99) { q++; render(); } });
    render();
}

/* ===== Accordion：互斥開合（仍保留多開能力，僅平滑動畫） ===== */
function initAccordions() {
    document.querySelectorAll('.pd-acc').forEach(d => {
        d.addEventListener('toggle', () => {
            // 滾動到展開的 section 頂部，避免位移
            if (d.open) {
                const rect = d.getBoundingClientRect();
                if (rect.top < 130) window.scrollBy({ top: rect.top - 140, behavior: 'smooth' });
            }
        });
    });
}

/* ===== 加入購物車 / 立即購買 ===== */
function initAddToCart() {
    const cartCountEl = document.getElementById('cartCount');
    const toast = document.getElementById('pdToast');
    const qtyVal = document.getElementById('pdQtyVal');
    let count = 0;

    const showToast = msg => {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(showToast._t);
        showToast._t = setTimeout(() => toast.classList.remove('show'), 2200);
    };

    const add = () => {
        const q = parseInt(qtyVal?.textContent || '1', 10);
        const shade = document.querySelector('.pd-shade.active')?.dataset.name || '';
        count += q;
        if (cartCountEl) cartCountEl.textContent = count;
        showToast(`已加入購物車：${shade} × ${q}`);
    };

    document.getElementById('pdAddCart')?.addEventListener('click', add);
    document.getElementById('pdSbAdd')?.addEventListener('click', add);
    document.getElementById('pdBuyNow')?.addEventListener('click', () => {
        add();
        setTimeout(() => showToast('正在前往結帳…'), 300);
    });
}

/* ===== 我們的推薦（與首頁同款） ===== */
function initRecommendSection() {
    const track = document.getElementById('recTrack');
    const prev = document.getElementById('recPrev');
    const next = document.getElementById('recNext');
    if (!track) return;

    const rImgs = [
        'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/77f0ef16e0fbc52baa3dea6f4a2e4a0e.jpg?v=1772784822',
        'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/d7d786ffc26a7e958be6a71929934d0b.jpg?v=1772784822',
        'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/484291c3591841355507e3c3352a3e2b.jpg?v=1772784822',
        'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/2df6780054db4d9b458828e39609f31c.jpg?v=1772784822',
        'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/111b02976f89989ea9015e8eb99bb940.jpg?v=1772784822',
        'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/076dcebd67088d85d2eb403f65020479.jpg?v=1772784822'
    ];
    let ri = 0;
    const rImg = () => rImgs[ri++ % rImgs.length];

    const data = [
        { name:'花漾夢幻全臉套裝', badges:['可自選搭配'], originalTag:'原價 $204', oldPrice:'$204.00', newPrice:'$152.00',
          swatches:[{color:'#c8a0b8',img:rImg()},{color:'#e8a090',img:rImg()},{color:'#f0d098',img:rImg()}] },
        { name:'兔兔花園基礎套裝', badges:['可自選搭配'], originalTag:'原價 $154', oldPrice:'$154.00', newPrice:'$115.00',
          swatches:[{color:'#d87898',img:rImg()},{color:'#9878a8',img:rImg()},{color:'#78b898',img:rImg()}] },
        { name:'氣墊光澤入門套裝', badges:['可自選搭配'], originalTag:'原價 $89', oldPrice:'$89.00', newPrice:'$66.00',
          swatches:[{color:'#d0b898',img:rImg()},{color:'#e88898',img:rImg()},{color:'#f0d8c8',img:rImg()}] },
        { name:'甜心小熊六色彩妝盤', badges:[], originalTag:'', oldPrice:'$45.00', newPrice:'$35.00',
          swatches:[{color:'#e8a0b0',img:rImg()},{color:'#d08090',img:rImg()},{color:'#f0c0a0',img:rImg()},{color:'#c8a888',img:rImg()}] },
        { name:'藝術課堂修容盤', badges:[], originalTag:'', oldPrice:'$38.00', newPrice:'$28.00',
          swatches:[{color:'#c8a888',img:rImg()},{color:'#b89070',img:rImg()},{color:'#d0b898',img:rImg()}] },
        { name:'兔兔花園浮雕腮紅', badges:[], originalTag:'', oldPrice:'$32.00', newPrice:'$24.00',
          swatches:[{color:'#f4b5c1',img:rImg()},{color:'#e07080',img:rImg()},{color:'#d4736c',img:rImg()}] },
        { name:'光澤妝前乳', badges:[], originalTag:'', oldPrice:'$28.00', newPrice:'$22.00',
          swatches:[{color:'#e8d0b8',img:rImg()},{color:'#d8c0a8',img:rImg()},{color:'#c8b098',img:rImg()}] },
        { name:'甜心小熊果凍唇釉', badges:[], originalTag:'', oldPrice:'$18.00', newPrice:'$14.00',
          swatches:[{color:'#d87880',img:rImg()},{color:'#e89098',img:rImg()},{color:'#f0a0a0',img:rImg()}] }
    ];

    const awardLogos = [
        'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/Allure_20Best_20of_20Beauty_20Award_20Seal_png.png?v=1772790457',
        'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/image_6_1.png?v=1772790457'
    ];

    track.innerHTML = data.map((d, idx) => {
        const hasBadges = d.badges.length || d.originalTag;
        const imgs = d.swatches.map((s, i) => `<div class="product-img${i === 0 ? ' active' : ''}" data-variant="${i}"><img src="${s.img}" alt="${d.name}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></div>`).join('');
        let badges = '';
        if (hasBadges) badges = `<div class="product-badges"><img class="badge-gift-wrap" src="${awardLogos[idx % 2]}" alt="award"><div class="badge-tags">${d.badges.map(b => `<span class="badge-tag badge-customizable">${b}</span>`).join('')}${d.originalTag ? `<span class="badge-tag badge-value">${d.originalTag}</span>` : ''}</div></div>`;
        const price = `<span class="price-original">${d.oldPrice}</span><span class="price-sale">${d.newPrice}</span>`;
        const visSw = d.swatches.slice(0, 5), extSw = d.swatches.length - visSw.length;
        const sw = visSw.map((s, i) => `<button class="swatch${i === 0 ? ' active' : ''}" data-variant="${i}" style="background-color:${s.color}" title="${d.name}"></button>`).join('') + (extSw > 0 ? `<span class="swatch-more">+${extSw}more</span>` : '');
        return `<div class="product-card" data-product="${idx}"><div class="product-image-area">${imgs}${badges}<button class="product-quick-view" aria-label="快速查看"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></button><div class="product-add-to-cart">加入購物車</div></div><div class="product-info"><h3 class="product-name"><span class="name-base">${d.name}</span></h3><div class="product-pricing">${price}</div><div class="variant-swatches">${sw}</div></div></div>`;
    }).join('');

    const switchVariant = s => {
        const card = s.closest('.product-card');
        card.querySelectorAll('.swatch').forEach(x => x.classList.remove('active'));
        s.classList.add('active');
        card.querySelectorAll('.product-img').forEach(x => x.classList.remove('active'));
        const t = card.querySelector(`.product-img[data-variant="${s.dataset.variant}"]`);
        if (t) t.classList.add('active');
    };
    track.querySelectorAll('.swatch').forEach(s => {
        s.addEventListener('mouseenter', () => switchVariant(s));
        s.addEventListener('click', e => { e.stopPropagation(); switchVariant(s); });
    });

    const getVisibleCount = () => {
        const w = window.innerWidth;
        if (w <= 480) return 1.5;
        if (w <= 768) return 2.5;
        return 4.5;
    };

    let pos = 0;
    const updatePos = () => {
        const cards = track.children;
        if (!cards.length) return;
        const gap = 16;
        const cardW = cards[0].offsetWidth + gap;
        track.style.transform = `translateX(-${pos * cardW}px)`;
    };
    const updateArrows = () => {
        const max = data.length - getVisibleCount();
        prev?.classList.toggle('disabled', pos <= 0);
        next?.classList.toggle('disabled', pos >= max);
    };
    const go = dir => {
        const max = data.length - getVisibleCount();
        pos = Math.max(0, Math.min(max, pos + dir));
        updatePos();
        updateArrows();
    };
    prev?.addEventListener('click', () => go(-1));
    next?.addEventListener('click', () => go(1));
    window.addEventListener('resize', () => { updatePos(); updateArrows(); });
    updateArrows();
}

/* ===== 行動版黏底加購條：滾過主購物按鈕後出現 ===== */
function initStickyBarReveal() {
    const bar = document.getElementById('pdStickyBar');
    const trigger = document.getElementById('pdAddCart');
    if (!bar || !trigger) return;
    const update = () => {
        const rect = trigger.getBoundingClientRect();
        const passed = rect.bottom < 0; // 已經滾過主按鈕
        bar.style.transform = passed ? 'translateY(0)' : 'translateY(110%)';
    };
    bar.style.transition = 'transform .3s ease';
    bar.style.transform = 'translateY(110%)';
    update();
    window.addEventListener('scroll', update, { passive: true });
}
