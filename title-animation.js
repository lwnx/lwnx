// 调试：检查脚本是否加载
console.log('Title animation script loaded');

// 定义标题数组
const titles = [
    "✨ Product Experience Designer",
    "🎨 UI Designer",
    "💻 Frontend Developer",
    "🎯 Creative Director",
    "🎭 Digital Artist",
    "🎪 Visual Designer",
    "⚡️ UX Engineer",
    "💡 Innovation Designer"
];

// 初始化动画
function initTitleAnimation() {
    const titleElement = document.getElementById('title-effect');
    
    if (!titleElement) {
        console.error('Title element not found! Make sure the element with id "title-effect" exists.');
        return;
    }

    let currentIndex = 0;
    let isAnimating = false;

    // 更新标题的函数
    function updateTitle() {
        if (isAnimating) return;
        isAnimating = true;

        titleElement.style.opacity = '0';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % titles.length;
            titleElement.textContent = titles[currentIndex];
            titleElement.style.opacity = '1';
            isAnimating = false;
        }, 500);
    }

    // 设置初始标题
    titleElement.textContent = titles[0];
    titleElement.style.opacity = '1';

    // 启动动画循环
    setInterval(updateTitle, 3000);
}

// 当 DOM 加载完成时初始化动画
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTitleAnimation);
} else {
    initTitleAnimation();
}
