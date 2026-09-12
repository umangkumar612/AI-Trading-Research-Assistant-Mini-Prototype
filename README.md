AlgoResearch AI

AI Trading Research Assistant — Mini Prototype
SUAS Enterprises / AlgoChowk — Option 1

A focused research prototype that turns a natural-language market question into a structured, reviewable trading experiment, asks for missing information instead of silently guessing, runs the experiment on deterministic simulated NIFTY data, and explains the result in a user-friendly way.

Live Demo

Open AlgoResearch AI

Source Code

GitHub Repository

1. What This Prototype Solves

The core idea is simple:
<img width="957" height="510" alt="{FD98B605-D686-4A9E-97E7-84A8383DFA93}" src="https://github.com/user-attachments/assets/1f471377-6bad-4506-8613-372a057b4d8a" />

<img width="957" height="516" alt="{227F3533-1A1F-417D-A418-06DA12822B85}" src="https://github.com/user-attachments/assets/6e74fe68-9997-4d66-86d3-d0ea4664e387" />
<img width="955" height="511" alt="{10CED79F-6893-4FF1-B2A3-0BF14A73AAE2}" src="https://github.com/user-attachments/assets/849489d6-5834-4646-8b53-df50295a8596" />
<img width="923" height="511" alt="{65090BBF-6F78-485C-A612-4506E334E64F}" src="https://github.com/user-attachments/assets/350e8c49-014a-477a-bbb1-bf21b5aab7ce" />
<img width="605" height="398" alt="{FBE75EB9-56CF-4F6C-934F-E9944AD059BC}" src="https://github.com/user-attachments/assets/40074dc0-076d-4917-9e8b-4fee6e767946" />
<img width="608" height="437" alt="{4550C2D2-ED3A-4B96-BE9F-2AA99154A21F}" src="https://github.com/user-attachments/assets/7e50bc6c-19f0-47cd-be6f-afe453510fd1" />


Question → Understand → Clarify → Define → Test → Learn

A user should not have to translate a market idea into technical backtesting terminology before they can investigate it.

For example:

"Does buying NIFTY after a 1% fall work better during high-volatility periods?"

The assistant turns that question into a structured experiment:

Instrument: NIFTY

Timeframe: Daily

Entry condition: NIFTY falls by at least 1%

Filter: High volatility

Holding period: User-selected

Entry: Next day's open

Exit: Close after the selected holding period

Dataset: Simulated prototype data

Costs: Not included

The important product decision is that the system does not silently invent material parameters. If the holding period is missing, the user is asked to clarify it before the experiment can be tested.

2. Assignment Alignment

This prototype was built for Option 1 — AI Trading Research Assistant: Mini Prototype.

The assignment asks the prototype to:

understand a natural-language market question

identify the important experiment fields

detect missing information

ask for clarification rather than blindly assuming

show the final experiment clearly

demonstrate how the experiment can be tested

explain the result

keep the scope focused rather than building a complete trading platform

This implementation intentionally focuses on that research workflow instead of adding live trading, brokerage integration, or unnecessary platform features.

3. Product Flow

┌──────────┐
│   ASK    │
│ Natural  │
│ language │
└────┬─────┘
     ↓
┌──────────────┐
│  UNDERSTAND  │
│ Extract the  │
│ experiment   │
└────┬─────────┘
     ↓
┌──────────────┐
│   CLARIFY    │
│ Find missing │
│ information  │
└────┬─────────┘
     ↓
┌──────────────┐
│    DEFINE    │
│ Finalize a   │
│ testable     │
│ experiment   │
└────┬─────────┘
     ↓
┌──────────────┐
│     TEST     │
│ Run the      │
│ backtest     │
└────┬─────────┘
     ↓
┌──────────────┐
│    LEARN     │
│ Show data,   │
│ interpretation│
│ and limits   │
└──────────────┘

Why this flow?

The workflow separates three things that are easy to mix together:

What the user actually said

What the system needs to assume or clarify

What the data actually shows

That separation makes the prototype easier to reason about and reduces the chance of presenting an unsupported conclusion as fact.

4. Key Features

Natural-language research input

Users can describe a market hypothesis in plain language rather than filling out a traditional strategy form.

Structured experiment extraction

