
# Chap II 电路分析基础

## 2. 1 基尔霍夫定律

---

对于某一节点, 恒有:

- KCL 方程(基尔霍夫电流定律)

$$
\begin{align*}
\Sigma{i}&=0\\
\Sigma{i_{in}}&=\Sigma{i_{out}}
\end{align*}
$$

对于某一回路, 恒有:

- KVL 方程(基尔霍夫电压定律)(其中 $cw$ 表示顺时针, $cuw$ 表示逆时针)

$$
\begin{align*}
\Sigma u&=0\\
\Sigma u_{cw}&=\Sigma u_{cuw}
\end{align*}
$$

使用支路电流法确定 KVL 方程时, 一定要避开电流源两端. 

## 2. 2 叠加定理

---

将某一整体电路转化为多个分电路后, 对于线性参量 $X$ , 有:

$$
\sum X_{分}=X_{总}
$$

常见地, 我们使用电压与电流参量, 也就是:

$$
\begin{align*}
\sum U_{分} &= U_{总} \\
\sum I_{分} &= I_{总}
\end{align*}
$$

一般而言, 我们分割出的独立电源将其余电流源开路(即使得该路电流为 $0$), 将其余电压源短路(即使得该电路电压为 $0$(无压降)).

### 2. 2. 1 戴维宁定理 & 诺顿定理

- **戴维宁定理** 任何有源二端口网络都可以等效为一个电阻和电压源的串联. 其中等效电阻的值为将所有内部源按照电流源开路和电压源短路得到的等效电阻值, 等效电压为两端无连接时的电压(开路电压).

- **诺顿定理** 任何有源二端口网络都可以等效为一个电阻和电流源的并联. 其中等效电阻的值为与戴维宁定理的相同, 等效电流源为两段短路时的电流(短路电流).

二者之间的转换关系(知二求三. 因此可以根据开路电压和短路电流确定等效电阻):

$$
I_S=\frac{U_S}{R_0}
$$

电路中出现受控源时尽可能使用开路方法求等效电压源或者短路方法求电流源(因为据此可以求得较为复杂的等效电阻)

注意, 区分两端口的电压/电流和等效电压/电流, 因为可能会有外部电路施加影响.

## 2. 3 正弦交流电路

---

### 2. 3. 1 有效值

一般地, 对于任意交流电, 其有效值为

$$
I=\sqrt{\frac{1}{T}\int_{0}^{T}i^2\mathrm dt}
$$

特别地, 对于正(余)弦交流电, 其有效值为

$$
I=\frac{I_m}{\sqrt{2}}
$$

电压值同电流值

### 2. 3. 2 正弦量, 相量与相位间关系

- **相位差** 指的是**同频率**的两个正弦量之间的相位之差. 表达式: $\phi=(\omega t+\phi_u)-(\omega t+\phi_i)=\phi_u-\phi_i$. 另外(因此), 两正弦量之间的相位差不变, 恒等于两初相位之差.
- **相量** 其实质为使用复数描述正弦量. 在一般的交流电路分析中, 同一回路的电流其频率都是一致的, 因此对于交流电 $i=\sqrt 2I\sin{(\omega t+\phi)}$, 仅需 $A$ 与 $\phi$ 即可描述, 即: $A=a+jb$, $A=|A|e^{j\phi}$, $A=|A|\angle \phi$ ( 其中 $j=\sqrt{-1}$, 是虚数单位.). 具体推导:

$$
\begin{align*}
i&=\sqrt{2}I\sin(\omega t+\phi)\\
&=\sqrt2 I\cos(\omega t+\phi-\frac{\pi}{2})\\
&=\sqrt2 I\cos(\omega t+(\phi-\frac{\pi}{2}))\\
&=\sqrt2I(\cos(\phi-\frac{\pi}{2}) \cos\omega t-\sin(\phi-\frac{\pi}{2})\sin(\omega t))\\
&=\sqrt2I(\cos(\phi-\frac{\pi}{2})\cos \omega t+j\cdot j\cdot\sin(\phi-\frac{\pi}{2})\sin(\omega t))
\end{align*}
$$

