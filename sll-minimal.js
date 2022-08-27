class SinglyLinkedList {
  head = null;
  tail = null;
  length = 0;

  isEmpty() {
    return this.length === 0;
  }

  appendHead(data) {
    if (this.isEmpty()) this.head = this.tail = new SinglyLinkedList.Node(data);
    else this.head = new SinglyLinkedList.Node(data, this.head);
    this.length++;
  }

  appendTail(data) {
    if (this.isEmpty()) this.head = this.tail = new SinglyLinkedList.Node(data);
    else {
      this.tail.next = new SinglyLinkedList.Node(data);
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
    return data;
  }

  popTail() {
    if (this.isEmpty()) throw new Error("Cannot popTail, list is empty.");
    const data = this.tail.data;
    if (this.length === 1) this.head = this.tail = null;
    else {
      let pointer = this.head;
      while (pointer.next !== this.tail) pointer = pointer.next;
      this.tail = pointer;
      this.tail.next = null;
    }
    this.length--;
    return data;
  }

  removeNode(node) {
    if (node.prev === null) return this.popHead();
    if (node.next === null) return this.popTail();

    let pointer = this.head;
    while (pointer.next !== node) pointer = pointer.next;
    pointer.next = pointer.next.next;
    this.length--;

    return node.data;
  }
}

SinglyLinkedList.Node = function (data, next = null) {
  this.data = data;
  this.next = next;
};
