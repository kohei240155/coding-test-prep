class Node {
  constructor(key) {
    this.key = key;
    this.prev = null;
    this.next = null;
  }
}

const nil = new Node(0);
nil.next = nil;
nil.prev = nil;

function insert(key) {
  const x = new Node(key);
  x.next = nil.next;
  nil.next.prev = x;
  nil.next = x;
  x.prev = nil;
}

function deleteNode(t) {
  if (t === nil) return;
  t.prev.next = t.next;
  t.next.prev = t.prev;
}

function deleteFirst() {
  deleteNode(nil.next);
}

function deleteLast() {
  deleteNode(nil.prev);
}

function listSearch(key) {
  let cur = nil.next;
  while (cur !== nil && cur.key !== key) {
    cur = cur.next;
  }
  return cur;
}

function deleteKey(key) {
  deleteNode(listSearch(key));
}