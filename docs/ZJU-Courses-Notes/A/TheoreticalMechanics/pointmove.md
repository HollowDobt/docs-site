# Chap I 点的运动学


## 1. 1 自然轴系

---

### 1. 1. 1 已知空间曲线 $x=x(t), y=y(t), z=z(t)$, $t$ 为时间, 求 $t$ 时刻密平面的单位法向量.

根据定义, 密平面的单位法向量 $\vec{b}$ 为(其中 $\vec{A}$ 表示 $t$ 时刻的速度, $\vec{A'}$ 表示 $t+\Delta t$ 时刻的速度):

$$
\vec{b}=\lim_{\Delta t\rightarrow0}unit(\vec{A}\times\vec{A'})
$$

原式可转化为行列式表达:

$$
\begin{align*}
\vec{b}&=\lim_{\Delta t\rightarrow0}unit((x'(t),y'(t),z'(t))\times(x'(t+\Delta t),y'(t+\Delta t),z'(t+\Delta t)))\\
&={\begin{vmatrix}
i  &j  &k \\
x'(t)  &y'(t)  &z'(t) \\
x'(t+\Delta t)  &y'(t+\Delta t)  &z'(t+\Delta t)
\end{vmatrix}}
\end{align*}
$$

对于微元 $\Delta t$,  我们可以选择泰勒展开解决:

$$
x'(t+\Delta t)=x'(t)+\frac{x''(t)}{1!}\Delta t+\frac{x'''(t)}{2!}\Delta t^2+\cdots
$$

同时, 在表达式中只考虑最高小阶, 忽略高阶项, 因此 $x'(t+\Delta t)=x'(t)+\frac{x''(t)}{1!}\Delta t=x'(t)+x''(t)\Delta t$. 基于此, 我们可将原行列式转化为:

$$
\begin{vmatrix}
i  &j  &k \\
x'(t)  &y'(t)  &z'(t) \\
x'(t)+x''(t)\Delta t  &y'(t)+y''(t)\Delta t  &z'(t)+z''(t)\Delta t
\end{vmatrix}
$$

利用行列式的性质, 消掉第三行的一阶导数项, 并提取出 $\Delta t$:

$$
\begin{vmatrix}
i  &j  &k \\
x'(t)  &y'(t)  &z'(t) \\
x''(t)  &y''(t)  &z''(t)
\end{vmatrix}\Delta t
$$

因为 $unit()$ 单位化函数, 我们可以去掉系数项 $\Delta t$. 上述表达式最终计算结果为:

$$
\vec{b}=\frac{(y'z''-y''z')i+(x''z'-x'z'')j+(x'y''-x''y')k}{\sqrt{(y'z''-y''z')^2+(x''z'-x'z'')^2+(x'y''-x''y')^2}}
$$

### 1. 1. 2 给出自然轴系下点的速度和加速度公式.

下面的 $\vec{\tau}$ 表示速度的方向向量,  表示主法向量的方向向量.

对于速度 $\vec{v}$ 公式

$$
\vec{v}=\frac{d\vec{r}}{dt}=\frac{d\vec{r}}{dS}\cdot\frac{dS}{dt}=\vec{\tau}\cdot v
$$

对于加速度 $\vec{a}$ 稍微复杂

$$
\vec{a}=\frac{d\vec{v}}{dt}=\frac{d(\vec{\tau}\cdot v)}{dt}=\frac{d\vec{\tau}}{dt}v+\frac{dv}{dt}\vec{\tau}
$$

对于 $\vec{\tau}$, 我们分为大小和方向分别分析. 作图后发现, 方向而言显然与 $\vec{\tau}$ 垂直, 并且恰好与主法线方向一致, 因此其方向为 $\vec{n}$(效果类似于 $(i,j,k)$). 对于大小, 显然有: $|\Delta \vec{\tau}|=2\sin{\frac{\Delta \phi}{2}}=\Delta \phi=\frac{\Delta r}{\rho}$. 因此, 原式代回计算得到:

$$
\vec{a}=\frac{vdr}{\rho dt}\vec{n}+\frac{dv}{dt}\vec{\tau}=\frac{v^2}{\rho}\vec{n}+\frac{dv}{dt}\vec{\tau}
$$

### 1. 1. 3 已知空间曲线 $x=x(t)$, $y=y(t)$, $z=z(t)$, 确定该曲线上某点 $t$ 处的曲率半径 $\rho$.

根据定义求解即可:

$$
\rho=\frac{\Delta r}{\Delta \phi}=\frac{\Delta r}{\sin \Delta \phi}=\frac{\Delta r|A||A'|}{|A\times A'|}=\frac{\sqrt{(x')^2+(y')^2+(z')^2}\Delta t|A||A'|}{|A\times A'|}
$$

对于 $A\times A'$, 其计算结果参考前述答案即可:

$$
\begin{vmatrix}
i  &j  &k \\
x'(t)  &y'(t)  &z'(t) \\
x''(t)  &y''(t)  &z''(t)
\end{vmatrix}\Delta t
$$

这样即可消除 $\Delta t$, 同时 $|A'|$ 式子中的 $\Delta t$ 在其他部分 $\Delta t$ 小量消除的情况下可以直接视作 $0$. 换言之, 最终计算结果为:

$$
\frac{((x')^2+(y')^2+(z')^2)^{\frac{3}{2}}}{|A\times A'|}
$$

## 1. 2 摆线

---

!!! note
	以下所有计算过程都是基于匀速运动进行的, 主要关注思路, 变速情况下可能会发生改变!!!

半径为 $r$ 的车轮沿着固定水平轨道滚动而不滑动. 设轮缘上一点 $M$, 在初始瞬间与轨道 $O$ 点重合; 在瞬时 $t$, 半径 $MC$ 与轨道的垂涎 $HC$ 形成交角 $\phi=\omega t$, 其中 $\omega$ 是常量. 试解决下面的这些问题

### 1. 2. 1 求 $M$ 点的运动方程

![M点的运动方程](https://pan.xxbyq.net/f/pPkcV/%E8%AF%BE%E7%A8%8B-35.jpg)

### 1. 2. 2 求瞬时速度和加速度

![](https://pan.xxbyq.net/f/XEqux/%E8%AF%BE%E7%A8%8B78.jpg)

### 1. 2. 3 求 $M$ 点的切向加速度和法向加速度

![](https://pan.xxbyq.net/f/GnBty/-35_%E5%89%AF%E6%9C%AC.jpg)

### 1. 2. 4 求轨迹的最大曲率半径

![](https://pan.xxbyq.net/f/dOdFR/%E8%AF%BE%E7%A8%8B-35_%E5%89%AF%E6%9C%AC.jpg)