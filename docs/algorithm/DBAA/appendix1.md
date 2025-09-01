# 附录 I  数学基础与算法设计原则

!!! abstract
	本文主要内容是算法所需要的基础数学知识与算法设计的原则.

## 基础数学
---
### F1. 1 等幂求和

$$
\left\{\begin{matrix}
\sum_{i=1}^{N}i^k &\approx \frac{N^{k+1}}{\left | k+1 \right | };\ k\ne -1 \\
\sum_{i=1}^{N}i^{-1} &\approx \ln{N};\ k=-1
\end{matrix}\right.
$$

- 证明 (**递归差分法**)

下面是 $k\ge0$ 时的情况. 观察这样一个式子: $P_n(x)=(x+1)^n-x^n(n\ne1)$. 以 $n=3$ 时为例: $P_3(x)=(x+1)^3-x^3=3x^2+3x+1$, 可以进行如下变形:

$$
\begin{align*}
Left\rightarrow\sum_{x=1}^{n}P_3(x)&=(n+1)^3-1\\
Right\rightarrow\sum_{x=1}^{n}P_3(x)&=3\sum_{x=1}^{n}x^2+3\sum_{x=1}^{n}x+n=3\sum_{x=1}^{n}x^2+\frac{3}{2}n^2+\frac{5}{2}n\\
\sum_{x=1}^{n}x^2&=\frac{1}{3}[(n+1)^3-1-\frac{3}{2}n^2-\frac{5}{2}n]
\\&=\frac{1}{3}n^3+\frac{1}{2}n^2+\frac{1}{6}n=\frac{1}{6}n(n+1)(2n+1)
\end{align*}
$$

用上面的方式我们便得到了平方求和的公式. 同理, 我们猜想当 $n > 3$ 时同样可用类似方法. 对任意 $n > 0$, 根据二项式定理展开得到:

$$
\begin{align*}
P_n(x) &= (x+1)^n-x^n=\begin{pmatrix}1 \\n \end{pmatrix}x^{n-1}+\begin{pmatrix}2 \\n \end{pmatrix}x^{n-2}+\cdots+\begin{pmatrix}n \\n \end{pmatrix}x^{0} \\
\sum_{x=1}^{N}P_n(x) &= \sum_{x=1}^{N}[(x+1)^n-x^n]=\begin{pmatrix}1 \\n \end{pmatrix}\sum_{x=1}^{N}x^{n-1}+\begin{pmatrix}2 \\n \end{pmatrix}\sum_{x=1}^{N}x^{n-2}+\cdots+N\\
(N+1)^n-1&=\begin{pmatrix}1 \\n \end{pmatrix}\sum_{x=1}^{N}x^{n-1}+\begin{pmatrix}2 \\n \end{pmatrix}\sum_{x=1}^{N}x^{n-2}+\cdots+N\\
\sum_{x=1}^{N}x^{n-1}&=\frac{1}{n}[(N+1)^n-1-\begin{pmatrix}2 \\n \end{pmatrix}\sum_{x=1}^{N}x^{n-2}-\cdots-N]
\end{align*}
$$

接下来, 我们在递归的前提下已经知道前 $n-2$ 次幂的所有求和公式. 据此即可推导出 $n-1$ 次幂的求和公式.

不难发现, 对于任意 $\sum_{x=1}^{N}x^{n-1}$, 其最高次项都是 $\frac{N^n}{n}$. 因此, 在 $N$ 足够大时, 有:

$$
\sum_{i=1}^{N}i^{k}\approx\frac{N^{n+1}}{n+1}
$$

上面只说明了 $k\ge0$ 时的情况. 对于 $k < 0$, 首先确定是否存在可精确表达的初等函数闭式形式. 我们考虑一个满足前述形式的函数 $F$, 使得 $F(N)-F(N-1)=\frac{1}{N^p}$. 若存在, 即可计算: $\sum_{N=2}^{n}(F(N)-F(N-1))=\sum_{N=2}^{n}\frac{1}{N^p}$

显然, 若 $F(x)$ 中存在无理项, 则必须在 $F(N)-F(N-1)$ 式中永久被恰好抵消, 否则不满足右式恒为有理数的前提. 据此, $F(x)$ 中的无理函数部分无关紧要, 我们只需要考虑 $F$ 中的有理函数部分.

首先, 由于右侧式子不存在多项式, 若左侧存在则必须恰好抵消, 所以同样我们只需要考虑 $F$ 为真分式表达式的情况. 对于任意真分式, 我们知道必定存在一个 $N$ 使得 $F(N)$ 的分母 $A(N_0)$ 为 $0$, 也就是未定义点. 对于 $F(N)-F(N-1)$, 则必然至少存在两个未定义点, 并且 $F(N-1)$ 的未定义点恰好在 $F(N)$ 未定义点的右侧, 两点在坐标系上距离为 $1$. 而对于 $\frac{1}{N^p}$, 显然只存在一个未定义点. 综上所述, 这样的初等函数闭式形式并不存在.

据此, 我们关注该式的估计形式. 利用积分判别法思想:

$$
\begin{align*}
&\ \ \ \ \ \ \ \ \ \ \ \int_{2}^{n}\frac{1}{N^p} \le\sum_{N=2}^{n}\frac{1}{N^p}\le\int_{2}^{n}\frac{1}{(N-1)^p}\\
&(p=1)\ \ln n-\ln 2\le\sum_{N=2}^{n}\frac{1}{N^p}\le\ln{(n-1)}\\
&(p\ne1)\ \frac{1}{p-1}(\frac{1}{2^{p-1}}-\frac{1}{n^{p-1}})\le\sum_{N=2}^{n}\frac{1}{N^p}\le\frac{1}{p-1}(1-\frac{1}{(n-1)^{p-1}})
\end{align*}
$$

因此, 在 $n$ 足够大时, 不论正负, 有:

$$
\left\{\begin{matrix}
\sum_{i=1}^{N}i^k &\approx \frac{N^{k+1}}{\left | k+1 \right | };\ k\ne -1 \\
\sum_{i=1}^{N}i^{-1} &\approx \ln{N};\ k=-1
\end{matrix}\right.
$$

### F1. 2 复杂度计算基础

!!! note
	以下是常见的两个重要结论. 使用极限理论可以很容易证明, 并且符合直觉.

其一, 若 $T_1(N)=O(f(N))$ 且 $T_2(N)=O(g(N))$, 则:

- $T_1(N)+T_2(N)=\max(O(f(N)), O(g(N)))$
- $T_1(N)\times T_2(N)=O(f(N)\times g(N))$.

!!! note
	严格而言, $O()$ 运算符表达为一个函数族, 也就是满足该定义所有函数的集合, 因此不存在乘法运算. 然而, 算法分析中许多人滥用该符号, 因此有 $Big-O$ 约定: $O(f(N))\times O(g(N))=O(f(N)\times g(N))$.

其二, 对于任意常数 $k$, 有: $\log^kN=O(N)$.

### F1. 3 算法复杂度分析法则

- `for` 循环:

```cpp
for (int i = 0; i < N; i ++)
	c += i;
```

复杂度就是循环次数 $O(N)$

-  嵌套的 `for` 循环:

```cpp
for (int i = 0; i < N; i ++)
	for (int j = 0; j < N; j ++)
		c += j * i;
```

复杂度就是循环次数乘以更深的循环次数 $O(N^2)$

- 顺序语句复杂度计算

```cpp
for (int i = 0; i < N; i ++)
	c += i;

for (int i = 0; i < N; i ++)
	for (int j = 0; j < N; j ++)
		c += j * i;
```

复杂度为 $\max (O(N) ,O(N^2))=O(N^2)$

- `if/else` 语句

```cpp
if (A1)
	B1
else
	B2
```

复杂度为 $\max (O(B1), O(B2))$

- 递归调用(可改写为循环结构类)

使用 `for` 循环复杂度计算方法即可.

- 递归调用(不可改写为循环结构类)

## 算法设计原则
---

- **收敛性**: 所有调用结果最终必须可归于某些基准情形. 换言之, 最后一轮所有可能的函数调用返回值是确定的, 与函数传入的值无关.
- **单调性**: 任何一轮的调用方向都是唯一确定的. 准确的说, 是朝着那些基准情形的方向进行的.
- **完备性**: 任何设计算法中确定合法的输入值都有唯一确定的处理情况, 并且中途调用函数的返回值同样是合法的.
- **合成效益法则**: 求解某个问题的同一实例时不要二次计算, 浪费算力.

!!! tip
	**合成效益法则的解释**: 最为典型的反面例子就是斐波那契数计算. 假设我们使用普通的递归方法:
	
	```cpp
	#include <bits/stdc++.h>
	
	using namespace std;
	
	int fib(int x) {
		if (x <= 1)
			return x;
		else
			return fib(x - 1) + fib(x - 2);
	}
	
	int main(void) {
		print(fib(6));
	
		return 0;
	}
	```
	
	实际调用过程为
	
	```mermaid
	flowchart TD
	    n6["fib(6)"] --> n5["fib(5)"]
	    n6 --> n4["fib(4)"]

	    n5 --> n4_2["fib(4)"]
	    n5 --> n3["fib(3)"]
	
	    n4 --> n3_2["fib(3)"]
	    n4 --> n2["fib(2)"]
	
	    n4_2 --> n3_3["fib(3)"]
	    n4_2 --> n2_2["fib(2)"]
	
	    n3 --> n2_3["fib(2)"]
	    n3 --> n1["fib(1)"]
	
	    n3_2 --> n2_4["fib(2)"]
	    n3_2 --> n1_2["fib(1)"]
	
	    n3_3 --> n2_5["fib(2)"]
	    n3_3 --> n1_3["fib(1)"]
	
	    n2 --> n1_4["fib(1)"]
	    n2 --> n0["fib(0)"]
	
	    n2_2 --> n1_5["fib(1)"]
	    n2_2 --> n0_2["fib(0)"]
	
	    n2_3 --> n1_6["fib(1)"]
	    n2_3 --> n0_3["fib(0)"]
	
	    n2_4 --> n1_7["fib(1)"]
	    n2_4 --> n0_4["fib(0)"]
	
	    n2_5 --> n1_8["fib(1)"]
	    n2_5 --> n0_5["fib(0)"]
	```
	
	不难发现, 尽管 `fib(6)` 本来只需要计算从 $2$ 到 $6$ 五项的值, 并且每个值都可以通过上两项获取. 也就是说, 实际上只需要调用函数 $6$ 次就行了. 而上述算法的调用量相当可观, 进行了许多无意义的重复计算, 这在更庞大的数据量情况下是不可接受的. 这一思想的实现之一便是动态规划, 利用好已有的结果而不是再算一遍.