# 面向对象程序设计: 基于 C++

!!! abstract
	本文是基于 C++ 的面向对象程序设计的笔记, 每当需要用到 `C++` 的时候我都会补充内容. 参考内容为 *C++ Primer 5th* 第 7 章, 第 14 章有关类的部分, *C++ reference* 网站, 以及一些 github 上的项目实例. 参考标准为 *C++17*, 但特性基本取自 *C++11*. 题目大部分是博主自编的, 未说明部分请自行使用 AI 检查答案.

## Chap ZERO C++ 内存管理机制
---

### 0. 1 C++ 的内存分区
为了方便叙述, 我们简要介绍C++中几个主要的内存区域:

| 区域       | 生命周期    | 典型实例                      |
| -------- | ------- | ------------------------- |
| 栈(Stack) | 作用域自动释放 | 局部变量, 函数参数                |
| 堆(Heap)  | 手动申请释放  | 传统方式为 `new` 与 `delete` 申请 |
| 全局区      | 程序整个周期  | 全局变量, 静态变量                |

!!! note
	**作用域**: 指变量或函数在程序中允许被访问(准确的讲, 考虑到私有属性等, 应该是"存在")的区域. 例如, 对于下面这段程序, 我们定义的变量 `a` 在全局可以访问, `a` 的作用域就是整个程序.
	
	```cpp
	#include <iostream>
	using namespace std;
	
	int a = 0;
	
	int main() {
		cout << a << endl;
	}
	```

### 0. 2 堆上单变量型内存分配
堆上的内存分配需要程序员手动控制. 在传统的 C++编程中, 我们一般使用 `new` 和 `delete` 进行内存分配. 例如

```cpp
#include <iostream>
using namespace std;

int main() {
	int *ptr = new int(42); // 分配一个 int 类型内存区段在堆中, 存储的数据为 42, 让位于栈上的整型指针 ptr 指向这个内存区段的第一位
	cout << *ptr << endl;
	delete ptr; // 销毁指针指向的内存区段.
	return 0;
}
```

虽然我们分配的内存在堆上, 但是指向这段内存的指针仍然位于栈上. 栈上的内存是由作用域自动释放的, 我们无法手动控制. 也就是说, 我们 `delete` 时销毁的实际上只销毁了 `ptr` 指向的内存, 而 `ptr` 指针仍然存在.

这也是传统 C++ 动态内存分配最令人头疼的地方之一. 如果按照示例的方式准确写好内存分配, 在我们做大型项目的时候很可能会出现"垂悬指针"或者说"野指针"的问题, 也就是指针指向的内存区段已被回收而指针仍然存在且指向这一区段. 更为严重的是, 编译器无法在编译阶段发现这一问题. 因此, 我们应当养成习惯, 在销毁内存后让指针回到 `nullptr`.

```cpp
#include <iostream>
using namespace std;

int main() {
	int *ptr = new int(42);
	cout << *ptr << endl;
	delete ptr;
	ptr = nullptr; // 指针失效后一定要 nullptr
	return 0;
}
```

总结一下, 我们写 C++ 程序用到堆时的必要语句

| 关键字与语句          | 结果/后果                                                                                  |
| --------------- | -------------------------------------------------------------------------------------- |
| `new`           | 新开一个堆区段.                                                                               |
| `delete`        | 删除一个堆区段. 堆上分配的内存无法自动销毁, 不用的内存大量堆积会导致内存泄漏                                               |
| `ptr = nullptr` | 将指针置空. 大型程序中如果不置空, 可能在后面误用导致野指针问题. 问题常常难以发现. 大部分时候程序本身可以正常工作, 但是一定会造成严重的安全隐患(如非法篡改内存). |

### 0. 3 堆上数组型内存分配
上面我们讨论的是单个变量的堆上内存分配. 对于数组对象, 我们应当使用 `new` 进行创建, `delete[]` 进行销毁

