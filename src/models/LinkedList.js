import Node from "./Node.js"
class LinkedList {
  #head
  count
  constructor() {
    this.#head = null
    this.count = 0
  }

  add(value) {
    let node = new Node(value)
    if (this.#head == null) {
      this.#head = node
    }
    else {
      let current = this.#head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    this.count = this.count + 1
  }

  //Ordenamiento burbuja
  bubbleSort() {
    if (this.#head == null) return

    let swapped
    let current
    do {
      swapped = false
      current = this.#head

      while (current.next != null) {
        if (current.value > current.next.value) {
          let temp = current.value
          current.value = current.next.value
          current.next.value = temp
          swapped = true
        }
        current = current.next
      }
    } while (swapped)
  }

  //Ordenamiento merge
  mergeSort() {
    this.#head = this.#mergeSortRecursive(this.#head)
  }

  #mergeSortRecursive(node) {
    if (!node || !node.next) {
      return node
    }

    const middle = this.#getMiddle(node)
    const secondHalf = middle.next
    middle.next = null

    const left = this.#mergeSortRecursive(node)
    const right = this.#mergeSortRecursive(secondHalf)

    return this.#mergeLists(left, right)
  }

  #getMiddle(node) {
    if (!node) return null

    let slow = node
    let fast = node

    while (fast.next && fast.next.next) {
      slow = slow.next
      fast = fast.next.next
    }

    return slow
  }

  #mergeLists(a, b) {
    if (!a) return b
    if (!b) return a

    let result
    if (a.data <= b.data) {
      result = a
      result.next = this.#mergeLists(a.next, b)
    } else {
      result = b
      result.next = this.#mergeLists(a, b.next)
    }
    return result
  }
  //Ordenamiento Radix
  radixSort() {
    const max = this.#getMax()
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      this.#countSort(exp)
    }
  }

  #getMax() {
    let max = this.#head.value
    let current = this.#head.next

    while (current) {
      if (current.value > max) {
        max = current.value
      }
      current = current.next
    }
    return max
  }

  #countSort(exp) {
    const output = new Array(this.size)
    const count = new Array(10).fill(0)

    let current = this.#head
    while (current) {
      count[Math.floor(current.value / exp) % 10]++
      current = current.next
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1]
    }

    current = this.#head
    while (current) {
      output[count[Math.floor(current.value / exp) % 10] - 1] = current.value
      count[Math.floor(current.value / exp) % 10]--
      current = current.next
    }

    current = this.#head
    for (let i = 0; i < this.size; i++) {
      current.value = output[i]
      current = current.next
    }
  }

  //Buscar nodo
  searchLinkedList(target) {
    let current = this.#head
    while (current) {
      if (current.value === target) {
        return true
      }
      current = current.next
    }
    return false
  }
}

export default LinkedList