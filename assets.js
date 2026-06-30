/* ============================================
   DZHL-blog · 交互脚本
   全站共享
   ============================================ */

(function () {
    'use strict';

    // ===== 页面加载入场 =====
    function pageEnter() {
        document.body.classList.add('page-enter');
    }

    // ===== 滚动触发动画 =====
    function initScrollReveal() {
        var observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.classList.add('visible');
                    }, index * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        var revealSelectors = '.post-card, .category-card, .about-section, .archive-item';
        document.querySelectorAll(revealSelectors).forEach(function (el) {
            observer.observe(el);
        });
    }

    // ===== 液态光晕跟随鼠标 =====
    function initLiquidGlow() {
        document.querySelectorAll('.post-card').forEach(function (card) {
            var glow = card.querySelector('.liquid-glow');
            if (!glow) return;
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                glow.style.left = (e.clientX - rect.left) + 'px';
                glow.style.top = (e.clientY - rect.top) + 'px';
            });
        });
    }

    // ===== 导航高亮 =====
    function initNavHighlight() {
        var sections = document.querySelectorAll('section[id]');
        if (!sections.length) return;

        var navLinks = document.querySelectorAll('.nav-link');
        window.addEventListener('scroll', function () {
            var current = '';
            sections.forEach(function (section) {
                var top = section.offsetTop - 120;
                if (window.scrollY >= top) {
                    current = section.getAttribute('id');
                }
            });
            navLinks.forEach(function (link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ===== 页面跳转（简单的直接跳转） =====
    function initPageNav() {
        // 不需要额外处理，a标签默认行为即可
    }

    // ===== 平滑滚动（锚点） =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener('click', function (e) {
                var href = link.getAttribute('href');
                if (href === '#' || href.length < 2) return;
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ===== 背景光斑跟随鼠标 =====
    function initParallax() {
        var orbs = document.querySelectorAll('.orb');
        if (!orbs.length) return;
        var ticking = false;
        document.addEventListener('mousemove', function (e) {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function () {
                var x = e.clientX / window.innerWidth;
                var y = e.clientY / window.innerHeight;
                orbs.forEach(function (orb, i) {
                    var speed = (i + 1) * 15;
                    orb.style.transform = 'translate(' + (x - 0.5) * speed + 'px, ' + (y - 0.5) * speed + 'px)';
                });
                ticking = false;
            });
        });
    }

    // ===== 初始化 =====
    function init() {
        pageEnter();
        initScrollReveal();
        initLiquidGlow();
        initNavHighlight();
        initPageNav();
        initSmoothScroll();
        initParallax();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
