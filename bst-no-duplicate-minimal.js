class BinarySearchTree {
  root = null;

  constructor(...data) {
    for (let i = 0; i < data.length; i++) this.insert(data[i]);
  }

  insert(data) {
    this.root = this._insert(data, this.root);
  }

  _insert(data, node) {
    if (node === null) node = new BinarySearchTree.Node(data);
    else if (data < node.data) node.left = this._insert(data, node.left);
    else if (data > node.data) node.right = this._insert(data, node.right);

    return node;
  }

  remove(data) {
    this.root = this._remove(data, this.root);
  }

  _remove(data, node) {
    if (node === null) return null;
    else if (data < node.data) node.left = this._remove(data, node.left);
    else if (data > node.data) node.right = this._remove(data, node.right);
    else {
      // In this block, `data == node.data`.
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      // Find the largest value in LEFT sub-tree and let it replace the value to be deleted.
      let replacementNode = node.left;
      while (replacementNode.right !== null) replacementNode = replacementNode.right;
      node.data = replacementNode.data;

      // Delete that largest value from the left sub-tree.
      node.left = this._remove(replacementNode.data, node.left);
    }

    return node;
  }

  contains(data, node = this.root) {
    if (node === null) return false;
    else if (data == node.data) return true;
    else if (data < node.data) return this.contains(data, node.left);
    else if (data > node.data) return this.contains(data, node.right);
    return false;
  }

  traversePreOrder(node = this.root, callback = console.log) {
    if (node === null) return;

    callback(node.data);
    this.traversePreOrder(node.left);
    this.traversePreOrder(node.right);
  }

  traverseInOrder(node = this.root, callback = console.log) {
    if (node === null) return;

    this.traverseInOrder(node.left);
    callback(node.data);
    this.traverseInOrder(node.right);
  }

  traversePostOrder(node = this.root, callback = console.log) {
    if (node === null) return;

    this.traversePostOrder(node.left);
    this.traversePostOrder(node.right);
    callback(node.data);
  }

  traverseLevelOrder(callback = console.log) {
    if (this.root === null) return;

    let i = 0;
    let queue = [this.root];
    let queueSize = 1;

    while (queueSize > 0) {
      let currentNode = queue[i];
      callback(currentNode.data);
      i++;
      queueSize--;

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
        queueSize++;
      }

      if (currentNode.right !== null) {
        queue.push(currentNode.right);
        queueSize++;
      }
    }
  }
}

BinarySearchTree.Node = function (data, left = null, right = null) {
  this.data = data;
  this.left = left;
  this.right = right;
};
