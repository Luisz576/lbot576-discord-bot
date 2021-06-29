function random(max=0, min=0){
    return min + Math.floor(Math.random() * max)
}

module.exports = {
    random
}