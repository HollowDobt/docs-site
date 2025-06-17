# 微积分(甲) II 复习笔记
!!! note "Abstract"
	主要参考了(2025 年)卢兴江老师最后一节课整理的 ppt 制作而成. 适合用于复习与回顾知识点, 不适合刚学新课的同学看.

## Chap I 级数
---
### 1. 1 敛散性
- (#)级数收敛的必要条件: 若 $\sum_{n=1}^{\infty}a_n=c$, 则 $\lim\limits_{n\to\infty}a_n=0$ . 换言之, 存在下面关系

$$
\sum_{n=1}^{\infty}a_n=c\Longrightarrow \lim\limits_{n\rightarrow\infty}a_n=0
$$

- 柯西收敛准则: 任意部分和之差都是常数. 换言之

$$
  \forall\,\varepsilon>0,\;\exists N\in\mathbb{N},\;
  \forall\,p,q\ge N:\quad
  \bigl|S_q - S_p\bigr| = \Bigl|\sum_{n=p+1}^q a_n\Bigr| < \varepsilon.
$$

- 正项级数收敛的充要条件是部分和构成数列有界. 换言之

$$
\sum_{n=1}^\infty a_n\text{ 收敛}
\quad\Longleftrightarrow\quad
\exists M>0,\;\forall N\in\mathbb{N},\;\sum_{n=1}^N a_n \le M.
$$

- (正项级数收敛判别法)比较判别法(一般使用更好用的极限判别法): 若 $a_n$ 与 $b_n$ 同阶, 则 $\sum_{n=1}^{\infty}a_n$ 与 $\sum_{n=1}^{\infty}b_n$ 具有相同敛散性.

- (#)(正项级数收敛判别法)Taylor辅助阶数判定: 我们一般使用在 $n\rightarrow\infty$ 时候展开(通项必须逼近$0$, 否则不满足必要条件, 必然发散), 最低幂次即为阶数.

- (#)(正项级数收敛判别法)比值判别法/根值判别法: 都是一样的, 在某个数后确定上一个项一定比下一个项小. 在极限情况下, 换言之

$$
\bigl(\exists N\in\mathbb{N},\;\forall n > N:\;a_{n+1}\le a_n\bigr)
\;\Longrightarrow\;
(a_n)\text{ 收敛}.
$$

- (#)(正项级数收敛判别法)积分判别法: 在满足**前置条件**的前提下, 设$a_n$对应函数为$f(x)$, 我们可以得到

$$
\sum_{n=1}^{\infty}a_n 与 \int_{1}^{\infty}f(x)\mathrm{d}x敛散性相同
$$

!!! warning "积分判别法前置条件"
	1, 正项级数(恒大于$0$);
	2, 通项对应函数**单调递减**.
- (#)(交错级数收敛判别法)莱布尼茨判别法: 只需: 1, 单调减; 2, 通项极限为$0$ 即可确定该交错级数条件收敛.

### 1. 2 幂级数与和函数
!!! tip "Tips"
	和函数不是在 $x$ 的所有区间上都成立的. 求和函数之前应当先确定收敛域.

- 定义-幂级数

$$
\sum_{n=0}^{\infty}a_n(x-x_0)^n
$$

- 定义-收敛半径:  设幂级数 $\sum_{n=0}^{\infty}a_n(x-x_0)^n$, 若在 $\left |x-a\right|<r$ 的时候幂级数收敛, 在 $\left|x+a\right|>r$ 的时候幂级数发散, 称 $r$ 为幂级数 $\sum_{n=0}^{\infty}a_n(x-x_0)^n$ 的收敛半径. 利用**阿贝尔定理**我们可以说明, 确定在 $(x+x_0)$ 或者 $(x_0-x)$ 处收敛后, 在区间 $(x_0-x,x+x_0)$ 内该级数收敛. 至于边界情况, 需要我们自行按定义带值计算.
- (#)收敛半径求解方法: 一般使用比值判别法(注意带上绝对值).
- 和函数: 对于每个幂级数, 实际上都指向了一个唯一确定的函数. 换言之, 我们可以完成 Taylor 展开的唯一逆过程

$$
\sum_{n=0}^{\infty}a_n(x-x_0)^n=f(x)
$$

!!! tip "Tips"
	我们在定义幂函数的时候起点为 $n=0$. 该项往往需要再幂级数求和中被排除. 因为幂函数常常和 Taylor 展开相联系, 所以我们可以根据 Taylor 展开第一项(也就是零次幂)的情况确定和函数的 $a_0$.

这里我们基本上只会使用常见初等函数的 Taylor 展开式, 或者是 p-级数这一类能够直接数列求和的级数. 最关键的是联系使用求导积分等方式将$n+1, n-1$等不可直接积分项消掉. 具体而言, 如

$$
\sum_{n=1}^{\infty}\frac{x^{n+1}}{n}=x\sum_{n=1}^{\infty}\frac{x^n}{n}=-x\ln{(1-x)}
$$

$$
\sum_{n=1}^{\infty}\frac{x^{2n}}{n}\longrightarrow(Let\ x^2=y)\sum_{n=1}^{\infty}\frac{y^n}{n}
$$

### 1. 3 傅里叶展开
- 定义-傅里叶展开: 对于某一函数 $f(x)$, 设其在区间 $(-l,l]$ ($[-l,l)$同理)上定义, 则

$$
f(x)\sim \frac{a_0}{2}+\sum_{n=1}^{\infty}(a_n\cos\frac{n\pi x}{l}+b_n\sin\frac{n\pi x}{l}),\ 2l=T
$$

其中

$$
a_0=\frac{1}{l}\int_{-l}^{l}f(x)\mathrm{d}x
$$

$$
a_n=\frac{1}{l}\int_{-l}^{l}f(x)\cos\frac{n\pi x}{l}\mathrm{d}x
$$

$$
b_n=\frac{1}{l}\int_{-l}^{l}f(x)\sin\frac{n\pi x}{l}\mathrm{d}x
$$

其中 $l$ 代表半周期. 注意, 因为 $n=0$ 处 $\cos 0=1$, 不存在三角函数的振荡性, $a_0$ 往往不能用$a_n$求得.
- 狄利克雷收敛定理: 傅里叶展开得到的不连续点处的值等于左右极限的平均值, **而不是原函数在此处对应的值**.
- 奇延拓与偶延拓: 一般对称到 $[-\pi,\pi)$ 区间上(例如, 设欲求区间为 $[0,l]$, 想要展开为余弦级数, 只需要拓宽为区间 $(-l, l]$ 上的偶函数). 因为只需要求部分区间的, 所以最后我们再去掉延拓得到的额外区间即可.
!!! tip "Tips"
	似乎是一种习惯? 我在查找答案的时候确定, 一般诸如 $(-1)^n$ 此类项在可以使整体为$0$的时候, 我们一般直接带入 $0$ 进行化简, 只保留非零项.

### 1. 4 Practice
- 求下列幂级数的和函数
1, $\sum_{n=1}^{\infty}\frac{x^n}{n}$
2, $\sum_{n=1}^{\infty}\frac{(x-1)^n}{3^n\cdot n}$
3, $\sum_{n=1}^{\infty}nx^{n}$
- 计算 $\sum_{n=1}^{\infty}\frac{n(n+2)}{3^n}$

- 将 $\left\{\begin{matrix}-x,\ -\pi \le x<0 \\x,\ 0\le x < \pi\end{matrix}\right.$ 展开为傅里叶级数.
- 将 $f(x)=x$ 在 $[0,\pi]$ 上展开为余弦级数.

## Chap II 向量空间与解析几何
---
### 2. 1 常见向量结论
设 $a=(a_1, a_2, a_3), b= (b_1, b_2, b_3), c= (c_1, c_2, c_3)$, 有

$$
a\ //\ b \Longleftrightarrow a\times b=0
$$

$$
a\ \perp \ b \Longleftrightarrow a\cdot b=0
$$

$$
a,b,c\ 共面 \Longleftrightarrow \begin{vmatrix}
a_1  &a_2  &a_3 \\
b_1  &b_2  &b_3 \\
c_1  &c_2  &c_3
\end{vmatrix}=0
$$

### 2. 2 常见平面方程与直线结论
- 点到直线的距离公式(其中 $x$ 为点到直线上某一点构成的向量, $u$ 为直线的方向向量)

$$
d=\frac{\left|u\times x\right|}{\left|u\right|}
$$

- 异面直线之间的距离公式(其中 $x$ 为两直线上各取一点构成的向量, 也就是 $(x_0-x_1, y_0-y_1,z_0-z_1)$. $u_1, u_2$ 分别为两条直线的方向向量)

$$
d=\frac{\left|(u_1\times u_2)\cdot x \right|}{\left|u_1\times u_2\right|}
$$

- 平面束方程: 已知直线的一般式方程, 所有过直线的平面表示为两个方程的线性组合.

## Chap III 多元函数微分学
---
### 3. 1 偏导数与全微分关系
下一阶偏导数连续可以推出该阶可微, 该阶可微可以推出该阶可偏导和连续. 除此之外没有任何其他联系.

证明可全微分, 利用

$$
\lim\limits_{r\rightarrow 0}\frac{f(x, y)-f(0,0)-(\frac{\partial f}{x}\Delta x + \frac{\partial f}{y}\Delta y)}{r}
$$

(所以必要条件是偏微分存在)


### 3. 2 多元函数求极值
- 二元函数 Taylor 公式(理解即可, 很好记忆. 主要用于上课时说明极值公式的正确性)

$$
\begin{aligned}
f(x,y)=f(x_0,y_0)+(\frac{\partial }{\partial x}(x-x_0)+\frac{\partial }{\partial y}(y-y_0))f(x_0, y_0)\\
+\frac{1}{2!}(\frac{\partial }{\partial x}(x-x_0)+\frac{\partial }{\partial y}(y-y_0))^2f(x_0, y_0)+...\ 
\end{aligned}
$$

- 多元函数求极值: 首先确定驻点, 而后利用 $AC-B^2$ 与 $0$ 的关系确定是否为极值, 再利用 $A$ 或者 $C$ 与 $0$ 的关系确定是极大值还是极小值. 注意 $A=\frac{\partial^2f}{\partial x^2}|_{(x_0, y_0)}$. 
- 拉格朗日乘数法: 令限制因素 $F(x,y,z)=G(x,y,z)$ 变化为 $F(x,y,z)-G(x,y,z)=0$, 构造新函数 $H(x,y,z, \lambda)=f(x,y,z)+\lambda(F(x,y,z)-G(x,y,z))$, 要求对四个变量的偏微分值皆为零.

### 3. 3 方向导数与向量场
- 梯度 $\nabla F$ 为 $(F_x',F_y',F_z')$ , 与方向导数的关系式: $f'_l(x_0,y_0,z_0)=\nabla F\cdot (\cos \alpha, \cos \beta, \cos \gamma)$.
- 空间曲线的切线方程可以表示为

$$
\frac{x-x(t_0)}{x'(t)|_{t=t_0}}=\frac{y-y(t_0)}{y'(t)|_{t=t_0}}=\frac{z-z(t_0)}{z'(t)|_{t=t_0}}
$$

- 空间曲面的切平面方程(设原始方程: $F(x,y,z)=0$)为

$$
F_x'(M_0)(x-x_0)+F_y'(M_0)(y-y_0)+F_z'(M_0)(z-z_0)=0
$$

- 非参数方程的曲线方程求切线方程: 已知曲线方程为 $\left\{\begin{matrix}f(x,y,z)=0 \\g(x,y,z)=0\end{matrix}\right.$, 求曲线在 $(x_0,y_0,z_0)$ 处的切线. 方法: 直接求导得到两个方程即可

$$
\left\{\begin{matrix}f'_x(x_0,y_0,z_0)(x-x_0)+f'_y(x_0,y_0,z_0)(y-y_0)+f'_z(x_0,y_0,z_0)(z-z_0)=0 \\g'_x(x_0,y_0,z_0)(x-x_0)+g'_y(x_0,y_0,z_0)(y-y_0)+g'_z(x_0,y_0,z_0)(z-z_0)=0\end{matrix}\right.
$$

## Chap IV 重积分
---
- 重心/形心(即密度为1)公式(最终结果 $x$ 是以原点为参考系的位矢)

$$
x=\frac{\iiint\limits_{V}x\rho(x,y,z)\mathrm{d}x\mathrm{d}y\mathrm{d}z}{\iiint\limits_{V}\rho(x,y,z)\mathrm{d}x\mathrm{d}y\mathrm{d}z}
$$

- 转动惯量公式

$$
\sum_{i=1}^{n}\rho (x,y,z)\Delta V d^2=\iiint\limits_{V}d^2(x,y,z)\rho \mathrm{d}x\mathrm{d}y\mathrm{d}z
$$

## Chap V 曲线积分
---
### 5. 1 第一类曲线积分
用好定义 $\int\limits_{C}f(x,y,z)\mathrm{d}S$ 即可. 注意其中 $\mathrm{d}S=\sqrt{[x'(t)]^2+[y'(t)]^2+[z'(t)]^2}\mathrm{d}t$.

### 5. 2 第二类曲线积分
- 定义: 我们以力场中做功引入, 对于某个力在三维空间中的位移, 我们都可以分解到 $x,y,z$ 三个方向上

$$
\int\limits_{C}f(x,y,z)\cdot \mathrm{d}s=\int\limits_{C}P(x,y,z)\mathrm{d}x+Q(x,y,z)\mathrm{d}y+R(x,y,z)\mathrm{d}z
$$

- 格林公式: 用于将复杂的平面上的**封闭**曲线积分化作简单的曲面积分. 也就是

$$
\oint\limits_{C}P\mathrm{d}x+Q\mathrm{d}y=\iint\limits_{S}(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y})\mathrm{d}x\mathrm{d}y
$$

- 斯托克斯公式: 做题时少见, 很多时候起的作用是简单问题复杂化. 但有时有奇效(卢老师上课给了一道题可以用 stokes 秒杀, 但我忘记了...). 可以将第二类曲线积分转化为第二类曲面积分

$$
\oint\limits_{C}P\mathrm{d}x+Q\mathrm{d}y+R\mathrm{d}z=\iint_{\Sigma}\begin{vmatrix}
\mathrm{d}y\mathrm{d}z &\mathrm{d}x\mathrm{d}z  &\mathrm{d}x\mathrm{d}y \\
\frac{\partial}{\partial x}  &\frac{\partial}{\partial y}  &\frac{\partial}{\partial z} \\
P  &Q  &R
\end{vmatrix}
$$

- 消元法解三维第二类曲面积分: 相比于 stokes 公式, 实际上我们更常用消元法来解三维空间下的第二类曲线积分. 我们可以保证 $z$ 受所有已知方程的约束, 由此降维到平面, 再用格林公式.

### 5. 3 路径无关性
利用常微分方程的知识可以知道满足条件$\frac{\partial P}{\partial y}=\frac{\partial Q}{\partial x}$一定可以全微分. 可以全微分就代表与路径无关. 我们称这种向量场为保守场.

## Chap VI 曲面积分
---
### 6. 1 第一类曲面积分
一般而言知道显式方程的基本法向量为 $(-f_x', -f_y', 1)$ 即可(对于 $z=f(x,y)$). 如果细究, 实际上是曲面存在两个自由变量, 我们找到向量函数 $r=(x(u,v),y(u,v),z(u,v))$, 而后确定对应的雅各比行列式 $\left|\frac{\partial r}{\partial u}\times \frac{\partial r}{\partial v}\right|$, 将问题转化为投影到$r,v$坐标系上的二重积分

$$
\iint\limits_{S}f(x(u,v),y(u,v),z(u,v))\left|\frac{\partial r}{\partial u}\times \frac{\partial r}{\partial v}\right|\mathrm{d}u\mathrm{d}v
$$

有些时候也会考到隐函数求导. 这个时候利用公式(对于 $z=f(x,y)$)

$$
F(x,y,z)=0 \longrightarrow f_x'=-\frac{F_x'}{F_z'}
$$

### 6. 2 第二类曲面积分
- 定义: 定义式计算相当复杂, 所以尽可能不用(一般只有用高斯散度公式最后去掉新添加的曲面时才用到). 和第二类曲线积分相似, 但是注意 $\mathrm{d}x\mathrm{d}y$ 等存在方向性

$$
\iint_{\Sigma}P\mathrm{d}y\mathrm{d}z+Q\mathrm{d}x\mathrm{d}z+R\mathrm{d}x\mathrm{d}y
$$

- 高斯公式(针对**封闭曲面**! 比如球壳)

$$
\iint_{\Sigma}P\mathrm{d}y\mathrm{d}z+Q\mathrm{d}x\mathrm{d}z+R\mathrm{d}x\mathrm{d}y=\iiint\limits_{V}(\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z})\mathrm{d}x\mathrm{d}y\mathrm{d}z
$$

## Chap VII 场论初步
---
### 7. 1 数量场类
- 梯度(向量): 指向函数增长最快的方向. 定义前面已给出, 对于函数 $F=F(x,y,z)$, 其梯度(也记作 $grad\ F$)$\nabla F$ 为 $(F_x', F_y', F_z')$.
- 方向导数(数量): 就是 $\nabla F\cdot (\cos \alpha, \cos \beta, \cos \gamma)$.

### 7. 2 向量场类
对向量场 $A=(P(x,y,z),Q(x,y,z),R(x,y,z))$:
- 散度(数量): $div\ A=\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}$. 实际上散度这么算不难理解, 这和我们在高斯公式中做的事情其实是完全一样的(就是高斯公式中的被积函数). 从这里我们也可以推出, 散度为零时是**无源场**.
- 旋度(向量)

$$
rot\ A=
\begin{vmatrix}
i & j & k \\
\frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\
P & Q & R
\end{vmatrix}
$$

实际上和 stokes 公式很像, 只不过少了$\mathrm{d}x\mathrm{d}y$等项. 我们称旋度为$0$的场为**无旋场**.