根据欧拉公式, 分别取 $\cos(\phi-\frac{\pi}{2})+j\cdot\sin(\phi-\frac{\pi}{2})$ 与 $\cos\omega t + j\cdot \sin\omega t$, 等价于 $e^{\phi-\frac{\pi}{2}}$ 与 $e^{\omega t}$, 即 $i=\sqrt2Ie^{\phi-\frac{\pi}{2}}\cdot e^{\omega t}=Ie^{(\omega t+\phi-\frac{\pi}{2})\ln \sqrt2}$. 因此, 二者可以等价转化. 在回路频率一定的条件下, $\omega t$ 同样可以省略. 

- 相量的**四则运算**

| 加/减 | 实部与实部相加/减, 虚部与虚部相加/减 |
| --- | -------------------- |
| 乘/除 | 模相乘/除, 幅角相加/减        |

另外, 相量四则运算的本质是旋转. 乘就是逆时针旋转(角度增大), 除就是顺时针旋转(角度减小).

- 正弦量向相量的变换

简言之, 有效值为复数的模, 初相位为复数的幅角. 示例

$$
i_1=\sqrt2 I_1\sin(\omega t+\phi_1) \longrightarrow \overset{\cdot}{I_1}=I_1\angle \phi_1
$$

显然有

$$
\begin{align*}
i&=i_1+i_2\\
\overset{\cdot}{I}&=\overset{\cdot}{I_1}+\overset{\cdot}{I_2}=I\angle\phi
\end{align*}
$$

### 2. 3. 3 (复)阻抗(电压与电流关系的相量表示)

- **电阻元件** 根据欧姆定律, 假设流过电流为 $\overset{\cdot}{I}$, 那么电压必定为 $\overset{\cdot}{U}=\overset{\cdot}{I}R$. 因此, 其向量表示的幅角不变, 模关系满足欧姆定律.

- **电感元件** 设流过电感的电流为 $i=\sqrt2I\sin(\omega t+\phi_i)$, 则电感两端的电压为

$$
u=L\frac{\mathrm di}{\mathrm dt}=\sqrt2IL\omega\cos(\omega t+\phi_i)=\sqrt{2}IL\omega\sin(\omega t+\phi_i+\frac{\pi}{2})
$$

不难发现, 电感元件的电压比电流超前了 $\frac{\pi}{2}$, 因此电感元件的电压方向在电流方向的逆时针旋转 $90$ 度处, 大小为电流的 $\omega L$ 倍. 为了方便描述, 我们定义其为**感抗** $X_L$, 其中 $X_L=L\omega=2\pi f$ (显然, 当 $f=0$ 时感抗为 $0$, 两边压降为 $0$, 相当于短路). 另外, 按照上面相量的定义, 我们最终将 $u$ 简化为下述表达式($j=\angle\frac{\pi}{2}$)

$$
\overset{\cdot}{U}=jX_L\overset{\cdot}{I}
$$

- **电容元件** 设流过电容的电压为 $u=\sqrt2U\sin(\omega t+\phi_u)$, 则电容两端的电流为

$$
i=C\frac{\mathrm du}{\mathrm dt}=\sqrt2CU\omega\sin(\omega t+\phi_u+\frac{\pi}{2})
$$

同样, 我们变换为相量表示法

$$
i=C\omega\overset{\cdot}{U} \angle\frac{\pi}{2}\angle\phi_u
$$

进一步转化

$$
\overset{\cdot}{U}=\frac{1}{C\omega} I\frac{\angle\phi_u}{\angle\frac{\pi}{2}}
$$

类似的使用容抗转化 $X_C=\frac{1}{C\omega}=\frac{1}{2C\pi f}$ (显然, 当 $f=0$ 时容抗接近无限大, 相当于开路), 最终化简为

$$
\overset{\cdot}{U}=-jX_c\overset{\cdot}{I}
$$

上述三种阻碍电流通过的元件其物理量统称为(复)阻抗. 对于二端网络, $u$ 超前于 $i$ 的称为电感性电路, $u$ 滞后于 $i$ 的称为电容性电路, 而 $u$ 与 $i$ 处于同一相位的称为电阻性电路(串联谐振状态).

### 2. 3. 4 