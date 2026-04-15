---
title: "LLM Observability Trace Review Checklist"
summary: "A replay-first checklist for confirming one Elastic-backed AI workflow is observable enough to debug before you scale it."
published: "2026-04-11"
type: "Checklist"
ctaLabel: "Read the observability guide"
ctaHref: "/articles/llm-observability-elastic"
relatedArticle: "llm-observability-elastic"
featured: true
---

Use this checklist on one real AI workflow before you build another dashboard.

The goal is simple: confirm that one request can be replayed end to end from telemetry alone.

## 1. Request identity

- Every request has a stable request ID.
- Session or conversation ID is available when the workflow spans multiple turns.
- Tenant, workspace, or customer identifier is captured where relevant.
- The request can be correlated across traces, logs, and metrics.

## 2. Prompt lineage

- Prompt template version or prompt identifier is captured.
- System instructions can be tied back to the request.
- Prompt changes can be distinguished from model changes.
- Sensitive prompt content is redacted or access-controlled where needed.

## 3. Context and retrieval

- Retrieval source IDs or document IDs are attached to the request.
- Empty or weak retrieval states are visible.
- Operators can see whether context was missing, stale, or low-signal.
- Retrieval failure is distinguishable from model failure.

## 4. Model call

- Model name and provider are captured.
- Request duration is visible.
- Error state is visible when the model call fails.
- Retry count or fallback behavior is visible when the path changes.
- Token counts are captured for the request.

## 5. Tool chain

- Tool calls are visible as child spans or linked events.
- Tool order is reconstructable.
- Tool success, failure, and timeout states are visible.
- Operators can tell whether the workflow failed in retrieval, the model, or the downstream action.

## 6. Cost and outcome

- Token or usage cost is attributable to the request path.
- Final outcome classification is captured, such as answered, degraded, blocked, or failed.
- Cost spikes can be connected to workflow, model, or retry behavior.
- Latency spikes can be connected to a specific handoff inside the workflow.

## 7. Operator view

- One engineer can click from the parent trace to AI metadata without losing the request path.
- One engineer can move from AI metadata to tool spans without switching systems.
- Dashboards highlight action-driving questions rather than decorative charts.
- Alerts exist for provider failures, cost spikes, latency regressions, and tool failure rates.

## 8. Incident replay test

Run one replay test and confirm you can answer:

- What the user asked
- What context the system used
- What the model returned
- Which tools ran
- How long each step took
- What the request cost
- Where the failure or degradation occurred

If you cannot answer all seven from telemetry alone, fix the instrumentation before expanding the workflow.

## Signoff

Before rollout or expansion, record:

`Trace-reviewed, replayable, and strong enough for the next production step.`

- Owner:
- Second reviewer:
- Date:
