# LEC 3: Testing and TDD

## 测试驱动的开发思想(Test-Driven Development)

---

这是博主第一次系统性地学习测试, 单元测试, 集成测试的概念, 写法, 以及用处, 因此额外记录一下. 

测试代码带来的好处是显而易见的, 可以很大程度上保证程序的正常运行, 并且不断对程序进行优化.

这一理念还形成了一种哲学, 即 Test-Driven Development, 简称 TDD. 用维基百科上的话说, 其工作流程就是: 先戴上实现功能的帽子, 在测试的辅助下, 快速实现其功能; 再戴上重构的帽子, 在测试的保护下, 通过去除冗余的代码, 提高代码品质. 测试驱动着整个开发过程: 首先, 驱动代码的设计和功能的实现; 其后, 驱动代码的再设计和重构.[^1]

在实际场景中, 最为常见的是单元测试. 对于那些**不常见, 逻辑不显含于程序本身(例如算法), 被众多其他函数依赖的底层函数**, 可以用单元测试来保证大部分场景下的正常工作. 与之相对的是, 如果函数的功能与逻辑显而易见, 写单元测试确实是浪费时间的.[^2]

## 几类编程语言的测试代码写法

### Java

`Java` 最常用的单元测试库是 [junit](https://junit.org/), 课程中使用的是较老的 junit4, 在博主上课的时候更常见的已经是(指 AI 默认给出的代码) junit5 版本了.

参考示例代码

```java
/* File: AddNumber.java */
public class AddNumber {  
    public static int add(int a, int b) {  
        return a + b;  
    }  
}
```

```java
/* File: TestAddNumber.java */
import org.junit.jupiter.api.Test;  
import static org.junit.jupiter.api.Assertions.assertSame;  
  
public class TestAddNumber {  
    @Test  
    public void testAddNumber1() {  
        int a = 1, b = 2;  
        int expected = 3;  
        int actual = AddNumber.add(a, b);  
  
        assertSame(expected, actual);  
    }  
  
    @Test  
    public void testAddNumber2() {  
        int a = 3, b = -2;  
        int expected = 1;  
        int actual = AddNumber.add(a, b);  
  
        assertSame(expected, actual);  
    }  
}
```

### Python

`Python` 的简单很多, 使用 `pytest` 即可.

参考示例代码

```python
# File: add.py
def add(a, b):
    return a + b;
```

```python
# File: TESTadd.py
import pytest
from cal import add

def test_add():
    assert add(1, 2) == 3

def test_add1():
    assert add(2, 2) == 4

def test_add4():
    assert add(5, 2) == 7
```

### C++

相比前两种语言, 因为历史包袱这一众所周知的原因, `C++` 的单元测试库使用起来会麻烦许多. `C++` 中最常用的单元测试库是 `Google` 编写的 `gtest`, 下面是参考调用方式. 

项目结构如下所示

```tree
.
├── CMakeLists.txt
├── include
│   └── math
│       └── add.h
├── tests
│   └── test_add.cpp
├── build
└── src
    └── add.cpp
```

#### `include/math/add.h`

```cpp
#pragma once

int add(int a, int b);
```

#### `src/add.cpp`

```cpp
#include "math/add.h"

int add(int a, int b) {
    return a + b;
}
```

#### `tests/test_add.cpp`

```cpp
#include <gtest/gtest.h>
#include "math/add.h"

TEST(Math, AddWorks) {
    EXPECT_EQ(add(1, 2), 3);
    EXPECT_EQ(add(-2, 5), 3);
}

TEST(Math, AddZero) {
    EXPECT_EQ(add(0, 0), 0);
    EXPECT_EQ(add(7, 0), 7);
}
```

#### `CMakeLists.txt`

```cmake
cmake_minimum_required(VERSION 3.16)
project(myproj LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_library(mylib
    src/add.cpp
)
target_include_directories(mylib PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/include)

# ------------------- Testing -------------------
include(CTest)  # defines BUILD_TESTING option
if (BUILD_TESTING)
    include(FetchContent)

    # Windows: avoid CRT mismatch
    set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)

    FetchContent_Declare(
        googletest
        GIT_REPOSITORY https://github.com/google/googletest.git
        GIT_TAG v1.14.0
    )
    FetchContent_MakeAvailable(googletest)

    add_executable(unit_tests
        tests/test_add.cpp
    )
    target_link_libraries(unit_tests PRIVATE mylib GTest::gtest_main)

    include(GoogleTest)
    gtest_discover_tests(unit_tests)
endif()
```

最后在项目根目录下执行即可:

```bash
cmake -S . -B build
cmake --build build -j
ctest --test-dir build --output-on-failure
```

[^1]:
	测试驱动开发 <https://zh.wikipedia.org/zh-cn/%E6%B5%8B%E8%AF%95%E9%A9%B1%E5%8A%A8%E5%BC%80%E5%8F%91>
[^2]:
	A Response to “Why Most Unit Testing is Waste” <https://henrikwarne.com/2014/09/04/a-response-to-why-most-unit-testing-is-waste/>