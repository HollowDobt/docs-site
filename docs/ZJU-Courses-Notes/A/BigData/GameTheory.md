
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
	
	Another one $V_L$ can be derived by analogy. And clearly $V_R+V_L=1$.

### Maxmini Optimal Strategies

Given your payoff matrix:

| Payoff Table   | (You) $1$ | (You) $2$ | (You) $3$ |
| -------------- | --------- | --------- | --------- |
| (Opponent) $1$ | $-1$      | $-2$      | $+10$     |
| (Opponent) $2$ | $-2$      | $+5$      | $+100$    |
| (Opponent) $3$ | $-1$      | $-1$      | $-1$      |

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

Now let's consider the same question from another perspective: our opponent know we've chosen the strategy that minimizes their gains, which means he gets $\max_{p_1\ \in\ A_1}U_1(p_1, p_2)$, and now he needs to minimize this value:

$$
\min_{p_2\ \in\ A_2} \max_{p_1\ \in\ A_1}U_1(p_1,p_2)
$$

