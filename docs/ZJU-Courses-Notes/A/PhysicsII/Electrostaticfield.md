# Chap I 静电场

高中时期我们学习过库伦定律, 对于真空中孤立点电荷形成的电场强度可以表示为:

$$
E=k\frac{Q}{r^2}
$$

上述等式之所以只在"真空中孤立点电荷"这一条件下成立, 是因为空间中的孤立点电荷电场线分布全都都垂直于以点电荷为球心的球体. 既然如此, 我们不妨构造一个半径为 $r$ 的球体, 并定义 $\phi=\vec E\cdot S$, 即电场强度乘以表面积, 其电场强度可以重新表示为:

$$
\vec E\cdot 4\pi r^2\propto Q
$$

成正比关系, 二者之间刚好相差一个常系数. 因此我们再做定义:

$$
\vec E\cdot 4\pi r^2=\frac{Q}{\varepsilon}
$$

后面, 科学家发现 $\varepsilon$ 只与环境因素相关, 起名为**介电常数**.

而在学习过微积分中的第二类曲面积分后, 我们知道, 不一定是 $4\pi r^2$, 实际上只要是连续的封闭曲面, 利用第二类曲面积分中的高斯定理, 都满足:

$$
\iint_{\Sigma}\vec E \cdot \mathrm d S=\frac{Q}{\varepsilon}
$$

这就是静电场中的**高斯定理**. 

## Gauss 定理求解电场

- 原型

$$
\iint_{S}E(s)\ \cdot\ \mathrm d s =\frac{Q}{\varepsilon_0}
$$

其中, $E$ 表示电场强度, $S$ 表示封闭的空间区域(或者边缘无限远的空间区域), $s$ 表示某一微小空间区域, $Q$ 表示该封闭空间区域内的净电荷量, $\varepsilon_0$ 表示真空介电常数.

换言之, 某封闭空间的电通量等于该封闭空间中的净电荷量除以真空介电常数.

- 习题

例 1 已知一均匀带电实心球, 其总电荷量为 $+q$, 半径为 $R$, 求距离球心为 $r$ 的任意一处的 $E$ 的大小.

!!! tip
	略.

例 2 存在一无限长的均匀带电导线, 已知线电荷密度为 $\lambda$, 求到导线垂直距离为 $\rho$ 处的 $E$ 的大小.

