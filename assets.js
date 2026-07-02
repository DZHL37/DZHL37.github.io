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
    // 静态多页站点，导航由各页面 HTML 的 active class 控制
    // 此函数适用于 SPA 锚点导航场景，当前站点无需启用

    // ===== 页面过渡（跳转） =====
    function initPageTransition() {
        var transitionEl = document.getElementById('pageTransition');

        // 拦截内部链接
        document.addEventListener('click', function (e) {
            var link = e.target.closest('a');
            if (!link) return;

            var href = link.getAttribute('href');
            if (!href) return;

            // 只处理内部页面跳转
            if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return;
            if (link.target === '_blank') return;
            if (e.ctrlKey || e.metaKey || e.shiftKey) return;

            e.preventDefault();
            triggerTransition(href);
        });

        function triggerTransition(href) {
            if (!transitionEl) {
                window.location.href = href;
                return;
            }
            transitionEl.classList.add('active');
            setTimeout(function () {
                window.location.href = href;
            }, 450);
        }
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

    // ===== 导航栏鼠标视差 =====
    function initNavParallax() {
        var navBar = document.querySelector('.nav-bar');
        if (!navBar) return;

        var ticking = false;
        document.addEventListener('mousemove', function (e) {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function () {
                var x = (e.clientX / window.innerWidth - 0.5) * 8;
                var y = (e.clientY / window.innerHeight - 0.5) * 4;
                navBar.style.transform = 'translateX(calc(-50% + ' + x + 'px)) translateY(' + y + 'px)';
                ticking = false;
            });
        });
    }

    // ===== 背景光斑视差 =====
    function initOrbParallax() {
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
        // initNavHighlight(); // 静态站点，不启用滚动导航高亮
        initPageTransition();
        initSmoothScroll();
        initNavParallax();
        initOrbParallax();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
