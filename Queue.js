function Queue () {
  this.items = []

  Queue.prototype.enqueue = function (element) {
    this.items.push(element)
  }

  Queue.prototype.dequeue = function () {
    this.items.shift()
  }

  Queue.prototype.front = function () {
    return this.items[0]
  }

  Queue.prototype.isEmpty = function () {
    return this.items.length === 0
  }

  Queue.prototype.size = function () {
    return this.items.length
  }

  Queue.prototype.toString = function () {
    let resStr = ''
    for (let i of this.items) {
      resStr += i + ' '
    }
    return resStr
  }
}