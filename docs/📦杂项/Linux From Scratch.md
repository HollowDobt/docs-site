# 构建自己的 Linux 发行版: Linux From Scratch

!!! abstract
	本文记录了博主从头开始构建 Linux From Scratch(后面简称 LFS)的流程. 构建时 LFS 版本为 LFS 12.3-systemd. 注意 LFS 相关教程具有时效性, 具体脚本可能随着时间变化而失效.
	
	另外, 完成一个 LFS 不仅仅是一个很有成就感的事, 而且也可以加深我们对于 GNU/Linux 系统的理解. 未来使用 Linux 的其他发行版时, 我们可以轻松地掌握每个文件的来历与去向.

## Chap I 准备一个可用的 Linux 宿主系统
---

### 1. 1 宿主机包准备

LFS 作者建议宿主机有四个以上的 CPU 核心和 8GB 以上的运行内存. 满足这一要求的机器可以保证高效快速的构建. 博主使用的构建机器是在咸鱼上买的二手机械革命 S2-02, 操作系统是 Arch Linux.

![fastfetch](https://files.hollowlib.top/public/20250791320736eaab496686194c1e22cbe2eb.png)

然后是必须安装的软件包(几乎所有的包都已内置在任何一个 Linux 发行版)

- bash (`bash` 必须可以通过 `/bin/sh` 调用, 版本大于等于 3.2)
- binutils (版本大于等于 2.13.1)
- bison(`bison` 必须可以通过 `/usr/bin/yacc` 调用, 版本大于等于 2.7)
- coreutils(版本大于等于 8.1)
- diffutils(版本大于等于 2.8.1)
- findutils(版本大于等于 4.2.31)
- gawk(`gawk` 必须可以通过 `/usr/bin/awk` 调用, 版本大于等于 4.0.1)
- gcc(版本大于等于 5.2, 官网建议版本小于 14.2.0, 实际操作版本 15.1.1)
- grep(版本大于等于 2.5.1a)
- gzip(版本大于等于 1.3.12)
- m4(版本大于等于 1.4.10)
- make(版本大于等于 4.0)
- patch(版本大于等于 2.5.4)
- perl(版本大于等于 5.8.8)
- python(版本大于等于 3.4)
- sed(版本大于等于 4.1.5)
- tar(版本大于等于 1.22)
- texinfo(版本大于等于 5.0)
- xz(版本大于等于 5.0.0)

然后是手册提供的一个一键检查脚本

```bash
cat > version-check.sh << "EOF"
`#!/bin/bash # A script to list version numbers of critical development tools  # If you have tools installed in other directories, adjust PATH here AND # in ~lfs/.bashrc (section 4.4) as well.  LC_ALL=C  PATH=/usr/bin:/bin  bail() { echo "FATAL: $1"; exit 1; } grep --version > /dev/null 2> /dev/null || bail "grep does not work" sed '' /dev/null || bail "sed does not work" sort   /dev/null || bail "sort does not work"  ver_check() {    if ! type -p $2 &>/dev/null    then       echo "ERROR: Cannot find $2 ($1)"; return 1;     fi    v=$($2 --version 2>&1 | grep -E -o '[0-9]+\.[0-9\.]+[a-z]*' | head -n1)    if printf '%s\n' $3 $v | sort --version-sort --check &>/dev/null    then       printf "OK:    %-9s %-6s >= $3\n" "$1" "$v"; return 0;    else       printf "ERROR: %-9s is TOO OLD ($3 or later required)\n" "$1";       return 1;     fi }  ver_kernel() {    kver=$(uname -r | grep -E -o '^[0-9\.]+')    if printf '%s\n' $1 $kver | sort --version-sort --check &>/dev/null    then       printf "OK:    Linux Kernel $kver >= $1\n"; return 0;    else       printf "ERROR: Linux Kernel ($kver) is TOO OLD ($1 or later required)\n" "$kver";       return 1;     fi }  # Coreutils first because --version-sort needs Coreutils >= 7.0 ver_check Coreutils      sort     8.1 || bail "Coreutils too old, stop" ver_check Bash           bash     3.2 ver_check Binutils       ld       2.13.1 ver_check Bison          bison    2.7 ver_check Diffutils      diff     2.8.1 ver_check Findutils      find     4.2.31 ver_check Gawk           gawk     4.0.1 ver_check GCC            gcc      5.2 ver_check "GCC (C++)"    g++      5.2 ver_check Grep           grep     2.5.1a ver_check Gzip           gzip     1.3.12 ver_check M4             m4       1.4.10 ver_check Make           make     4.0 ver_check Patch          patch    2.5.4 ver_check Perl           perl     5.8.8 ver_check Python         python3  3.4 ver_check Sed            sed      4.1.5 ver_check Tar            tar      1.22 ver_check Texinfo        texi2any 5.0 ver_check Xz             xz       5.0.0 ver_kernel 5.4   if mount | grep -q 'devpts on /dev/pts' && [ -e /dev/ptmx ] then echo "OK:    Linux Kernel supports UNIX 98 PTY"; else echo "ERROR: Linux Kernel does NOT support UNIX 98 PTY"; fi  alias_check() {    if $1 --version 2>&1 | grep -qi $2    then printf "OK:    %-4s is $2\n" "$1";    else printf "ERROR: %-4s is NOT $2\n" "$1"; fi } echo "Aliases:" alias_check awk GNU alias_check yacc Bison alias_check sh Bash  echo "Compiler check:" if printf "int main(){}" | g++ -x c++ - then echo "OK:    g++ works"; else echo "ERROR: g++ does NOT work"; fi rm -f a.out  if [ "$(nproc)" = "" ]; then    echo "ERROR: nproc is not available or it produces empty output" else    echo "OK: nproc reports $(nproc) logical cores are available" fi`
EOF
```

之后再运行下面的命令即可

```bash
bash version-check.sh
```

正常而言输出应该全部 OK

```out
OK:    Coreutils 9.7    >= 8.1
OK:    Bash      5.3.0  >= 3.2
OK:    Binutils  2.44.0 >= 2.13.1
OK:    Bison     3.8.2  >= 2.7
OK:    Diffutils 3.12   >= 2.8.1
OK:    Findutils 4.10.0 >= 4.2.31
OK:    Gawk      5.3.2  >= 4.0.1
OK:    GCC       15.1.1 >= 5.2
OK:    GCC (C++) 15.1.1 >= 5.2
OK:    Grep      3.12   >= 2.5.1a
OK:    Gzip      1.14   >= 1.3.12
OK:    M4        1.4.20 >= 1.4.10
OK:    Make      4.4.1  >= 4.0
OK:    Patch     2.8    >= 2.5.4
OK:    Perl      5.42.0 >= 5.8.8
OK:    Python    3.13.5 >= 3.4
OK:    Sed       4.9    >= 4.1.5
OK:    Tar       1.35   >= 1.22
OK:    Texinfo   7.2    >= 5.0
OK:    Xz        5.8.1  >= 5.0.0
OK:    Linux Kernel 6.15.7 >= 5.4
OK:    Linux Kernel supports UNIX 98 PTY
Aliases:
OK:    awk  is GNU
OK:    yacc is Bison
OK:    sh   is Bash
Compiler check:
OK:    g++ works
OK: nproc reports 8 logical cores are available
```

当然, 可以额外运行命令删除这一测试文件

```bash
rm version-check.sh
```

### 1.2 宿主机(虚拟)分区准备

同其他发行版一样, LFS 的目的是构建一个桌面操作系统. 因此, LFS 建议我们必须准备好合适的硬盘分区. 博主个人的建议是, 使用类似于虚拟机而非 LFS 的双系统的思路创建一个可用分区. 也就是, **把普通目录变成 LFS 的根目录**. 

在 Linux 中, 我们利用 `loop-back`(回环分区) 将目录打包为 `lfs.disk` 这样一个可挂载的块设备, 也就是一个镜像文件. 后面我们需要测试的时候只需要将这一镜像文件挂载到 `/mnt` 即可. 使用这一方法可以轻松完成虚拟机或者实体机测试, 并且对于根目录的影响等等也不大. 下面以我的发行版为例给出具体步骤.

首先确定硬盘的可用空间(越大越好, 我分配了 `100 GB`, LFS 建议大小大于 `20 GB`, 可根据实际情况调整), 执行命令

```bash
df -h /
```

然后安装镜像工具

```bash
paru kpartx 
# 输出元数据后选择 including kpartx 的软件包
```

测试是否安装成功

```bash
kpartx
```

创建稀疏镜像文件

```bash
sudo fallocate -l 100G ~/lfs.img
# 也可以使用 dd, 不过 dd 会实际写满 80 G, 创建时间较长
# sudo dd if=/dev/zero of=~/lfs.img bs=1M count=0 seek=102400
```

格式化虚拟磁盘(此处选用 ext4 格式, 在测试阶段这类文件系统最便于操作)

```bash
sudo mkfs.ext4 -F -m 1 -L LFS ~/lfs.img
# 强制格式化为 ext4 系统, 为超级用户预留 1% 空间, 卷标为 LFS
```

接下来关联 loop 设备

```bash
sudo losetup -fP ~/lfs.img          # 自动找空闲 /dev/loopX, 并将镜像挂载到第一个空闲的 loop 设备
losetup -a                          # 查看映射结果
```

博主在这一步调用 `losetup -a` 时输出 `/dev/loop0: []: (/home/hollowdobt/lfs.img)`

因此将 `loop0` 设备挂载到 `lfs` 并导出 `$LFS`

```bash
sudo mkdir -p /mnt/lfs
sudo mount /dev/loop0 /mnt/lfs
export LFS=/mnt/lfs
```

当然, 为了安全还需要设置严格的访问权限模式掩码, 保证只有文件所有者可以写新创建的文件和目录, 但任何人都可读取或搜索它们. 执行命令

```bash
umask 022
```

验证

```
umask
```

输出为 `022` 或者 `0022` 都是正确的.

接下来确保 LFS 的所有者设置为 `root`, 访问权限设置为 `775`

```bash
sudo chown root:root $LFS
sudo chmod 755 $LFS
```

好了, 这样你就得到一个好用的虚拟磁盘啦~

当然, 这样做也有缺点, 比如每次启动后都要手动挂载镜像文件. 这里可以写 `fstab` 在每次启动时自动挂载虚拟磁盘, 这里不再赘述.

!!! warning
	LFS 的构建过程中需要长时间处在 root 权限, 无论何时都要保证 `echo $LFS` 的结果为 `/mnt/lfs`, `umask` 的结果为 `022` 或者 `0022`.

## Chap II LFS 必要源代码下载
---

首先创建源码目录

```bash
sudo mkdir -v $LFS # -v 表示输出具体创建信息
sudo chmod -v a+wt $LFS/sources # 添加写入权限和 sticky 标志. sticky 允许多个用户对于目录的写入, 但只有文件所有者有权删除其中的文件
```

而后是下载 LFS 需要的所有软件包与补丁. 其中需要的文件是 [wget-list-systemd](https://linuxfromscratch.org/lfs/view/stable-systemd/wget-list-systemd), 将文件放在当前目录下(此处以 `~` 为例)后运行命令

```bash
wget --input-file=wget-list-systemd --continue --directory-prefix=$LFS/sources
```

!!! note
	国内很可能因为防火墙的问题出现 github 连接失败的问题, 因此这里博主提供了替代 github 地址后的文件(镜像源: 阿里云) <https://mirrors.aliyun.com/lfs/lfs-packages/lfs-packages-12.3.tar>, 执行命令 `sudo wget https://mirrors.aliyun.com/lfs/lfs-packages/lfs-packages-12.3.tar --directory-prefix=$LFS/sources`, 防止出现 `failed: Connection timed out`.

进一步, 我们将文件的所有者改为 root, 避免无名者问题

```bash
sudo chown root:root $LFS/sources/*
```

为了便于校验文件, 我们首先解包这个 `tar` 文件

```bash
tar -xvf $LFS/sources/lfs-packages-12.3.tar
```

然后将文件转移到 `sources` 目录下

```bash
cp -r $LFS/sources/12.3/* $LFS/sources/.
sudo rm $LFS/sources/lfs-packages-12.3.tar
sudo chown root:root $LFS/sources/*
```

接下来是下载校验文件 [md5sums](https://www.linuxfromscratch.org/lfs/view/stable-systemd/md5sums), 执行如下命令完成校验(如果下载的是阿里云镜像站的不需要这一步, 自带有 md5sums 文件)

```bash
pushd $LFS/sources
  md5sum -c md5sums
popd
```

同样, 全部 OK 即可.

## Chap III 编译前最后准备
---
现在, 我们需要在自己的分区创建几个 Linux 基本的目录

首先递归创建目录 `/etc`(用于存储**系统级***配置文件*, 如用户信息(`passwd`), 文件系统挂载点(`fstab`), ssh 服务配置(`sshd_config`)), `/var`(用于存储**系统级***变化数据*, 可以类比为数据库, 包括如日志文件, 邮件, 系统缓存, 运行时状态等文件), `/usr/bin`(用于存储普通用户可用的命令行工具, 如`bash`, `gcc` 等等), `/usr/lib`(用于存储程序运行依赖的共享库文件(`*.so`)), `/sur/sbin`(用于存储系统管理员一级(`root`)的命令行工具)

```bash
mkdir -pv $LFS/{etc,var} $LFS/usr/{bin,lib,sbin}
```

然后创建指向 `/usr/...` 的符号链接, 统一管理二进制文件和库文件

```bash
su -

for i in bin lib sbin; do
  ln -sv usr/$i $LFS/$i
done
```

如果是 64 位系统就需要额外添加 `lib64` 目录, 因为 `gcc` 等编程序默认会在 `lib64` 目录下查找 64 位库. LFS 的特殊之处在于, `lib64` 并非位于 `usr` 目录之下. 如果发现有 `usr/lib64` 存在, 证明后面的操作中出现了问题

```bash
case $(uname -m) in
  x86_64) mkdir -pv $LFS/lib64 ;;
esac
```

另外, 还需要准备交叉编译链工具. 工具存储在 `/mnt/lfs/tools` 下

```bash
mkdir -pv $LFS/tools
```

因为需要长时间处于 `root` 权限, 为了避免出现严重的系统问题我们需要一个干净的普通用户. 下面创建新用户

```bash
groupadd lfs
useradd -s /bin/bash -g lfs -m -k /dev/null lfs
# -s /bin/bash 设置 bash 为用户 lfs 的默认 shell
# -g lfs 添加用户 lfs 到组 lfs
# -m 为用户 lfs 创建一个 ~ 目录
# -k /dev/null 防止从默认模板目录(/etc/skel)复制文件到新的 ~ 目录
# lfs 新用户名称
```

为 `lfs` 用户设置密码

```bash
passwd lfs
```

给予 `lfs` 用户对 `$LFS` 的完全访问权(将所有权赋给 `lfs` 用户)

```bash
chown -v lfs $LFS/{usr{,/*},var,etc,tools}
case $(uname -m) in
  x86_64) chown -v lfs $LFS/lib64 ;;
esac
```

之后登录到 `lfs` 用户

```bash
su - lfs
```

接下来我们为 `bash` 创建两个启动脚本, `.bash_profile` 为用户登录时执行, `.bashrc` 为用户启动终端时执行

```bash
# 写入 .bash_profile
cat > ~/.bash_profile << "EOF"
`exec env -i HOME=$HOME TERM=$TERM PS1='\u:\w\$ ' /bin/bash`
EOF
# exec 表示替代当前终端, 不是在当前终端登录新终端
# env -i 清空当前环境变量
# HOME 指向当前用户的 home 目录(此处应当是 /home/lfs)
# TERM 表示程序使用当前终端类型变量
# PS1 定义命令行提示符 \u -> 当前用户 \w -> 当前目录(全目录) \$ 显示 $ 表示普通用户 效果: lfs:/mnt/lfs$
```

接下来再设置 `.bashrc` 文件

```bash
cat > ~/.bashrc << "EOF"
set +h # 默认情况下首次运行某个命令时会在 PATH 中查找并记住这个命令的完整路径, 以后不在查找; 此处关闭这个功能(功能名为"散列"), 保证 bash 每次调用命令的时候都是使用的 $LFS/ 目录下的工具, 而非之前记住的宿主系统的 /usr/bin/gcc 路径, 保证严格自举
umask 022
LFS=/mnt/lfs
LC_ALL=POSIX # 将全局最高优先级本地变量设定为 POSIX 标准
LFS_TGT=$(uname -m)-lfs-linux-gnu # 设置交叉编译链目标平台
PATH=/usr/bin
if [ ! -L /bin ]; then PATH=/bin:$PATH; fi # 如果 /bin 目录不是 /usr/bin 的符号链接, 那么将这个目录添加到已有的 PATH 目录
PATH=$LFS/tools/bin:$PATH # $LFS/tools 最后加入 PATH, 位于最高优先级, 保证新程序可用时立刻替代旧程序
CONFIG_SITE=$LFS/usr/share/config.site # 所有可能需要用到 configure 脚本的自动设置 CONFIG_DITE 为 $LFS/usr/share/config.site
export LFS LC_ALL LFS_TGT PATH CONFIG_SITE # 将上面的变量全部导出
EOF
```

为了保证 `bash.bashrc` 不被引入 `bash` 初始化过程, 我们需要将其移走(注意不是所有的发行版都有自动引入初始化的特性. 直接运行下面命令即可)

```bash
su -

[ ! -e /etc/bash.bashrc ] || mv -v /etc/bash.bashrc /etc/bash.bashrc.NOUSE

exit
```

而后设置环境变量保证每次构建编译时调用所有可用的逻辑核心(线程)

```bash
cat >> ~/.bashrc << "EOF"
export MAKEFLAGS=-j$(nproc)
EOF
```

为了最快完成编译, 释放你的电脑性能~

```bash
# 如果有电源管理策略工具使用下面的命令(需要工具 powerprofilesctl)
powerprofilesctl set performance
```

最后, 启用上述环境变量

```bash
source ~/.bash_profile
```

## Chap IV 开始: LFS 交叉编译链与临时工具构建
---
这里简单解释 LFS 提到交叉编译链时举的例子. 交叉编译链编译时必须明确指定目标平台, 即 **CPU-供应商-内核-操作系统** 三元组(如 arm64-apple-darwin24.5.0).

![交叉编译链示例](https://files.hollowlib.top/public/2025071a662aaf7525fa384de0bf1ab8452c6b.png)

第一阶段, 我们在 A 机器上编译得到一个编译器 cc1, 这个 cc1 自身运行平台是 A 机器, 其编译其他源文件得到的二进制文件目标平台是 B; 接下来第二阶段, 让 cc1 这个编译器在 A 机器上运行, 编译得到一个在 B 平台使用的编译器 cc2, 这个 cc2 编译器编译其他源文件得到的二进制文件目标平台是 C; 而接下来第三阶段, 让 cc2 在 B 平台运行, 编译得到可以在 C 平台运行的编译器 cc3, 并且 cc3 编译器目标平台就是 C 自己.

执行下面几步便可完成构建

![LFS 交叉编译流程](https://files.hollowlib.top/public/202507a14bf447879bc9acb6163fa5250af097.png)

!!! note
	这里步骤稍显复杂并难以理解. 为什么不直接在第二部完成对目标平台的编译? 因为这里产生了经典的"鸡生蛋蛋生鸡"的环形逻辑链. 为了编译出目标平台的 `glibc` 库, 我们必须要用编译器编译; 而编译器依赖自身的 `libgcc`, `libgcc` 又依赖于目标的 `glibc`, 这就导致了闭环: 我们没有 `glibc`, 而要想得到 `glibc` 必须要用 `glibc`