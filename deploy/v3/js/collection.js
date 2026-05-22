/* ========================================================
   Collection Page — interactions
   - 商品資料
   - 篩選 / 排序 / Load More
   - 卡片 hover 切換 swatch（QuickView 由 main.js 統一處理）
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
    new CollectionPage();
});

/* 共用：色號相似度（RGB 歐氏距離）— v2 sidebar 色號 swatch 用 */
function _cpHexToRgb(hex) {
    if (!hex) return null;
    hex = hex.replace('#', '').trim();
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    if (hex.length !== 6) return null;
    const n = parseInt(hex, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function _cpColorDistance(a, b) {
    if (!a || !b) return Infinity;
    return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
}
const CP_COLOR_MATCH_THRESHOLD = 110;
/* 註：清除 fixed header 的 padding-top 由 main.js initHeaderScroll() 統一寫到 body，
   不要在這裡額外加，否則會疊加出超大空白。 */

/* 獎牌徽章（保留 CDN，僅角標用） */
const AWARD_LOGOS = [
    'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/Allure_20Best_20of_20Beauty_20Award_20Seal_png.png?v=1772790457',
    'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/image_6_1.png?v=1772790457'
];

/* 16 件商品 — 主圖與 swatch 切換圖一律使用 product-imgs/<id>/white/ 的真實白底圖 */
const CP_PRODUCTS = [
    // ===== 唇妝 =====
    { id:'lip-glaze', name:'天鵝絨絲緞唇釉', cat:'lips', url:'product.html',
      newPrice:690, oldPrice:890, rating:4.9, isNew:true, award:true,
      swatches:[
        {color:'#f4b5c1', img:'product-imgs/lip-glaze/white/1.jpg',  name:'#1 櫻花裸粉'},
        {color:'#d4736c', img:'product-imgs/lip-glaze/white/3.jpg',  name:'#3 玫瑰焦糖'},
        {color:'#e07080', img:'product-imgs/lip-glaze/white/5.jpg',  name:'#5 蜜桃奶茶'},
        {color:'#b8585c', img:'product-imgs/lip-glaze/white/6.jpg',  name:'#6 焦糖布朗'},
        {color:'#a04848', img:'product-imgs/lip-glaze/white/7.jpg',  name:'#7 復古赤茶'},
        {color:'#683838', img:'product-imgs/lip-glaze/white/11.jpg', name:'#11 煙燻暗紅'}
      ]
    },

    // ===== 底妝 =====
    { id:'blush-3color', name:'三色腮紅', cat:'face', isNew:true,
      newPrice:580, rating:4.8,
      swatches:[
        {color:'#f4b5a8', img:'product-imgs/blush-3color/white/01.jpg', name:'01 蜜桃色'},
        {color:'#d48896', img:'product-imgs/blush-3color/white/02.jpg', name:'02 玫瑰色'},
        {color:'#e89070', img:'product-imgs/blush-3color/white/03.jpg', name:'03 生薑橙'}
      ]
    },
    { id:'trio-palette', name:'三合一彩妝盤', cat:'face', award:true,
      newPrice:880, rating:4.9,
      swatches:[
        {color:'#d8a8b8', img:'product-imgs/trio-palette/white/01.jpg', name:'01 玫瑰花園'},
        {color:'#e8a098', img:'product-imgs/trio-palette/white/02.jpg', name:'02 蜜桃下午茶'},
        {color:'#c8a888', img:'product-imgs/trio-palette/white/03.jpg', name:'03 焦糖牛奶'}
      ]
    },
    { id:'cushion-air', name:'空氣羽感氣墊', cat:'face', isNew:true, award:true,
      newPrice:1280, rating:4.9,
      swatches:[
        {color:'#f4dcc4', img:'product-imgs/cushion-air/white/01.jpg', name:'#01 透白肌'},
        {color:'#e8c8a8', img:'product-imgs/cushion-air/white/02.jpg', name:'#02C 自然冷'},
        {color:'#f0d4b0', img:'product-imgs/cushion-air/white/03.jpg', name:'#02W 自然暖'},
        {color:'#d8b088', img:'product-imgs/cushion-air/white/04.jpg', name:'#03 健康膚'}
      ]
    },
    { id:'contour-palette', name:'立體修容粉餅', cat:'face', isNew:true,
      newPrice:1050, oldPrice:1280, rating:4.8,
      swatches:[
        {color:'#e8c8a8', img:'product-imgs/contour-palette/white/01.jpg', name:'#1 透白'},
        {color:'#d8b088', img:'product-imgs/contour-palette/white/02.jpg', name:'#1.5 自然'},
        {color:'#b89068', img:'product-imgs/contour-palette/white/03.jpg', name:'#2 古銅'},
        {color:'#9a7548', img:'product-imgs/contour-palette/white/04.jpg', name:'#3 深棕'}
      ]
    },
    { id:'highlight-trio', name:'三色高光粉餅', cat:'face',
      newPrice:980, rating:4.7,
      swatches:[
        {color:'#f4e0c8', img:'product-imgs/highlight-trio/white/01.jpg', name:'1號 香檳金'},
        {color:'#e8c8a8', img:'product-imgs/highlight-trio/white/02.jpg', name:'2號 蜜桃光'},
        {color:'#d4b088', img:'product-imgs/highlight-trio/white/03.jpg', name:'3號 玫瑰銅'}
      ]
    },
    { id:'contour-stick', name:'立體修容棒', cat:'face',
      newPrice:520, rating:4.7,
      swatches:[
        {color:'#d4a888', img:'product-imgs/contour-stick/white/01.jpg', name:'#1 自然亮'},
        {color:'#b89078', img:'product-imgs/contour-stick/white/02.jpg', name:'#1.5 中間調'},
        {color:'#9a7858', img:'product-imgs/contour-stick/white/03.jpg', name:'#2 深度修容'}
      ]
    },
    { id:'contour-double', name:'雙頭立體修容棒', cat:'face',
      newPrice:620, rating:4.7,
      swatches:[
        {color:'#c8a888', img:'product-imgs/contour-double/white/01.jpg', name:'01 自然棕'},
        {color:'#a87858', img:'product-imgs/contour-double/white/02.jpg', name:'02 焦糖棕'},
        {color:'#8a6048', img:'product-imgs/contour-double/white/03.jpg', name:'03 深可可'}
      ]
    },
    { id:'nose-contour', name:'三色鼻影修容盤', cat:'face',
      newPrice:680, rating:4.6,
      swatches:[
        {color:'#d4a888', img:'product-imgs/nose-contour/white/01.jpg', name:'自然色'}
      ]
    },

    // ===== 眼妝 =====
    { id:'frottage-pencil', name:'美術課多功能柔彩筆', cat:'eyes', isNew:true, award:true,
      newPrice:580, oldPrice:720, rating:4.9,
      swatches:[
        {color:'#d4a898', img:'product-imgs/frottage-pencil/white/01.jpg', name:'#14 玫瑰乾燥'},
        {color:'#c08888', img:'product-imgs/frottage-pencil/white/02.jpg', name:'#19 復古磚紅'},
        {color:'#a85858', img:'product-imgs/frottage-pencil/white/03.jpg', name:'#20 楓葉紅'}
      ]
    },
    { id:'glitter-pencil', name:'爆閃眼影筆', cat:'eyes', isNew:true,
      newPrice:480, rating:4.8,
      swatches:[
        {color:'#e8d4f0', img:'product-imgs/glitter-pencil/white/01.jpg', name:'01 銀河閃粉'},
        {color:'#b8c8e8', img:'product-imgs/glitter-pencil/white/02.jpg', name:'02 月光藍'},
        {color:'#f0d4a8', img:'product-imgs/glitter-pencil/white/03.jpg', name:'03 香檳金'},
        {color:'#c0b0c8', img:'product-imgs/glitter-pencil/white/04.jpg', name:'04 紫色幻彩'}
      ]
    },
    { id:'pearl-pencil', name:'臥蠶提亮筆', cat:'eyes',
      newPrice:480, rating:4.7,
      swatches:[
        {color:'#f0d8c8', img:'product-imgs/pearl-pencil/white/01.jpg', name:'01 珠光裸'},
        {color:'#e8c0b8', img:'product-imgs/pearl-pencil/white/02.jpg', name:'02 蜜桃光'},
        {color:'#d8b8a0', img:'product-imgs/pearl-pencil/white/03.jpg', name:'03 香檳米'},
        {color:'#c8a888', img:'product-imgs/pearl-pencil/white/04.jpg', name:'04 玫瑰金'}
      ]
    },
    { id:'under-pencil', name:'下至暈染筆', cat:'eyes',
      newPrice:480, rating:4.6,
      swatches:[
        {color:'#c8a888', img:'product-imgs/under-pencil/white/01.jpg', name:'01 自然棕'},
        {color:'#a08868', img:'product-imgs/under-pencil/white/02.jpg', name:'02 深木棕'},
        {color:'#806848', img:'product-imgs/under-pencil/white/03.jpg', name:'03 焦糖棕'}
      ]
    },
    { id:'brow-pencil', name:'美術課眉形設計筆', cat:'eyes',
      newPrice:520, rating:4.7,
      swatches:[
        {color:'#6a4838', img:'product-imgs/brow-pencil/white/01.jpg', name:'01 淺棕'},
        {color:'#4a3828', img:'product-imgs/brow-pencil/white/02.jpg', name:'02 自然棕'},
        {color:'#2a1818', img:'product-imgs/brow-pencil/white/03.jpg', name:'03 深棕'}
      ]
    },
    { id:'liner-blur', name:'美術課下眼線暈染筆', cat:'eyes',
      newPrice:520, rating:4.7,
      swatches:[
        {color:'#a08868', img:'product-imgs/liner-blur/white/01.jpg', name:'01 自然棕'},
        {color:'#c88858', img:'product-imgs/liner-blur/white/02.jpg', name:'02 落葉橙'},
        {color:'#785888', img:'product-imgs/liner-blur/white/03.jpg', name:'03 復古紫'}
      ]
    },
    { id:'liner-gel', name:'定妝凝膠眼線筆', cat:'eyes',
      newPrice:580, rating:4.8,
      swatches:[
        {color:'#1a1a1a', img:'product-imgs/liner-gel/white/01.jpg', name:'01 經典黑'},
        {color:'#4a3828', img:'product-imgs/liner-gel/white/02.jpg', name:'02 焦糖棕'},
        {color:'#555555', img:'product-imgs/liner-gel/white/03.jpg', name:'03 灰調煙燻'}
      ]
    }
];

class CollectionPage {
    constructor() {
        this.grid = document.getElementById('cpGrid');
        if (!this.grid) return;

        this.pills = Array.from(document.querySelectorAll('.cp-pill'));
        this.sortSel = document.getElementById('cpSort');
        this.empty = document.getElementById('cpEmpty');
        this.emptyReset = document.getElementById('cpEmptyReset');
        this.loadmore = document.getElementById('cpLoadmore');
        this.loadmoreWrap = document.getElementById('cpLoadmoreWrap');
        this.progressBar = document.getElementById('cpProgressBar');
        this.visibleCountEl = document.getElementById('cpVisibleCount');
        this.filterCountEl = document.getElementById('cpFilterCount');
        this.totalCountEl = document.getElementById('cpTotalCount');
        this.heroTitle = document.getElementById('cpHeroTitle');
        this.heroDesc = document.getElementById('cpHeroDesc');
        this.bcCurrent = document.getElementById('cpBreadcrumbCurrent');

        this.CAT_LABEL = {
            all: { title: '全部商品', desc: '融合首爾的細膩與紐約的叛逆，<br>每一件作品，皆是對美的自由想像。' },
            lips:{ title: '唇妝系列', desc: '從天鵝絨絲緞到水光果凍，<br>找到屬於你的命定唇色。' },
            face:{ title: '底妝系列', desc: '輕透服貼，自然光澤，<br>由內而外綻放裸肌般的好氣色。' },
            eyes:{ title: '眼妝系列', desc: '一筆勾勒、一抹堆疊，<br>讓眼神成為今日最動人的句點。' },
            skin:{ title: '護膚系列', desc: '溫和養護，植萃配方，<br>給予肌膚每日所需的細緻呵護。' },
            kits:{ title: '套裝組合', desc: '一次擁有人氣明星品，<br>替自己或所愛的人挑一份心意。' },
            body:{ title: '身體護理', desc: '從沐浴到保養的每一個瞬間，<br>把香氛與滋潤帶進日常。' }
        };

        this.activeCat = 'all';
        this.sortKey = 'featured';
        this.pageSize = 12;
        this.visible = this.pageSize;

        this.init();
    }

    init() {
        /* URL ?cat= 深度連結 */
        const qs = new URLSearchParams(location.search);
        const initCat = qs.get('cat');
        if (initCat && this.CAT_LABEL[initCat]) {
            this.activeCat = initCat;
            this.pills.forEach(p => p.classList.toggle('active', p.dataset.cat === initCat));
        }

        this.bindPills();
        this.bindSort();
        this.bindLoadmore();
        this.bindEmptyReset();
        this.updateCategoryCounts();
        this.syncHeaderNav();
        this.render();

        /* v2 色號 swatch 觸發的篩選變更（v1 沒有 swatch 元素，不影響） */
        document.addEventListener('cp:filter-change', () => {
            this.visible = this.pageSize;
            this.render();
        });
    }

    /* 同步 header 主導航的 active 高亮（依當前 cat） */
    syncHeaderNav() {
        const cat = this.activeCat;
        document.querySelectorAll('#mainNav .mn-link').forEach(a => {
            const menu = a.getAttribute('data-menu');
            const isActive = (cat === 'all' && menu === 'all') || menu === cat;
            a.classList.toggle('active', !!isActive);
        });
    }

    bindPills() {
        this.pills.forEach(pill => {
            pill.addEventListener('click', () => {
                if (pill.classList.contains('active')) return;
                this.pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                this.activeCat = pill.dataset.cat;
                this.visible = this.pageSize;
                this.syncUrl();
                this.syncHeaderNav();
                this.render();
                /* 平滑滾動到 toolbar 下方 */
                const target = document.querySelector('.cp-results-bar');
                if (target) {
                    const y = target.getBoundingClientRect().top + window.scrollY - 140;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            });
        });
    }

    bindSort() {
        if (!this.sortSel) return;
        this.sortSel.addEventListener('change', () => {
            this.sortKey = this.sortSel.value;
            this.render();
        });
    }

    bindLoadmore() {
        if (!this.loadmore) return;
        this.loadmore.addEventListener('click', () => {
            const items = this.filteredSorted();
            this.visible = items.length;
            this.render(false); /* 不重置 visible */
        });
    }

    bindEmptyReset() {
        if (!this.emptyReset) return;
        this.emptyReset.addEventListener('click', () => {
            this.activeCat = 'all';
            this.pills.forEach(p => p.classList.toggle('active', p.dataset.cat === 'all'));
            document.querySelectorAll('.cp-swatch.active').forEach(s => s.classList.remove('active'));
            this.visible = this.pageSize;
            this.syncUrl();
            this.syncHeaderNav();
            this.render();
        });
    }

    syncUrl() {
        const url = new URL(location.href);
        if (this.activeCat === 'all') url.searchParams.delete('cat');
        else url.searchParams.set('cat', this.activeCat);
        history.replaceState(null, '', url.toString());
    }

    updateCategoryCounts() {
        const counts = { all: CP_PRODUCTS.length };
        CP_PRODUCTS.forEach(p => { counts[p.cat] = (counts[p.cat] || 0) + 1; });
        document.querySelectorAll('[data-cat-count]').forEach(el => {
            const k = el.getAttribute('data-cat-count');
            el.textContent = counts[k] || 0;
        });
        if (this.totalCountEl) this.totalCountEl.textContent = counts.all;
    }

    filteredSorted() {
        let list = CP_PRODUCTS.slice();
        if (this.activeCat !== 'all') list = list.filter(p => p.cat === this.activeCat);

        /* 色號 swatch 篩選（v2 sidebar）：只保留至少一個變體色與選中色相近的商品 */
        const activeSw = document.querySelector('.cp-swatch.active');
        if (activeSw) {
            const targetHex = (activeSw.style.getPropertyValue('--c')
                            || activeSw.dataset.color
                            || '').trim();
            const target = _cpHexToRgb(targetHex);
            if (target) {
                list = list.filter(prod =>
                    Array.isArray(prod.swatches) && prod.swatches.some(s => {
                        const rgb = _cpHexToRgb(s.color);
                        return rgb && _cpColorDistance(target, rgb) < CP_COLOR_MATCH_THRESHOLD;
                    })
                );
            }
        }

        switch (this.sortKey) {
            case 'newest':
                list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
            case 'rating':
                list.sort((a, b) => b.rating - a.rating);
                break;
            case 'price-asc':
                list.sort((a, b) => a.newPrice - b.newPrice);
                break;
            case 'price-desc':
                list.sort((a, b) => b.newPrice - a.newPrice);
                break;
            /* featured: 保留原順序 */
        }
        return list;
    }

    render(resetVisible = true) {
        const items = this.filteredSorted();
        if (resetVisible) this.visible = Math.min(this.pageSize, items.length);
        const shown = items.slice(0, this.visible);

        /* Hero / 麵包屑文案隨類別更新 */
        const label = this.CAT_LABEL[this.activeCat] || this.CAT_LABEL.all;
        if (this.heroTitle) this.heroTitle.textContent = label.title;
        if (this.heroDesc)  this.heroDesc.innerHTML = label.desc;
        if (this.bcCurrent) this.bcCurrent.textContent = label.title;
        document.title = `${label.title} | TOO COOL FOR SCHOOL`;

        /* 統計 */
        if (this.filterCountEl)  this.filterCountEl.textContent = items.length;
        if (this.visibleCountEl) this.visibleCountEl.textContent = shown.length;

        /* 空狀態 */
        if (!items.length) {
            this.grid.innerHTML = '';
            this.empty.hidden = false;
            this.loadmoreWrap.style.display = 'none';
            return;
        }
        this.empty.hidden = true;
        this.loadmoreWrap.style.display = 'flex';

        /* 渲染卡片 */
        this.grid.innerHTML = shown.map((p, i) => this.cardHTML(p, i)).join('');

        /* swatch hover/click → 切換主圖（同 home recommend 邏輯） */
        this.grid.querySelectorAll('.swatch').forEach(s => {
            const switchVariant = () => {
                const card = s.closest('.product-card');
                card.querySelectorAll('.swatch').forEach(x => x.classList.remove('active'));
                s.classList.add('active');
                card.querySelectorAll('.product-img').forEach(x => x.classList.remove('active'));
                const t = card.querySelector(`.product-img[data-variant="${s.dataset.variant}"]`);
                if (t) t.classList.add('active');
            };
            s.addEventListener('mouseenter', switchVariant);
            s.addEventListener('click', e => { e.stopPropagation(); switchVariant(); });
        });

        /* Load more 進度 */
        const pct = Math.round((shown.length / items.length) * 100);
        if (this.progressBar) this.progressBar.style.width = pct + '%';
        if (this.loadmore) {
            const done = shown.length >= items.length;
            this.loadmore.disabled = done;
            this.loadmore.textContent = done ? '已顯示全部商品' : `載入更多（剩 ${items.length - shown.length} 件）`;
        }
    }

    cardHTML(p, idx) {
        const url = p.url || '#';
        const imgs = p.swatches.map((s, i) =>
            `<div class="product-img${i === 0 ? ' active' : ''}" data-variant="${i}">` +
                `<img src="${s.img}" alt="${p.name} ${s.name || ''}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">` +
            `</div>`
        ).join('');
        const visSw = p.swatches.slice(0, 5);
        const extSw = p.swatches.length - visSw.length;
        const sw = visSw.map((s, i) =>
            `<button class="swatch${i === 0 ? ' active' : ''}" data-variant="${i}" style="background-color:${s.color}" data-name="${s.name || p.name}" title="${s.name || p.name}"></button>`
        ).join('') + (extSw > 0 ? `<span class="swatch-more">+${extSw}more</span>` : '');

        const price = p.oldPrice
            ? `<span class="price-original">NT$${p.oldPrice.toLocaleString()}</span><span class="price-sale">NT$${p.newPrice.toLocaleString()}</span>`
            : `<span class="price-current">NT$${p.newPrice.toLocaleString()}</span>`;

        const tags = [];
        if (p.isNew) tags.push('<span class="badge-tag badge-customizable">新品上市</span>');
        if (p.badge) tags.push(`<span class="badge-tag badge-customizable">${p.badge}</span>`);
        if (p.oldPrice) tags.push(`<span class="badge-tag badge-value">原價 NT$${p.oldPrice.toLocaleString()}</span>`);
        const award = p.award ? `<img class="badge-gift-wrap" src="${AWARD_LOGOS[idx % AWARD_LOGOS.length]}" alt="award">` : '';
        const badges = (tags.length || award)
            ? `<div class="product-badges">${award}<div class="badge-tags">${tags.join('')}</div></div>`
            : '';

        return `
        <div class="product-card" data-product-url="${url}">
            <div class="product-image-area">
                ${imgs}
                ${badges}
                <button class="product-quick-view" aria-label="快速查看">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                </button>
                <div class="product-add-to-cart">加入購物車</div>
            </div>
            <div class="product-info">
                <h3 class="product-name"><span class="name-base">${p.name}</span></h3>
                <div class="product-pricing">${price}</div>
                <div class="variant-swatches">${sw}</div>
            </div>
        </div>`;
    }
}