```cpp
#include <iostream>
using namespace std;

int main() {
	cin >> n;
	int *ptr = new int[n];
	delete[] ptr;
	ptr = nullptr;
	return 0;
}
```

如果我们用 `delete`, 那么只有被 `ptr` 指向的内存区段的第一项被删除.

!!! question
	**何时使用 `delete`, 何时使用 `delete[]` ?** 答: `new ...` 初始化时使用 `delete`, `new ...[]` 初始化时使用 `delete[]`.
	
	**不是只要是数组都必须 `delete[]`**. 例如
	
	```cpp
	class arrayD {
	 public:
		int arr[10]; 
	};
	
	int main() {
		arrayD *ptr = new arrayD();
		return 0;
	}
	```
	
	换言之, `delete` 还是 `delete[]` 只取决于初始化或者说 `new` 的方式. 如果我们 `new` 的是一个对象, 那么删除的时候自然只需要删掉这一个对象. 如果我们用的是 `new ...[]`, 也就是一个对象的数组, 那么我们就要调用 `delete[]`.

### 0.4 Practice

!!! warning
	题目中出现的动态数组并不推荐大家在生产实际中使用. 建议使用 `vector`. 此处使用手动分配堆仅仅是为了让大家熟悉 `new` 和 `delete` 的用法

- 使用 `new` 申请一个 `int`, 然后赋值为 `123`, 输出地址和值, 释放内存.
- 不使用 `vector`, 读入一个正整数 `N` (保证 $N<10$), 而后输入 `N` 个数, 输出所有数的和, 并正确释放内存.
- 不使用 `vector`, 读入行数 `R` 与列数 `L`, 创建一个矩阵, 读入 $L\times R$ 个数, 而后计算矩阵内所有数的和, 并正确释放内存.

!!! tip
	**最后一题相关提示**: C++ 中并不支持 `new [][]` 这种写法. 下面展示一种常见解决方案
	
	```cpp
	#include <iostream>
	using namespace std;
	
	int main() {
		int R = 0, L = 0;
		cin >> R >> L;
		int **ptr = new int *[R];
		int *ptrD = new int [R * L];
		for (int i = 0; i < R; i ++) {
			ptr[i] = ptrD + i * L;
		}
		
		delete[] ptrD;
		delete[] ptr;
		
		return 0;
	}
	```
	
	碎碎念一下, 不过相信大家不可能出现下面的错误.
	
	一开始我对这个程序其实抱有疑惑. **我们 `delete[] ptr` 的时候有没有删掉 `ptrD`?** 如果删掉了, 那么和前面的 `delete` 删不掉栈上面分配的内存这一说法就产生了矛盾. 我真是糊涂了, 实际上, 确实**没有删掉**. 我们从内存角度看, 从始至终栈上面只有两个指针变量, 一个叫 `ptr`, 另一个叫 `ptrD`. 而堆上有两段新开的内存区段, 一个是 `ptr` 指向的 `A` 区段, 另一个是 `ptrD` 指向的 `B` 区段, 其中 `A` 中存储的是指向 `B` 中某些单变量的指针. 我们 `delete` 掉的始终都是这些存储在堆中的东西, 不论是值还是指针.

### 0. 5 智能指针引入

传统的 `new` 和 `delete` 是否完美无缺呢? 答案自然是否定的. 

首先是多个 `new` 和 `delete` 使用的时候程序可读性会变得相当糟糕. 如果只是一个人进行程序编写尚可接受, 但是在现代多协作的代码工程中我们必须要和团队配合. 或许我们有自信自己不会忘记, 但是我们的团队成员呢?

除此之外, 在遇到错误的时候 C++ 会触发栈展开, 直接跳过域内代码导致后面所有的 `delete` 都得不到执行. 除非程序直接崩溃由操作系统回收内存资源, 否则会造成严重的内存泄漏隐患.

