// script.js - 交互功能：平滑滚动、导航激活、移动端友好等

document.addEventListener('DOMContentLoaded', function() {
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');

    // 平滑滚动 (兼容性处理)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // 更新URL但不触发跳转 (可选)
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    // 滚动高亮当前章节
    function updateActiveNav() {
        let current = '';
        const scrollPos = window.scrollY + 120; // 偏移量

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // 初始化

    // 处理图片加载失败（优雅降级，可选）
    const detectionImg = document.querySelector('.real-img-container img');
    if (detectionImg) {
        detectionImg.addEventListener('error', function() {
            this.src = 'https://placehold.co/800x400?text=检测结果示例图+请放置图片:2026-06-09+022432.jpg';
            this.style.opacity = '0.7';
            const caption = document.querySelector('.img-caption');
            if (caption) {
                caption.innerHTML += '<br><span style="color:#b91c1c;">⚠️ 未找到图片文件，请将 "2026-06-09 022432.jpg" 放在同一目录下。</span>';
            }
        });
    }

    // 为所有外部卡片增加细微的入场动画（延迟加载类）
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(card);
    });

    // 控制台输出技术信息
    console.log('网站已加载：基于深度学习的指挥人员识别与追踪技术 | 个人项目');
});