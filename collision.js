const Node = (key = 0, next = null) => ({key: key, next: next});

// List with cycle
let cycle_tail = Node(10);
let cycle_head = Node(5, Node(6, Node(7, Node(8, Node(9, cycle_tail)))));
cycle_tail.next = cycle_head;
let list = Node(0, Node(1, Node(2, Node(3, Node(4, cycle_head)))));

// Upper bound of the biggest (and only) cycle
function max_size(node) {
  let slow = node;
  let fast = node;
  for (var i = 0; slow.next && fast.next; i++) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow.key == fast.key) {
      return i;
    }
  }
}

// Is this node in a cycle?
function part_of_cycle(node) {
  const key = node.key;  // the original key
  const len = max_size(node);
  for (var i = 0; node.next && i < len*2; i++) {
    node = node.next;
    if (node.key == key) {
      return true;
    }
  }
  return false;
}

// Find the collision point
function find_cycle_start(head) {
  let node = head;
  while (node.next) {
    node = node.next;
    if (part_of_cycle(node)) {
      return node;
    }
  }
  return null;
}

console.log(find_cycle_start(list).key);
