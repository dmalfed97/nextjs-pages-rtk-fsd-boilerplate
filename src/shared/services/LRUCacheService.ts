class ListNode<K, V> {
  key: K
  value: V
  next: ListNode<K, V> | null = null
  prev: ListNode<K, V> | null = null

  constructor(key: K, value: V) {
    this.key = key
    this.value = value
  }
}

export class LRUCacheService<K, V> {
  readonly #capacity: number
  #map: Map<K, ListNode<K, V>>
  #head: ListNode<K, V> | null
  #tail: ListNode<K, V> | null

  constructor(capacity: number = 10) {
    this.#capacity = capacity
    this.#map = new Map()
    this.#head = null
    this.#tail = null
  }

  get(key: K): V | undefined {
    const node = this.#map.get(key)
    if (!node) {
      return undefined
    }
    this.#moveToFront(node)
    return node.value
  }

  set(key: K, value: V): void {
    let node = this.#map.get(key)
    if (node) {
      node.value = value
      this.#moveToFront(node)
    } else {
      node = new ListNode<K, V>(key, value)
      this.#map.set(key, node)
      this.#addNode(node)

      if (this.#map.size > this.#capacity) {
        this.#removeLRU()
      }
    }
  }

  #moveToFront(node: ListNode<K, V>): void {
    if (node === this.#head) {
      return
    }
    this.#removeNode(node)
    this.#addNode(node)
  }

  #addNode(node: ListNode<K, V>): void {
    if (!this.#head || !this.#tail) {
      this.#head = this.#tail = node
    } else {
      node.next = this.#head
      this.#head.prev = node
      this.#head = node
    }
  }

  #removeNode(node: ListNode<K, V>): void {
    if (node.prev) {
      node.prev.next = node.next
    } else {
      this.#head = node.next
    }

    if (node.next) {
      node.next.prev = node.prev
    } else {
      this.#tail = node.prev
    }

    node.next = null
    node.prev = null
  }

  #removeLRU(): void {
    if (!this.#tail) {
      return
    }
    const key = this.#tail.key
    this.#removeNode(this.#tail)
    this.#map.delete(key)
  }
}
