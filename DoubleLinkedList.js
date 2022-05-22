function DoubleLinkedList () {
  function Node (data) {
    this.data = data
    this.pre = null
    this.next = null
  }

  this.head = null
  this.tail = null
  this.length = 0

  DoubleLinkedList.prototype.append = function (data) {
    let newNode = new Node(data)
    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.pre = this.tail
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length += 1
  }

  DoubleLinkedList.prototype.toString = function () {
    return this.backwardString()
  }
  
  // 从后向前遍历
  DoubleLinkedList.prototype.forwardString = function () {
    let current = this.tail
    let resStr = ''
    while (current) {
      resStr += current.data + '**'
      current = current.pre
    }
    return resStr
  }

  // 从前向后遍历
  DoubleLinkedList.prototype.backwardString = function () {
    let current = this.head
    let resStr = ''
    while(current) {
      resStr += current.data + '--'
      current = current.next
    }
    return resStr
  }

  DoubleLinkedList.prototype.insert = function (position, data) {
    if (position < 0 || position > this.length) return false
    let newNode = new Node(data)
    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      if (position === 0) {
        this.head.pre = newNode
        newNode.next = this.head
        this.head = newNode
      } else if (position === this.length) {
        this.tail.next = newNode
        newNode.pre = this.tail
        this.tail = newNode
      } else {
        let currentNode = this.head
        let index = 0
        while (index++ < position) {
          currentNode = currentNode.next
        }
        newNode.next = currentNode
        newNode.pre = currentNode.pre
        currentNode.pre.next = newNode
        currentNode.pre = newNode
      }
    }
    this.length += 1
    return true
  }

  DoubleLinkedList.prototype.get = function (position) {
    if (position < 0 || position > this.length) return null
    let current = null
    let index = 0
    if ((this.length / 2) > position) {
      current = this.head
      while (index++ < position) {
        current = current.next
      }
      return current.data
    } else {
      current = this.tail
      index = this.length - 1
      while (index-- > position) {
        current = current.pre
      }
      return current.data
    }
  }

  DoubleLinkedList.prototype.indexOf = function (data) {
    let current = this.head
    let index = 0
    while (current) {
      if (current.data === data) {
        return index
      }
      current = current.next
      index++
    }
    return -1
  }

  DoubleLinkedList.prototype.update = function (position, newData) {
    if (position < 0 || position >= this.length) return false
    let index = 0
    let current = this.head
    if (this.length / 2 > position) {
      while (index++ < position) {
        current = current.next
      }
    } else {
      current = this.tail
      index = this.length - 1
      while (index-- > position) {
        current = current.pre
      }
    }
    current.data = newData
    return true
  }

  DoubleLinkedList.prototype.removeAt = function (position) {
    if (position < 0 || position >= this.length) return null
    let current = this.head
    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      if (position === 0) {
        this.head.next.pre = null
        this.head = this.head.next
      } else if (position === this.length - 1) {
        this.tail.pre.next = null
        this.tail = this.tail.pre
      } else {
        let index = 0
        while (index++ < position) {
          current = current.next
        }
        current.pre.next = current.next
        current.next.pre = current.pre
      }
    }
    this.length -= 1
    return current.data
  }

  DoubleLinkedList.prototype.remove = function (data) {
    let index = this.indexOf(data)
    return this.removeAt(index)
  }

  DoubleLinkedList.prototype.isEmpty = function () {
    return this.length === 0
  }

  DoubleLinkedList.prototype.size = function () {
    return this.length
  }
}