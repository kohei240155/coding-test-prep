class Node {
  constructor(key) {
    this.key = key;
    this.prev = null;
    this.next = null;
  }
}

var MyLinkedList = function () {
  this.nil = new Node(0);
  this.nil.prev = this.nil;
  this.nil.next = this.nil;
};

/** 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {

  let cur = this.nil.next;

  for (let i = 0; cur !== this.nil; i++) {
    if (i === index) {
      return cur.key;
    }
    cur = cur.next;
  }

  return -1;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  const x = new Node(val);
  this.nil.next.prev = x;
  x.next = this.nil.next;
  this.nil.next = x;
  x.prev = this.nil;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  const x = new Node(val);
  x.prev = this.nil.prev;
  x.next = this.nil;
  this.nil.prev.next = x;
  this.nil.prev = x;
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {

  let cur = this.nil.next;
  let i = 0;

  while (cur !== this.nil && i < index) {
    cur = cur.next;
    i++;
  }

  if (index === i) {
    const x = new Node(val);
    x.prev = cur.prev;
    x.next = cur;
    cur.prev.next = x;
    cur.prev = x;
  }
};

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  let cur = this.nil.next;

  for (let i = 0; cur !== this.nil; i++) {
    if (i === index) {
      cur.prev.next = cur.next;
      cur.next.prev = cur.prev;
      return;
    }
    cur = cur.next;
  }
};

/** 
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */