# 大学物理(乙) II

!!! abstract
	博主补天时记录的笔记, 是根据 [NoughtQ 前辈提供的老师的每周要点](https://github.com/NoughtQ/ZJU-Courses-Resources/tree/main/Physics-D1CX-D2QD) 结合历年习题复习时重写的.
	
	因为大物乙的课太过催眠, 而且很多东西(对博主来说)都很没意思, 因此博主一直没有认真听过. 考前把知识的原理搞懂, 然后再认真做一遍历年卷, 问题其实不大的?

## Chap I 静电场

---

前置知识, 库伦定理中电场强度部分:

$$
E=\frac{1}{4\pi\varepsilon}\frac{Q}{R^2}
$$

其中 $\varepsilon$ 是所处空间的介电常数, 也常常表示为 $\varepsilon_0\varepsilon_r$, 即真空介电常数与相对介电常数的乘积.

### 1. 1 Gauss 定理求解电场

- 原型

$$
\iint_{S}E(s)\ \cdot\ \mathrm d s =\frac{Q}{\varepsilon_0}
$$

其中, $E$ 表示电场强度, $S$ 表示封闭的空间区域(或者边缘无限远的空间区域), $s$ 表示某一微小空间区域, $Q$ 表示该封闭空间区域内的净电荷量, $\varepsilon_0$ 表示真空介电常数.

换言之, 某封闭空间的电通量等于该封闭空间中的净电荷量除以真空介电常数.

- 习题

3-1-1 已知一均匀带电实心球, 其总电荷量为 $+q$, 半径为 $R$, 求距离球心为 $r$ 的任意一处的 $E$ 的大小.

!!! tip
	略.

3-1-2 存在一无限长的均匀带电导线, 已知线电荷密度为 $\lambda$, 求到导线垂直距离为 $\rho$ 处的 $E$ 的大小.

!!! tip
	![](https://pan.xxbyq.net/f/Re8sW/%E8%AF%BE%E7%A8%8B-53.jpg)
	
	只考虑侧面积通量, 底面通量为 $0$.

3-1-3 已知一同轴电缆, 表面极薄. 内半径 $a$ 表面带有电荷量 $+\lambda$, 外半径 $b$ 表面带有电荷量 $-\lambda$, 求各区域 $E(\rho)$.

!!! tip
	![](https://pan.xxbyq.net/f/aExi4/zsc.jpg)

3-1-4 已知半径为 $R$ 的绝缘球体带电荷, 球体上的任意一点所带电荷量满足到球心的距离公式 $q(r)=\rho r$. 求 $r<R$ 与 $r>R$ 的 $E(r)$.

!!! tip
	![](https://pan.xxbyq.net/f/5O4h0/%E8%AF%BE%E7%A8%8B-53_%E5%89%AF%E6%9C%AC.jpg)

3-1-5 已知一半径为 $R$ 的空心导体球壳, 向球壳中心放入 $+q$ 的带点粒子, 并将壳外表面接地. 求内腔, 金属层, 球壳外部的 $E$.

!!! tip
	![](https://pan.xxbyq.net/f/zNZcZ/%E8%AF%BE%E7%A8%8B-54.jpg)

3-1-6 已知存在一个无限大的并且面电荷密度为 $\lambda$ 的均匀带电的薄平板, 求垂直距离为 $h$ 处的电场强度 $E$.

!!! tip
	![](https://pan.xxbyq.net/f/x4piA/%E8%AF%BE%E7%A8%8B-55.jpg)
	
	此处很容易得到一个有趣的结论, 即一个无限大的均匀带电平面两侧任意一点的电场强度与到平面的距离无关.

### 1. 2 电势, 电场, 电场力做功之间的关系

首先给出电势和电场(强度)之间的关系

$$
V(r)=V_O-\int_O^r E\mathrm d r
$$

关注此处负号的含义, 表达的是"电势能的改变量和电场力做功的总能量守恒", 即($W$ 表示电场力对外做的功):

$$
\begin{align*}
E&=E_q(t=0)\\
E&=E_q(t=t')+W(t=t')
\end{align*}
$$

两式子相减即可消除 $E$, 得到:

$$
\begin{align*}
E_q(t=0)&=E_q(t=t')+W(t=t')\\
q(V(t=0))&=q(V(t=t'))+\int_{t=0}^{t=t'}E(t)q\mathrm d t\\
V(t=0)&=V(t=t')+\int_{t=0}^{t=t'}E(t)\mathrm d t\\
V_O&=V(r)+\int_O^r E\mathrm d r\\
V(r)&=V_O-\int_O^r E\mathrm d r
\end{align*}
$$

换言之, 相比于最上面列出的电势求解方法, 这里更推荐使用表示为电场力对外做的功的能量守恒的方法来求解.

3-1-1 已知一均匀带电实心球, 其总电荷量为 $+q$, 半径为 $R$, 求距离球心为 $r$ 的任意一处的 $E$, $V$ 的大小.

!!! tip
	