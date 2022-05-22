class TreeNode {
  constructor (val) {
    this.val = val
    this.left = this.right = null
  } 
}

class BSTree {
  constructor (data) {
    let root = new TreeNode(data.shift())
    // 遍历所有的数据，逐渐插入到这颗搜索树中去
    data.forEach(item => {
      this.insert(root, item)
    })
    return root
  }
  insert (node, data) {
    if (node.val < data) {
      if (!node.right) {
        node.right = new TreeNode(data)
      } else {
        this.insert(node.right, data)
      }
    } else {
      if (!node.left) {
        node.left = new TreeNode(data)
      } else {
        this.insert(node.left, data)
      }
    }
  }
  static walk (root) {
    if (!root.left && !root.right) {
      return true
    } else if (root.left && root.val < root.left.val ||
      root.right && root.val > root.right.val) {
      return false
    } else {
      return TreeNode.walk(root.left) && TreeNode.walk(root.right)
    }
  }
}