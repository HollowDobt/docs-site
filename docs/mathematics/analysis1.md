# Analysis I



## "Natural Numbers"

!!! note
	Why do I put quotation marks around the "natural numbers"? Because it is not the same as natural numbers which we have learned in elementary school. As you will soon see, the natural numbers here is an abstract algebraic structure(e.g., the set of even numbers are perfectly satisfies the axioms which define natural numbers). However, this is not a point. It is just a matter of different encoding system.

### The Peano axioms

- (1) $0$ is a natural number.
- (2) If a number is a natural number, its successor is a natural number(We denote successor operator as $++$).
- (3) $0$ is not the successor of any natural number.
- (4) Different natural numbers must have different successors.
- (5) (**Mathematical Induction**) For any proposition concerning natural numbers, when: $\text{BEGIN}$ i) it is true for $0$; ii)if we suppose that a proposition is true for any $n$, it is true for $n++$ too. $\text{END}$ It is true for all natural numbers.

The most incomprehensible and interesting axiom may be the fifth one: **Mathematical Induction**. However, it is also a significant axiom because it ensures that *all natural numbers can be generated recursively starting from 0 using the successor operation*.

!!! success "Proof: Peano axioms (5) (Proposition $I$) $\Longleftrightarrow$ All natural numbers can be generated recursively starting from 0 using the successor operation (Proposition $M$)"
	Now we denote the proposition of number $n$ as $P(n)$.
	
	(i) $M\Longrightarrow I$: Let $X$ satisfies Proposition $M$ ($x_0=0, x_1=x_0++,\dots$). We need to prove that *when the assumptions Proposition $I$ are all satified the proposition is true for all natural numbers*. The assumption 1 supposes that $P(x_0)$ is true. Then, the assumption 2 supposes that for any $n$ if $x_n$ is true, and $x_{n+1}$ is also true. Now $P(x_0)$ is true, and because any number in $X_n$ can be generated recursively starting from $0$ using the successor operation ($++$), which means $P(x_0++)=P(x_1)$ true, $P(x_1++)=P(x_2)$ true $\dots$ and thus $P_(x_n)$ is true for all $x_n$ in $X$. #