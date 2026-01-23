
# 类 Unix 系统下 CMake 与使用第三方包的 C++ 环境的搭建

!!! abstract
	博主在使用 `OpenCV` 的 `C++` 版本配置环境时顺便学习了使用 `CMake` 配置的方法, 这里记录一下<s>方便下次直接抄</s>. 因为博主个人最喜欢使用的编辑器是 VSCode, 所以接下来的示例都以 VSCode 上整体配置过程效果为例进行说明.

## 第三方包的下载与从源代码编译

---

对于博主使用的 MacOS, 可以很方便地使用 [Homebrew](https://brew.sh/) 安装一些第三方 `C++` 包. 本次安装的 `OpenCV` 也在此列之中.

如果你没有安装 Homebrew, 直接执行下面的命令安装 Homebrew:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

有了 Homebrew, 直接执行下面的命令即可完成安装:

```bash
brew install opencv
```

这样下载得到的就是 `C++` 版本的 `OpenCV`.

当然, 很多时候我们会遇到第三方包只有源代码而没有对应的二进制包, 或者编译好的第三方包版本过于老旧的问题. 这个时候的解决方法就是从源代码编译安装, 具体内容待博主在树莓派这一 `Linux` 平台上测试过后再续写.

## CMake 简介

---

首先理清一个概念, `CMake` 是生成编译脚本的工具, **本身不具备编译功能**!!! 最终生成的编译脚本如 `Makefile`, `build.ninja` 等都需要对应的构建工具和编译工具链执行. 一个比较直观的功能示意图如下所示

![](https://pan.xxbyq.net/f/O0PIa/5Gv149z.png)

如图所示, `CMake` 的功能只是从 `CMakeLists.txt` 输出 `Makefile` (或者其他编译脚本), 并不直接参与最后的编译过程.

尽管已经有可以直接写的诸如 `Makefile` 等编译脚本, 但是 `CMake` 本身两个很大的优势让更多 `C/C++` 开发者选择 `CMake`. 其一是跨平台性, 一份 `CMake` 脚本就可以生成大部分平台的编译脚本, 避免跨平台时重写脚本的时间开销; 其二是简洁性, 如果你使用过 `Makefile`, 应该知道在写复杂的工程项目时需要写的多复杂, 而 `CMake` 弥补了这一点.

## CMake 基本脚本编写

---

我们称 `CMake` 生成编译脚本的过程为 **配置(Configure)**. 那么, 如何用 `CMake` 完成 `C/C++` 工程的配置呢?

我们以实例说明. 假设我们正在写的是一个名为 `OpenCVProject` 的程序, 那么我们新建一个目录 `OpenCVProject/`. 接下里, 我们在 `OpenCVProject/` 目录下新建一个文件, 名为 `CMakeLists.txt`.

我们写 `CMakeLists.txt` 的流程是, 首先指定使用的 `CMake` 版本:

```cmake hl_lines="1"
cmake_minimum_required(VERSION 3.31) ## CMake 最低版本限制
```

接下来设定项目名称:

```cmake hl_lines="3"
cmake_minimum_required(VERSION 3.31) ## CMake 最低版本限制

project(OpenCVProject) ## 项目名称
```

注意, 可执行文件(编译的二进制文件产物)的名称是由 `add_excutable(<name> ...)` 决定的. 此设置后面将做出额外的说明, 本例中目标文件(即二进制产物)名称恰好与项目名称相同.

然后指定使用的 `C++` 标准, 保证编译链可以看懂对应的 `C++` 代码:

```cmake hl_lines="5"
cmake_minimum_required(VERSION 3.31) ## CMake 最低版本限制

project(OpenCVProject) ## 项目名称

set(CMAKE_CXX_STANDARD 11) ## 设置 C++ 编译标准: C++11
```

当然, 严格限制使用对应版本的 `ISO C++` 标准. 可以添加下面的额外限制:

```cmake hl_lines="6 7"
cmake_minimum_required(VERSION 3.31) ## CMake 最低版本限制

project(OpenCVProject) ## 项目名称

set(CMAKE_CXX_STANDARD 11) ## 设置 C++ 编译标准: C++11
set(CMAKE_CXX_STANDARD_REQUIRED ON) ## 要求编译器必须支持所设定的标准，否则报错
set(CMAKE_CXX_EXTENSIONS OFF) ## 禁止编译器非 ISO 标准的编译功能
```

指定所有被编译的源代码与编译产物的名字. 因为是示例工程, 因此只有放在 `src/` 子目录下的 `main.cpp` 这一个源代码文件:

```cmake hl_lines="9 10"
cmake_minimum_required(VERSION 3.31) ## CMake 最低版本限制

project(OpenCVProject) ## 项目名称

set(CMAKE_CXX_STANDARD 11) ## 设置 C++ 编译标准: C++11
set(CMAKE_CXX_STANDARD_REQUIRED ON) ## 要求编译器必须支持所设定的标准，否则报错
set(CMAKE_CXX_EXTENSIONS OFF) ## 禁止编译器非 ISO 标准的编译功能

## 编译对象(源代码)
add_executable(OpenCVProject src/main.cpp)
```

因为我们在源代码中用到了 `C++` 标准库以外的第三方库 `OpenCV`, 因此需要额外指定包名, 库位置和 `include` 目录. 一般而言, 完成 `OpenCV` 的安装后会自动将编译产物加入到系统路径, 不需要手动查找操作, 因此只需要:

```cmake hl_lines="12 13 14 15"
cmake_minimum_required(VERSION 3.31) ## CMake 最低版本限制

project(OpenCVProject) ## 项目名称

set(CMAKE_CXX_STANDARD 11) ## 设置 C++ 编译标准: C++11
set(CMAKE_CXX_STANDARD_REQUIRED ON) ## 要求编译器必须支持所设定的标准，否则报错
set(CMAKE_CXX_EXTENSIONS OFF) ## 禁止编译器非 ISO 标准的编译功能

## 编译对象(源代码)
add_executable(OpenCVProject src/main.cpp)

## 必要的第三方库: OpenCV
find_package(OpenCV REQUIRED) ## 包名: OpenCV, 通过查找 OpenCVConfig.cmake
target_link_libraries(OpenCVProject PRIVATE ${OpenCV_LIBRARIES}) ## OpenCV 的 CMake 配置中自带的变量名 OpenCV_LIBS
target_include_directories(OpenCVProject PRIVATE ${OpenCV_INCLUDE_DIRS}) ## 类似于上一条
```

!!! note
	如果你也使用 VSCode, 当 `OpenCV` 安装完毕后, 重启 VSCode 才能刷新刷出 `OpenCV` 包. 大部分时候 VSCode 自动执行 `CMake` 报错没有此包而已经安装了对应的包都是此类问题.

这里必须要注意 , 可以直接指定 `find_package` 寻找 `OpenCV` 这个包是因为这个包本来就是这个名字(一般而言是因为安装的 `OpenCV` 等 `C++` 第三方库自带 `CMake` 配置文件 `OpenCVConfig.cmake`(其他的也差不多叫 `XXXConfig.cmake`), `CMake` 会在一系列前缀路径与提示变量中查找(如 `OpenCV_DIR`, `CMAKE_PREFIX_PATH` 等), 找到 `OpenCVConfig.cmake` 后导入其定义到当前的 `CMake` 配置文件中. 后面的 `${OpenCV_LIBRARIES}` 和 `${OpenCV_INCLUDE_DIRS}` 就是导入的 `CMake` 配置文件 `OpenCVConfig.cmake` 中定义的常量, 因此才不需要我们手动指定).

为了方便大家检验 `CMake` 是否正常运行, 我们再在 `OpenCVProject/` 目录下新建目录 `src/`, 进入 `src/` 目录, 创建源代码文件 `main.cpp`:

```cpp
#include <iostream>
#include <opencv2/highgui.hpp> // 在常用的几种编辑器中(比如 VSCode), 使用 CMake 完成配置之后会自动生成静态检查器的解析路径, 正常而言是不会报错的.
#include <opencv2/opencv.hpp>

using namespace std;
using namespace cv;

int main() {
    Mat p1 = imread("/absolute/path/to/test.jpg"); // /absolute/path/to/test.jpg 替换为图片路径. 建议使用绝对路径
    
    if (p1.empty()) {
        cout << "Couldn't find the image..." << endl;
        return 1;
    }
    
    namedWindow("Hollow's Avatar", WINDOW_AUTOSIZE);
    imshow("Hollow's Avatar", p1);
    
    waitKey(0);
    return 0;
}
```

## 调用命令让 CMake 生成配置文件

---

部分时候不是使用如 VSCode 等有自动配置功能的编辑器, 这时候就需要手动在终端执行命令. 由于习惯上将 `CMake` 的配置产物放在 `build` 子目录下, 我们可以执行配置生成命令:

```bash
cmake -S . -B build
```

其中的 `-S` 表示源代码(项目)根目录, 也就是 `CMakeLists.txt` 所在的目录; `-B` 表示构建配置生成的位置, 一般而言指定为 `build`, 生成位置是项目根目录所在目录的子目录.

接下来是根据 `cmake` 中指定的编译链完成编译(如果没有指定, 也会自动查找和调用编译工具链. 当然, VSCode 常见流程是先 Configure 再手动触发 Build(可通过 CMake Tools 一键构建, 是否自动构建取决于设置):

```bash
cmake --build build
```

这样编译产生的二进制文件在 `build/` 目录下, 有同学可能会觉得不太方便和混乱. 我们是可以指定生成位置的, 简单来说, 我想要指定生成的二进制文件到 `bin/` 目录下, 只需要在原有的 `CMakeLists.txt` 添加:

```cmake hl_lines="5 6 7 8"
cmake_minimum_required(VERSION 3.31) ## CMake 最低版本限制

project(OpenCVProject) ## 项目名称

## 推荐指定目录的命令放在 project 后面, 注意不能在 target 设置之后
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_SOURCE_DIR}/bin")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_DEBUG "${CMAKE_SOURCE_DIR}/bin")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_RELEASE "${CMAKE_SOURCE_DIR}/bin")

set(CMAKE_CXX_STANDARD 11) ## 设置 C++ 编译标准: C++11
set(CMAKE_CXX_STANDARD_REQUIRED ON) ## 要求编译器必须支持所设定的标准, 否则报错
set(CMAKE_CXX_EXTENSIONS OFF) ## 禁止编译器非 ISO 标准的编译功能

## 编译对象(源代码)
add_executable(OpenCVProject src/main.cpp)

## 必要的第三方库: OpenCV
find_package(OpenCV REQUIRED) ## 包名: OpenCV, 通过查找 OpenCVConfig.cmake
target_link_libraries(OpenCVProject PRIVATE ${OpenCV_LIBRARIES}) ## OpenCV 的 CMake 配置中自带的变量名 OpenCV_LIBS
target_include_directories(OpenCVProject PRIVATE ${OpenCV_INCLUDE_DIRS}) ## 类似于上一条
```

这样, 一个 `C/C++` 的工程配置工作就完成了.