The application identifies fields such as:

Instrument

Timeframe

Entry condition

Exit condition

Holding period

Filters / variables

Research question / hypothesis

Ambiguity handling

Important missing information does not get silently filled with arbitrary defaults.

For example:

"Does buying NIFTY after a sharp fall work?"

The phrase "sharp fall" is ambiguous, so the system treats it as something that needs clarification rather than inventing a percentage.

Similarly, a missing holding period blocks testing until the user chooses one.

Explicit assumptions

The final experiment makes important assumptions visible, including:

simulated dataset

entry timing

exit timing

holding period

transaction-cost assumption

slippage assumption

test-data scope

Deterministic backtesting

The test engine operates on a fixed simulated NIFTY OHLC dataset so that the same experiment produces reproducible results.

Data-first result interpretation

The UI separates:

What the data shows

from

What the system interprets

The numerical metrics are calculated by the backtest engine rather than generated by an AI model.

Research-oriented UX

The interface is designed around the research journey rather than a generic chatbot conversation.

5. Screenshots

Add your screenshots to screenshots/ using the filenames below.

Ask — Natural-language research question



Understand — Extracted experiment fields



Clarify — Missing information



Define — Final experiment



Test / Learn — Backtest results



Recommended screenshot set

For the final submission, I recommend keeping 5 screenshots:

Ask

Understand

Clarify

Define

Results / Learn

This shows the complete product journey without making the README unnecessarily long.

6. Architecture

                         ┌─────────────────────────┐
                         │       Next.js UI        │
                         │  React + TypeScript     │
                         └────────────┬────────────┘
                                      │
                         Natural language question
                                      │
                                      ▼
                    ┌────────────────────────────────┐
                    │ POST /api/research/analyze     │
                    │                                │
                    │ Deterministic question parser  │
                    │ + Zod validation               │
                    └───────────────┬────────────────┘
                                    │
                         Structured experiment
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Clarification layer  │
                         │ Missing / ambiguous  │
                         │ parameter detection  │
                         └──────────┬───────────┘
                                    │
                           Confirmed experiment
                                    │
                                    ▼
                    ┌────────────────────────────────┐
                    │ POST /api/research/test        │
                    │                                │
                    │ Deterministic backtest engine  │
                    └───────────────┬────────────────┘
                                    │
                                    ▼
                    ┌────────────────────────────────┐
                    │ Simulated NIFTY OHLC dataset   │
                    │                                │
                    │ Strategy loop → trades →       │
                    │ metrics → benchmark series     │
                    └───────────────┬────────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Results / Learn UI   │
                         │                      │
                         │ Metrics              │
                         │ Chart                │
                         │ Data shows           │
                         │ Interpretation       │
                         │ Limitations          │
                         └──────────────────────┘

Design principle

The most important boundary in the architecture is:

Language can help structure the experiment; code owns the numerical result.

This prevents the result layer from depending on generated numbers.

7. Technology Stack

Technology

Purpose

Next.js 16

Application framework and server routes

React 19

Interactive UI

TypeScript

Type-safe experiment, trade, and result contracts

Tailwind CSS v4

Styling and responsive layout

Zod

Runtime validation at API boundaries

Recharts

Strategy vs benchmark visualization

Next.js Route Handlers

/api/research/analyze and /api/research/test

Vercel

Production deployment

GitHub

Source control and submission

No database is required for this prototype because the assignment does not require persistent experiment history. The current scope is intentionally stateless and focused on the research workflow.

8. API Design

POST /api/research/analyze

Accepts a natural-language research question and returns a validated structured representation.

Conceptually:

User question
    ↓
Parser
    ↓
Structured experiment
    ↓
Missing / ambiguous fields
    ↓
Clarification state

The analysis layer currently uses a deterministic parser so the deployed prototype can run without requiring an external LLM API key.

The returned structure is intentionally kept behind a typed contract so a production implementation can replace the parser with a server-side LLM adapter without changing the rest of the research workflow.

POST /api/research/test

Accepts the confirmed experiment and runs the deterministic backtest.

Conceptually:

Confirmed experiment
        ↓
Validate parameters
        ↓
Load simulated NIFTY OHLC data
        ↓
Find qualifying entries
        ↓
