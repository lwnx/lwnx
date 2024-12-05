// 调试：检查脚本是否加载
console.log('Title animation script loaded');

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

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    const titleElement = document.getElementById('title-effect');
    console.log('Title element:', titleElement);
    
    if (!titleElement) {
        console.error('Title element not found!');
        return;
    }

    let currentIndex = 0;

    function updateTitle() {
        titleElement.style.opacity = '0';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % titles.length;
            titleElement.textContent = titles[currentIndex];
            titleElement.style.opacity = '1';
        }, 500); // 半秒后更新文本
    }

    // 每3秒更新一次标题
    setInterval(updateTitle, 3000);
});
