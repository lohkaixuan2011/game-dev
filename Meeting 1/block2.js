var block = {
    length: 10,
    width: 5,
    height: 4,
    volume: function () {
        return this.length * this.width * this.height
    }
};

console.log(block.volume());