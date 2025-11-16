
# LEC 1: Game Theory and Lower Bounds for Randomized Algorithms

## Zero-sum Game

---

The sum of all players' payoff($u_i$) is **ZERO**:

$$
\sum_{i=1}^n u_i=0
$$

### Example: Shooter-Goalie Game

- If goalie makes a save, goalie has payoff +1, shooter has payoff -1.
- If shooter makes a goal, goalie has payoff -1, shooter has payoff +1.

| Payoff Table | goalie $L$ | goalie $R$ |
| ------------ | ---------- | ---------- |
| shooter $L$  | $(-1, 1)$  | $(1, -1)$  |
| shooter $R$  | $(1, -1)$  | $(-1, 1)$  |

For mixed strategies(That is, the shooter decides on a $p_i\in [0,1]$ while $\sum_{i=1}^n p_i=1$ for each row, the goalie decides on a $q_j\in[0,1]$ while $\sum_{i=1}^n q_j=1$ for each column), assumed each player has independent randomness.

!!! example
	Shooter's $p_i=(0.25, 0.75)$, the probability of him choosing $L$ is $0.25$, and the probability of him choosing $R$ is $0.75$. Hence his revenue is($R$ means the left one of each tuple in payoff table):
	
	$$
	V_R=\sum_{i,j}p_iq_jR_{i,j}
	$$
	
	Another one $V_L$ can be derived by analogy. And clearly $V_R+V_L=0$ ($V_C+V_R=\sum p_iq_jR_{i,j}+\sum p_iq_jC_{i,j}=\sum p_iq_j(R_{i,j}+C_{i,j})$).

### Mixed Strategies

Given your payoff matrix:

| Payoff Table For You | (You) $1$ | (You) $2$ | (You) $3$ |
| -------------------- | --------- | --------- | --------- |
| (Opponent) $1$       | $-1$      | $-2$      | $+10$     |
| (Opponent) $2$       | $-2$      | $+5$      | $+100$    |
| (Opponent) $3$       | $-1$      | $-1$      | $-1$      |

Now your aim is to **minimize losses as much as possible**, and you should choose from Strategy $1$, $2$, $3$ first (This means your opponent can know in advance what you choose, and then select the optimal choice for himself based on your selection).

Clearly, by choosing Strategy $3$, you can ensure that the worst-case payoff will only reach $-1$, whereas Strategies $1$ and $2$ could potentially reach $-2$.

In zero-sum game, we refer to this strategy - **minimizing other's gains to minimize one's own losses** - as the **Maxmini Optimal Strategies**.

A stricter definition: Let $<\{1,2\}, (A_i), (U_i)>$ ($A_i$ is player $i$'s strategy. $U_i$ is player $i$ 's payoff) be a zero-sum game. The action $x^*\in A_1$ is minimax strategy for player $1$ when:

$$
\min_{p2\ \in\ A_2}U_1(p_1^*,p_2)\ge\min_{p2\ \in\ A_2,\ \forall p1\ \in A_1}U_1(p_1,p_2)
$$

which means:

$$
\min_{p2\ \in\ A_2}U_1(p_1^*,p_2)=\max_{p_1\ \in\ A_1}\min_{p_2\ \in\ A_2}U_1(p_1,p_2)
$$

We also call this value **the lower bound** ($lb$). Then we further derived mathematically:

$$
\begin{align}
&\max_{p_1\ \in\ A_1}\min_{p_2\ \in\ A_2}U_1(p_1,p_2)\\
=&\max_{p_1\ \in\ A_1}\min_{p_2\ \in\ A_2}( -U_2(p_1,p_2))\\
=&\max_{p_1\ \in\ A_1}(-\max_{p_2\ \in\ A_2} U_2(p_1,p_2))\\
=&-\min_{p_1\ \in\ A_1}\max_{p_2\ \in\ A_2} U_2(p_1,p_2)\\
\end{align}
$$

