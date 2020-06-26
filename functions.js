module.exports = class Queue {
    checkNull(element, value) {
        element = element != undefined ? element : value
        return element
    }

    random(min, max) { // Random com range entre numeros
        if (min instanceof Array) return min[Math.round(Math.random() * (min.length - 1))];
        min = this.checkNull(min, 0)
        if (max === undefined && min > 0) return Math.random() * min
        return Math.random() * (max - min) + min
    }
}