(function() {
    // ==========================================
    // 1. 配置区域
    // ==========================================
    // 在此处填入你的正式 Offer/落地页 链接
    var config_bproducturl = "https://你的正式落地页链接.com"; 

    // ==========================================
    // 2. 逻辑解析区域
    // ==========================================
    var query = getQueryStr(location.search) || {};
    var pixel = query.pixel;
    var apkch = query.apkch;
    
    var pwa_ch = apkch;
    var pwa_pixel = pixel;
    var pwa_compaign = query.campaign || '';
    var pwa_adgroup = query.adgroup || '';
    var pwa_creative = query.creative || '';
    var pwa_fbclid = query.fbclid || '';
    var pwa_funt = query.funtest || '';

    var pwa_jump = true;

    // A. 判断 fbclid 是否为空或包含未替换的占位符 {{...}}
    if (!pwa_fbclid || pwa_fbclid.indexOf('{') > -1) {
        pwa_jump = false;
    }
    
    // B. 判断 adgroup 是否包含无效占位符
    if (pwa_adgroup.indexOf('adset.name') > -1 || pwa_adgroup.indexOf('adset.id') > -1) {
        pwa_jump = false;
    }

    // C. 测试强制跳转模式
    if (pwa_funt == '1') {
        pwa_jump = true;
    }

    // ==========================================
    // 3. 执行分发
    // ==========================================
    if (pwa_jump) {
        // 构造跳转 URL
        var pwa_jumpurl = "{main_url}?pixel={pwa_pixel}&campaign={pwa_compaign}&adgroup={pwa_adgroup}&creative={pwa_creative}&fbclid={pwa_fbclid}";
        pwa_jumpurl = pwa_jumpurl.replace("{main_url}", config_bproducturl);
        pwa_jumpurl = pwa_jumpurl.replace("{paw_ch}", pwa_ch);
        pwa_jumpurl = pwa_jumpurl.replace("{pwa_pixel}", pwa_pixel);
        pwa_jumpurl = pwa_jumpurl.replace("{pwa_compaign}", pwa_compaign);
        pwa_jumpurl = pwa_jumpurl.replace("{pwa_adgroup}", pwa_adgroup);
        pwa_jumpurl = pwa_jumpurl.replace("{pwa_creative}", pwa_creative);
        pwa_jumpurl = pwa_jumpurl.replace("{pwa_fbclid}", pwa_fbclid);

        // 上报日志
        request_repetition_log('pwajoinbexp');

        // 执行跳转（使用 replace 避开后退键回到此页）
        window.location.replace(pwa_jumpurl);
    } else {
        // 如果不满足跳转条件，静默处理，HTML 会继续加载小游戏
        console.log('Environment: Standard (Game Mode)');
    }

    // --- 工具函数 ---
    function getQueryStr(str) {
        if (!str) return {};
        var obj = {};
        var search = str.split('?')[1];
        if (!search) return {};
        search = search.split('&');
        for (var i = 0; i < search.length; i++) {
            var item = search[i].split('=');
            obj[item[0]] = item[1];
        }
        return obj;
    }

    function request_repetition_log(strUnionid){
        // 这里保留你原本的 XHR 日志请求逻辑...
        var reqUrl = 'https://active.brl77.com/log?'; // 补全你原本的日志域名
        // ... (省略重复的日志拼接代码)
    }
})();