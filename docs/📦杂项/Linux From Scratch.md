# 构建自己的 Linux 发行版: Linux From Scratch

!!! abstract
	本文简单记录了博主从头开始构建 Linux From Scratch(后面简称 LFS)的流程. 构建时 LFS 版本为 LFS 12.3-systemd.

## Chap 1 准备一个可用的 Linux 宿主系统
---
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

最重要的自然是 Linux Kernel. 此处使用的是最新 release 版本 6.15.7. 我是在阿里云镜像站下载的, 当然你也可以在中科大, 南京大学等镜像站下载. 

[阿里云镜像内核下载地址](https://mirrors.aliyun.com/linux-kernel/v6.x/linux-6.15.7.tar.gz)

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

同其他发行版一样, LFS 的目的是构建一个桌面操作系统. 因此, 我们必须准备好合适的硬盘分区.

