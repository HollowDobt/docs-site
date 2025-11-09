# 大学物理(乙) II

!!! abstract
	博主补天时记录的笔记, 是根据 [NoughtQ 前辈提供的 whc 老师的每周要点](https://github.com/NoughtQ/ZJU-Courses-Resources/tree/main/Physics-D1CX-D2QD) 结合历年习题复习时重写的.


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
	E=\frac{Q}{\varepsilon_r\varepsilon_0S}=\frac{Q}{2\varepsilon_r\varepsilon_0\pi rl}
	$$
	
	进一步, 考虑从 $a$ 到 $b$ 的电势差, 这样可以进一步消掉 $Q$ 求解出电容:
	
	$$
	\begin{align*}
	U&=\int_{a}^{b}\frac{Q}{2\varepsilon_r\varepsilon_0\pi l}\cdot \frac{1}{r}=\frac{Q}{2\varepsilon_r\varepsilon_0\pi l}\int_a^b\frac{1}{r}=\frac{Q}{2\varepsilon_r\varepsilon_0\pi l}\ln\frac{b}{a}\\
	\frac{Q}{C}&=\frac{Q}{2\varepsilon_r\varepsilon_0\pi l}\ln\frac{b}{a}\longrightarrow C=\frac{2\varepsilon_r\varepsilon_0\pi l}{\ln\frac{b}{a}}
	\end{align*}
	$$

1-13-b 另外, 同心球壳也是一种典型的电容器. 设内球壳半径为 $a$, 外球壳半径为 $b$, 处在空气介质中, 求双层球壳的电容 $C$.

!!! tip
	思路与圆柱体非常类似, 只是面积公式变为了 $4\pi r^2$, 其他部分几乎没有任何变化. 下面给出另一种稍加改变的情形.

1-13-c 设空气介质中存在一孤立金属球体, 半径 $a$ 已知, 求解其与外部空间构成的电容.

!!! tip
	此类一般就是与无穷远构成电容($b=\infty$).
	
	$$
	\begin{align*}
	E&=\frac{Q}{\varepsilon_r\varepsilon_0 S}=\frac{Q}{\varepsilon_r\varepsilon_0 4\pi r^2}=\frac{Q}{4\varepsilon_r\varepsilon_0 \pi }\cdot \frac{1}{r^2}\\
	U&=\int_a^\infty \frac{Q}{4\varepsilon_r\varepsilon_0 \pi }\cdot \frac{1}{r^2}\mathrm d r=\frac{Q}{4\varepsilon_r\varepsilon_0 \pi }=\frac{Q}{4\varepsilon_r\varepsilon_0 \pi a}\\
	\frac{Q}{C}&=\frac{Q}{4\varepsilon_r\varepsilon_0 \pi a}\longrightarrow C=4\varepsilon_r\varepsilon_0 \pi a
	\end{align*}
	$$

!!! note
	通过完成上面这些例题, 我们得到了求解电容的一般思路: 先求解 $E$, 再积分求解 $U$, 最后换出 $C$.

### 串联和并联电容的等值关系

$$
\begin{align*}
\frac{1}{C_{串}}&=\sum_{i=1}^n\frac{1}{C_i}\\
C_{并}&=\sum_{i=1}^nC_i
\end{align*}
$$

说明: 对于串联, 每个被串联的电容器所带电荷都应该相同. 具体而言, 在电容器电荷平衡时两个电容器之间所连接的导线必须保持电荷平衡, 否则会有电荷移动, 电荷量改变. 唯一达到这种平衡的方式就是让两边的电荷量相等, 产生的场强相等被抵消.

对于并联, 显然两端电压相同, 因此:

$$
\begin{align*}
U&=\frac{Q}{C}\longrightarrow Q=CU\\
Q_{等效}&=C_{等效} U=\sum_{i=1}^n Q_i=U\sum_{i=1}^n C_i\\
&C_{等效}=\sum_{i=1}^n C_i
\end{align*}
$$

### 电极化强度与电场的关系

!!! note
	电偶极矩与电极化强度之间的关系: 二者本质上是对同一物理量的总描述/平均描述. 前者的净总量是总描述, 后者则是净总量除以体积得到的平均描述. 使用严谨数学形式描述如下:
	
	$$
	P=\frac{\sum p_i}{V}
	$$

首先说明, 电极化强度的直接物理意义是"介质内部单位体积所含的电偶极矩矢量和". 用更直观的语言讲, 就是表述电场对单位体积的物体自身电场改变的能力.

对于线性, 各向同性的均匀介质(线性介质):

$$
p=\varepsilon_0\chi_e E
$$

其中 $\chi_e$ 是电极化率, 宏观上表现为相对介电常数减去 $1$: $\varepsilon_r=1+\chi_e$, 是介质本身的属性. 换言之, 上述公式等价于:

$$
p=\varepsilon_0(\varepsilon_r-1)E
$$

### 极化电荷面密度/等效束缚电荷面密度

就是:

$$
\sigma=P\cdot\widehat{a}=\varepsilon_0(\varepsilon_r-1)E\cdot\widehat{a}
$$

其中 $\widehat{a}$ 表示单位向量, 方向与 $P$ 相同. 此处方向的物理意义: 激发会在表面两侧都产生电荷, 其中一侧为正电荷, 另一侧为负电荷. 另一面, 我们认为定义 $P$ 指向偶极矩方向, 即**负电荷指向正电荷**(否则应该很容易发现这种计算得到的电荷方向不可能达成静电平衡). 因此, 此处定义的就是从负电荷指向正电荷的方向.

### 电位移矢量 $D$ 与 $P$, $\varepsilon_0E$ 关系

简言之, 这三个量都可以看做电荷通量的面密度, 只不过指代三种不同的电荷面密度. 满足关系:

$$
D=P+\varepsilon_0E
$$

我们通过高斯定理展开上述表达式:

$$
D=\varepsilon_0(\varepsilon_r -1)E+\varepsilon_0 E=\varepsilon_0\varepsilon_r E=\frac{Q}{S}
$$

$E$ 表征外电场的强弱与方向, 由自由电荷受电场影响产生; $P$ 电极化强度反映介质内部极化程度, 受外部电场激发产生; $D$ 电位移矢量反应宏观下有效电通量的密度.

使用积分形式可以还原为高斯定理(对于封闭曲面), 这就是**电介质中高斯定理求解电场公式**:

$$
\iint_{\Sigma}D(S)\cdot \mathrm d S=\iiint_V (\rho_{自由}+\rho_{束缚})\mathrm d V
$$

其中束缚电荷就是 $P$ 表述的物理量, 自由电荷就是 $E$ 表述的物理量, 净电荷就是 $D$ 表示的物理量.

!!! note
	这里一再强调"表示", 意思是求解方法是一致的. 尤其是 $D$, 我们使用一般高斯定理构造封闭面的技巧这里都是可以用的.

1-14 设一平行板电容器, 极板面积 $S$, 板间距离 $d$, 左半部分(厚度为 $\frac{d}{2}$)为空气, 右半部分插入相对介电常数为 $\varepsilon_r$ 的电介质, 两极板之间加电压 $U$, 求解两个介质中的电场强度 $E_1$, $E_2$, 两个介质中的电位移矢量 $D_1$, $D_2$.

!!! tip
	![](https://pan.xxbyq.net/f/BDLC6/%E8%AF%BE%E7%A8%8B-59.jpg)

### 相对介电常数对电容的影响

前面已经推导出了平行板的电容公式, 即:

$$
C=\frac{\varepsilon S}{d}=\frac{\varepsilon_0\varepsilon_r S}{d}
$$

因此很容易进一步推导, 电容与 $\varepsilon_r$ 成正比. 换句话说, 电压一定的前提下, 在中间为空气的电容器放入其他电介质会成正比地增大所带电荷量.

### 电介质内电场强度下降

我们前面已经推导发现, 电场本身会激发产生束缚电荷, 减小电场强度. 那么, 具体减小的倍数是多少? 达成这种理想的倍数必须满足的物理条件是什么?

一般而言, 我们考虑无自由电荷, 仅存在束缚电荷, 且外部电场为线性场(各向同性介质, 匀强外场)达到静电平衡的情况.

只需要想到, 对于介质内部, 电极化强度 $D$ 计算:

$$
D=\varepsilon_0(\varepsilon_r-1)E
$$

因此, 受激发产生的反向电场强度为 $E'=(\varepsilon_r - 1)E$, 合场强大小为 $E_{合}=E'+E=\varepsilon_r E$.

这就是所谓的下降 $\varepsilon_r$ 倍.