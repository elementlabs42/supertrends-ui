class Node<K, V> {
  key: K
  value: V
  left?: Node<K, V>
  right?: Node<K, V>

  constructor(key: K, value: V) {
    this.key = key
    this.value = value
  }
}

export class SortedMap<K, V> {
  private root?: Node<K, V>
  private sizeVal: number

  constructor() {
    this.sizeVal = 0
  }

  set(key: K, value: V) {
    this.root = this._insert(key, value, this.root)
    this.sizeVal++
  }

  _insert(key: K, value: V, node?: Node<K, V>) {
    if (!node) {
      return new Node(key, value)
    }

    if (key < node.key) {
      node.left = this._insert(key, value, node.left)
    } else if (key > node.key) {
      node.right = this._insert(key, value, node.right)
    } else {
      node.value = value // Update existing key
      return node
    }

    return node
  }

  get(key: K) {
    return this._search(key, this.root)
  }

  _search(key: K, node?: Node<K, V>): V | undefined {
    if (!node) {
      return undefined
    }

    if (key < node.key) {
      return this._search(key, node.left)
    } else if (key > node.key) {
      return this._search(key, node.right)
    } else {
      return node.value
    }
  }

  has(key: K) {
    return this.get(key) !== undefined
  }

  delete(key: K) {
    if (this.has(key)) {
      this.root = this._deleteNode(key, this.root)
      this.sizeVal--
    }
  }

  _deleteNode(key: K, node?: Node<K, V>): Node<K, V> | undefined {
    if (!node) {
      return undefined
    }

    if (key < node.key) {
      node.left = this._deleteNode(key, node.left)
    } else if (key > node.key) {
      node.right = this._deleteNode(key, node.right)
    } else {
      // Node with only one child or no child
      if (!node.left) {
        return node.right
      } else if (!node.right) {
        return node.left
      }

      // Node with two children: Get the inorder successor
      // (smallest in the right subtree)
      node.key = this._minValueNode(node.right).key
      node.value = this._minValueNode(node.right).value

      // Delete the inorder successor
      node.right = this._deleteNode(node.key, node.right)
    }
    return node
  }

  _minValueNode(node: Node<K, V>): Node<K, V> {
    let current = node
    while (current.left) {
      current = current.left
    }
    return current
  }

  size() {
    return this.sizeVal
  }

  *keys() {
    yield* this._traverseKeys(this.root)
  }

  *_traverseKeys(node?: Node<K, V>): IterableIterator<K> {
    if (node) {
      yield* this._traverseKeys(node.left)
      yield node.key
      yield* this._traverseKeys(node.right)
    }
  }

  *values() {
    yield* this._traverseValues(this.root)
  }

  *_traverseValues(node?: Node<K, V>): IterableIterator<V> {
    if (node) {
      yield* this._traverseValues(node.left)
      yield node.value
      yield* this._traverseValues(node.right)
    }
  }

  *entries() {
    yield* this._traverseEntries(this.root)
  }

  *_traverseEntries(node?: Node<K, V>): IterableIterator<[K, V]> {
    if (node) {
      yield* this._traverseEntries(node.left)
      yield [node.key, node.value]
      yield* this._traverseEntries(node.right)
    }
  }
}
