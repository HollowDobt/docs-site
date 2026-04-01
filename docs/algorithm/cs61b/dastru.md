# Project 1 Data Structures

## 仓库地址

---

- 模板 <https://github.com/Berkeley-CS61B/skeleton-sp21/tree/master/proj0>
- 实现 <https://github.com/HollowDobt/cs-courses/tree/main/cs61b/proj0>

## 目标

---

原文: <https://sp21.datastructur.es/materials/proj/proj1/proj1>

| API (Signature)                   | Functions                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public void addFirst(T item)`    | Adds an item of type `T` to the front of the deque. **You can assume that `item` is never `null`.**                                                                                                                                                                                                                                                                                          |
| `public void addLast(T item)`     | Adds an item of type `T` to the back of the deque. **You can assume that `item` is never `null`.**                                                                                                                                                                                                                                                                                           |
| `public boolean isEmpty()`        | Returns `true` if deque is empty, `false` otherwise.                                                                                                                                                                                                                                                                                                                                         |
| `public int size()`               | Returns the number of items in the deque.                                                                                                                                                                                                                                                                                                                                                    |
| `public void printDeque()`        | Prints the items in the deque from first to last, separated by a space. **Once all the items have been printed, print out a new line.**                                                                                                                                                                                                                                                      |
| `public T removeFirst()`          | Removes and returns the item at the front of the deque. **If no such item exists, returns `null`.**                                                                                                                                                                                                                                                                                          |
| `public T removeLast()`           | Removes and returns the item at the back of the deque. **If no such item exists, returns `null`.**                                                                                                                                                                                                                                                                                           |
| `public T get(int index)`         | Gets the item at the given index, where 0 is the front, 1 is the next item, and so forth. **If no such item exists, returns `null`. Must not alter the deque!**                                                                                                                                                                                                                              |
| `public Iterator<T> iterator()`   | The Deque objects we’ll make are iterable (i.e. `Iterable<T>`) so we must provide this method to return an iterator.                                                                                                                                                                                                                                                                         |
| `public boolean equals(Object o)` | Returns whether or not the parameter `o` is equal to the Deque. `o` is considered equal if it is a Deque and if it contains the same contents (as goverened by the generic `T`’s `equals` method) in the same order. (ADDED 2/12: You’ll need to use the `instance of` keywords for this. Read [here](https://www.javatpoint.com/downcasting-with-instanceof-operator) for more information) |

## 实现之一: 链表队列(LinkedListDeque)

---

我的思路是, 采用循环链表的方式完成. 这一实现方式下实现 `addFirst` 和 `addLast` 以及 `removeFirst` 和 `removeLast` 会方便许多.

因为链表结构本身的特性, 文档对此类型的队列做出了其他更多的要求. 此后在实现每一个方法时, 如果有额外要求将补充说明, 这里不再单独列举.

### 节点类设计

由于 `Java` 的语法特性, 类可以直接访问其定义的内部私有类的成员变量, 因此无需为 `Node` 设计过多的 `API`:

```java
private class Node {  
    T data; // 此项目中 T 都表示泛型类型参数(type parameter)的占位符
    Node next;  
    Node prev;  
  
    public Node(T data) {  
        this.data = data;  
        next = null;  
        prev = null;  
    }  
}
```

###  必要的私有成员变量

下面是必须有的私有成员变量:

```java
private Node sentinel; // 哨兵节点  
private int size;
```

我们采用的是循环链表, 因此 `sentinel` 指向的前一个节点就是 `last` 节点, 后一个节点就是 `first` 节点. 在此情况下, 我们便可以满足文档中对 `last` 和 `first` 操作的要求:

> `add` and `remove` operations (这里指的应该是 `public void addFirst(T item)` 等四个添加和移除的 API) must not involve any looping or recursion. A single such operation must take “constant time”, i.e. execution time should not depend on the size of the deque. This means that you cannot use loops that go over all/most elements of the deque.

同时下面这一对 `size` 获取的要求也得到了满足:

> `size` must take constant time.

### 构造函数

把哨兵节点和大小设置好就行:

```java
public LinkedListDeque() {  
    sentinel = new Node(null);
    sentinel.next = sentinel;  // 循环链表, 初始时刻前一个与后一个都指向自己
	sentinel.prev = sentinel;
	
    size = 0;  
}
```

### 元数据获取函数

主要是针对 `size` 这一元数据的函数. 利用此元数据很容易实现下面两个函数:

```java
/**  
 * * @return Returns `true` if deque is empty, `false` otherwise.  
 */
