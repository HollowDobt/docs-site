# Project 1 Data Structures

## 仓库地址

---

- 模板 <https://github.com/Berkeley-CS61B/skeleton-sp21/tree/master/proj0>
- 实现 <https://github.com/HollowDobt/cs-courses/tree/main/cs61b/proj0>

## 目标

---

原文: <https://sp21.datastructur.es/materials/proj/proj1/proj1>

- `public void addFirst(T item)`: Adds an item of type `T` to the front of the deque. You can assume that `item` is never `null`.
- `public void addLast(T item)`: Adds an item of type `T` to the back of the deque. You can assume that `item` is never `null`.
- `public boolean isEmpty()`: Returns `true` if deque is empty, `false` otherwise.
- `public int size()`: Returns the number of items in the deque.
- `public void printDeque()`: Prints the items in the deque from first to last, separated by a space. Once all the items have been printed, print out a new line.
- `public T removeFirst()`: Removes and returns the item at the front of the deque. If no such item exists, returns `null`.
- `public T removeLast()`: Removes and returns the item at the back of the deque. If no such item exists, returns `null`.
- `public T get(int index)`: Gets the item at the given index, where 0 is the front, 1 is the next item, and so forth. If no such item exists, returns `null`. Must not alter the deque!

In addition, we also want our two Deques to implement these two special methods:

- `public Iterator<T> iterator()`: The Deque objects we’ll make are iterable (i.e. `Iterable<T>`) so we must provide this method to return an iterator.
- `public boolean equals(Object o)`: Returns whether or not the parameter `o` is equal to the Deque. `o` is considered equal if it is a Deque and if it contains the same contents (as goverened by the generic `T`’s `equals` method) in the same order. (ADDED 2/12: You’ll need to use the `instance of` keywords for this. Read [here](https://www.javatpoint.com/downcasting-with-instanceof-operator) for more information)

## Array Deque

---

!!! note
	因为文档查看顺序的原因, 我先完成了数组版本的双端队列. 但是从实际实现难度看, 建议先做链表版本.

实验文档中有提示: 

>You will need to somehow keep track of what array indices hold the Deque’s front and back elements. We _strongly recommend_ that you treat your array as circular for this exercise. In other words, if your front item is at position zero, and you `addFirst`, the new front should loop back around to the end of the array (so the new front item in the deque will be the last item in the underlying array). 

具体而言, 我的思路来自于 `Python` 列表对于索引为负数的处理模式. 因此, 我们必须要维护三个内部私有变量(其中 `begin` 与 `end` 是核心的元数据):

- `array`: 内部数组, 队列元素实际存储的位置. 根据实验文档要求, 初始容量(`length`)为 8.
- `begin`: 指向对数组队列来说首个元素的前一个元素(注意不是内部数组 `array` 的). 初始值为 -1.
- `end`: 指向对数组队列来说最后一个元素的后一个元素(注意不是内部数组 `array` 的). 初始值为 0.

据此可以确定队列大小(`size`)的计算方式: `end - begin - 1`, 得到两个函数:

```java
/**  
 * 构造: 初始时大小为 8, 首位上一位为 -1, 末位下一位为 0  
 */
public ArrayDeque() {  
    array = (T[]) new Object[8];  
    begin = -1;  
    end = 0;  
}

/**  
 * @return 当前已占用数组的大小  
 */  
private int size() {  
    return end - begin - 1;  
}
```

接下来, 首先实现类似于 `Python` 模式的将负数向实际指向位置的函数 `int toOffset(int index)`:

```java
private int toOffset(int index) {
	if (index >= 0) {
		return index;
	} else {
		return array.length + index;
	}
}
```

!!! warning
	这里不是对 `Python` 列表的访问模式的完整复现. 有关其实际运行方式, 请自行在 `Python` 环境中测试.

接下来考虑在首位/末位添加元素的方法 `addFirst(T item)` & `addLast(T item)`:

```java

/**  
 * 如果超过了可以存储的大小, 首先扩容为原来的两倍; 
 * 否则直接在 begin/end 指向的地方插入元素  
 */

public void addFirst(T item) {  
    if (size() >= array.length) {  
        resetCapacity(array.length * 2);  
    }  
    array[toOffset(begin)] = item;  
    --begin;  
}  
  
public void addLast(T item) {  
    if (size() >= array.length) {  
        resetCapacity(array.length * 2);  
    }  
    array[toOffset(end)] = item;  
    ++end;  
}
```

这里涉及到了一个关键的方法: `resetCapacity(int capacity)`. 这个函数本质是做了两件事: 创造一个全新的用于替代旧数组队列的 `Array Deque` 实例, 然后将旧的数组队列的元素完整复制到这个新队列里面. 对于前者, 这意味着需要拟定新的 `array`, `begin`, `end`; 对于后者, 我们需要用 `for` 循环复制所有的旧元素. 我有两个方案, 大家可以先思考两个方案是不是都是正确的.

```java
// METHOD 1
private void resetCapacity(int capacity) {  
    T[] newArray = (T[]) new Object[capacity];  
    int j = 0;  
    for (int i = begin + 1; i < end; ++i) {  
        newArray[j] = array[toOffset(i)];  
        array[toOffset(i)] = null;  
        ++j;  
    }  
    array = newArray;  
    end = size();  
    begin = -1;  
}

// METHOD 2
private void resetCapacity(int capacity) {  
    T[] newArray = (T[]) new Object[capacity];  
    for (int i = 0; i < end; i++) {  
        newArray[i] = array[i];  
        array[i] = null;  
    }  
    for (int i = begin; i < 0; i++) {  
        newArray[capacity + i] = array[offset(i)];  
        array[offset(i)] = null;  
    }  
    array = newItems;  
}
```

在只涉及我们提到的前面这几个函数时, 两种方案都能正常工作. 但是, 一旦涉及到 `remove` 操作时, 第二种方法就失效了. 第二种方法是博主一开始想到的方法, 后面测试时反应过来发现了这个问题. 因为第二种方法假定了 `begin` 一定小于 0, `end` 一定大于 0, 因此在移除到 `begin` 大于 0 或者 `end` 小于 0 的情况就会出现问题.

