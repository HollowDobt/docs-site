
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

### Maxmini Optimal Strategies

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

