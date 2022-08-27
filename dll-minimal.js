class DoublyLinkedList {
  head = null;
  tail = null;
  length = 0;

  isEmpty() {
    return this.length === 0;
  }

  appendHead(data) {
    if (this.isEmpty()) this.head = this.tail = new DoublyLinkedList.Node(data);
    else {
      this.head.prev = new DoublyLinkedList.Node(data, null, this.head);
      this.head = this.head.prev;
    }
    this.length++;
  }

  appendTail(data) {
    if (this.isEmpty()) this.head = this.tail = new DoublyLinkedList.Node(data);
    else {
      this.tail.next = new DoublyLinkedList.Node(data, this.tail, null);
      this.tail = this.tail.next;
    }
    this.length++;
  }

  popHead() {
    if (this.isEmpty()) throw new Error("Cannot popHead(), list is empty.");
    const data = this.head.data;
    this.head = this.head.next;
    this.length--;
    if (this.isEmpty()) this.tail = null;
    else this.head.prev = null;
    return data;
  }

  popTail() {
    if (this.isEmpty()) throw new Error("Cannot popTail, list is empty.");
    const data = this.tail.data;
    this.tail = this.tail.prev;
    this.length--;
    if (this.isEmpty()) this.head = null;
    else this.tail.next = null;
    return data;
  }

  removeNode(node) {
    if (node.prev === null) return this.popHead();
    if (node.next === null) return this.popTail();

    node.next.prev = node.prev;
    node.prev.next = node.next;
    this.length--;

    return node.data;
  }
}

DoublyLinkedList.Node = function (data, prev = null, next = null) {
  this.data = data;
  this.prev = prev;
  this.next = next;
};