Apply volatility filter
        ↓
Enter at next day's open
        ↓
Hold N trading days
        ↓
Exit at close
        ↓
Calculate trade metrics
        ↓
Return strategy + benchmark series

9. Backtesting Logic

The prototype uses a simulated daily NIFTY dataset located at:

data/nifty-sample.ts

The engine:

detects the previous-day percentage decline

checks the configured entry condition

optionally applies the high-volatility filter

enters at the next day's open

holds for the selected number of trading days

exits at the close

calculates trade-level returns

aggregates the results

builds a strategy performance series

compares it with a benchmark series

Calculated metrics

The result layer can calculate:

Total trades

Winning trades

Losing trades

Win rate

Average trade return

Median trade return

Best trade

Worst trade

Strategy return

Benchmark series

Important rule

No numerical result is generated by AI.

All displayed performance metrics come from the backtest calculation.

10. Handling Ambiguity

One of the main product decisions was to treat ambiguity as a first-class state.

Example

Input:

"Does buying NIFTY after a sharp fall work?"

Instead of deciding that "sharp fall" means 2%, 3%, or 5%, the system should recognize that the definition is material to the experiment.

Another example

Input:

"Does buying NIFTY after a 1% fall work better during high-volatility periods?"

The system can understand most of the experiment, but the holding period is still required before a meaningful test can be run.

The user is therefore asked:

How long should the position be held?

Available choices:

1 trading day

3 trading days

5 trading days

10 trading days

This is deliberate product behavior, not just a UI detail.

11. Result Safety and Interpretation

The result screen intentionally separates:

What the data shows

Facts calculated directly from the simulated trades.

Example:

"The simulated prototype dataset produced 38 qualifying trades. 19 were profitable and 19 were unprofitable."

What the system interprets

A cautious interpretation of those calculated facts.

Example:

"The strategy produced positive average returns in this prototype sample and outperformed the sample benchmark."

This distinction is important because a backtest result is evidence from a particular dataset and configuration — not proof that a strategy will work in live markets.

12. Limitations

This is intentionally a research prototype, not a production trading system.

Current limitations include:

simulated NIFTY data

no live market-data provider

no brokerage integration

no live order execution

transaction costs are not modeled

slippage is not modeled

no out-of-sample validation

no walk-forward validation

no persistent experiment history

no production LLM provider integration

limited strategy vocabulary

The prototype should therefore be treated as a demonstration of the research workflow, not as financial advice or a live trading system.

13. Why I Chose a Deterministic Analysis Layer

A live LLM would make the prototype look more AI-native, but it would also introduce several issues for a small assignment demo:

API-key dependency

variable model outputs

harder-to-reproduce behavior

additional failure modes

less deterministic debugging

For this prototype, I prioritized a stable structured contract and deterministic behavior.

The architecture keeps the analysis boundary isolated so that a production version can add:

LLM Provider
     ↓
Structured JSON
     ↓
Zod validation
     ↓
Existing experiment workflow

This means the UI and backtesting engine do not need to trust free-form model output.

14. Key Product & Engineering Decisions

1. Ask instead of silently assuming

Material missing information is surfaced to the user.

2. Keep the experiment structured

The experiment is represented using explicit fields instead of storing a large natural-language prompt as the source of truth.

3. Keep calculations deterministic

Repeated runs of the same experiment should produce the same result.

4. Keep AI away from numerical truth

The model/parser may help structure a question, but the backtest engine owns the metrics.

5. Make assumptions visible

The final experiment clearly states the dataset and cost assumptions.

6. Separate evidence from interpretation

The UI distinguishes calculated facts from the system's interpretation.

7. Avoid overbuilding

The assignment explicitly asks for a small functional part of a larger trading research platform. This prototype intentionally does not become a full trading terminal.

15. Project Structure

AI-Trading-Research-Assistant-Mini-Prototype/
│
├── app/
│   ├── api/
│   │   └── research/
│   │       ├── analyze/
│   │       │   └── route.ts
│   │       └── test/
│   │           └── route.ts
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── data/
│   └── nifty-sample.ts
│
├── lib/
│   ├── backtest.ts
│   └── validation.ts
│
├── public/
│
├── types/
│   └── research.ts
│
├── screenshots/
│   ├── 01-ask.png
│   ├── 02-understand.png
│   ├── 03-clarify.png
│   ├── 04-define.png
│   └── 05-results.png
│
├── AI_USAGE.md
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── package.json
└── .env.example

