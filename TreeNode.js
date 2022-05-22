function TreeNode (val) {
  this.val = val
  this.left = null
  this.right = null
}

class BiTree {
  constructor (data) {
    let nodeList = []
    let root
    for (let i = 0; i < data.length; i++) {
      let node = new TreeNode(data[i])
      nodeList.push(node)
      if (i > 0) {
        // 计算当前节点属于哪一层
        let n = Math.floor(Math.sqrt(i + 1))
        // 当前层的起始点
        let q = Math.pow(2, n) - 1
        // 上一层的起始点
        let p = Math.pow(2, n - 1) - 1
        // 找到当前节点的父节点
        let parent = nodeList[p + Math.floor((i - q) / 2)]
        if (parent.left) {
          parent.right = node
        } else {
          parent.left = node
        }
      }
    }
    root = nodeList.shift()
    nodeList.length = 0
    return root
  }

  static isSymmetry (root) {
    if (!root) return true
    let walk = (left, right) => {
      if (!left && !right) return true
      if ((left&&!right) || (!left&&right) || (left.val!==right.val)) return false
      return walk(left.left, right.right) && walk(left.right, right.left)
    }
    return walk(root.left, root.right)
  }
}

export default BiTree

export {
  TreeNode
}