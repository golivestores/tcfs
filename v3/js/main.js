document.addEventListener('DOMContentLoaded', () => {
    new HeroBanner();
    new CollectionSection();
    new ReelsSection();
    new RecommendSection();
    new QuickViewModal();
    initAnnouncementBar();
    initMegaMenu();
    initHeaderScroll();
    initMobileDrawer();
    initV2Reveal();
});

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
        document.body.style.overflow = 'hidden';
    };
    const close = () => {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };
    btn.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    overlay.addEventListener('click', close);
    drawer.querySelectorAll('.md-link, .md-sublink').forEach(a => a.addEventListener('click', close));
}

function initV2Reveal() {
    const items = document.querySelectorAll('.v2-blocks .reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('visible'));
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });
    items.forEach(el => io.observe(el));
}

/* ============================================
   公告欄輪播
   ============================================ */
function initAnnouncementBar() {
    const msgs = document.querySelectorAll('.ab-msg');
    if (msgs.length < 2) return;
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

/* ============================================
   Mega Menu
   ============================================ */
function initMegaMenu() {
    const nav = document.getElementById('mainNav');
    const mega = document.getElementById('megaMenu');
    const inner = document.getElementById('megaInner');
    if (!nav || !mega) return;

    const thumbs = [
        'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/77f0ef16e0fbc52baa3dea6f4a2e4a0e.jpg?v=1772784822',
        'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/397de29c3faac41dc6b24e3772dc5b81.jpg?v=1772783471',
        'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/111b02976f89989ea9015e8eb99bb940.jpg?v=1772784822',
        'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/2df6780054db4d9b458828e39609f31c.jpg?v=1772784822',
        'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/484291c3591841355507e3c3352a3e2b.jpg?v=1772784822',
        'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/d7d786ffc26a7e958be6a71929934d0b.jpg?v=1772784822'
    ];
    const menuData = {
        all: {
            title: '全部商品',
            promos: [
                { title:'找到你的專屬色號', desc:'快速測驗幫你配對最適合的色號。', img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/374660a90636e4bf9612f527f034b05c.jpg?v=1772777883' },
                { title:'迷你系列常駐登場', desc:'你最愛的迷你尺寸，現在常年供應。', img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/f578fb15e1a4c9e30bdd5b1bd8f4e28e.jpg?v=1772777884' }
            ],
            products: [
                { name:'奇蹟修護膏', stars:'★★★★☆', isNew:true },
                { name:'柔霧粉底液', stars:'★★★★½' },
                { name:'輕透潤色乳', stars:'★★★★★' },
                { name:'纖長睫毛膏', stars:'★★★★½' },
                { name:'立體修容筆', stars:'★★★★½' }
            ],
            links: ['眼影棒','修容筆','旅行噴霧','身體乳液','身體乳霜','瀏覽全部']
        },
        face: {
            title: '底妝系列',
            promos: [
                { title:'完美色號配對', desc:'用我們的測驗找到最適合你的色號。', img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/20260306-170445.png?v=1772787909' },
                { title:'迷你奇蹟膏全面上架', desc:'你最愛的尺寸現在全年供應。', img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/620979456_18373208830233629_1944839304774483031_n.jpg?v=1772787073' }
            ],
            products: [
                { name:'奇蹟修護膏', stars:'★★★★☆', isNew:true },
                { name:'輕透潤色乳', stars:'★★★★★' },
                { name:'柔霧粉底液', stars:'★★★★½' },
                { name:'立體修容筆', stars:'★★★★½' },
                { name:'底妝套裝組', stars:'★★★★½' }
            ],
            links: ['唇頰兩用棒','修容筆','光澤面油','古銅餅','潤色蜜粉','瀏覽底妝全部']
        },
        kits: {
            title: '套裝組合',
            promos: [
                { title:'先找到你的色號', desc:'用我們的測驗找到最適合的色號。', img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/e8d86ced4c02d9671e2177be1cbc1d3f.jpg?v=1772777883' },
                { title:'5大得獎產品一套搞定', desc:'用英雄套裝打造最信賴的日常妝容。', img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/374660a90636e4bf9612f527f034b05c.jpg?v=1772777883' }
            ],
            products: [
                { name:'派對套裝', stars:'★★★★½' },
                { name:'迷你香氛三件組', stars:'★★★★☆' },
                { name:'迷你唇妝套裝', stars:'★★★★½' },
                { name:'底妝套裝組', stars:'★★★★★' },
                { name:'旅行彩妝套裝 2.0', stars:'★★★★½' }
            ],
            links: ['英雄套裝','指彩套裝','入門套裝','陽光套裝','乾燥玫瑰套裝','瀏覽套裝全部']
        },
        eyes: {
            title: '眼妝系列',
            promos: [
                { title:'找到你的眼妝色號', desc:'快速測驗找到最適合你的眼影色。', img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/f578fb15e1a4c9e30bdd5b1bd8f4e28e.jpg?v=1772777884' },
                { title:'眼妝新品上市', desc:'全新眼影棒與眼線筆系列。', img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/20260306-170445.png?v=1772787909' }
            ],
            products: [
                { name:'眼影棒', stars:'★★★★½' },
                { name:'纖長睫毛膏', stars:'★★★★½' },
                { name:'修容筆', stars:'★★★★☆' },
                { name:'眼線液筆', stars:'★★★★½' },
                { name:'眉粉盤', stars:'★★★★☆' }
            ],
            links: ['日常眼妝盤','霧面眼影','亮片眼影','眉筆','瀏覽眼妝全部']
        },
        lips: {
            title: '唇妝系列',
            promos: [
                { title:'找到你的唇色', desc:'快速測驗找到最適合你的唇膏色號。', img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/620979456_18373208830233629_1944839304774483031_n.jpg?v=1772787073' },
                { title:'全新唇釉系列', desc:'水光質地，持久顯色。', img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/e8d86ced4c02d9671e2177be1cbc1d3f.jpg?v=1772777883' }
            ],
            products: [
                { name:'雲朵唇霜', stars:'★★★★★' },
                { name:'果凍唇釉', stars:'★★★★½' },
                { name:'唇頰兩用棒', stars:'★★★★½' },
                { name:'絲絨唇膏', stars:'★★★★☆' },
                { name:'護唇精華', stars:'★★★★½' }
            ],
            links: ['霧面唇膏','水光唇釉','唇線筆','護唇膏','瀏覽唇妝全部']
        },
        skin: {
            title: '護膚系列',
            promos: [
                { title:'你的護膚流程', desc:'找到最適合你膚質的護膚組合。', img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/374660a90636e4bf9612f527f034b05c.jpg?v=1772777883' },
                { title:'全新化妝水登場', desc:'雙效保濕，溫和疏通毛孔。', img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/f578fb15e1a4c9e30bdd5b1bd8f4e28e.jpg?v=1772777884' }
            ],
            products: [
                { name:'水潤化妝水', stars:'★★★★★' },
                { name:'亮膚精華液', stars:'★★★★½' },
                { name:'滋潤面霜', stars:'★★★★½' },
                { name:'光澤妝前乳', stars:'★★★★☆' },
                { name:'定妝噴霧', stars:'★★★★½' }
            ],
            links: ['潔面乳','面膜','防曬','眼霜','瀏覽護膚全部']
        },
        body: {
            title: '身體護理',
            promos: [
                { title:'身體護理入門', desc:'從頭到腳的完整呵護方案。', img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/20260306-170445.png?v=1772787909' },
                { title:'沐浴新品', desc:'全新香氛沐浴系列正式上架。', img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/e8d86ced4c02d9671e2177be1cbc1d3f.jpg?v=1772777883' }
            ],
            products: [
                { name:'身體乳液', stars:'★★★★½' },
                { name:'身體乳霜', stars:'★★★★½' },
                { name:'護手霜', stars:'★★★★☆' },
                { name:'身體磨砂膏', stars:'★★★★½' },
                { name:'沐浴精油', stars:'★★★★☆' }
            ],
            links: ['香氛蠟燭','旅行組','禮盒組','瀏覽身體護理全部']
        },
        more: {
            title: '更多',
            promos: [
                { title:'品牌故事', desc:'了解 Too Cool For School 的創立理念。', img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/620979456_18373208830233629_1944839304774483031_n.jpg?v=1772787073' },
                { title:'學生優惠', desc:'憑學生證享專屬折扣。', img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/374660a90636e4bf9612f527f034b05c.jpg?v=1772777883' }
            ],
            products: [
                { name:'化妝包', stars:'★★★★☆' },
                { name:'美妝蛋', stars:'★★★★½' },
                { name:'刷具組', stars:'★★★★½' },
                { name:'鏡子', stars:'★★★★☆' },
                { name:'禮品卡', stars:'★★★★★' }
            ],
            links: ['配件','工具','禮品卡','聯名系列','瀏覽更多全部']
        }
    };

    const links = nav.querySelectorAll('.mn-link');
    let timeout;

    const renderMenu = key => {
        const d = menuData[key];
        if (!d) return;
        inner.innerHTML = `
            ${d.promos.map(p => `
                <div class="mega-promo">
                    <div class="mega-promo-img">${p.img ? `<img src="${p.img}" alt="">` : ''}</div>
                    <div class="mega-promo-title">${p.title}</div>
                    <div class="mega-promo-desc">${p.desc}</div>
                </div>
            `).join('')}
            <div class="mega-products">
                <div class="mega-products-heading">${d.title}</div>
                ${d.products.map((p,i) => `
                    <div class="mega-product-item">
                        <div class="mega-product-thumb"><img src="${thumbs[i % thumbs.length]}" alt=""></div>
                        <div class="mega-product-info">
                            <span class="mega-product-name">${p.name}${p.isNew ? '<span class="mega-product-new">新品</span>' : ''}</span>
                            <span class="mega-product-stars">${p.stars}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="mega-links">
                ${d.links.map((l, i, arr) =>
                    i === arr.length - 1
                        ? `<a href="#" class="mega-shop-all">${l}</a>`
                        : `<a href="#">${l}</a>`
                ).join('')}
            </div>
        `;
    };

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            renderMenu(link.dataset.menu);
            mega.classList.add('open');
        });
    });

    mega.addEventListener('mouseenter', () => clearTimeout(timeout));
    mega.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            mega.classList.remove('open');
            links.forEach(l => l.classList.remove('active'));
        }, 200);
    });

    nav.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            mega.classList.remove('open');
            links.forEach(l => l.classList.remove('active'));
        }, 200);
    });
}

/* ============================================
   Header 滾動顯隱
   ============================================ */
function initHeaderScroll() {
    const header = document.getElementById('siteHeader');
    const bar = document.getElementById('announcementBar');
    if (!header) return;
    const barH = bar ? bar.offsetHeight : 0;
    header.style.top = barH + 'px';
    document.body.style.paddingTop = (barH + header.offsetHeight) + 'px';

    let lastY = window.scrollY;
    const threshold = barH + header.offsetHeight;

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y > lastY && y > threshold) {
            header.style.transform = 'translateY(calc(-100% - ' + barH + 'px))';
            if (bar) bar.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
            if (bar) bar.style.transform = 'translateY(0)';
        }
        lastY = y;
    }, { passive: true });
}

/* ============================================
   Hero Banner
   ============================================ */
class HeroBanner {
    constructor() {
        this.banner = document.querySelector('.hero-banner');
        if (!this.banner) return;
        this.slides = [...this.banner.querySelectorAll('.banner-slide')];
        this.progressBars = [...this.banner.querySelectorAll('.progress-bar')];
        this.cursor = document.getElementById('bannerCursor');
        this.playPauseBtn = document.getElementById('bannerPlayPause');
        this.currentIndex = 0; this.totalSlides = this.slides.length;
        this.interval = 5000; this.transitionDuration = 800;
        this.isPlaying = true; this.isTransitioning = false;
        this.autoTimer = null; this.slideStartTime = 0; this.elapsed = 0;
        this.cursorX = 0; this.cursorY = 0; this.targetX = 0; this.targetY = 0;
        this.cursorVisible = false; this.cursorRafId = null;
        this.init();
    }
    init() { this.setupCursor(); this.setupClick(); this.setupSwipe(); this.setupPlayPause(); this.setupProgressClicks(); this.startProgress(); const v=this.slides[0].querySelector('video'); if(v)v.play().catch(()=>{}); }
    setupCursor() {
        const aL = this.cursor.querySelector('.cursor-arrow-left'), aR = this.cursor.querySelector('.cursor-arrow-right');
        this.banner.addEventListener('mouseenter', e => { this.cursorVisible=true; this.cursorX=this.targetX=e.clientX; this.cursorY=this.targetY=e.clientY; this.cursor.style.left=this.cursorX+'px'; this.cursor.style.top=this.cursorY+'px'; this.cursor.classList.add('visible'); if(!this.cursorRafId)this.animCursor(); });
        this.banner.addEventListener('mouseleave', () => { this.cursorVisible=false; this.cursor.classList.remove('visible'); });
        this.banner.addEventListener('mousemove', e => { this.targetX=e.clientX; this.targetY=e.clientY;
            if(e.target.closest('.banner-playpause,.banner-progress,.slide-cta')){this.cursor.classList.remove('visible');this.banner.style.cursor='pointer';return}
            this.cursor.classList.add('visible'); this.banner.style.cursor='none';
            const mid=this.banner.getBoundingClientRect().left+this.banner.offsetWidth/2;
            aL.classList.toggle('active',e.clientX<=mid); aR.classList.toggle('active',e.clientX>mid);
        });
    }
    animCursor() { this.cursorX+=(this.targetX-this.cursorX)*.14; this.cursorY+=(this.targetY-this.cursorY)*.14; this.cursor.style.left=this.cursorX+'px'; this.cursor.style.top=this.cursorY+'px'; if(this.cursorVisible||Math.abs(this.targetX-this.cursorX)>.5)this.cursorRafId=requestAnimationFrame(()=>this.animCursor()); else this.cursorRafId=null; }
    setupClick() { this.banner.addEventListener('click', e => { if(e.target.closest('.banner-playpause,.banner-progress,.slide-cta'))return; if(this.swipeFired){this.swipeFired=false;return;} if(window.innerWidth<=768){const cta=this.slides[this.currentIndex].querySelector('.slide-cta');const href=cta&&cta.getAttribute('href');if(href&&href!=='#')window.location.href=href;return;} const mid=this.banner.getBoundingClientRect().left+this.banner.offsetWidth/2; e.clientX>mid?this.goNext():this.goPrev(); }); }
    setupSwipe() { let sx=0,sy=0,dx=0,dy=0,active=false; this.swipeFired=false; this.banner.addEventListener('touchstart',e=>{if(e.target.closest('.banner-playpause,.banner-progress,.slide-cta'))return;sx=e.touches[0].clientX;sy=e.touches[0].clientY;dx=0;dy=0;active=true;this.swipeFired=false;},{passive:true}); this.banner.addEventListener('touchmove',e=>{if(!active)return;dx=e.touches[0].clientX-sx;dy=e.touches[0].clientY-sy;},{passive:true}); this.banner.addEventListener('touchend',()=>{if(!active)return;active=false;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)){this.swipeFired=true;dx<0?this.goNext():this.goPrev();}}); }
    setupPlayPause() { this.playPauseBtn.addEventListener('click', e => { e.stopPropagation(); this.isPlaying?this.pause():this.resume(); }); }
    pause() { this.isPlaying=false; this.elapsed=Date.now()-this.slideStartTime; clearTimeout(this.autoTimer); this.progressBars[this.currentIndex].querySelector('span').style.animationPlayState='paused'; const v=this.slides[this.currentIndex].querySelector('video'); if(v)v.pause(); this.playPauseBtn.querySelector('.icon-pause').style.display='none'; this.playPauseBtn.querySelector('.icon-play').style.display='block'; }
    resume() { this.isPlaying=true; const rem=Math.max(this.interval-this.elapsed,100); this.progressBars[this.currentIndex].querySelector('span').style.animationPlayState='running'; const v=this.slides[this.currentIndex].querySelector('video'); if(v)v.play(); this.slideStartTime=Date.now()-this.elapsed; this.autoTimer=setTimeout(()=>this.goNext(),rem); this.playPauseBtn.querySelector('.icon-pause').style.display='block'; this.playPauseBtn.querySelector('.icon-play').style.display='none'; }
    setupProgressClicks() { this.progressBars.forEach((b,i)=>b.addEventListener('click',e=>{e.stopPropagation();if(i===this.currentIndex||this.isTransitioning)return;this.goTo(i,i>this.currentIndex?'next':'prev')})); }
    startProgress() { clearTimeout(this.autoTimer); this.progressBars.forEach((b,i)=>{const s=b.querySelector('span');s.style.animation='none';s.style.animationPlayState='';b.classList.remove('active')}); const ab=this.progressBars[this.currentIndex];ab.classList.add('active');const s=ab.querySelector('span');void s.offsetHeight;s.style.animation=`progressFill ${this.interval}ms linear forwards`; this.slideStartTime=Date.now();this.elapsed=0; if(this.isPlaying)this.autoTimer=setTimeout(()=>this.goNext(),this.interval);else s.style.animationPlayState='paused'; }
    goNext(){if(!this.isTransitioning)this.goTo((this.currentIndex+1)%this.totalSlides,'next')}
    goPrev(){if(!this.isTransitioning)this.goTo((this.currentIndex-1+this.totalSlides)%this.totalSlides,'prev')}
    goTo(idx,dir='next') { if(this.isTransitioning||idx===this.currentIndex)return; this.isTransitioning=true; clearTimeout(this.autoTimer); const cur=this.slides[this.currentIndex],nxt=this.slides[idx]; const curVid=cur.querySelector('video'); if(curVid)curVid.pause(); nxt.style.transition='none'; nxt.style.transform=dir==='next'?'translateX(100%)':'translateX(-100%)'; nxt.style.opacity='1';nxt.style.visibility='visible';nxt.style.zIndex='2'; void nxt.offsetHeight; const e='cubic-bezier(.25,.46,.45,.94)'; nxt.style.transition=`transform ${this.transitionDuration}ms ${e}`; nxt.style.transform='translateX(0)'; cur.style.transition=`transform ${this.transitionDuration}ms ${e},opacity ${this.transitionDuration}ms ${e}`; cur.style.transform=dir==='next'?'translateX(-30%)':'translateX(30%)'; cur.style.opacity='.3'; setTimeout(()=>{cur.classList.remove('active');cur.style.transition='none';cur.style.transform='';cur.style.opacity='';cur.style.visibility='';cur.style.zIndex='';nxt.classList.add('active');nxt.style.transition='';nxt.style.transform='';nxt.style.zIndex='';this.currentIndex=idx;this.isTransitioning=false;this.startProgress(); const nxtVid=nxt.querySelector('video'); if(nxtVid){nxtVid.currentTime=0;nxtVid.play().catch(()=>{})}},this.transitionDuration); }
}

/* ============================================
   套裝展示
   ============================================ */
class CollectionSection {
    constructor() {
        this.track = document.getElementById('collectionTrack'); if (!this.track) return;
        const cImgs = [
            'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/77f0ef16e0fbc52baa3dea6f4a2e4a0e.jpg?v=1772784822',
            'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/d7d786ffc26a7e958be6a71929934d0b.jpg?v=1772784822',
            'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/484291c3591841355507e3c3352a3e2b.jpg?v=1772784822',
            'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/2df6780054db4d9b458828e39609f31c.jpg?v=1772784822',
            'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/111b02976f89989ea9015e8eb99bb940.jpg?v=1772784822',
            'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/076dcebd67088d85d2eb403f65020479.jpg?v=1772784822'
        ];
        let ci = 0;
        const cImg = () => cImgs[ci++ % cImgs.length];
        this.products = [
            { name:'花漾夢幻全臉套裝',originalPrice:204,salePrice:152,isSet:true,value:204, variants:[{name:'粉紅夢幻',swatch:'#f4b5c1',img:cImg()},{name:'珊瑚花漾',swatch:'#e89080',img:cImg()},{name:'蜜桃光澤',swatch:'#f5c5a3',img:cImg()}]},
            { name:'兔兔花園基礎套裝',originalPrice:154,salePrice:115,isSet:true,value:154, variants:[{name:'玫瑰粉',swatch:'#e89bb0',img:cImg()},{name:'薰衣草',swatch:'#b8a0cc',img:cImg()},{name:'薄荷',swatch:'#8cc0aa',img:cImg()}]},
            { name:'氣墊光澤入門套裝',originalPrice:89,salePrice:66,isSet:true,value:89, variants:[{name:'自然色',swatch:'#e8c8a8',img:cImg()},{name:'粉色',swatch:'#f0b0b8',img:cImg()},{name:'象牙白',swatch:'#f0e0c8',img:cImg()}]},
            { name:'兔兔花園浮雕腮紅',originalPrice:26,salePrice:null,isSet:false, variants:[{name:'S01 粉紅娃娃',swatch:'#f4b5c1',img:cImg()},{name:'S02 玫瑰花瓣',swatch:'#e07080',img:cImg()},{name:'S03 珊瑚',swatch:'#d4736c',img:cImg()},{name:'S04 蜜桃',swatch:'#f0b898',img:cImg()},{name:'S05 裸色',swatch:'#d4b896',img:cImg()}]},
            { name:'兔兔花園雲朵唇霜',originalPrice:20,salePrice:null,isSet:false,maxSwatches:5, variants:[{name:'B01 玫瑰',swatch:'#8c6060',img:cImg()},{name:'B02 珊瑚',swatch:'#a06050',img:cImg()},{name:'B03 藕粉',swatch:'#907070',img:cImg()},{name:'B04 粉紅',swatch:'#c08890',img:cImg()},{name:'B05 芭蕾兔兔',swatch:'#d4a8b8',img:cImg()},{name:'B06 莓果',swatch:'#984868',img:cImg()},{name:'B07 梅子',swatch:'#785060',img:cImg()},{name:'B08 酒紅',swatch:'#704048',img:cImg()}]},
            { name:'兔兔花園精緻手持鏡',originalPrice:22,salePrice:null,isSet:false, variants:[{name:'粉色緞帶',swatch:'#f0c0c8',img:cImg()},{name:'薰衣草夢',swatch:'#c8b0d8',img:cImg()},{name:'薄荷青',swatch:'#a8d0c0',img:cImg()}]},
            { name:'兔兔花園迷你奇蹟膏',originalPrice:18,salePrice:14,isSet:false, variants:[{name:'M01 玫瑰光',swatch:'#e8a0a8',img:cImg()},{name:'M02 蜜桃光',swatch:'#f0b890',img:cImg()},{name:'M03 珊瑚光',swatch:'#e89888',img:cImg()},{name:'M04 透明光',swatch:'#f5e8d8',img:cImg()}]},
            { name:'兔兔花園眼影調色盤',originalPrice:38,salePrice:null,isSet:false,maxSwatches:5, variants:[{name:'P01 兔兔花園',swatch:'#d4a8b8',img:cImg()},{name:'P02 玫瑰花瓣',swatch:'#c88098',img:cImg()},{name:'P03 薰衣草',swatch:'#a890c0',img:cImg()},{name:'P04 蜜桃花',swatch:'#e8b098',img:cImg()},{name:'P05 仲夏夜',swatch:'#604858',img:cImg()},{name:'P06 玻璃紙',swatch:'#b8d0c8',img:cImg()}]},
            { name:'兔兔花園睫毛膏',originalPrice:24,salePrice:null,isSet:false, variants:[{name:'純黑',swatch:'#1a1a1a',img:cImg()},{name:'棕黑',swatch:'#3d2820',img:cImg()},{name:'透明',swatch:'#e8e0d8',img:cImg()}]},
            { name:'兔兔花園奢華禮盒',originalPrice:128,salePrice:98,isSet:true,value:128, variants:[{name:'夢幻粉',swatch:'#f0b8c8',img:cImg()},{name:'魔法紫',swatch:'#b89cc8',img:cImg()},{name:'森林綠',swatch:'#90b8a0',img:cImg()}]}
        ];
        this.currentOffset=0;this.gap=18;
        this.render();this.setupCarousel();this.setupInteractions();this.updateArrows();
        this.renderMobileDots();this.setupMobileScroll();
        this.placeHero();
        window.addEventListener('resize',()=>{this.updateTrackPosition();this.updateArrows();this.placeHero()});
    }
    renderMobileDots(){
        const wrap=document.getElementById('collectionMobileDots');
        if(!wrap)return;
        wrap.innerHTML=this.products.map((_,i)=>`<button class="cm-dot${i===0?' active':''}" data-i="${i}" aria-label="第 ${i+1} 項"></button>`).join('');
        wrap.querySelectorAll('.cm-dot').forEach(d=>d.addEventListener('click',()=>{
            const i=parseInt(d.dataset.i);
            const card=this.cards[i];
            if(!card)return;
            const vp=document.querySelector('.col-carousel-viewport');
            vp.scrollTo({left:card.offsetLeft-vp.offsetLeft,behavior:'smooth'});
        }));
    }
    setupMobileScroll(){
        const vp=document.querySelector('.col-carousel-viewport');
        if(!vp)return;
        vp.addEventListener('scroll',()=>{
            if(window.innerWidth>768)return;
            const dots=document.querySelectorAll('.cm-dot');
            if(!dots.length||!this.cards||!this.cards.length)return;
            const cw=this.cards[0].offsetWidth+12;
            const i=Math.min(this.cards.length-1,Math.round(vp.scrollLeft/cw));
            dots.forEach((d,di)=>d.classList.toggle('active',di===i));
        },{passive:true});
    }
    get visibleCards(){const w=window.innerWidth;return w<=480?1:w<=768?2:3}
    get maxOffset(){return Math.max(0,this.products.length-this.visibleCards)}
    render(){this.track.innerHTML=this.products.map((p,i)=>this.renderCard(p,i)).join('');this.cards=[...this.track.querySelectorAll('.product-card')]}
    renderCard(p,idx){
        const awardLogos=['https://cdn.shopify.com/s/files/1/0577/1939/0270/files/Allure_20Best_20of_20Beauty_20Award_20Seal_png.png?v=1772790457','https://cdn.shopify.com/s/files/1/0577/1939/0270/files/image_6_1.png?v=1772790457'];
        const imgs=p.variants.map((v,i)=>`<div class="product-img${i===0?' active':''}" data-variant="${i}"><img src="${v.img}" alt="${v.name}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></div>`).join('');
        let badges='';if(p.isSet)badges=`<div class="product-badges"><img class="badge-gift-wrap" src="${awardLogos[idx%2]}" alt="award"><div class="badge-tags"><span class="badge-tag badge-customizable">可自選搭配</span><span class="badge-tag badge-value">原價 $${p.value}</span></div></div>`;
        const price=p.salePrice?`<span class="price-original">$${p.originalPrice.toFixed(2)}</span><span class="price-sale">$${p.salePrice.toFixed(2)}</span>`:`<span class="price-current">$${p.originalPrice.toFixed(2)}</span>`;
        const mx=p.maxSwatches||5,vis=p.variants.slice(0,mx),ext=p.variants.length-vis.length;
        const sw=vis.map((v,i)=>`<button class="swatch${i===0?' active':''}" data-variant="${i}" data-name="${v.name}" style="background-color:${v.swatch}" title="${v.name}"></button>`).join('')+(ext>0?`<span class="swatch-more">+${ext}more</span>`:'');
        const vl=p.isSet?'':`\u2013 ${p.variants[0].name}`;
        return `<div class="product-card" data-product="${idx}"><div class="product-image-area">${imgs}${badges}<button class="product-quick-view" aria-label="快速查看"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></button><button class="product-img-next" aria-label="下一張"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></button><div class="product-add-to-cart">加入購物車</div></div><div class="product-info"><h3 class="product-name"><span class="name-base">${p.name}</span><span class="name-variant"> ${vl}</span></h3><div class="product-pricing">${price}</div><div class="variant-swatches">${sw}</div></div></div>`;
    }
    placeHero(){const hero=document.querySelector('.collection-hero-img');const main=document.querySelector('.collection-main');const header=document.querySelector('.collection-header');const layout=document.querySelector('.collection-layout');if(!hero||!main||!header||!layout)return;if(window.innerWidth<=768){if(hero.parentNode!==main)header.after(hero);}else{if(hero.parentNode!==layout)layout.appendChild(hero);}}
    setupCarousel(){document.querySelector('.col-arrow-prev').addEventListener('click',()=>this.scroll(-1));document.querySelector('.col-arrow-next').addEventListener('click',()=>this.scroll(1))}
    scroll(d){this.currentOffset=Math.max(0,Math.min(this.maxOffset,this.currentOffset+d));this.updateTrackPosition();this.updateArrows()}
    updateTrackPosition(){if(!this.cards||!this.cards.length)return;this.track.style.transform=`translateX(-${this.currentOffset*(this.cards[0].offsetWidth+this.gap)}px)`}
    updateArrows(){const p=document.querySelector('.col-arrow-prev'),n=document.querySelector('.col-arrow-next');if(!p)return;p.classList.toggle('disabled',this.currentOffset<=0);n.classList.toggle('disabled',this.currentOffset>=this.maxOffset)}
    setupInteractions(){
        const switchVariant=s=>{const c=s.closest('.product-card'),vi=s.dataset.variant,nm=s.dataset.name;c.querySelectorAll('.swatch').forEach(x=>x.classList.remove('active'));s.classList.add('active');c.querySelectorAll('.product-img').forEach(x=>x.classList.remove('active'));const t=c.querySelector(`.product-img[data-variant="${vi}"]`);if(t)t.classList.add('active');const nv=c.querySelector('.name-variant');if(nv)nv.textContent=` \u2013 ${nm}`};
        this.track.querySelectorAll('.swatch').forEach(s=>{s.addEventListener('mouseenter',()=>switchVariant(s));s.addEventListener('click',e=>{e.stopPropagation();switchVariant(s)});});
        this.track.querySelectorAll('.product-img-next').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();const c=b.closest('.product-card'),imgs=[...c.querySelectorAll('.product-img')],sws=[...c.querySelectorAll('.swatch')],ai=imgs.findIndex(x=>x.classList.contains('active')),ni=(ai+1)%imgs.length;imgs.forEach(x=>x.classList.remove('active'));imgs[ni].classList.add('active');sws.forEach(x=>x.classList.remove('active'));if(sws[ni])sws[ni].classList.add('active');const pi=parseInt(c.dataset.product),v=this.products[pi].variants[ni];if(v)c.querySelector('.name-variant').textContent=` \u2013 ${v.name}`}));
    }
}

/* ============================================
   網紅推薦 (Reels / Bestsellers)
   ============================================ */
class ReelsSection {
    constructor() {
        this.track = document.getElementById('reelsTrack');
        if (!this.track) return;
        this.data = [
            { bg:'linear-gradient(180deg,#f0d5cc,#e0b8a8 40%,#dab0a0)',title:'甜心小熊系列\n浮雕腮紅',shade:'C3 甜心',product:{name:'甜心小熊六色彩妝盤',price:35,img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/77f0ef16e0fbc52baa3dea6f4a2e4a0e.jpg?v=1772784822'},dur:10000,video:'https://cdn.shopify.com/videos/c/o/v/6af6f93c860147b485384c8eeb5e724b.mp4'},
            { bg:'linear-gradient(180deg,#e8d0c8,#d0b0a0 40%,#c09888)',title:'兔兔花園系列\n雲朵唇霜',shade:'B03 藕粉夢幻',product:{name:'兔兔花園雲朵唇霜',price:20,img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/d7d786ffc26a7e958be6a71929934d0b.jpg?v=1772784822'},dur:8000,video:'https://cdn.shopify.com/videos/c/o/v/f7ce230b8ee74a66a68fc38ff634ee42.mp4'},
            { bg:'linear-gradient(180deg,#f5e8e0,#e0c8b8 40%,#d0b0a0)',title:'TOO COOL FOR SCHOOL\n遮瑕盤',shade:'自然亮白',product:{name:'藝術課堂遮瑕盤',price:28,img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/484291c3591841355507e3c3352a3e2b.jpg?v=1772784822'},dur:12000,video:'https://cdn.shopify.com/videos/c/o/v/546a22afd66642b0a2763bc0f655ec6c.mp4'},
            { bg:'linear-gradient(180deg,#f8e8e0,#e8c8bc 40%,#d8b0a4)',title:'甜心小熊系列\n緞面腮紅',shade:'C3 玫瑰情歌',product:{name:'甜心小熊六色彩妝盤',price:35,img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/2df6780054db4d9b458828e39609f31c.jpg?v=1772784822'},dur:10000,video:'https://cdn.shopify.com/videos/c/o/v/5c4b48fde68644318d9d59598f23b9fe.mp4'},
            { bg:'linear-gradient(180deg,#f0dcd8,#e0c0b8 40%,#d0a8a0)',title:'甜心小熊系列\n果凍唇釉',shade:'JE04 緞帶粉',product:{name:'甜心小熊果凍唇釉',price:18,img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/111b02976f89989ea9015e8eb99bb940.jpg?v=1772784822'},dur:9000,video:'https://cdn.shopify.com/videos/c/o/v/d8357ad4f7ef4bca848db8905739063f.mp4'},
            { bg:'linear-gradient(180deg,#e8d8d0,#d8c0b4 40%,#c8a89c)',title:'兔兔花園系列\n浮雕腮紅',shade:'V06 鬱金香',product:{name:'兔兔花園浮雕腮紅',price:26,img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/076dcebd67088d85d2eb403f65020479.jpg?v=1772784822'},dur:11000,video:'https://cdn.shopify.com/videos/c/o/v/6af6f93c860147b485384c8eeb5e724b.mp4'},
            { bg:'linear-gradient(180deg,#f5d8d8,#e0b0b8 40%,#d498a0)',title:'兔兔花園系列\n手持鏡',shade:'粉色緞帶',product:{name:'兔兔花園精緻手持鏡',price:22,img:'https://cdn.shopify.com/s/files/1/0577/1939/0270/files/77f0ef16e0fbc52baa3dea6f4a2e4a0e.jpg?v=1772784822'},dur:8000,video:'https://cdn.shopify.com/videos/c/o/v/f7ce230b8ee74a66a68fc38ff634ee42.mp4'},
        ];
        this.setSize = this.data.length;
        this.activeIdx = 3;
        this.displayIdx = this.setSize + this.activeIdx;
        this.modalIdx = 0;
        this.state = 'closed'; // closed | modal | pip
        this.isMuted = true;
        this.progressRaf = null;
        this.playStart = 0;
        this.currentScroll = 0;
        this.jumping = false;

        this.modal = document.getElementById('videoModal');
        this.miniP = document.getElementById('miniPlayer');

        this.renderCards();
        this.renderDots();
        this.setupNav();
        this.setupCardClicks();
        this.updateActive();
        if (this.modal) this.setupModal();
        if (this.miniP) this.setupMini();
    }

    /* --- 主輪播渲染（三組實現無限循環） --- */
    renderCards() {
        const tripled = [...this.data, ...this.data, ...this.data];
        this.track.innerHTML = tripled.map((_, i) => {
            const ri = i % this.setSize;
            const d = this.data[ri];
            return `<div class="reel-card${i===this.displayIdx?' active':''}" data-display="${i}" data-real="${ri}">
                <div class="reel-media" style="background:${d.bg}">
                    <video class="reel-video" src="${d.video}" muted loop playsinline preload="metadata"></video>
                    <div class="reel-play-overlay"><svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="20" fill="rgba(255,255,255,.8)"/><polygon points="18,13 32,22 18,31" fill="#666"/></svg></div>
                    <button class="reel-mute-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg></button>
                    <div class="reel-text-overlay"><p class="reel-overlay-title">${d.title.replace(/\n/g,'<br>')}</p><p class="reel-overlay-shade">${d.shade}</p></div>
                </div>
            </div>`;
        }).join('');
        this.cards = [...this.track.querySelectorAll('.reel-card')];
    }

    renderDots() {
        const c = document.getElementById('reelsDots');
        c.innerHTML = this.data.map((_, i) => `<button class="reels-dot${i===this.activeIdx?' active':''}" data-index="${i}"></button>`).join('');
        c.querySelectorAll('.reels-dot').forEach(d => d.addEventListener('click', () => {
            this.activeIdx = parseInt(d.dataset.index);
            this.displayIdx = this.setSize + this.activeIdx;
            this.updateActive();
        }));
    }

    navPrev() { if(this.jumping)return; this.displayIdx--; this.activeIdx=((this.displayIdx%this.setSize)+this.setSize)%this.setSize; this.updateActive(); }
    navNext() { if(this.jumping)return; this.displayIdx++; this.activeIdx=((this.displayIdx%this.setSize)+this.setSize)%this.setSize; this.updateActive(); }
    setupNav() {
        document.getElementById('reelsNavPrev').addEventListener('click', () => this.navPrev());
        document.getElementById('reelsNavNext').addEventListener('click', () => this.navNext());
    }

    setupCardClicks() {
        this.track.addEventListener('click', e => {
            const card = e.target.closest('.reel-card');
            if (!card || this.jumping) return;
            // Mute toggle: don't propagate to card activation / modal
            if (e.target.closest('.reel-mute-icon')) {
                e.stopPropagation();
                const v = card.querySelector('video');
                if (v) {
                    v.muted = !v.muted;
                    if (!v.muted) v.play().catch(() => {});
                    this.setMuteIcon(card, v.muted);
                }
                return;
            }
            const di = parseInt(card.dataset.display);
            if (di !== this.displayIdx) {
                this.displayIdx = di;
                this.activeIdx = parseInt(card.dataset.real);
                this.updateActive();
                return;
            }
            this.openModal(this.activeIdx);
        });
    }

    setMuteIcon(card, muted) {
        const btn = card.querySelector('.reel-mute-icon');
        if (!btn) return;
        btn.innerHTML = muted
            ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`
            : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
    }

    scrollToDisplay(di, animate) {
        const vp = this.track.parentElement;
        if (!vp) return;
        const padL = parseFloat(getComputedStyle(this.track).paddingLeft) || 0;
        const gap = 14;
        const w = window.innerWidth;
        const inW = w <= 480 ? 150 : w <= 768 ? 170 : 220;
        const acW = w <= 480 ? 200 : w <= 768 ? 230 : 280;
        let left = padL;
        for (let i = 0; i < di; i++) left += inW + gap;
        this.currentScroll = Math.max(0, left + acW / 2 - vp.offsetWidth / 2);
        if (!animate) {
            this.track.style.transition = 'none';
            this.track.style.transform = `translateX(-${this.currentScroll}px)`;
            void this.track.offsetHeight;
            this.track.style.transition = '';
        } else {
            this.track.style.transform = `translateX(-${this.currentScroll}px)`;
        }
    }

    updateActive() {
        this.cards.forEach((c, i) => c.classList.toggle('active', i === this.displayIdx));
        const r = this.data[this.activeIdx];
        document.getElementById('reelsActiveProduct').innerHTML = `<div class="reel-product-card"><div class="reel-prod-thumb" style="background-image:url('${r.product.img}')"></div><div class="reel-prod-detail"><p class="reel-prod-name">${r.product.name}</p><p class="reel-prod-price">$${r.product.price}</p></div></div>`;
        document.querySelectorAll('.reels-dot').forEach((d, i) => d.classList.toggle('active', i === this.activeIdx));
        this.scrollToDisplay(this.displayIdx, true);
        // Play/pause videos — only active card plays; reset to muted when switching
        if (this.prevDisplayIdx != null) { const pv = this.cards[this.prevDisplayIdx]; if(pv){const v=pv.querySelector('video');if(v){v.pause();v.muted=true;this.setMuteIcon(pv,true);}} }
        const ac = this.cards[this.displayIdx]; if(ac){const v=ac.querySelector('video');if(v){v.currentTime=0;v.muted=true;v.play().catch(()=>{});this.setMuteIcon(ac,true);}}
        this.prevDisplayIdx = this.displayIdx;
        // Jump back to middle set after transition if outside
        if (this.displayIdx < this.setSize || this.displayIdx >= this.setSize * 2) {
            this.jumping = true;
            setTimeout(() => {
                this.displayIdx = this.setSize + this.activeIdx;
                this.cards.forEach((c, i) => c.classList.toggle('active', i === this.displayIdx));
                this.scrollToDisplay(this.displayIdx, false);
                this.jumping = false;
            }, 520);
        }
    }

    /* --- 彈窗 --- */
    setupModal() {
        document.getElementById('vmodalOverlay').addEventListener('click', () => this.closeAll());
        document.getElementById('vmodalClose').addEventListener('click', () => this.closeAll());
        document.getElementById('vmodalMin').addEventListener('click', () => this.minimize());
        document.getElementById('vmodalMute').addEventListener('click', () => this.toggleMute());
        document.getElementById('vmodalUp').addEventListener('click', () => this.advanceModal(-1));
        document.getElementById('vmodalDown').addEventListener('click', () => this.advanceModal(1));
    }

    openModal(idx) {
        this.modalIdx = idx;
        this.state = 'modal';
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.updateModalContent();
        this.startPlayback();
    }

    closeAll() {
        this.state = 'closed';
        this.modal.classList.remove('active');
        if (this.miniP) this.miniP.classList.remove('active');
        document.body.style.overflow = '';
        this.stopPlayback();
        if (this.modalVid) { this.modalVid.pause(); this.modalVid = null; }
        if (this.miniVid) { this.miniVid.pause(); this.miniVid = null; }
    }

    minimize() {
        this.state = 'pip';
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        if (this.modalVid) this.modalVid.pause();
        if (this.miniP) { this.miniP.classList.add('active'); this.updateMiniContent(); }
    }

    updateModalContent() {
        const r = this.data[this.modalIdx];
        // Video
        const vc = document.getElementById('vmodalVideo');
        vc.style.background = r.bg;
        vc.innerHTML = `<video src="${r.video}" muted loop playsinline style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></video>`;
        this.modalVid = vc.querySelector('video');
        this.modalVid.muted = this.isMuted;
        this.modalVid.play().catch(()=>{});
        this.updateMuteIcons();
        // Text
        const tt = document.getElementById('vmodalText');
        tt.querySelector('.vmt-title').innerHTML = r.title.replace(/\n/g, '<br>');
        tt.querySelector('.vmt-shade').textContent = r.shade;
        // Product bar
        const pb = document.getElementById('vmodalProd');
        pb.querySelector('.vmpb-thumb').style.cssText = `background:url('${r.product.img}') center/cover no-repeat,#f5f5f5`;
        pb.querySelector('.vmpb-name').textContent = r.product.name;
        pb.querySelector('.vmpb-price').textContent = `$${r.product.price}`;
        // Progress bars
        const pc = document.getElementById('vmodalPbars');
        pc.innerHTML = this.data.map((_, i) => `<div class="vmodal-pbar"><div class="vmodal-pbar-fill"></div></div>`).join('');
        this.pbarFills = [...pc.querySelectorAll('.vmodal-pbar-fill')];
        // Dots
        const dc = document.getElementById('vmodalDots');
        dc.innerHTML = this.data.map((_, i) => `<button class="vmodal-dot${i===this.modalIdx?' active':''}" data-i="${i}"></button>`).join('');
    }

    advanceModal(dir) {
        this.modalIdx = (this.modalIdx + dir + this.data.length) % this.data.length;
        if (this.state === 'modal') { this.updateModalContent(); this.startPlayback(); }
        else if (this.state === 'pip') { this.updateMiniContent(); this.startPlayback(); }
    }

    startPlayback() {
        this.stopPlayback();
        this.playStart = Date.now();
        this.currentDur = this.data[this.modalIdx].dur;
        this.tickProgress();
    }

    stopPlayback() { if (this.progressRaf) { cancelAnimationFrame(this.progressRaf); this.progressRaf = null; } }

    tickProgress() {
        const elapsed = Date.now() - this.playStart;
        const pct = Math.min(elapsed / this.currentDur, 1);
        // Update progress bars
        if (this.pbarFills) {
            this.pbarFills.forEach((f, i) => {
                if (i < this.modalIdx) f.style.width = '100%';
                else if (i === this.modalIdx) f.style.width = `${pct * 100}%`;
                else f.style.width = '0';
            });
        }
        if (pct >= 1) { this.advanceModal(1); return; }
        this.progressRaf = requestAnimationFrame(() => this.tickProgress());
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        [this.modalVid, this.miniVid].forEach(v => {
            if (!v) return;
            v.muted = this.isMuted;
            if (!this.isMuted) v.play().catch(() => {});
        });
        this.updateMuteIcons();
    }

    muteSvg(size, muted) {
        return muted
            ? `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`
            : `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
    }

    updateMuteIcons() {
        const modalBtn = document.getElementById('vmodalMute');
        const miniBtn = document.getElementById('miniMute');
        if (modalBtn) modalBtn.innerHTML = this.muteSvg(18, this.isMuted);
        if (miniBtn) miniBtn.innerHTML = this.muteSvg(14, this.isMuted);
    }

    /* --- 迷你播放器 --- */
    setupMini() {
        document.getElementById('miniExpand').addEventListener('click', () => this.expandFromMini());
        document.getElementById('miniClose').addEventListener('click', () => this.closeAll());
        document.getElementById('miniMute').addEventListener('click', () => this.toggleMute());
    }

    expandFromMini() {
        this.state = 'modal';
        this.miniP.classList.remove('active');
        if (this.miniVid) { this.miniVid.pause(); this.miniVid = null; }
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.updateModalContent();
        // Continue playback — keep current progress
        const elapsed = Date.now() - this.playStart;
        if (elapsed < this.currentDur) this.tickProgress();
        else this.startPlayback();
    }

    updateMiniContent() {
        const r = this.data[this.modalIdx];
        const mc = document.getElementById('miniVideo');
        mc.style.background = r.bg;
        mc.innerHTML = `<video src="${r.video}" muted loop playsinline style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></video>`;
        this.miniVid = mc.querySelector('video');
        this.miniVid.muted = this.isMuted;
        this.miniVid.play().catch(()=>{});
        this.updateMuteIcons();
        const pb = document.getElementById('miniProd');
        pb.querySelector('.mnpb-thumb').style.cssText = `background:url('${r.product.img}') center/cover no-repeat,#f5f5f5`;
        pb.querySelector('.mnpb-name').textContent = r.product.name;
        pb.querySelector('.mnpb-price').textContent = `$${r.product.price}`;
        document.getElementById('miniDots').innerHTML = this.data.map((_, i) => `<span class="mini-dot${i===this.modalIdx?' active':''}"></span>`).join('');
    }
}

/* ============================================
   新品展示 (New Product Showcase)
   ============================================ */
/* ============================================
   推薦板塊 (What We Recommend)
   ============================================ */
class RecommendSection {
    constructor() {
        this.track = document.getElementById('recTrack');
        if (!this.track) return;

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
        this.data = [
            { name:'花漾夢幻全臉套裝', img:rImg(),
              badges:['可自選搭配'], originalTag:'原價 $204', oldPrice:'$204.00', newPrice:'$152.00',
              swatches:[{color:'#c8a0b8',img:rImg()},{color:'#e8a090',img:rImg()},{color:'#f0d098',img:rImg()}] },
            { name:'兔兔花園基礎套裝', img:rImg(),
              badges:['可自選搭配'], originalTag:'原價 $154', oldPrice:'$154.00', newPrice:'$115.00',
              swatches:[{color:'#d87898',img:rImg()},{color:'#9878a8',img:rImg()},{color:'#78b898',img:rImg()}] },
            { name:'氣墊光澤入門套裝', img:rImg(),
              badges:['可自選搭配'], originalTag:'原價 $89', oldPrice:'$89.00', newPrice:'$66.00',
              swatches:[{color:'#d0b898',img:rImg()},{color:'#e88898',img:rImg()},{color:'#f0d8c8',img:rImg()}] },
            { name:'甜心小熊六色彩妝盤', img:rImg(),
              badges:[], originalTag:'', oldPrice:'$45.00', newPrice:'$35.00',
              swatches:[{color:'#e8a0b0',img:rImg()},{color:'#d08090',img:rImg()},{color:'#f0c0a0',img:rImg()},{color:'#c8a888',img:rImg()}] },
            { name:'藝術課堂修容盤', img:rImg(),
              badges:[], originalTag:'', oldPrice:'$38.00', newPrice:'$28.00',
              swatches:[{color:'#c8a888',img:rImg()},{color:'#b89070',img:rImg()},{color:'#d0b898',img:rImg()}] },
            { name:'兔兔花園浮雕腮紅', img:rImg(),
              badges:[], originalTag:'', oldPrice:'$32.00', newPrice:'$24.00',
              swatches:[{color:'#f4b5c1',img:rImg()},{color:'#e07080',img:rImg()},{color:'#d4736c',img:rImg()}] },
            { name:'光澤妝前乳', img:rImg(),
              badges:[], originalTag:'', oldPrice:'$28.00', newPrice:'$22.00',
              swatches:[{color:'#e8d0b8',img:rImg()},{color:'#d8c0a8',img:rImg()},{color:'#c8b098',img:rImg()}] },
            { name:'甜心小熊果凍唇釉', img:rImg(),
              badges:[], originalTag:'', oldPrice:'$18.00', newPrice:'$14.00',
              swatches:[{color:'#d87880',img:rImg()},{color:'#e89098',img:rImg()},{color:'#f0a0a0',img:rImg()}] }
        ];

        this.pos = 0;
        this.render();
        this.setupNav();
    }

    getVisibleCount() {
        const w = window.innerWidth;
        if (w <= 480) return 1.5;
        if (w <= 768) return 2.5;
        return 4.5;
    }

    render() {
        const awardLogos=['https://cdn.shopify.com/s/files/1/0577/1939/0270/files/Allure_20Best_20of_20Beauty_20Award_20Seal_png.png?v=1772790457','https://cdn.shopify.com/s/files/1/0577/1939/0270/files/image_6_1.png?v=1772790457'];
        this.track.innerHTML = this.data.map((d,idx) => {
            const hasBadges = d.badges.length || d.originalTag;
            const imgs = d.swatches.map((s,i) => `<div class="product-img${i===0?' active':''}" data-variant="${i}"><img src="${s.img}" alt="${d.name}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></div>`).join('');
            let badges = '';
            if (hasBadges) badges = `<div class="product-badges"><img class="badge-gift-wrap" src="${awardLogos[idx%2]}" alt="award"><div class="badge-tags">${d.badges.map(b=>`<span class="badge-tag badge-customizable">${b}</span>`).join('')}${d.originalTag?`<span class="badge-tag badge-value">${d.originalTag}</span>`:''}</div></div>`;
            const price = `<span class="price-original">${d.oldPrice}</span><span class="price-sale">${d.newPrice}</span>`;
            const visSw = d.swatches.slice(0,5), extSw = d.swatches.length - visSw.length;
            const sw = visSw.map((s,i) => `<button class="swatch${i===0?' active':''}" data-variant="${i}" style="background-color:${s.color}" title="${d.name}"></button>`).join('') + (extSw>0?`<span class="swatch-more">+${extSw}more</span>`:'');
            return `<div class="product-card" data-product="${idx}"><div class="product-image-area">${imgs}${badges}<button class="product-quick-view" aria-label="快速查看"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></button><div class="product-add-to-cart">加入購物車</div></div><div class="product-info"><h3 class="product-name"><span class="name-base">${d.name}</span></h3><div class="product-pricing">${price}</div><div class="variant-swatches">${sw}</div></div></div>`;
        }).join('');
        this.setupSwatches();
    }

    setupSwatches() {
        const switchVariant = s => {
            const card = s.closest('.product-card');
            card.querySelectorAll('.swatch').forEach(x => x.classList.remove('active'));
            s.classList.add('active');
            card.querySelectorAll('.product-img').forEach(x => x.classList.remove('active'));
            const t = card.querySelector(`.product-img[data-variant="${s.dataset.variant}"]`);
            if (t) t.classList.add('active');
        };
        this.track.querySelectorAll('.swatch').forEach(s => {
            s.addEventListener('mouseenter', () => switchVariant(s));
            s.addEventListener('click', e => { e.stopPropagation(); switchVariant(s); });
        });
    }

    setupNav() {
        const prev = document.getElementById('recPrev');
        const next = document.getElementById('recNext');
        prev.addEventListener('click', () => this.go(-1));
        next.addEventListener('click', () => this.go(1));
        window.addEventListener('resize', () => this.updatePos());
        this.updateArrows();
    }

    go(dir) {
        const vis = this.getVisibleCount();
        const max = this.data.length - vis;
        this.pos = Math.max(0, Math.min(max, this.pos + dir));
        this.updatePos();
        this.updateArrows();
    }

    updatePos() {
        const cards = this.track.children;
        if (!cards.length) return;
        const gap = 16;
        const card = cards[0];
        const cardW = card.offsetWidth + gap;
        this.track.style.transform = `translateX(-${this.pos * cardW}px)`;
    }

    updateArrows() {
        const vis = this.getVisibleCount();
        const max = this.data.length - vis;
        document.getElementById('recPrev').classList.toggle('disabled', this.pos <= 0);
        document.getElementById('recNext').classList.toggle('disabled', this.pos >= max);
    }
}



/* ============================================
   Quick View Modal
   ============================================ */
class QuickViewModal {
    constructor() {
        this.modal = document.getElementById('quickViewModal');
        if (!this.modal) return;
        this.elName = document.getElementById('qvName');
        this.elPrice = document.getElementById('qvPrice');
        this.elImage = document.getElementById('qvImage');
        this.elOptions = document.getElementById('qvOptions');
        this.elVariants = document.getElementById('qvVariants');
        this.elQty = document.getElementById('qvQty');
        this.images = [];
        this.variantNames = [];
        this.idx = 0;
        this.qty = 1;
        this.bind();
    }

    bind() {
        this.modal.querySelectorAll('[data-qv-close]').forEach(el => el.addEventListener('click', () => this.close()));
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && this.modal.classList.contains('open')) this.close(); });
        this.modal.querySelector('.qv-prev').addEventListener('click', () => this.go(-1));
        this.modal.querySelector('.qv-next').addEventListener('click', () => this.go(1));
        this.modal.querySelector('.qv-qty-dec').addEventListener('click', () => this.setQty(this.qty - 1));
        this.modal.querySelector('.qv-qty-inc').addEventListener('click', () => this.setQty(this.qty + 1));
        this.modal.querySelector('#qvAdd').addEventListener('click', () => {
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) cartCount.textContent = String((parseInt(cartCount.textContent) || 0) + this.qty);
            this.close();
        });
        document.addEventListener('click', e => {
            if (this.modal.contains(e.target)) return;
            const card = e.target.closest('.product-card');
            if (!card) return;
            const addBtn = e.target.closest('.product-add-to-cart');
            if (addBtn) {
                e.preventDefault();
                e.stopPropagation();
                this.open(card);
                return;
            }
            if (e.target.closest('.swatch,.swatch-more,.product-img-next,a,button')) return;
            const imgArea = e.target.closest('.product-image-area');
            const info = e.target.closest('.product-info');
            if (imgArea || info) {
                e.preventDefault();
                window.location.href = card.dataset.productUrl || '#';
            }
        });
    }

    open(card) {
        const name = (card.querySelector('.name-base')?.textContent || '').trim();
        const priceHTML = card.querySelector('.product-pricing')?.innerHTML || '';
        const imgEls = [...card.querySelectorAll('.product-img img')];
        this.images = imgEls.map(i => i.src);
        if (!this.images.length) {
            const bg = card.querySelector('.product-image-area');
            if (bg) this.images = [bg.querySelector('img')?.src].filter(Boolean);
        }
        const activeIdx = [...card.querySelectorAll('.product-img')].findIndex(x => x.classList.contains('active'));
        this.idx = Math.max(0, activeIdx);
        const swatches = [...card.querySelectorAll('.swatch')];
        this.variantNames = swatches.map((s, i) => s.dataset.name || s.title || `選項 ${i + 1}`);

        this.elName.textContent = name;
        this.elPrice.innerHTML = priceHTML;
        if (this.variantNames.length > 1) {
            this.elOptions.hidden = false;
            this.elVariants.innerHTML = this.variantNames.map((n, i) =>
                `<button class="qv-variant-btn${i === this.idx ? ' active' : ''}" data-i="${i}">${n}</button>`
            ).join('');
            this.elVariants.querySelectorAll('.qv-variant-btn').forEach(btn => {
                btn.addEventListener('click', () => this.selectVariant(parseInt(btn.dataset.i)));
            });
        } else {
            this.elOptions.hidden = true;
        }
        this.qty = 1;
        this.elQty.textContent = '1';
        this.updateImage();
        const url = card.dataset.productUrl || '#';
        const viewFull = this.modal.querySelector('.qv-view-full');
        if (viewFull) viewFull.href = url;
        this.modal.classList.add('open');
        this.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('open');
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    go(d) {
        if (!this.images.length) return;
        this.idx = (this.idx + d + this.images.length) % this.images.length;
        this.updateImage();
        this.syncVariantBtns();
    }

    selectVariant(i) {
        this.idx = Math.min(i, this.images.length - 1);
        this.updateImage();
        this.syncVariantBtns();
    }

    syncVariantBtns() {
        this.elVariants.querySelectorAll('.qv-variant-btn').forEach((b, j) => {
            b.classList.toggle('active', j === this.idx);
        });
    }

    setQty(n) {
        this.qty = Math.max(1, Math.min(99, n));
        this.elQty.textContent = String(this.qty);
    }

    updateImage() {
        if (this.images[this.idx]) this.elImage.src = this.images[this.idx];
    }
}
