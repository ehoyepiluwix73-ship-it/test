(function() {
    // 【1. 配置：跳转目标地址】
    var config_target = "https://你的正式落地页链接.com"; 

    function isRealUser() {
        var url = window.location.search;
        
        // --- 校验 1：参数完整性 ---
        // 真实点击除了 fbclid，通常还带有 pixel, campaign 等你配置的多个参数
        // 手动加 ID 很难模拟完整的参数链
        if (url.indexOf('fbclid=') === -1 || url.indexOf('pixel=') === -1) return false;

        // --- 校验 2：占位符过滤 (核心) ---
        // 只要链接中还包含未填充的大括号，100% 不是真实点击
        if (url.indexOf('%7B%7B') > -1 || url.indexOf('{{') > -1) return false;

        // --- 校验 3：环境指纹 (Anti-Bot) ---
        // Facebook 广告主要在移动端 (iOS/Android)。审核爬虫常在 Linux/Windows 服务器运行。
        var ua = navigator.userAgent.toLowerCase();
        var isMobile = /iphone|ipad|ipod|android/.test(ua);
        if (!isMobile) return false; // 如果是电脑访问，即使有 ID 也给看小游戏（防电脑端审核）

        // --- 校验 4：屏幕特征 (防止模拟器) ---
        // 真实手机屏幕不太可能是完美的 0 或某些固定死的分辨率
        if (window.screen.width === 0 || window.screen.height === 0) return false;

        return true; 
    }

    function execute() {
        if (isRealUser()) {
            // 真实用户：执行跳转
            var jumpUrl = config_target + (config_target.indexOf('?') > -1 ? '&' : '?') + window.location.search.substring(1);
            window.location.replace(jumpUrl);
        } else {
            // 疑似审核、爬虫或手动加 ID：停留在小游戏
            console.log("Welcome to Totem's Treasure!");
            if (typeof init === 'function') init(); 
        }
    }

    // 建议增加一个 200ms 的感官延迟，模拟正常加载，避开极速行为检测
    setTimeout(execute, 200);
})();
