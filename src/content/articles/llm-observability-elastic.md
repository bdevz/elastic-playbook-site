---
title: "LLM and Agentic AI Observability in Elastic"
subtitle: "Why AI systems need prompt lineage, tool traces, and cost data before they need prettier dashboards."
summary: "A practical guide to instrumenting one Elastic-backed AI workflow so an operator can replay the whole request path, not just stare at generic APM."
published: "2026-04-11"
updated: "2026-04-14"
keyword: "LLM observability Elastic"
ctaLabel: "Run the trace review checklist"
ctaHref: "/resources/llm-observability-trace-review-checklist"
relatedResource: "llm-observability-trace-review-checklist"
featured: true
---

At 2:13 a.m., the incident still looks ordinary. Latency is up. Error rate is noisy. The API is answering. Then someone opens the trace for an AI-powered workflow and realizes the useful parts are missing: no prompt version, no retrieval path, no tool chain, no fallback path, no cost trail.

That is the gap generic APM leaves behind. AI systems are not just endpoints with a slower dependency. They are decision chains. If you cannot connect the prompt to the context to the model call to the tool action to the final outcome, you do not yet have end-to-end observability. You have fragments.

## Verified footing

Elastic's current product story is concrete. The [LLM observability documentation](https://www.elastic.co/docs/solutions/observability/applications/llm-observability) describes dashboards and telemetry for prompts, responses, performance, usage, and costs across several providers. Elastic also documents an [EDOT-based LLM observability path](https://www.elastic.co/docs/solutions/observability/get-started/opentelemetry/use-cases/llms). As of April 11, 2026, Elastic says EDOT support in Java, Node.js, and Python is a technical preview.

That product surface matters, but the operating advice is narrower. Start with one workflow, one correlation model, and one incident-replay exercise before you add more charts.

## The main argument

Teams usually instrument the service boundary while the interesting behavior lives inside the workflow boundary.

In a normal application, the request path often explains the outage. In an LLM workflow, the request path is only the beginning. Correctness, cost, and latency may be shaped by retrieval, prompt assembly, policy instructions, tool calls, retries, model fallback, or output parsing. Any one of those handoffs can become the real fault line.

That is why the practical goal is not "watch the model." The goal is to reconstruct the interaction.

## Where generic APM breaks down

Generic APM remains useful, but it usually cannot answer the operator questions that matter most:

- Which prompt template produced this answer?
- What context was attached, and where did it come from?
- Which tool calls happened, in what order, and with what result?
- Did retrieval fail, did the model fail, or did the downstream action fail?
- Was the response cheap and wrong, or expensive and correct?

If your telemetry cannot answer those questions, your incident review will drift into fuzzy talk about "the model" when the real failure happened elsewhere in the workflow.

## What to instrument first

Start with one live workflow that matters and trace it end to end. Instrument these layers first:

1. user request or triggering event
2. prompt assembly
3. retrieval or memory lookup
4. model invocation
5. tool call or action
6. output parsing and business action
7. cost, latency, retry, and failure outcome

The principle is simple: instrument the handoff, not just the SDK wrapper. One narrow but complete trace is more valuable than partial telemetry across ten workflows.

## The practical checklist

For the first production workflow, capture at least:

- request ID, session ID, and tenant or workspace context
- prompt template version or prompt identifier
- system instructions and retrieval source IDs
- model and provider name
- tool call name, order, and result
- token counts, latency, and retries
- final outcome classification such as answered, degraded, blocked, or failed

If you have to cut something, drop decorative dimensions before you drop reconstruction value.

## What a useful Elastic view should show

For one agentic-search trace in Elastic, I want to see these fields linked on the same request path:

- prompt or prompt-template identifier
- model and provider name
- retrieval source or document IDs
- tool span names and results
- request duration, token counts, and retry count
- final outcome classification

That is where the documented product capability and the operational guidance meet. The product gives you traces, metrics, logs, and dashboards. The operating rule is that one engineer should be able to move from the parent trace to the AI metadata to the tool path without losing the request.

## Dashboards that actually help

The first dashboard should settle an operational question rather than decorate a wall. Build panels for:

- request volume by workflow
- latency by model and path
- token usage and cost trend
- tool-call success and failure rate
- retrieval-empty or low-signal rate
- top error categories

Then alert on the failure modes operators actually care about:

- sudden cost spikes
- repeated model or provider failures
- tool-call failure rates crossing tolerance
- latency regressions in a critical workflow
- retrieval producing empty or weak context too often

If a dashboard cannot tell the on-call engineer what to do next, it is not finished.

## The replay test

The real test is whether you can replay one incident from telemetry alone. For one request, you should be able to answer:

- what the user asked
- what context the system used
- what the model returned
- which tools ran
- how long each step took
- what the request cost
- where the failure or degradation occurred

If that exercise breaks, fix the instrumentation before you add more dashboards.

## When to stop and clean up

Do not expand into ten workflows until one workflow is replayable. Do not create a separate telemetry island just for AI if you already have an established trace path. Do not keep raw prompt or response content without redaction and access controls just because it is operationally convenient.

## Closing line

If you cannot replay the prompt path, explain the tool chain, and account for the cost on one request, you are not yet operating the workflow with enough confidence.
