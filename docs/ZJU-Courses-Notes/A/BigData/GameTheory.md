
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