public boolean isEmpty() {  
    return size == 0;  
}  
  
/**  
 * * @return Returns the number of items in the deque.  
 */
public int size() {  
    return size;  
}
```

### 打印函数

这一函数理论上用迭代器可以很容易实现, 而且这样不同的数据结构面对一个需要迭代的情况时可以用同一个函数. 但是这里我们暂且先不使用迭代器(目前我只知道 `C++` 中的迭代器怎么写, 不清楚 `Java` 中的语法规则)来实现这一方法.

我们先确定函数的终止条件:

- 整个节点中只有哨兵节点的 `data` 为 `null`, 其他的节点的这一值不可能为 `null`, 因此考虑作为终止条件. 但是这一判断方式可行的前提是 `next` 和 `prev` 不能为空指针, 否则会出现对空指针访问 `data` 的报错.
- 我们又考虑到这是循环链表, 因此任何节点的 `next` 和 `prev` 在任何时刻都不可能为 `null`, 因此上面这种思路是可行的. 换言之, 我们确定了这个函数的终止条件: 当节点存储的 `data` 值为 `null` 时停止打印.

然后再思考整个循环过程:

- 可以分为两步, 打印和更新节点. 即: 打印当前节点的值, 然后将当前节点变为当前节点指向的下一个节点. 这样, 每一个链表上的节点都可以被打印.

最后, 考虑初始情况:

- 我们从哨兵节点开始考虑, 发现哨兵节点的下一个节点才是真正的有效节点. 因此需要读取哨兵节点的下一个作为初始节点.

将上述考虑综合, 得到代码:

```java
/**  
 * Prints the items in the deque from first to last, separated by a space. 
 * Once all the items have been printed, print out a new line. 
 */
public void printDeque() {  
    Node current = sentinel.next;  
    while (current.data != null) {  
        System.out.print(current.data + " ");  
        current = current.next;  
    }  
    System.out.println();  
}
```

### Get 方法

文档要求我们实现两个 `get`, 一个使用迭代另一个使用递归. 先说明迭代的版本.

- 这一 `get(int index)` 函数实现的是 `C/C++` 和 `Java` 同一类的偏移量风格读取模式, 与 `Python` 中循环读取的模式不同, 不允许大于等于 `size` 和小于零的访问. 基于此, 我们可以首先根据这一规则限制这一边界条件. 
- 迭代读取的本质是不断访问当前节点的 `next` 节点. 
- 最终的结束条件: 如果一开始将哨兵节点作为初始值, 执行 `index + 1` 次这种 `next` 访问后停止, 停止时的节点对应的值就是我们需要获取的值.

```java
/**  
 * * @param index  
 * @return Gets the item at the given index, where 0 is the front, 1 is the next item, and so forth.  
 * If no such item exists, returns `null`. Must not alter the deque! 
 */
public T get(int index) {  
    if (index < 0 || index >= size) {  
        return null;  
    }  
  
    Node current = sentinel;  
    for (int i = 0; i <= index; ++i) {  
        current = current.next;  
    }  
    return current.data;  
}
```

接下来是递归版本的 `get`, 即文档要求的 `public T getRecursive(int index)`. 考虑的方式类似, 只是将循环变成了一个单独的递归函数. 为了方便边界条件的判断, 我们将额外添加一个辅助函数.

这一辅助函数的功能是不考虑边界情况地进行递归式读取. 其思路是, 读取第 `i` 个节点的 `j` 个偏移量的值就等于读取第 `i + 1` 个节点的 `j - 1` 个偏移量的值. 通过上面迭代方式实现的考虑, 从哨兵节点开始读取总计需要读取 `index + 1` 次, 如果我们设置这一辅助函数的退出机制是 `j = 0`, 那么需要满足在 `i = 0` (即哨兵节点)时 `j = index + 1`. 因此, 该辅助函数可以实现为:

```java
/**  
 * * @param current  
 * @param restOffset  
 * @return 在不考虑边界条件的情况下的对值的递归式读取  
 */  
private T getRecursiveWithoutNull(Node current, int restOffset) {  
    if (restOffset == 0) {  
        return current.data;  
    }  
    return getRecursiveWithoutNull(current.next, restOffset - 1);  
}
```

我们需要的递归读取的函数便可实现为:

```java
/**  
 * * @param index  
 * @return Same as get, but uses recursion.  
 */
public T getRecursive(int index) {  
    if (index < 0 || index >= size) {  
        return null;  
    }  
  
    return getRecursiveWithoutNull(sentinel, index + 1);  
}
```

