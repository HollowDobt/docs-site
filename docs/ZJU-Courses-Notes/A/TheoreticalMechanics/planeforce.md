# Chap VI 平面力系

## 基本定理

---

### 力偶, 力矩, 主矢, 主矩

- 牢记, 力矩计算公式矩在前力在后:

$$
\overrightarrow{M}=\overrightarrow{r}\times \overrightarrow{F}
$$

- 力偶矩与矩心的选择无关.
- 力偶矩可在其作用平面内任意转移
- 平面内任意一点的力都可以移动到另一点, 并附加一个力偶.
- 平面力系的所有力最终都可以简化为**一个力**(主矢)和**一个力偶**(主矩), 表达为:

$$
\left\{\begin{matrix}
\overrightarrow{F_R'} = \sum_{i=1}^n \overrightarrow{F_i}\\
\overrightarrow {M_R' }=\sum_{ i=1}^n \overrightarrow{M_i} 
\end{matrix}\right.
$$

- 无论以哪个作为参考点简化为一个力和一个力偶, **主矢都保持不变**; 与此同时, **主矩会发生变化**. 前者是显而易见的, 对于后者, 我们前面已经提到, 力在平面力系中的平移可以等价为一个同样的力和力偶, 因此主矩肯定会发生变化.

### 静定, 静不定/超静定

- 在平面系统中, 由 $n$ 个物体组成的物体系, 总共有不多于 $3n$ 个独立的平衡方程, 且分别为:

$$
\left\{\begin{matrix}
\sum_{i=1}^n \overrightarrow{F_{i_x}} = 0 \\
\sum_{i=1}^n \overrightarrow{F_{i_y}} = 0 \\
\sum_{i=1}^n \overrightarrow{M_i} = 0
\end{matrix}\right.
$$

也就是 $x$, $y$, 方向三个刚体的自由度.

- 静定问题: 未知约束反力的数目小于等于独立平衡方程的数目
- 超静定/静不定问题: 未知约束反力的数目大于独立平衡方程的数目(需要结合材料力学等方程求解)

## 习题

---