What does this claim mean?

First, we know that in a zero-sum game, one player's optimal solution is the other player's worst-case solution.

Next, let's return to the series of equations above. The significance of this claim is that Player $1$ can guarantee that their maximum payoff among all minimum payoff (or the optimal value in the worst-case scenario) equals the inverse of the minimum payoff Player $2$ can guarantee among all maximum payoff (or the guaranteed minimum value in the best-case scenario). Feeling abstract about the equation? Here's an example.

| Payoff Table For You | (You) $1$ | (You) $2$ | (You) $3$ |
| -------------------- | --------- | --------- | --------- |
| (Opponent) $1$       | $-1$      | $-2$      | $+10$     |
| (Opponent) $2$       | $-2$      | $+5$      | $+100$    |
| (Opponent) $3$       | $-1$      | $-1$      | $-1$      |

!!! example
	We first find the minimum payoff for player $1$ (You) ($\min_{p_2\ \in\ A_2}U_1(p_1,p_2)$). 
	
	Since the opponent chooses first, whatever choice minimizes your payoff maximizes his because this is a zero-sum game (This is what is referred to as “the worst-case scenario among all possible payoffs.). Therefore, the opponent will inevitably choose the option that minimizes your payoff from all available choices. 
	
	Based on this, he determines his countermeasures for each strategy you might choose (if you choose Strategy $1$, if you choose Strategy $2$, if you choose Strategy $3$ — that is, Column $1$, Column $2$, Column $3$). This is what's known as the opponent knowing what you will choose. If you choose a strategy from the first column, he will choose the second row to minimize your payoff to $-2$. Similarly, he will choose the second column for $-2$ and the third column for $-1$. The final result of $\min_{p_2\ \in\ A_2}U_1(p_1,p_2)$ is $(-2,-2,-1)$ (We denote this array as $S$)
	
	Now you can only choose the maximum one from $S$ as your strategy, because values in $A$ represent all possible payoffs of the strategies you can select. This is so-called $\max_{p_1\ \in\ A_1}\min_{p_2\ \in\ A_2}U_1(p_1,p_2)$.
	
	The other side of the equation conveys the same meaning; we won't elaborate on it here.

Regarding the right-hand side of the equation, we can draw an analogy to the optimal lower bound mentioned earlier ($lb$). $\min_{p_1\ \in\ A_1}\max_{p_2\ \in\ A_2} U_2(p_1,p_2)$ actually represents the opponent's worst-case upper bound — that is, the smallest value we can constrain among all possible optimal solutions chosen by the opponent. We call it **the upper bound** ($ub$).

Therefore, this equation expresses that **in a zero-sum game, the largest possible payoff we can achieve is the inverse of worst possible payoff our opponent can achieve**.

#### Minimax Optimal Strategies

!!! quote
	I prefer to call this optimal strategy **Mini/Max Optimal**.

Now let's return to our discussion of the row player (You, also player $1$), and no longer discussing who has the first move and who has the second move. Clearly, your optimal lower bound $lb$ and worst-case upper bound $ub$ are:

$$
lb=\max_{p_1\ \in\ A_1}\min_{p_2\ \in\ A_2}U_1(p_1,p_2),\ \ \ ub=\min_{p_2\ \in\ A_2}\max_{p_1\ \in\ A_1} U_1(p_1,p_2)
$$

Also clearly:

$$
lb\ge ub
$$

Let's first discuss the situation on the right-hand side of the equation. We assume both you and your opponent employ mixed strategies, so your payoff is:

$$
P=\sum_{i,j}p_iq_jC_{i,j}
$$

