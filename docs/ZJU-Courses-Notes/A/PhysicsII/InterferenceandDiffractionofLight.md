# Chap IV 光的干涉与衍射

!!! quote
	A: 你敢相信, 你其实是许多波搞出来的?! 
	
	B: 宝贝, 我们还没学到那一章.

## 双缝干涉及其干涉条纹

![](https://pan.xxbyq.net/f/VkmTO/%E6%88%AA%E5%B1%8F2025-12-09%2021.26.03.png)

如上图所示, 这是一个典型的双缝干涉. 我们假设 $D\gg x$ 并且 $D\gg d$, 那么很容易推导 $S_1$ 与 $S_2$ 两处光源的相位差(包括 $\delta$ 带来的相位差与两光源之间本身的相位差):

$$
\Delta \varphi=2\pi \cdot \frac{\delta}{\lambda} +(\varphi_2-\varphi_1)
$$

一般而言, 我们都假设 $S_1$ 与 $S_2$ 之间没有初始相位差这一前提进行推导, 因此上述原始式子简化为 $\Delta \varphi=2\pi\cdot \frac{\delta}{\lambda}$. 不难发现, $\delta \approx d\cdot \sin \theta$, 并且 $\frac{\Delta \varphi}{2\pi}$ 本来就表示了两光波之间差多少个波长, 因此原始式子重新变化为: $k\lambda=d\cdot \sin\theta$. 显然, 当 $k=0, \pm 1, \pm2, ...$ 时在 $P$ 点两光波显然叠加增强(即**相长干涉**), 而当 $k=\pm\frac{1}{2}, \pm\frac{3}{2}, ...$ 时在 $P$ 点两光波显然相互抵消(即**相消干涉**). 

我们称 $k=0$ 时的亮条纹为中央亮条纹, $k=\pm1$ 时的亮条纹为第一级亮条纹, $k=\pm 2$ 时的亮条纹为第二级亮条纹, 以此类推. 对于暗条纹, 没有第零级暗条纹, $k=\pm\frac{1}{2}$ 称为第一级暗条纹, $k=\pm\frac{3}{2}$ 称为第二级暗条纹, 以此类推.

接下来思考, 如何计算图中的 $x$? 利用几何关系很容易推导, $\angle PSO\approx\angle S_2S_1\delta=\theta$ ($S$ 表示 $S_1$ 与 $S_2$ 之间的中点), 又因为 $\theta\rightarrow 0$, 因此在 $\tan\theta = \frac{x}{D}$ 基础上: $\tan\theta\approx \theta\approx \sin\theta$, 代入 $k\lambda=d\cdot \sin\theta$ 有: $k\lambda=d\cdot\frac{x}{D}$, 即: $x=\frac{D\lambda}{d}k$. 显然, 两相邻同性质条纹之间的间距为:

$$
\Delta x=x_{k+1}-x_k=\frac{D\lambda}{d}
$$

通过这一式子不难发现, 要想让 $\Delta x$ 变大, 可以选择增大 $D$ 或者减小 $d$. 反过来也是一样的.

## 光程

