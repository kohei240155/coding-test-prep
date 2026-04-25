class Node {
  constructor(key) {
    this.val = key;
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
  let i = 0;

  while (cur !== this.nil) {
    if (i === index) {
      return cur.val;
    }
    cur = cur.next;
    i++;
  }

  return -1;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  const x = new Node(val);
  x.next = this.nil.next;
  x.prev = this.nil;
  this.nil.next.prev = x;
  this.nil.next = x;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  const x = new Node(val);
  x.next = this.nil;
  x.prev = this.nil.prev;
  this.nil.prev.next = x;
  this.nil.prev = x;
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  const x = new Node(val);
  let cur = this.nil.next;
  let i = 0;

  while (this.nil !== cur && i < index) {
    cur = cur.next;
    i++;
  }

  if (i === index) {
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
  let i = 0;

  while (this.nil !== cur && i < index) {
    cur = cur.next;
    i++;
  }

  if (i === index && this.nil !== cur) {
    cur.prev.next = cur.next;
    cur.next.prev = cur.prev;
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