($P$: Your payoff; $p_i$: Your mixed strategy; $q_j$: The opponent's mixed strategy' $C_{i,j}$: Column player's (Your) payoff in $(i,j)$)

Clearly, the above equation is equivalent to:

$$
P=\sum_{i,j}p_iq_jC_{i,j}=\sum_{j}q_j\sum_i p_i C_{i,j}
$$

(Equivalent to first calculating the expected payoff for each column, then multiplying it by the opponent's chosen strategy and sum up)

For the sake of simplicity, we will illustrate this using a $2\times2$ payoff matrix as an example. The $P$ in the above equation is a typical linear function with respect to $q$:

$$
P=\sum_{j}q_j\sum_i p_i C_{i,j}=q_1\sum_ip_iC_{i,1}+(1-q_1)\sum_ip_iC_{i,2}=(\sum_ip_i(C_{i,1}-C_{i,2}))q_1+\sum_ip_iC_{i,2}
$$

For linear functions, we know that their maximum or minimum values must occur at either $0$ or $1$, so using pure strategies guarantees the optimal value($q_1=0$ or $q_1=1$).

Similarly, the same principle applies for $\max_{p_1\ \in\ A_1}\min_{p_2\ \in\ A_2}U_1(p_1,p_2)$. Therefore, the upper and lower bounds above are equivalent to:

$$
\begin{align}
lb&=\max_{p_1\ \in\ A_1}\min_{p_2\ \in\ A_2} U_1(p_1,p_2)=\max_{p_1\ \in\ A_1}\min_{i}\sum_{j}p_jC_{i,j} \\
ub&=\min_{p_2\ \in\ A_2}\max_{p_1\ \in\ A_1} U_1(p_1,p_2)=\min_{p_2\ \in\ A_2}\max_{j} \sum_i q_jC_{i,j} \\
\end{align}
$$

Feeling abstract too? Let me illustrate with another example.

| Payoff Table For Column | Column $1$ | Column $2$ |
| ----------------------- | ---------- | ---------- |
| Row $1$                 | $3$        | $1$        |
| Row $2$                 | $2$        | $4$        |

!!! example
	Our goal is to maximize the revenue for column players. Let the column player's strategy be $q_j$ and the row player's strategy be $p_i$. We know that for the row player, choosing pure strategy is sufficient. Thus assuming he chooses only Strategy $1$ or $2$:
	
	$$
	\begin{align}
	P_1&=\sum_j q_jC_{1,j}=3q_1+(1-q_1)=1+2q_1\\
	P_2&=\sum_j q_jC_{2,j}=2q_1+4(1-q_1)=4-2q_1
	\end{align}
	$$
	
	Furthermore, since the row players aim to minimize column player's profits, therefore:
	
	$$
	P=\min\{P_1,P_2\}=\min\{1+2q_1,4-2q_1\}
	$$
	
	Therefore, the column player will select the value of $q_1$ that maximizes this function from the available options as their strategy:
	
	$$
	P_{max}=\max_{q_1}(\min_f\{1+2q_1,4-2q_1\})
	$$
	
	The maximum value is obtained when $q_1 = 0.5$.
	
	The above is from the perspective of $lb$. Next, we will discuss the perspective of $ub$ (i.e., the opponent row player's perspective). He also assumes we choose pure strategies:
	
	$$
	\begin{align}
	P_1&=\sum_i p_iC_{1,j}=3p_1+2(1-p_1)=2+p_1\\
	P_2&=\sum_i p_iC_{2,j}=p_1+4(1-p_1)=4-3p_1
	\end{align}
	$$
	
	 He knows we will choose the strategy that maximizes our gains:
	
	$$
	P=\max\{P_1,P_2\}=\max\{2+p_1,4-3p_1\}
	$$
	
	Then he would minimize our profits as much as possible:
	
	$$
	P_{max}=\min_{p_1}(\max_{f}\{2+p_1,4-3p_1\})
	$$
	
	The maximum value (for column player, while it's the minimum value for row player) is obtained when $p_1 = 0.5$.

So what? This is the **Min-Max Theorem**. **The theorem states that in a two-player zero-sum game**:

$$
\max_p\min_qV_R(p,q)=\min_q\max_pV_R(p,q)
$$