!!! tip
	只考虑侧面通量, 上下底面通量均为 $0$.
	
	![](https://pan.xxbyq.net/f/Re8sW/%E8%AF%BE%E7%A8%8B-53.jpg)

例 3 已知一同轴电缆(即内部圆柱体为导体, 外部圆柱壳为极薄的绝缘体), 表面极薄. 内半径 $a$ 对应表面带有电荷量 $+\lambda$, 外半径 $b$ 对应表面带有电荷量 $-\lambda$, 求各区域 $E(\rho)$.

!!! tip
	![](https://pan.xxbyq.net/f/aExi4/zsc.jpg)

例 4 已知半径为 $R$ 的绝缘球体带电荷, 球体上的任意一点所带电荷量满足到球心的距离公式 $q(r)=\rho r$. 求 $r<R$ 与 $r>R$ 的 $E(r)$.

!!! tip
	![](https://pan.xxbyq.net/f/5O4h0/%E8%AF%BE%E7%A8%8B-53_%E5%89%AF%E6%9C%AC.jpg)

例 5 已知一半径为 $R$ 的空心导体球壳, 向球壳中心放入 $+q$ 的带电粒子, 并将壳外表面接地. 求内腔, 金属层, 球壳外部的 $E$.

!!! tip
	接地的意思是 $\varphi=0$, 我们可以借此推断空心导体球壳表面所带电荷.
	
	![](https://pan.xxbyq.net/f/zNZcZ/%E8%AF%BE%E7%A8%8B-54.jpg)

例 6 已知存在一个无限大的并且面电荷密度为 $\lambda$ 的均匀带电的薄平板, 求到平板垂直距离为 $h$ 处的电场强度 $E$.

!!! tip
	直接将两层平面看做一个封闭的曲面计算即可.
	
	![](https://pan.xxbyq.net/f/x4piA/%E8%AF%BE%E7%A8%8B-55.jpg)
	
	此处可以得到一个有趣的结论, 即一个无限大的均匀带电平面两侧任意一点的电场强度与到平面的距离无关.

## 电势, 电场, 电场力做功之间的关系

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

有关此部分的求解核心是记住不要忘记负号的存在, 记住 $E=-\frac{\mathrm d V}{\mathrm d r}$.

### 甲-2018-2

某区域内 $U=ax^2+bxy-cz^3$, 已知 $a,b,c$ 均为常量. 求该区域内任意一点的电场强度 $E$.

!!! tip
	涉及了一些负号, 最终得到结果时注意不要省略.
	
	$$
	E=-\frac{\mathrm d U}{\mathrm d t}=-(\frac{\partial U}{\partial x}i+\frac{\partial U}{\partial y}j+\frac{\partial U}{\partial z}k)=-((2ax+by)i+bxj-3cz^2k)=(-(2ax+by), -bx,3cz^2)
	$$

### 甲-2018-4

如图所示, 半径为 $R$ 的中性金属球壳外有一点电荷 $q$, 与球心 $O$ 相距为 $l$($l > R$), 设它们离地都很远. 则球内各点的电势为? 如果金属球接地, 则球上总感应电荷量为?

![](https://pan.xxbyq.net/f/YGYi0/%E6%88%AA%E5%B1%8F2025-11-12%2009.26.08.png)

!!! note
	实心导体在静电平衡时所有电荷必定分布在外表面. 空心球壳导体在静电平衡时除非球壳内包裹有带电体, 否则所有电荷同样必定分布在外表面. 利用高斯定理选择导体球壳壳内外表面之间的球面作为封闭曲面, 很容易发现 $E\cdot S=\frac{Q_{内表面}}{\varepsilon_0}$.

!!! tip
	我们将球壳等效到 $O$ 点, 求得 $q$ 对球壳产生的电势为 $\varphi_1=\frac{1}{4\pi \varepsilon_0}\frac{q}{l}$, 从而得到球内任意一点的电势 $\varphi=\varphi_1=\frac{q}{4\pi \varepsilon_0}\frac{1}{l}$ (感应电荷不会产生影响, 因为球壳上的总电荷量始终为 $0$) . 对于第二问, 若接地, 则 $\varphi=0$, 空心球壳的 $\varphi_2=\frac{Q}{4\pi\varepsilon_0}\frac{1}{R}$, 二者相加有: $\varphi=\varphi_1+\varphi_2=\frac{1}{4\pi\varepsilon_0}(\frac{q}{l}+\frac{Q}{R})=0$, 解得: $Q=-\frac{R}{l}q$.

### 乙-2018-4

如图所示, 一封闭的导体空腔 $A$ 内有两个导体 $B$ 和 $C$. $A$, $C$ 不带电, $B$ 带正电, 则三个导体中电势最高的是哪个? 最低的又是哪个导体?

![](https://pan.xxbyq.net/f/vwKsy/%E6%88%AA%E5%B1%8F2025-11-14%2020.11.10.png)

!!! tip
	抓住一个关键点, 导体在静电平衡后是等势体. 只需要考虑下面的电场线即可:
	
	![](https://pan.xxbyq.net/f/VKaCO/d-25.jpg)
	
	换言之, $C$ 是 $B$ 到 $A$ 电场线上的一个等势体, 因此必然有: $V_B>V_C>V_A$.
	
	另外再次强调, 导体在静电平衡的前提下只有导体表面才能带电荷, 导体内部无电荷. 因此 $C$ 右侧带负电, 左侧带正电.

### 乙-2018-5

如图所示, 一半径为 $a$ 的"无限长"圆柱面上均匀带电, 其电荷线密度为 $\lambda$. 在它外面同轴地套有一半径为 $b$ 的薄金属圆筒, 圆筒原先不带电, 但与地连接. 设地的电势为零, 则在内圆柱面里面且距离轴线为 $r$ 处 $P$ 点的电势大小是多少?

![](https://pan.xxbyq.net/f/bKYiM/%E6%88%AA%E5%B1%8F2025-11-14%2020.20.25.png)

!!! tip
	本题是一个脑筋急转弯. 首先, 根据高斯定理和对称性, 以及导体静电平衡后的性质, $P$ 点场强为 $0$, 自然电势大小和内圆柱面表面电势大小一致, 因此只需要求解这个内圆柱面构成的无限大圆柱体的电势即可. 那么, 先计算电场强度: $E\cdot 2\pi r=\frac{\lambda}{\varepsilon_0}$, 得到: $E=\frac{\lambda}{2\pi \varepsilon_0}\frac{1}{r}$接下来, 从中心轴到零电势点积分确定电势大小: $V=\int_a^b\frac{\lambda}{2\pi \varepsilon_0}\frac{1}{r}\mathrm d r=\frac{\lambda}{2\pi \varepsilon_0}\ln\frac{b}{a}$.

## 电偶极矩

与其他"矩"相同, 就是电荷量乘以对应电荷到参考点的距离之和. 离散形式的定义式:

$$
\vec p=\sum_{i=1}^{n}q_i\cdot \vec r_i
$$

- 习题

例 7 两点电荷 $-q$ 与 $+q$ 分别位于 $z=-\frac{a}{2}$, $z=+\frac{a}{2}$, 求总偶极矩 $p$.

!!! tip
	$$
		p=(-q)\times (-\frac{a}{2})+q\times \frac{a}{2}=qa
	$$
	其中, 方向为从参考点指向 $+\frac{a}{2}$.

例 8 对于半径为 $R$ 的绝缘球, 内部均匀极化为 $P=p\widehat k$ (其中 $\widehat k$ 表示方向为沿 $z$ 正半轴), 求该绝缘球的总偶极矩.

!!! tip
	因为是均匀极化, 所以各个部分的大小都是等大同向的. 据此, 只需要:
	
	$$
	P=\int p\mathrm d V=p\int \mathrm d V=p\times \frac{4\pi R^3}{3}=\frac{4\pi R^3p}{3} 
	$$
	
	其中, 方向为与 $z$ 正半轴同向.

例 9 在 $x\in [-L,L]$ 的细杆上, 线电荷密度 $\lambda(x)=\lambda_0 x$, 求该细杆的总偶极矩

!!! tip
	$$
	P=\int x\mathrm d q= \int_{-L}^{L}x\lambda(x)\mathrm d x=\int_{-L}^{L}x(\lambda_0x)\mathrm d x=\lambda_0\int_{-L}^L x^2\mathrm d x=\frac{2}{3}\lambda_0 L^3
	$$
	
	其中, 方向为与 $x$ 正半轴同向.

## (静电平衡条件下的)导体表面电场强度的求解

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

例 10 半径为 $R$ 的孤立实心导体球带总电荷 $Q$, 求表面场强与 $\sigma$.

!!! tip
	自然, 在经典平衡时, 孤立导体的电荷(同时也是自由电荷)仅分布在导体表面, 因此 $\sigma=\frac{Q}{4\pi R^2}$. 电场也可求解: $E=\frac{\sigma}{\varepsilon}=\frac{Q}{4\pi \varepsilon_0 R^2}$.

例 11 某无限大接地导体, 叠加了外部电场后外表面出现了 $\sigma(x,y)$, 求表面电场大小.

!!! tip
	直接根据公式计算即可: $E=\frac{\sigma(x,y)}{\varepsilon_0}$.

## 电容值的求解

电容定义式: $C=\frac{Q}{U}$, 电容间场强近似计算式: $E=\frac{U}{d}$, 根据高斯定理可以推导(以平行板电容器为例, 具体选择方式参见图示): 

![](https://pan.xxbyq.net/f/QrpfL/%E8%AF%BE%E7%A8%8B-58.jpg)

$$
\begin{align*}
&\sum E(S)\Delta S=\frac{Q}{\varepsilon_r\varepsilon_0}\\
&ES=\frac{Q}{\varepsilon_r\varepsilon_0}\\
&E=\frac{Q}{\varepsilon_r\varepsilon_0S}
\end{align*}
$$

例 12 已知平行板面积 $S=0..02\mathrm m^2$, 板间距 $d=1\mathrm {mm}$, 处在空气介质. 求解 $C$.

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
	

例 13-a 同轴双层圆柱体是一种典型的电容器. 设圆柱体的内半径为 $a$, 外半径为 $b$, 圆柱体高为 $l$, 处在空气介质中, 求圆柱体的 $C$.

!!! tip
	思路类似:
	
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

例 13-b 同心球壳也是一种典型的电容器. 设内球壳半径为 $a$, 外球壳半径为 $b$, 处在空气介质中, 求双层球壳的电容 $C$.

!!! tip
	思路与圆柱体非常类似, 只是面积公式变为了 $4\pi r^2$, 其他部分几乎没有任何变化. 下面给出另一种稍加改变的情形.

例 13-c 设空气介质中存在一孤立金属球体, 半径 $a$ 已知, 求解其与外部空间构成的电容.

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

## 串联和并联电容的等值关系

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

### 甲-2018-3

⼀空⽓平⾏板电容器, 两板间距为 $d$, 极板上带电量分别为 $+q$ 和 $- q$ , 板间电势为 $U$, 忽略边缘效应; 将电源断开, 在两板间平⾏插⼊⼀厚度为 $t( t < d )$ 的⾦属板, 则板间电势差变为多少? 此时电容器的电容值又为多少?

!!! tip
	高中时期学过, 串联方式插入厚度为 $t$ 的金属板相当于减小了 $t$ 的板间距, 因为一般情况下金属板的相对介电常数达到无穷大, 在串联条件下 $\frac{1}{C_{金属}}=0$. 再根据 $C=\frac{\varepsilon_0\varepsilon_r S}{d}$ 知 $C=\frac{\varepsilon_0\varepsilon_rS}{d-t}$, 同时开路后 $Q$ 不变, 利用 $C=\frac{Q}{U}$ 解得 $U = (1-\frac{t}{d})U$.

## 电极化强度与电场的关系

!!! note
	电偶极矩与电极化强度之间的关系: 二者本质上是对同一物理量的总描述/平均描述. 前者的净总量是总描述, 后者则是净总量除以体积得到的平均描述. 使用严谨数学形式描述如下:
	
	$$
	\vec P=\frac{\sum\vec p_i}{V}
	$$

电极化强度的直接物理意义是"介质内部单位体积所含的电偶极矩的矢量和". 用更直观的语言讲, **电极化强度表述介质因外部电场而感应产生的电场的强度**

对于线性, 各向同性的均匀介质(线性介质):

$$
\vec P=\varepsilon_0\chi_e\vec E
$$

其中 $\chi_e$ 是电极化率, 宏观上表现为相对介电常数减去 $1$: $\varepsilon_r=1+\chi_e$, 是介质本身的属性. 换言之, 上述公式等价于:

$$
p=\varepsilon_0(\varepsilon_r-1)E
$$

## 极化电荷面密度/等效束缚电荷面密度

电极化强度和极化电荷面密度的关系如下, 即单位体积的密度乘以线长度等于面密度:

$$
\sigma=P\cdot\widehat{a}=\varepsilon_0(\varepsilon_r-1)E\cdot\widehat{a}
$$

其中 $\widehat{a}$ 表示单位向量, 方向与 $P$ 相同. 此处方向的物理意义: 激发会在表面两侧都产生电荷, 其中一侧为正电荷, 另一侧为负电荷. 另一面, 我们认为定义 $P$ 指向偶极矩方向, 即**负电荷指向正电荷**(否则应该很容易发现这种计算得到的电荷方向不可能达成静电平衡). 因此, 此处定义的就是从负电荷指向正电荷的方向.

## 电位移矢量 $D$ 与 $P$, $\varepsilon_0E$ 关系

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

其中束缚电荷就是 $P$ 表述的物理量, 净电荷就是 $E$ 表述的物理量, 自由电荷就是 $D$ 表示的物理量.

!!! note
	这里一再强调"表示", 意思是求解方法是一致的. 尤其是 $D$, 我们使用一般高斯定理构造封闭面的技巧这里都是可以用的.

例 14 设一平行板电容器, 极板面积 $S$, 板间距离 $d$, 左半部分(厚度为 $\frac{d}{2}$)为空气, 右半部分插入相对介电常数为 $\varepsilon_r$ 的电介质, 两极板之间加电压 $U$, 求解两个介质中的电场强度 $E_1$, $E_2$, 两个介质中的电位移矢量 $D_1$, $D_2$.

!!! tip
	![](https://pan.xxbyq.net/f/BDLC6/%E8%AF%BE%E7%A8%8B-59.jpg)

### 甲-2018-II

真空中一无限大带电导体板两侧面的电荷面密度均为 $\sigma$, 现在导体板右侧充满介电常数为 $\varepsilon$ 的均匀电介质. 试求: (1) 如图所示, 导体板左侧面、右侧面上的自由电荷面密度 $\sigma_1$, $\sigma_2$ 以及电介质表面的极化电荷面密度 $\sigma'$; (2) 导体板左、右两侧的电场强度的大小和方向.

![](https://pan.xxbyq.net/f/1NKhe/%E6%88%AA%E5%B1%8F2025-11-14%2017.08.27.png)

!!! tip
	关键之处是理解到, $D$ 代表的是自由电荷量, $P$ 是因为自由电荷而产生的束缚电荷, 而 $E$ 是综合 $D$, $P$ 得到的净电荷量. 左侧就是真空环境, 因此 $E\cdot \varepsilon_0=D$, 进一步 $E_1=\frac{\sigma_1}{\varepsilon_0}$. 右侧是 $\varepsilon$ 环境, 因此 $|E\cdot \varepsilon_0| = |D_2| - |P|$ (加绝对值表示后面不考虑方向), 即: $E\cdot \varepsilon_0=\sigma_2-\varepsilon_0(\varepsilon_r-1)E$, 进一步 $E\cdot \varepsilon_0=\sigma_2-(\varepsilon-\varepsilon_0)E$, 即 $E\cdot\varepsilon=\sigma_2$. 据此, $E_2=\frac{\sigma_2}{\varepsilon}$ (这里简单使用高斯定理导出的结论是相同的, 某种程度上证明了高斯定理和电位移矢量($D$), 极化电荷面密度($P$), 电场强度($E$)关系式是等效的). 欲达到导体板两侧的静电平衡, 那么必然有: $E_1=E_2$, 换言之: $\frac{\sigma_1}{\varepsilon_0}=\frac{\sigma_2}{\varepsilon}$. 再结合左右自由电荷之和为 $2\sigma$, 联立解得: $\sigma_1=2\sigma\frac{\varepsilon_0}{\varepsilon_0+\varepsilon}$, $\sigma_2=2\sigma\frac{\varepsilon}{\varepsilon_0+\varepsilon}$. 进一步, 代回到前面的表达式, 即可得到束缚电荷密度 $\sigma'=2\sigma\frac{\varepsilon-\varepsilon_0}{\varepsilon+\varepsilon_0}$. 对于第二问, 直接代回到两个场强表达式, 解得 $E_1=\frac{2\sigma}{\varepsilon+\varepsilon_0}$, 方向水平向左; $E_2=\frac{2\sigma}{\varepsilon+\varepsilon_0}$, 方向水平向右(导体内部达到静电平衡, 因此中间的电场强度为 $0$).

## 相对介电常数对电容的影响

前面已经推导出了平行板的电容公式, 即:

$$
C=\frac{\varepsilon S}{d}=\frac{\varepsilon_0\varepsilon_r S}{d}
$$

因此很容易进一步推导, 电容与 $\varepsilon_r$ 成正比. 换句话说, 电压一定的前提下, 在中间为空气的电容器放入其他电介质会成正比地增大所带电荷量.

## 电介质内电场强度下降 $\varepsilon_r$ 倍的条件

我们前面已经推导发现, 电场本身会激发产生束缚电荷, 减小电场强度. 那么, 具体减小的倍数是多少? 达成这种理想的倍数必须满足的物理条件是什么?

一般而言, 我们考虑无自由电荷, 仅存在束缚电荷, 且外部电场为线性场(各向同性介质(各方向极化响应相同), 线性(极化强度与外部匀强电场场强成正比), 匀强外场)达到静电平衡的情况.

只需要想到, 对于介质内部, 电极化强度 $D$ 计算:

$$
D=\varepsilon_0(\varepsilon_r-1)E
$$

因此, 受激发产生的反向电场强度为 $E'=(\varepsilon_r - 1)E$, 合场强大小为 $E_{合}=E'+E=\varepsilon_r E$.

这就是所谓的下降 $\varepsilon_r$ 倍.

## 求充满多组/多层平板电容器电容

这个问题的意思就是, 电容器极板间填充了若干层不同介质, 求解等效电容. 求解时只需要抓住一个关键点, **影响理想电容器电容值的只有中间部分的电介质**, 因此只需要将中间部分的电介质当做电容, 对其做与普通电容器并联/串联等效同样的操作即可. 换言之, 直接按下面的方式等效:

$$
\begin{align*}
\frac{1}{C_{串联式}}&=\sum_{i=1}^n\frac{1}{C_i}=\sum_{i=1}^n\frac{d_i}{\varepsilon_0\varepsilon_{r_i}S}=\frac{1}{\varepsilon_0S}\sum_{i=1}^n \frac{d_i}{\varepsilon_{r_i}}\\
C_{并联式}&=\sum_{i=1}^n C_i=\sum_{i=1}^n\frac{\varepsilon_0\varepsilon_{r_i}S}{d_i}=\varepsilon_0S\sum_{i=1}^n \frac{\varepsilon_{r_i}}{d_i}
\end{align*}
$$

## 求点电荷组的静电能

这个问题就是, 在一个空间(一般会简化为一个平面)中存在大量点电荷, 而我们需要求解所有的这些点电荷的总静电能. 这是一种势能, 并且只考虑相互作用能, 不考虑电荷自身的能量. 其计算公式为:

$$
W=\frac{1}{4\pi \varepsilon_0}\sum_{i<j}\frac{q_iq_j}{r}
$$

这里要求 $i<j$ 表示确保每一对电荷只会被计算一次.

## 求电容器的静电能

只需要考虑充电过程消耗的能量, 设充满电所带电荷量为 $Q$:

$$
W=\int_{0}^QU(q)\mathrm d q=\int_0^Q \frac{q}{C}\mathrm d q=\frac{Q^2}{2C}=\frac{(CU)^2}{2C}=\frac{1}{2}CU^2
$$

上面唯一可能造成误解的地方是 $U(q)$. 电容器是典型的电荷量产生电压的组件, 换言之是先有电荷量才能有电压, 有了电荷量才产生了电场, 产生了电压.

对于两个平板之间的静电场的能量密度:

$$
u=\frac{W}{V}=\frac{\frac{1}{2}CU^2}{Sd}=\frac{\frac{S\varepsilon_0}{d}(Ed)^2}{2Sd}=\frac{1}{2}\varepsilon_0E^2
$$

上述计算公式对于宏观情况而言仅在某些情况下成立(具体而言, 线性且各向同性的电场中才成立, 但这已经是大部分情况). 下面是更通用的计算式:

$$
W=\frac{\varepsilon_0}{2}\iiint_V E^2 \mathrm d V
$$

如果用微分的形式更好理解, 即对于任意线性电场(即某一小段可以将电场线视作直线)中的某一点处的能量密度都满足:

$$
u=\frac{1}{2}\varepsilon_0\varepsilon_rE^2
$$

!!! note
	一个容易混淆的地方是, 电场能就是电场本身具有的能量, **不是电势**!!! 与外部其他物体, 点电荷等无关. 换言之, 能量密度的单位就是 $J/m^3$.

### 甲-2018-5

半径为 $a$ 的长直导线, 外面套有共轴导体圆筒, 圆筒内半径为 $b$, 导线与圆筒间充满相对介电常数为 $\varepsilon_r$ 的均匀电介质. 设沿轴线单位长度上导线均匀带电 $+\lambda$, 圆筒均匀带电 $-\lambda$, 忽略边缘效应, 那么沿轴线单位长度的电场能量为多少?

!!! tip
	![](https://pan.xxbyq.net/f/qOGI7/%E8%AF%BE%E7%A8%8B-70.jpg)


## 求连续电荷分布体系的静电能

核心就是求积分.

例 15 已知一半径为 $R$, 电荷密度为 $\rho$ 的绝缘均匀带电实心球, 求其静电能.

!!! tip
	比较麻烦但稳妥的一种方式是, 使用从电势到静电能(电势能)的思路进行求解.
	
	![](https://pan.xxbyq.net/f/0L8im/%E8%AF%BE%E7%A8%8B-63%202.jpg)
	
	另一种? 我也不太会用哈哈哈.
