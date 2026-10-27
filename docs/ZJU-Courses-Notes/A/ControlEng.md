# 控制工程基础

!!! abstract
	控制, 用数学的视角分析系统.
	
	许多同学在学习这个课程之前应该都用过 PID, 不过是否能清楚地调整 PID 参数呢? 也许是有实践上的经验, 但是理论上的内容也许不那么清晰. 如果你学会了这部分内容, 那么你将能从理论上分析并直接设计出一个控制系统, P, I, D 参数自然也包括在此中.

## 控制系统的误差分析与计算

---

!!! tip
	这是我自己学习过程中产生的问题, 如果没有明白的话这个章节的操作都是无法理解的哦(也许大家很聪明没这个问题叭)!
	
	控制系统中的"误差"是什么呢?
	
	理论上, 每个系统对于确定的输入都有确定的输出, 是没有"误差"的概念的. 但是现实中, 我们需要设计系统以满足每个输入对应一个输出, 也就是说我们是先确定了控制目标再设计系统的.
	
	本章所定义的稳态误差, 指的是在系统达到稳态后**理想输出**(也就是输入偏差等于 0)和实际输出(这是因为很多控制系统在达到稳定之后输入偏差仍然不等于 0)之间的差值.
	
	这也为我设计控制系统提供了可行的第一步思路: 先把 $H(s)$ 设计出来, 这就是我们目标需要达到的输出.

### 稳态误差

![](https://hollow.ink/s3/public/20261011e98ac8cfe0931caaf9cee450a3e3fe.png)

如图, 这是一个典型的闭环反馈控制系统. 我们做如下说明:

- 偏差信号(也称偏差函数, 偏差. 其他几个同理)等于输入信号减反馈信号, 也就是 $\varepsilon(s) = x_i(t)-y(t)$ (注意这是时域下的符号, 示意图中是频域下的符号).
- 误差信号等于期望输出信号减实际输出信号, 也就是 $e(s) = x_{oi}(t)-x_o(t)$.
- **稳态误差**就是误差信号的稳态分量, 记作 $e_{ss}=\lim_{t\rightarrow\infty}e(t)$. 根据终值定理, $\lim_{t\rightarrow\infty}e(t)=\lim_{s\rightarrow 0}sE(s)$.

!!! warning
	稳态误差的计算公式已经表明稳态误差的分析前提是系统能在最终达到稳态.
	
	因为终值定理成立的充要条件是 $sE(s)$ 的所有极点对应值之实部为负. 若闭环系统不稳定, $t\rightarrow\infty$ 时实际输出 $x_o(t)$ 无法收敛, 系统根本无法进入稳态.
	
	**所以, 在进行稳态误差分析计算前, 务必先用劳斯判据等验证闭环系统的稳定性.**

- $\mu(s)$ 表示的是理想稳态情况下(也就是偏差和误差信号都等于 0)的 $X_i(s)$ 到 $X_o(s)$ 传递函数. 根据偏差和误差信号等于 0, 我们得到 $X_i(s)=Y(s)=H(s)X_o(s)$, $X_i(s)\mu(s) = X_o(s)$. 于是联立得到 $\mu(s) = \frac{1}{H(s)}$.
- $\mu(s)$ 对于每个系统显然都是唯一的. 因此知道 $H(s)$ 后我们就知道误差信号 $E(s) = \frac{1}{H(s)}X_i(s) - X_o(s)=\frac{1}{H(s)}(X_i(s) - Y(s))=\frac{1}{H(s)}\varepsilon(s)$.
- $N(s)$ 指干扰信号. 干扰信号对系统稳态误差的影响通过其对 $X_o(s)$ 的影响, 影响到 $Y(s)$, 并进一步影响到 $\varepsilon(s)$.具体推导如下所示:

![](https://hollow.ink/s3/public/202610cd4742a05b2c150495c2f97d8591d73f.png)

### 输入引起的稳态误差

![](https://hollow.ink/s3/public/2026104ba5acda9c89f1e877a75fe9ec1b4dbf.png)

如图, 这是一个反馈控制系统. 我们做如下说明:

- **输入信号引起稳态误差的误差传递函数** $\Phi_e(s)=\frac{E(s)}{X_i(s)}$. 带入上面已有方程:

$$
\Phi_e(s)=\frac{\frac{1}{H(s)}\varepsilon(s)}{X_i(s)}=\frac{X_i(s)-H(s)X_o(s)}{H(s)X_i(s)}=\frac{1}{H(s)}(1-\frac{H(s)G(s)}{1+H(s)G(s)})=\frac{1}{H(s)[1+G(s)H(s)]}
$$

- 偏差传递函数定义类似: $\Phi_\varepsilon(s)=\frac{\varepsilon(s)}{X_i(s)}$, 就是把上面的传递函数乘以 $H(s)$ 即可.
- **稳态偏差** $\varepsilon_{ss} = \lim_{s\rightarrow 0}s\varepsilon(s)=\lim_{s\rightarrow 0}\frac{s}{1+G(s)H(s)}X_i(s)$.
- **稳态误差** $e_{ss} = \lim_{s\rightarrow 0}s E(s)=\lim_{s\rightarrow 0}\frac{s}{H(s)[1+G(s)H(s)]}X_i(s)$. 由于一般情况下 $H(s)$ 是常值, 也有: $e_{ss}=\frac{\varepsilon_{ss}}{H}$.

从上面的分析可以看出来, 稳态误差同时取决于系统的参数和输入信号.

!!! example
	![](https://hollow.ink/s3/public/202610d7a725a6ce5297d84d3814c976a735fe.png)

!!! example
	![](https://hollow.ink/s3/public/20261060ad97bbcd5ff1729c7338dad9dd7e30.png)
	
	顺馈校正, 也叫作前馈校正. 因为乘上后不改变极点, 所以显然也不会影响稳定性.
	
	![](https://hollow.ink/s3/public/202610306ec1df76568b466aebb5a0f54daf37.png)

!!! example
	![](https://hollow.ink/s3/public/2026108c0fcf9f635f8ff416bbd29bd31d18d1.png)
	
	![](https://hollow.ink/s3/public/2026109c2df8d310f4461e3c9ace5dedf70bb6.png)

![](https://hollow.ink/s3/public/2026106e17ac8b45667a96b18d5f5b1f749cdd.png)

开环型次, 就是 $I$ 型 $II$ 型系统的那个型次.

- 我们定义 **静态位置误差系数** $K_p=\lim_{s\rightarrow 0}G(s)H(s)=G(0)H(0)$, 对于单位阶跃响应(下面的 $K$ 就是 $K_p$):

![](https://hollow.ink/s3/public/202610d15e8eb8e26ce3c5246670173eabfe07.png)

因为:

![](https://hollow.ink/s3/public/202610ac3c3d6af61c3b60eecde5dd27d9e29a.png)

- 对于单位斜坡响应, 此时因为输入在频域下变为 $\frac{1}{s^2}$, $s\Phi_e(s)X_i(s)=\frac{1}{s}\Phi_e(s)=\frac{1}{s+sG(s)H(s)}$, 故我们规定**静态速度误差系数** $K_v=\lim_{s\rightarrow 0}sG(s)H(s)$, 于是响应为:

![](https://hollow.ink/s3/public/2026107ee71aea31d1c7ea8f9acb5e3c7d28fd.png)

因为:

![](https://hollow.ink/s3/public/20261087d873e4724528a855731b9ac3d669d7.png)

- 对于单位加速度响应, 类似地:

![](https://hollow.ink/s3/public/2026107ba7c76f06be8f66931787c31557f1ff.png)

