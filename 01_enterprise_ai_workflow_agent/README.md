# Enterprise AI Workflow Agent

**From Request Intake to Jira-Ready Delivery Plan**

This project is a portfolio case study for an enterprise AI workflow assistant. It demonstrates how a messy business request can move through an agentic planning flow, retrieve relevant business context, and produce delivery artifacts that are ready for product, engineering, compliance, and human-review workflows.

## Why This Matters

Enterprise AI work rarely starts with clean requirements. Teams usually begin with a stakeholder paragraph, a policy concern, multiple system dependencies, a timeline, and missing success metrics. This workflow agent helps convert that ambiguity into a structured delivery plan without skipping the human judgment needed for enterprise rollout.

## What The Agent Produces

- User stories
- Acceptance criteria
- Risks and dependencies
- KPIs
- Launch checklist
- Human-review flag when confidence is low or governance blockers are present

## Agent Flow

1. **Intake Parser** extracts persona, workflow, timeline, systems, constraints, and missing fields.
2. **Retriever** ranks a small knowledge base of requirements docs, policy notes, product docs, and sample APIs.
3. **Planner** creates scoped delivery artifacts from the retrieved context.
4. **Risk Critic** checks policy exposure, integration uncertainty, ownership gaps, and timeline pressure.
5. **Confidence Gate** decides whether the plan can move forward or needs human review.
6. **Publisher** formats user stories, acceptance criteria, KPIs, risks, and launch tasks for Jira handoff.

## Human-In-The-Loop Checkpoint

The workflow does not treat generated output as automatically ready for launch. It routes the plan to human review when the request includes unresolved policy approval, regulated or sensitive data, weak retrieval coverage, missing metrics, unclear ownership, or low confidence.

Reviewer actions:

- Approve plan
- Request clarification
- Send to architecture or compliance review

## Included Files

- `architecture.md` - architecture diagram and component notes
- `sample_input.json` - messy request and knowledge-base context
- `sample_output.md` - Jira-ready delivery plan output
- `screenshots/workflow-agent-snapshot.svg` - visual snapshot of the workflow

## Portfolio Positioning

This project is especially relevant for AI product, AI success, agentic workflow, and enterprise platform roles because it combines orchestration, retrieval, governance, evaluation, and product delivery thinking in one compact artifact.

Best-fit role signals:

- Disney AI Assistant
- Databricks Agentic AI
- ServiceNow AI Gateway
- OpenAI AI Success
- Amazon AI Studios

## Accuracy Note

This is a deterministic portfolio prototype that shows the workflow pattern and product judgment. It is intentionally framed as a LangGraph-style flow rather than a production LangGraph implementation. In a production version, retrieval would use governed document stores or vector search, confidence would be backed by evals and traces, and Jira creation would happen through an authenticated integration.
