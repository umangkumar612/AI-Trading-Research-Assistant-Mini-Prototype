# AI Usage Note

## AI tools used

- GitHub Copilot: architecture shaping, TypeScript implementation, UI composition, and build/debug assistance.

## What AI was used for

- Translating the assignment into a small state-driven workflow.
- Drafting typed API contracts and validation boundaries.
- Implementing the deterministic sample-data backtest and responsive UI.
- Reviewing loading, error, and ambiguity states.

## Personally designed

The user journey, clarification rule, experiment fields, visible assumption treatment, deterministic test approach, and separation between data and interpretation were chosen for this assignment. The scope intentionally avoids live trading and advisory behavior.

## Reviewed or modified

The generated implementation was kept deliberately small and reviewed around the critical product behavior: `sharp fall` remains ambiguous, missing holding periods stop the test, and all displayed numerical results come from the backtest function.

## AI suggestions rejected

Automatically choosing a five-day holding period would make the demo smoother, but it would hide a material assumption. The prototype asks the user instead.

## Most proud of

The strongest part is the boundary between the research conversation and the calculation: language helps structure the experiment, while code owns the result.
