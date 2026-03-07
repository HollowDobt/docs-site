# Lab 3 Timing Tests & Randomized Comparison Tests

!!! note
	有部分要求没怎么看懂, 不确定自己有没有完全做完, 所以不提供参考代码. 本次实验是 `Project 1` 的补充前置学习, 因此先做 `Lab` 对项目的实现有用.

## `BuggyAList` 错误之处与解决方案

---

问题很显然出在下面这个地方

```java
/** Deletes item from back of the list and  
  * returns deleted item. */public Item removeLast() {  
    if ((size < items.length / 4) && (size > 4)) {  
        resize(size / 4);  
    }  
    Item x = getLast();  
    items[size - 1] = null;  
    size = size - 1;  
    return x;  
}
```

其本意应该是在发现利用到的数组空间不到四分之一时将数组空间缩小为原有的四分之一. 如果按照这里的逻辑, 那么会将数组空间缩小为已存储数据所占用空间的四分之一. 因此, 需要将 `size` 改动为 `items.length`.

## 断点与调试器

---

本实验很重要的另一个任务是学会使用图形化的调试器. `Breakpoints` 断点设置界面中:

![](https://pan.xxbyq.net/f/B6xMF6/%E6%88%AA%E5%B1%8F2026-03-07%2015.01.57.png)

`Any exception` 打开并且没有开启 `Condition` 时(即图示效果), 任何异常都会让所有线程停下来(`Suspend: All`).

一般而言, 我们对于一些不影响程序正常运行的异常是不关心的, 那么就需要启用 `Condition`, 变成条件断点:

![](https://pan.xxbyq.net/f/04g7Hm/%E6%88%AA%E5%B1%8F2026-03-07%2015.05.17.png)

在此情况下, 程序调试模式下运行时只有在遇到数组越界的异常时才会停下来.

另外需要区别几个调试器的按钮:

- `resume`: 继续执行程序直到再次遇到断点
- `step over`: 单步调试, 执行当前这一行程序, 但是遇到函数调用时不进入函数内部, 直接执行
- `step into`: 单步调试, 执行当前这一行程序, 若是函数调用那么进入函数内部.

