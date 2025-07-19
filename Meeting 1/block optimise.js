var Block = {
    length: 10,
    width: 5,
    height: 4,

    volume: function () {
        var vol = this.length * this.width * this.height
        return "The volume of the block is : " + vol
    }

}

console.log(Block.volume());