!!! note
	**栈展开**: C++ 中的异常处理机制, 当程序遇到异常抛出后, 程序会递归式从当前所在函数中的对象开始调用析构函数, 逐层退出函数, 直到找到恰当的异常处理代码为止.
	
	这一异常处理过程中 C++ 没有动堆上的内存, 也就是没有 `delete` 的过程.

Bjarne Stroustrup 早在上世纪 80 年代初期就提出了 RAII 原则. 所谓的 RAII 原则, 就是指 Resource Acquisition Is Initialization, "资源获取即初始化". 让资源的生命周期绑定在对象上, 通过对象构造时获取资源, 析构时释放资源. 这一设计原则相当符合直觉, 实际上实现了如同控制栈上对象那样控制堆上对象.

为了尽可能避免传统堆内存管理中遇到的问题, 现代 C++ 遵循 RAII 设计了智能指针 `unique_ptr` 和 `shared_ptr`. 智能指针的特点是引入了"生命周期", 也就是"引用计数". 每当我们在堆上新开一个内存区段时, 就自动新建一个引用计数器, 记录指向这一内存区段的指针数. 当计数归零时, 这段内存将通过析构函数回收.

!!! warning
	这里必须强调(前面提出的"实际上实现了如同控制栈上对象那样控制堆上对象"可能会产生误解), 即使是智能指针, 栈上的内存处理机制和堆上的仍然不同. 栈上内存由编译器在编译期间"插入"析构函数回收栈空间完成, 而堆上内存依赖运行时引用计数机制.

但是, 智能指针是完美的吗? 答案是否定的. 其中最典型的例子就是**循环引用**问题. 例如下面这段程序

```cpp
#include <memory>

using namespace std;

class B;

class A {
   public:
    shared_ptr<B> ptr;
};

class B {
   public:
    shared_ptr<A> ptr;
};

int main(void) {
    auto a = make_shared<A>();
    auto b = make_shared<B>();
    a->ptr = b;
    b->ptr = a;

    return 0;
}
```

当对象 A 引用了对象 B, 而对象 B 又反过来引用了对象 A. 就形成了一个循环引用. 在使用基于引用计数的垃圾回收机制时, A 和 B 虽然都已不再被程序的其他部分使用, 但由于互相之间仍持有引用, 它们的引用计数始终不为 0, 因此无法被回收, 最终可能导致内存泄漏. 这一严重问题依靠 `weak_ptr` 这一不会增加引用计数的智能指针类型得以解决.

实际上, 智能指针作为一种本质上手动管理内存的机制, 相比于 Java 等现代高级语言的垃圾回收机制仍然存在诸多问题. 但相较于传统的 `new` 和 `delete`, 现代 C++ 通过明确对象与资源的关系很大程度上减少了内存风险. 并且因为与对象紧密结合, 可以很好地融入到面向对象编程之中. 在实际开发时, 仍然推荐使用智能指针.

智能指针分为三类, 分别为

| 类型         | 特点                                    | 实例                                                                  |
| ---------- | ------------------------------------- | ------------------------------------------------------------------- |
| unique_ptr | 引用计数只允许为 0 或者 1. 也就是某一个内存区段只允许被一个指针指向 | `unique_ptr<int> num = make_unique<int>(20);`                       |
| shared_ptr | 允许同一个内存区段被多次引用, 引用计数可以为任何非负整数.        | `shared_ptr<int> num = make_shared<int>(20);`                       |
| weak_ptr   | 不会增加引用计数. 常常用于解决循环引用问题.               | (不允许被直接 `make`, 因为仅依赖于已存在的 `shared` 指针) `weak_ptr<int> num2 = num;` |


## Chap I 类基本操作
---

### 1. 1 定义一个类

!!! note
	C++ 中使用 `this` 指针指向对象自身, 因此 `this` 指向的变量就是该对象自己包含的变量.

C++ 中最简单的类如下

```cpp
class liuQ {
   public:
    void print();

   private:
    string ss = "Liu Qing";
};

void liuQ::print() { cout << "Hello, " << this->ss << endl; }
```