16. Getting Started

Prerequisites

Node.js 18+

npm

Installation

git clone https://github.com/umangkumar612/AI-Trading-Research-Assistant-Mini-Prototype.git

cd AI-Trading-Research-Assistant-Mini-Prototype

npm install

Run locally

npm run dev

Open:

http://localhost:3000

Production build check

npm run build

Lint

npm run lint

17. Environment Variables

The prototype does not require an external API key for the current deterministic analysis flow.

The .env.example file contains optional placeholders for future extensions:

LLM_API_KEY=
DATABASE_URL=

Current status

Variable

Required now?

Future use

LLM_API_KEY

No

Server-side LLM adapter

DATABASE_URL

No

Persistent experiment history / storage

No secret keys are committed to the repository.

18. Validation & Quality Checks

Before submission, the project was checked with:

npm run lint
npm run build

The production build successfully compiles the Next.js application and its API routes.

The main user journey was also tested through:

Ask
 ↓
Understand
 ↓
Clarify
 ↓
Define
 ↓
Test
 ↓
Learn

19. AI Usage

AI tools were used as a development partner, not as a replacement for product decisions.

Tool used

GitHub Copilot

Used for

translating the assignment into a small state-driven workflow

architecture shaping

TypeScript implementation assistance

UI composition

API contract drafting

validation boundaries

backtest implementation assistance

responsive UI work

debugging and build review

Personally designed

The important product decisions were made around:

the Ask → Understand → Clarify → Define → Test → Learn flow

ambiguity handling

experiment fields

visible assumptions

deterministic testing

separation between data and interpretation

intentionally limited scope

AI suggestions rejected or modified

A simple default such as automatically selecting a five-day holding period was intentionally avoided because it would hide a material research assumption.

The system asks the user instead.

For the complete AI development note, see:

AI_USAGE.md

20. What I Would Improve With More Time

Data

integrate a real market-data provider

add data provenance and timestamps

support multiple instruments and timeframes

validate data quality automatically

Research quality

transaction costs

slippage

out-of-sample testing

walk-forward validation

parameter sensitivity analysis

statistical significance / confidence analysis

better benchmark selection

AI layer

server-side LLM adapter

structured JSON/function-calling output

confidence / ambiguity scoring

experiment refinement suggestions

natural-language explanation grounded in calculated metrics

Persistence

PostgreSQL + Prisma

saved experiments

experiment versioning

research history

comparison between experiment runs

Product

richer experiment editing

additional strategy conditions

better result drill-down

exportable research reports

experiment comparison

eventually passing the structured experiment directly into a dedicated backtesting engine

21. Scope Boundary

This prototype deliberately does not include:

live trading

brokerage connections

order execution

portfolio management

investment recommendations

production market-data infrastructure

a full trading dashboard

The goal is to demonstrate the research workflow clearly and correctly.

22. Demo Scenario

For a quick demonstration, use:

Does buying NIFTY after a 1% fall work better during high-volatility periods?

Then:

Submit the question.

Review the extracted experiment.

Continue to the clarification step.

Select a holding period.

Review the final experiment definition.

Run the test.

Review the metrics and chart.

Compare What the data shows with What the system interprets.

This demonstrates the complete prototype journey in approximately 2–3 minutes.

23. Submission

Working Prototype

https://ai-trading-research-assistant-mini.vercel.app

GitHub Repository

https://github.com/umangkumar612/AI-Trading-Research-Assistant-Mini-Prototype

Documentation

README.md — project overview, architecture, setup, decisions, limitations

AI_USAGE.md — AI development and review note

Demo

A short 2–3 minute screen recording demonstrates the complete research workflow.

24. Final Note

This project is intentionally small.

The goal was not to build another trading dashboard or chatbot. The goal was to demonstrate one useful slice of an AI-native research product:

Turn a vague market question into an explicit experiment, refuse to hide important ambiguity, test it deterministically, and explain what the evidence actually supports.

License

This project was created as an internship assignment prototype and is not intended for production trading or financial decision-making.
