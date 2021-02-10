function replaceStr(a) {
    a = a.replace(/(<script[^>]*>| |\s*)/g, '')
        .replace(/\&/g,"&amp;")
        .replace(/\"/g,"&quot;")
        .replace(/\'/g,"&#39;")
        .replace(/\</g,"&lt;")
        .replace(/\>/g,"&gt;");
    return a;
}

function checkStr(a) {
    var pattern = new RegExp("[&<>\\'\"]")
    return pattern.test(a);
}

module.exports.replaceStr = replaceStr;
module.exports.checkStr = checkStr;