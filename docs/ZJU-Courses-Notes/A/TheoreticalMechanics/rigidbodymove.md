
# Chap II 刚体的简单运动学

## 2. 1 刚体的平动

---

### 2. 1. 1 简单平动例题

已知: $\phi=\phi_0\sin{\frac{\pi}{4}t}$ 与 $l$, 求: 当 $t=2s$ 时 $M$ 点的速度, 加速度

![2.1.1参考答案](https://pan.xxbyq.net/f/meOFX/%E8%AF%BE%E7%A8%8B-43.jpeg)


## 2. 2 刚体的定轴转动

---

### 2. 2. 1 简单定轴转动

已知: $O_1A=O_2B=l=4m$, $O_1O_2=AB$, 曲柄的转动规律 $\phi=4\sin\frac{\pi}{4}t$, 其中 $t$ 为时间, 以 $s$ 计. 试求当 $t=0$ 和 $t=2s$ 时, 半圆上 $M$ 点的速度和加速度, 以及圆盘的加速度.

![2.2.1 参考答案](https://pan.xxbyq.net/f/vdMuy/%E8%AF%BE%E7%A8%8B-43.jpg)

### 2. 2. 2 复合定轴转动

已知: $O_1A=O_2B=2r$, $\omega_0$ 是一个常数, 齿轮半径均为 $r$, 且 $O_1O_2=AB$, 求: 轮 $I$ 与轮 $II$, 轮缘上任意一点的加速度.

![2.2.2 参考答案](https://pan.xxbyq.net/f/V64UO/0987654%E8%AF%BE%E7%A8%8B-43.jpg)

### 2. 2. 3 绕定轴转动的一般形式

已知某刚体以瞬时角速度 $\omega$ 绕固定轴 $OZ$ 转动. 证明: 固结在刚体上的动坐标系 $o'x'y'z'$ 的单位矢量对时间的导数为:

$$
\frac{\mathrm d\vec{i'}}{\mathrm dt} = \vec{\omega}\times \vec{i'},\ \frac{\mathrm d\vec{j'}}{\mathrm dt} = \vec{\omega}\times \vec{j'},\ \frac{\mathrm d\vec{k'}}{\mathrm dt} = \vec{\omega}\times \vec{k'}
$$

(用定义即可)

![2.2.3 参考答案](https://pan.xxbyq.net/f/b6xuM/%E6%88%AA%E5%B1%8F2025-10-16%2016.56.51.png)

$$
\begin{align*}
\frac{\mathrm d\vec{i'}}{\mathrm dt}=\frac{\mathrm d(\vec{r_{o'}}-\vec{r_A})}{\mathrm dt}=\frac{\mathrm d\vec{r_{o'}}}{\mathrm dt}-\frac{\mathrm d\vec{r_A}}{\mathrm dt}=\vec{\omega}\times(\vec{r_{o'}}-\vec{r_A})=\vec{\omega}\times \vec{i'}
\end{align*}
$$

上面用到的最关键的公式如下. 对于任意绕某一定轴转动的物体, 其上任意一点都满足:

$$
\frac{\mathrm d\vec{r}}{\mathrm dt}=\vec{\omega}\times\vec{r}
$$