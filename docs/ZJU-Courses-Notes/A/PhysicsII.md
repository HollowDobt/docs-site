# 大学物理(乙) II

!!! abstract
	博主补天时记录的笔记, 是根据 [NoughtQ 前辈提供的老师的每周要点](https://github.com/NoughtQ/ZJU-Courses-Resources/tree/main/Physics-D1CX-D2QD) 结合历年习题复习时重写的.
	
	因为大物乙的课太过催眠, 而且很多东西(对博主来说)都很没意思, 因此博主一直没有认真听过. 考前把知识的原理搞懂, 然后再认真做一遍历年卷, 问题其实不大的?

## 静电场

---

前置知识, 库伦定理中电场强度部分:

$$
E=\frac{1}{4\pi\varepsilon}\frac{Q}{R^2}
$$

其中 $\varepsilon$ 是所处空间的介电常数, 也常常表示为 $\varepsilon_0\varepsilon_r$, 即真空介电常数与相对介电常数的乘积.

本章节的一切都是基于 Gauss 定理进行的. 这个重要的公式就是:

$$
\sum E(S)\Delta S=\frac{Q}{\varepsilon_r\varepsilon_0}
$$

### Gauss 定理求解电场

- 原型

$$
\iint_{S}E(s)\ \cdot\ \mathrm d s =\frac{Q}{\varepsilon_0}
$$

其中, $E$ 表示电场强度, $S$ 表示封闭的空间区域(或者边缘无限远的空间区域), $s$ 表示某一微小空间区域, $Q$ 表示该封闭空间区域内的净电荷量, $\varepsilon_0$ 表示真空介电常数.

换言之, 某封闭空间的电通量等于该封闭空间中的净电荷量除以真空介电常数.

- 习题

1-1 已知一均匀带电实心球, 其总电荷量为 $+q$, 半径为 $R$, 求距离球心为 $r$ 的任意一处的 $E$ 的大小.

!!! tip
	略.

1-2 存在一无限长的均匀带电导线, 已知线电荷密度为 $\lambda$, 求到导线垂直距离为 $\rho$ 处的 $E$ 的大小.

!!! tip
	![](https://pan.xxbyq.net/f/Re8sW/%E8%AF%BE%E7%A8%8B-53.jpg)
	
	只考虑侧面积通量, 底面通量为 $0$.

1-3 已知一同轴电缆, 表面极薄. 内半径 $a$ 表面带有电荷量 $+\lambda$, 外半径 $b$ 表面带有电荷量 $-\lambda$, 求各区域 $E(\rho)$.

!!! tip
	![](https://pan.xxbyq.net/f/aExi4/zsc.jpg)

1-4 已知半径为 $R$ 的绝缘球体带电荷, 球体上的任意一点所带电荷量满足到球心的距离公式 $q(r)=\rho r$. 求 $r<R$ 与 $r>R$ 的 $E(r)$.

!!! tip
	![](https://pan.xxbyq.net/f/5O4h0/%E8%AF%BE%E7%A8%8B-53_%E5%89%AF%E6%9C%AC.jpg)

1-5 已知一半径为 $R$ 的空心导体球壳, 向球壳中心放入 $+q$ 的带点粒子, 并将壳外表面接地. 求内腔, 金属层, 球壳外部的 $E$.

!!! tip
	![](https://pan.xxbyq.net/f/zNZcZ/%E8%AF%BE%E7%A8%8B-54.jpg)

1-6 已知存在一个无限大的并且面电荷密度为 $\lambda$ 的均匀带电的薄平板, 求垂直距离为 $h$ 处的电场强度 $E$.

!!! tip
	![](https://pan.xxbyq.net/f/x4piA/%E8%AF%BE%E7%A8%8B-55.jpg)
	
	此处很容易得到一个有趣的结论, 即一个无限大的均匀带电平面两侧任意一点的电场强度与到平面的距离无关.

### 电势, 电场, 电场力做功之间的关系

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

有关此部分的求解核心是记住不要忘记负号的存在.

### 电偶极矩

与其他"矩"相同, 就是电荷量乘以对应电荷到参考点的距离之和. 具体离散形式的定义式:

$$
p=\sum_{i=1}^{n}q_ir_i
$$

- 习题

1-7 两点电荷 $-q$ 与 $+q$ 分别位于 $z=-\frac{a}{2}$, $z=+\frac{a}{2}$, 求总偶极矩 $p$.

!!! tip
	$$
		p=(-q)\times (-\frac{a}{2})+q\times \frac{a}{2}=qa
	$$
	其中, 方向为从参考点指向 $+\frac{a}{2}$.



1-8 对于半径为 $R$ 的绝缘球, 内部均匀极化为 $P=pk$ (其中 $k$ 表示方向为沿 $z$ 正半轴), 求该绝缘球的总偶极矩.

!!! tip
	因为是均匀极化, 所以各个部分的大小都是等大同向的. 据此, 只需要:
	
	$$
	P=\int p\mathrm d V=p\int \mathrm d V=p\times \frac{4\pi R^3}{3}=\frac{4\pi R^3p}{3} 
	$$
	
	其中, 方向为与 $z$ 正半轴同向.

1-9 在 $x\in [-L,L]$ 的细杆上, 线电荷密度 $\lambda(x)=\lambda_0 x$, 求该细杆的总偶极矩

!!! tip
	$$
	P=\int_{x=-L}^{L}x\lambda(x)\mathrm d x=\int_{x=-L}^{L}x(\lambda_0x)\mathrm d x=\lambda_0\int_{x=-L}^L x^2\mathrm d x=\frac{2}{3}\lambda_0 L^3
	$$
	
	其中, 方向为与 $x$ 正半轴同向.

### (静电平衡条件下的)导体表面电场强度的求解

根据高斯定理即可推导. 首先, 根据高斯定理可以确定交界侧的电场分布情况(以朝向外部为正方向, 外部表示极薄表面的外表面, 内部表示极薄表面的内表面):

$$
(E_{外部}-E_{内部})S=\frac{n_{自由}}{\varepsilon_0}
$$

那么, 很容易可以确定, 在静电平衡(内部自由电荷不再移动)时内部电场必定为 $0$, 否则会因为存在电场受力产生加速度而移动, 因此内部的场强必定为 $0$. 因此, 上述式子可以化简为:

$$
E_{外部}S=\frac{n_{自由}}{\varepsilon_0}
$$

自然也可以将 $S$ 除过去, 变为面密度的形式:

$$
E_{外部}=\frac{\sigma}{\varepsilon_0}
$$

另外, 通过电场无旋的特性(感兴趣的可以看看, 不是十分重要)可以推导出仅存在法向电场, 不存在切于分界面的电场.

!!! note
	孤立导体在自然状态下总自由电荷通常为 $0$. 只有满足外部条件, 导致有电荷流进或者流出导体时才能产生自由电荷. 另外, 不是说自由电荷量就是净电荷量. 实际上在净电荷量为 $0$ 时仍然可以用上面的公式, 比如一边外表面为 $+10$ 电荷, 一边外表面为 $-10$ 电荷, 那么只要分别列出两边的求解方程即可. 换言之, 即:
	
	$$
	\sum E_{外部}S=\sum\frac{n_{自由}}{\varepsilon_0}
	$$

1-10 半径为 $R$ 的孤立实心导体球带总电荷 $Q$, 求表面场强与 $\sigma$.

!!! tip
	内部总电荷有 $Q$, 内表面为了静电平衡感应出 $-Q$, 因此外表面感应出 $Q$ 的电荷, 最终 $\sigma=\frac{Q}{4\pi R^2}$. 同样, 电场可以求解: $E=\frac{\sigma}{\varepsilon}=\frac{Q}{4\pi \varepsilon_0 R^2}$.

1-11 某无限大接地导体, 叠加了外部电场后外表面出现了 $\sigma(x,y)$, 求表面电场大小.

!!! tip
	直接根据公式计算即可: $E=\frac{\sigma(x,y)}{\varepsilon_0}$.

1-12 将半径为 $R$ 的接地导体球置于外加匀强场 $E_0$ (方向沿 $z$ 正半轴), 求表面电场与 $\sigma(\theta)$ (其中 $\theta$ 是从原点出发的向量与 $xOy$ 平面之间的夹角).

!!! tip
	(略)

### 电容值的求解

电容定义式: $C=\frac{Q}{U}$, 电容间场强近似计算式: $E=\frac{U}{d}$, 根据高斯定理可以推导(以平行板电容器为例, 具体选择方式参见图示): 

![](https://pan.xxbyq.net/f/QrpfL/%E8%AF%BE%E7%A8%8B-58.jpg)

$$
\begin{align*}
\sum E(S)\Delta S&=\frac{Q}{\varepsilon_r\varepsilon_0}\\
ES&=\frac{Q}{\varepsilon_r\varepsilon_0}\\
E&=\frac{Q}{\varepsilon_r\varepsilon_0S}
\end{align*}
$$

1-13 已知平行板面积 $S=0..02\mathrm m^2$, 板间距 $d=1\mathrm {mm}$, 处在空气介质. 求解 $C$.

!!! tip
	已知 $E=\frac{Q}{\varepsilon_r\varepsilon_0 S}$, 因此:
	
	$$
	\begin{align*}
	\frac{U}{d}&=\frac{Q}{\varepsilon_r\varepsilon_0 S}\\
	C=\frac{Q}{U}&=\frac{\varepsilon_r\varepsilon_0 S}{d}\\
	&=\frac{8.85\times 10^{-12}\times 0.02}{10^{-3}}\\
	&=1.77\times 10^{-10}\,\mathrm F
	\end{align*}
	$$
	

1-13-a 当然, 同轴双层圆柱体也是一种典型的电容器. 设圆柱体的内半径为 $a$, 外半径为 $b$, 圆柱体高为 $l$, 处在空气介质中, 求圆柱体的 $C$.

!!! tip
	思路类似, 将内表面与外表面做同种处理(不可以直接忽视厚度), 则内层向外层的满足高斯定理(设表面到圆柱轴的距离为 $r$):
	
	$$
	E=\frac{Q}{}
	$$