其中 `class` (在 C++ 中)基本等价于 `struct`, 唯一的区别仅在于 `class` 默认成员私有, 而 `struct` 默认成员公有. 在上面的写法中, 因为 `public` 和 `private` 显示声明, 因此使用 `class` 和 `struct` 没有任何区别.

很自然地想到, 如何给 `liuQ` 中的 `ss` 赋值? 我们首先考虑最简单的一种, 创建对象后使用共有成员函数对其赋值.

```cpp hl_lines="4 12"
class liuQ {
   public:
    void print();
    void init(string _ss);

   private:
    string ss = "Liu Qing";
};

void liuQ::print() { cout << "Hello, " << this->ss << endl; }

void liuQ::init(string _ss) { this->ss = _ss };
```

显然, 上面这种构造方式不够灵活,不能实现在定义的同时初始化值. 因此我们引入**构造函数**来解决这一问题.

构造函数的基本写法如下, 要求名称必须与类名相同, 可以重载多个函数, 特点是无返回值(连 `void` 都不要写).

```cpp hl_lines="3 15"
class liuQ {
   public:
    liuQ(string _ss);
    void print();
    void init(string _ss);

   private:
    string ss = "Liu Qing";
};

void liuQ::print() { cout << "Hello, " << this->ss << endl; }

void liuQ::init(string _ss) { this->ss = _ss; }

liuQ::liuQ(string _ss) { this->ss = _ss; }
```

上面这种写法仍然不够高效. 因为这一过程实际上仍然是**首先使用默认构造函数创建一个对象, 再将对象进行赋值**. 实际上, 我们有一种更加高效的方式, 在构造的同时就完成了赋值. 这就是**初始化列表**.

```cpp hl_lines="16"
// 改进了 liuQ(string _ss) 这一构造函数
class liuQ {
   public:
    liuQ(string _ss);
    void print();
    void init(string _ss);

   private:
    string ss = "Liu Qing";
};

void liuQ::print() { cout << "Hello, " << this->ss << endl; }

void liuQ::init(string _ss) { this->ss = _ss; }

liuQ::liuQ(string _ss) : ss(_ss) {}
```

当然, 除了构造函数, C++ 中还有**析构函数**, 也就是销毁这个对象调用的函数.

例如, 前面的程序可以进一步完善

```cpp hl_lines="4 18"
class liuQ {
   public:
    liuQ(string _ss);
    ~liuQ();
    void print();
    void init(string _ss);

   private:
    string ss = "Liu Qing";
};

void liuQ::print() { cout << "Hello, " << this->ss << endl; }

void liuQ::init(string _ss) { this->ss = _ss; }

liuQ::liuQ(string _ss) : ss(_ss) {}

liuQ::~liuQ() {}
```

注意, 析构函数格式一定为类名前加"~"(非运算), 并且不允许传入参数, 同样没有返回值, 不能重载.

在现代 C++ 编程中, 实际上非常不建议自己写析构函数, 因为这很可能覆盖编译器默认的析构函数, 导致很多析构方面的优化无法正常完成. 尤其是上面例子所属的一类, 因为只用到了会自动正确资源管理的成员(比如上面仅仅用到了 `string`), 而我们实际上"什么都没做"(注意栈上开辟的 `string` 是由作用域回收的, 不依赖我们手动完成), 因此完全没必要再额外定义析构函数.

另外, 我在本节中举出的类的定义方式都是"类内声明类外定义", 但实际上 C++ 允许在类内成员函数声明时定义实现. 但是如果在类内定义, 那么编译器会默认函数内联. 因此, 非常复杂的函数不能在类内定义, 而简单的, 尤其是构造函数和析构函数, 我们通常直接写在类内. 不过具体的写法仍然需要看所在团队的规范.

## Chap II 容器
---

### 2. 1 迭代器

!!! note
	此处为自定义迭代器类. 还有另一种更简单的**转发**类型迭代器, 即利用已有的迭代器作为新容器的迭代器.

