
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

For mixed strategies(That is, the shooter decides on a $p_i\in [0,1]$ while $\sum_{i=1}^n p_i=1$ for each row, the goalie decides on a $q_j\in[0,1]$ while $\sum_{i=1}^n q_j=1$ for each column), assumed players have independent randomness, 