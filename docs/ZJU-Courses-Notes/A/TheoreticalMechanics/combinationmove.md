# Chap III 点的合成运动


## 3. 1 相对运动/牵连运动/绝对运动

---

- **绝对运动** 动点对于定参考系的运动(点的运动)
- **相对运动** 动点对于动参考系的运动(点的运动)
- **牵连运动** 动参考系对于定参考系的运动(刚体的运动)

速度合成定理: 动点的绝对速度等于其牵连速度加相对速度的矢量和. 速度表达式为

$$
\vec{v_a}=\vec{v_e}+\vec{v_r}
$$

为了在未来准确, 系统地描述复杂体系中物体的速度与加速度, 以后我们将使用完全方程的方法描述速度与加速度.

### 3. 1. 1 求解套筒相对于 $O_1B$ 的速度

已知 $\omega=10rad/s$, $OA=60cm$, $OO_1=25cm$, $\phi=60^{\circ}$, 求: $\omega_{O_1B}$, $v_r$ (套筒相对于 $O_1B$ 的速度)

![例3.1.1](https://pan.xxbyq.net/f/44Giq/%E6%88%AA%E5%B1%8F2025-10-21%2008.22.40.png)

![3.1.1参考答案](https://pan.xxbyq.net/f/d7ycR/%E5%B0%8F%E8%BD%A6-6.jpg)

**拓展练习**

已知：凸轮以匀速度向左移动. 求: $\theta=30^\circ$ 时, $B$ 的速度.

![图](https://pan.xxbyq.net/f/8MZtk/%E6%88%AA%E5%B1%8F2025-10-21%2009.04.17.png)

![参考答案](https://pan.xxbyq.net/f/NXDfy/%E5%B0%8F%E8%BD%A6-6_%E5%89%AF%E6%9C%AC.jpg)

### 3. 1. 2 风吹吹问题

一人以 $v = 4$ 公里/小时的速度向东行时, 感觉风从正北吹来. 如将速度增加一倍, 则感觉风从东北吹来. 试求风速及风向.

![3.1.2参考答案](https://pan.xxbyq.net/f/MpJH1/%E5%B0%8F%E8%BD%A6-6_%E5%89%AF%E6%9C%AC2.jpg)

!!! note
	从此之后将只列出方程表示有解. 因为正交分解法一定可以解出这一方程.

### 3. 1. 3 刨床摇杆机构问题

图示刨床的滑道摇杆机构, 已知曲杆 $OA$ 以匀角速 $\omega_0$ 绕 $O$ 转动. 已知 $OA=r$, $OO_1=\sqrt 3 r$, $O_1C=2\sqrt 3 r$, 当曲杆水平, $\alpha=30^\circ$ 时, 求杆 $O_1D$ 的角速度, $CE$ 的速度.

![](https://pan.xxbyq.net/f/P46ty/%E6%88%AA%E5%B1%8F2025-10-21%2009.25.20.png)

![](https://pan.xxbyq.net/f/WEXhQ/%E8%90%A8%E8%BE%BE.jpg)

### 3. 1. 4 双杆交汇点运动分析

杆 $AB$, $CD$ 平动, 已知 $\vec{v_1}$, $\vec{v_2}$, $\phi$, 求 $M$ 点的速度.

![](https://pan.xxbyq.net/f/YwoU0/%E6%88%AA%E5%B1%8F2025-10-23%2010.21.53.png)

 ![](https://pan.xxbyq.net/f/qb0u7/sadf.jpg)

## 3. 2 牵连运动中的加速度合成定理

---

核心关注参考系的加速度问题.

- **参考系平动**: 显然, 平动时参考系上任意一点的速度都是相同的, 因此对于其上任意一点的速度对时间的导数也是恒定相同的. 进一步, 参考系下的点其速度合成为: $v=v'+v_r$, 因此 $\frac{\mathrm d v}{\mathrm d t}=\frac{\mathrm d v'}{\mathrm d t} + \frac{\mathrm d v_r}{\mathrm d t}=a'+a_r$.

- **参考系转动**: 显然, 转动时参考系上只有到转轴距离相同的点的速率是相同的, 各个点速度不同. 对于速度, 任意一点都能表达为 $\omega\times r$ (其中 $r$ 为该点到转轴的距离). 因此, 对于相对于该点运动的点, 速度合成可以表示为 $\omega\times r + v_r$, 求导: $\frac{r\times\mathrm d \omega}{\mathrm d t} + \frac{\omega \times\mathrm d r}{\mathrm d t} + \frac{\mathrm d v_r}{\mathrm d t} = r\times \alpha + \omega\times v + \frac{\mathrm d v}{\mathrm d t}$. 注意到 $\frac{\mathrm d i}{\mathrm d t}=\omega\times i$. 对于物体的加速度, 即 $\frac{\mathrm d v}{\mathrm d t} = \frac{\mathrm d (v_xi+v_yj+v_zk)}{\mathrm d t}=a_r + \omega\times(v_xi+v_yj+v_zk)=a_r+\omega\times v_r$. 因此, 综合前面所有公式, 确定了转动条件下的加速度合成公式:

$$
a=a_r+a_{\alpha}+2\omega\times v_r
$$

即, 总加速度等于物体在这一刻相对于参考系的加速度加上因为转动速度发生变化参考系产生的加速度加上两倍的参考系的转动角速度叉乘物体在参考系下的运动速度.

另外, 我们称 $a_c=2\omega\times v_r$ 为科氏加速度.

### 3. 2. 1 参考系平动例题

设 $OA＝O_1B＝r$, 斜面倾角为 $\theta_1$, $O_2D＝l$, $D$ 点可以在斜面上滑动; $A$, $B$为铰链连接. 图示位置时 $OA$, $O_1B$铅垂，$AB$, $O_2D$ 为水平, 已知此瞬时 $OA$ 转动的角速度为 $\omega$, 角加速度为零, 试求此时 $O_2D$ 绕 $O_2$ 转动的角速度和角加速度.

![](https://pan.xxbyq.net/f/ybbFZ/%E6%88%AA%E5%B1%8F2025-10-23%2011.21.28.png)

![](https://pan.xxbyq.net/f/AyPcP/dfghjkl.jpg)

解决加速度问题和速度的思路几乎一样. 唯一值得注意的是, 加速度需要考虑在转动时指向圆心的 $a_n$, 并且 $a_n$ 恒等于 $\frac{v^2}{\rho}$.

### 3. 2. 2 参考系绕定轴转动例题

已知: $OA=r$, $OO_1=l$, $\omega$, $\varphi$, $\alpha=0$, 求: $\alpha_{O_1A}$.

![](https://pan.xxbyq.net/f/051hm/%E5%B0%8F%E8%BD%A6-31.jpg)

### 3. 2. 3 补充习题

已知: $R=20cm$, $\omega=2rad/s$, $\alpha=0$, $\varphi=\frac{\pi}{6}$. 求: 圆柱中心 C 点的速度和加速度.

提示: 将圆柱体视作不滚动的刚体, 这样可以等效得到柱体上多点的速度.

![](https://pan.xxbyq.net/f/pqpfV/%E5%B0%8F%E8%BD%A6-32.jpg)

### 3. 2. 4 补充思考题 1

空气压缩机的工作以角速度 $\omega$ 绕垂直于图面的 $O$ 轴匀速运动, 空气以相对速度 $v_r$ 沿弯曲的叶片匀速流动, 如图所示. 如曲线 $AB$ 在 $C$ 点的曲率半径为 $\rho$, 通过点 $C$ 的法线与半径间夹的角为 $\varphi$, $CO=r$, 求气体微团在 $C$ 点的绝对加速度 $a_a$.

![](https://pan.xxbyq.net/f/Xv0Tx/%E6%88%AA%E5%B1%8F2025-10-30%2014.15.12.png)

![](https://pan.xxbyq.net/f/GvQUy/%E5%B0%8F%E8%BD%A6-33.jpg)

注意, 上面的加速度合成表达式存在问题, 应当更正为:

$$
\vec{a_a}=\vec{a_r}+\vec{a_e}+2\vec{\omega}\times \vec{v_r}
$$

### 3. 2. 5 补充思考题 2

火车 $M$ 以等速 $v_0$ 沿子午线自南往北行驶, 如图所示. 为了考虑地球的自转, 设定坐标系以地心为原点, 坐标轴分别指向恒星. 地球的平均半径为 $R$. 求火车 $M$ 在北纬 $\varphi$ 度处的绝对加速度.

![](https://pan.xxbyq.net/f/45GHq/%E5%B0%8F%E8%BD%A6-34.jpg)