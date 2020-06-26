if (typeof btoa === 'undefined') {
    global.btoa = function (str) {
        return new Buffer(str, 'binary').toString('base64');
    };
}

if (typeof atob === 'undefined') {
    global.atob = function (b64Encoded) {
        return new Buffer(b64Encoded, 'base64').toString('binary');
    };
}

function checkNull(element, value) {
    element = element != undefined ? element : value
    return element
}

function random(min, max) { // Random com range entre numeros
    if (min instanceof Array) return min[Math.round(Math.random() * (min.length - 1))];
    min = checkNull(min, 0)
    if (max === undefined && min > 0) return Math.random() * min
    return Math.random() * (max - min) + min
}