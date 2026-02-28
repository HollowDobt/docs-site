# LEC 8: Inheritance & Implements

!!! abstract
	相较于继承和实现, 本节课对我或者说大部分之前已经接触了面向对象编程的人来说, 最重要的东西是 `Java` 中的 `static type` 和 `dynamic type` 之分, 以及重载(`overload`)和重写(`override`)之分.
	
	出于时间考虑, 下面的部分代码直接取自 CS61B sp21 的阅读材料 <https://joshhug.gitbooks.io/hug61b/content/chap4/chap41.html>.

## Implementation Inheritance

---

在 `Java` 的早期是没有这种继承方式的, 只有接口继承. 接口继承封装性好, 简单易用, 但是对一些人来说在遇到重复性作业时的表现实际上还是不够优秀. 基于此, 开发者们使用了实现继承(`Implementation Inheritance`)的方式来解决这一问题.

比如对于顺序表(不论链表还是数组), `print()` 都可以实现为:

```java
default public void print() {
    for (int i = 0; i < size(); ++i) {
        System.out.print(get(i) + " ");
    }
    System.out.println();
}
```

但是想想不难发现, 链表类型的 `get()` 方法效率很差. 所以我们想单独为链表类型实现一个效率更高的 `print()`:

```java
@Override
public void print() {
    for (Node p = sentinel.next; p != null; p = p.next) {
        System.out.print(p.item + " ");
    }
}
```

这样写了之后, 下面这套代码会调用哪个 `print()` 呢?

```java
public class Main {  
    public static void main(String[] args) {  
        List61B<Integer> a = new LList<>();  
  
        a.print();
    }  
}
```

## Overload & Overwrite

---

要解决上面这个问题, 我们必须要知道 `java` 在编译期能做什么.

为了更好地理解, 先说什么是静态类型什么是动态类型. 简单来说, 静态类型就是我们所声明的类型, 而动态类型就是我们实际实现以及运行时表现的类型. 例如下面这个例子:

```java
List61B<Integer> a = new LList<>();
```

其中的 `List61B<Integer>` 就是静态类型, 而 `LList` 就是动态类型.

!!! note
	之所以是 `LList` 而不是 `LList<Integer>`, 是因为 `Java` 特殊的泛型擦除, 运行时 `JVM` 只能看到 `LList`.

简单来说, 编译器能做的只是检查确定我们的程序所调用的签名(即函数名, 形参类型, 形参数量), 并检查其静态类型的合法性. 但是, 编译器不会深究函数本身的实现, 不会在有 `override` 时去思考"这个签名明明对应了两个函数的实现, 我到底应该调用谁". 这个交由运行时确定. 因此, 这里调用的 `print()` 应该是动态类型, 即 `LLits` 中实现的方法.

这是重写(`override`)的情况, 我们接下来讨论更加复杂的情况: 还遇上了重载.

为了方便示例, 我们直接用静态方法, 并且放到 `Main` 类下:

```java
static void print(LList<Integer> ll) {
    System.out.println("It's LinkedList");
}
static void print(List61B<Integer> ll) {
    System.out.println("It's List61B");
}

public static void main(String[] args) {
    LList<Integer> sp = new LList<>();
    List61B<Integer> lp = sp;

    print(sp);
    print(lp);
}
```

这个时候我们再用上面提到的判断方法: 编译期确定函数签名, 那么 `sp` 的 `print` 应该是签名能放进 `LList<Integer>` 的一个, 而 `lp` 的 `print` 应该是签名能放进 `List61B<Integer>` 的一个. 因此, 尽管二者的实际类型(运行时类型)相同, 但是因为静态类型不同, 确定的签名和实际运行结果就不同了.