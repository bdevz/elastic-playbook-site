---
title: "Elastic Agent Builder Tutorial: Build a Context-Driven Agent with Hard Tool Boundaries"
subtitle: "How to turn enterprise search into a grounded workflow with retrieval, approved tools, and traceable decisions."
summary: "A production-shaped tutorial for using Elastic Agent Builder as a narrow, inspectable agentic search workflow instead of a vague demo."
published: "2026-04-12"
updated: "2026-04-14"
keyword: "Elastic Agent Builder tutorial"
ctaLabel: "Use the boundary review checklist"
ctaHref: "/resources/agentic-search-boundary-review-checklist"
relatedResource: "agentic-search-boundary-review-checklist"
featured: true
---

Most agent demos fail for a boring reason: they answer before they know whether they should search, ask, or act. The real win is not making the model feel smarter. It is making the system narrower.

In this pattern, Elastic does the important work first. It retrieves the enterprise evidence, constrains the context, exposes only approved tools, and leaves behind a path a reviewer can inspect later. That is the difference between an agentic-search system and a flashy workflow that nobody can defend in architecture review.

## Verified footing

As of April 2026, Elastic says [Agent Builder is generally available](https://ir.elastic.co/news/news-details/2026/Elastic-Announces-General-Availability-of-Agent-Builder-with-Expanded-Capabilities/default.aspx) and positions it as a secure, reliable, context-driven way to build AI agents. Elastic also says Agent Builder supports [MCP and A2A](https://ir.elastic.co/news/news-details/2026/Elastic-Announces-General-Availability-of-Agent-Builder-with-Expanded-Capabilities/default.aspx), while the company now frames Elasticsearch as an [open platform for context engineering and agentic AI](https://www.elastic.co/elasticsearch/context-engineering/).

My recommendation is narrower than the whole product surface. Start with retrieval, one read-only tool, one bounded action, and explicit refusal behavior. If you want orchestration beyond that, Elastic [Workflows is a technical preview](https://www.elastic.co/blog/elastic-workflows-technical-preview/), so it should stay optional rather than foundational in your first production design.

## What you are building

Use one request to force the architecture to reveal itself:

`Find the internal security exception policy, then draft a response for the vendor review thread.`

That one task is enough to force the system to choose between retrieval, clarification, and bounded action. A useful build path looks like this:

1. A user asks for a real outcome.
2. Elastic retrieves the most relevant enterprise evidence.
3. The system assembles only the minimum context needed to decide.
4. The tool registry exposes one read-only lookup and one bounded action.
5. The agent answers, asks a clarifying question, calls an approved tool, or refuses.
6. The trace captures the retrieval path, tool path, and final state.

That is the thesis in miniature. Agentic search is not search plus magic. It is search plus control flow.

## The three architecture zones

### Safe retrieval

This layer does the boring work that actually matters. Query Elastic, apply filters and ranking, pull snippets and citations, and preserve enough trace context that someone else can explain why the answer happened.

### Gated action

This is the control plane. The agent should only reach a tiny allow-list. A useful starting pair is a read-only metadata lookup and one bounded action such as drafting an escalation into a sandbox. If a tool is not in the registry, the agent does not get to use it.

### Outside the agent

Keep admin functions, broad write access, hidden side effects, and dynamic tool discovery out of scope. That boundary is the product. The model is only one component inside it.

## The build flow that survives review

### 1. Seed a realistic corpus

Use documents that resemble the things real teams search: runbooks, policy notes, internal docs, tickets, and incident summaries. Include overlap and ambiguity. If every document cleanly answers one question, the tutorial is too toy-shaped to teach anything useful.

### 2. Classify the first question set

Build around three kinds of prompts:

- retrieval-only
- search-plus-tool
- workflow-required

Those three classes force the system to reveal whether it is actually deciding or just dressing up search.

### 3. Keep Elastic retrieval simple enough to explain

Search the index, narrow to the strongest evidence, and pass only the minimum snippets into model context. The discipline here is subtraction. More context is often worse when it muddies the decision boundary.

### 4. Add a tiny, explicit tool registry

Expose only what the agent is allowed to do. In the first production-shaped version, that usually means:

- `lookupKnowledgeMetadata` for approved metadata and citations
- `createDraftEscalation` for draft-only sandbox output

The second tool should not send email, open a real ticket, or mutate external systems. It should create a human-review artifact and stop.

### 5. Teach the system when to stop

Before the agent acts, classify the request into one of four outcomes:

- answer directly
- ask for clarification
- call an approved tool
- escalate out of scope

This is the step that separates a search assistant from a workflow system pretending to be safe.

### 6. Ground the response

Every final answer should explain where it came from: retrieved evidence, tool output if any, and the route the system took. If the system cannot explain the path, it is not yet safe enough to trust.

### 7. Capture trace output a reviewer can argue with

The minimum believable trace should show:

- request ID
- chosen route
- top retrieval hits
- tool name and tool outcome
- final state such as answered, drafted, blocked, or needs clarification

Without that, debugging turns into folklore.

## Validation path

The shortest route from article to proof is:

1. Seed the sample index and documents.
2. Run a retrieval-only question.
3. Add route classification.
4. Add the two-tool registry.
5. Print the trace after every run.
6. Add one role-based boundary test so a stronger restricted match cannot leak through a weaker visible fallback.

Success is not "the agent answered." Success is:

- employees get grounded answers with citations
- lower-privilege users get a boundary rather than a fake-safe fallback
- workflow-shaped requests are blocked, escalated, or sandboxed instead of executed live

## When not to use this

Do not use this pattern as cover for broad orchestration, runtime tool discovery, or silent production mutation. If your desired workflow depends on the agent improvising new capabilities on the fly, you are already outside the safe first rollout shape.

## Closing line

The point is not to approve a clever demo. The point is to build a search-first workflow with boundaries clear enough that another engineer could review it, reproduce it, and sign off on it.
