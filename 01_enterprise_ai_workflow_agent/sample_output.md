# Sample Output

## Retrieved Context

| Source | Type | Use in plan |
| --- | --- | --- |
| PROD-330 | Product | Confirms summarization, drafting, confidence scoring, and approval checkpoints. |
| API-882 | API | Defines ServiceNow and parts API fields needed for warranty and inventory context. |
| POL-212 | Policy | Requires approved gateway, redaction, retention limits, audit logs, and review. |
| REQ-104 | Requirements | Requires KPIs, dependencies, owners, and launch checklist before Jira handoff. |

## Confidence And Review

**Confidence:** Medium

**Human-review flag:** Required

**Reason:** The request includes unresolved legal approval, sensitive customer notes, missing success metrics, and integration dependencies. The plan should not be exported to Jira until a human reviewer confirms policy path, owners, and pilot KPIs.

## User Stories

### Story 1: Summarize Priority Incidents

As a dispatch manager, I want priority incidents summarized with customer tier, asset context, warranty status, and recommended next action so I can assign technicians faster.

**Acceptance criteria**

- Given a priority incident from ServiceNow, when the workflow runs, then the summary includes incident priority, customer tier, asset id, warranty signal, and recommended action.
- Given the internal parts API returns a warranty exception, when the summary is generated, then the warranty signal is included with the relevant exception code.
- Given warranty or inventory data is unavailable, when the draft is shown, then the workflow displays a dependency warning and does not invent missing details.

### Story 2: Draft Governed Work Order Update

As a service coordinator, I want the agent to draft work order updates using approved gateway controls so technicians receive accurate prep notes before arrival.

**Acceptance criteria**

- Given customer notes contain sensitive data, when the model gateway processes them, then redaction, retention limits, and audit logging are applied before generation.
- Given the generated draft includes uncertain claims, when the draft is presented, then a human reviewer must approve or edit the text before external system writeback.
- Given the draft is approved, when it is exported, then the work order update includes citations to source incident and parts data.

### Story 3: Launch Northeast Pilot

As an operations leader, I want a scoped Northeast pilot with KPIs and owners so we can decide whether to expand after six weeks.

**Acceptance criteria**

- Given the pilot starts, when weekly reporting runs, then it reports dispatch triage time, reviewer approval rate, policy exception rate, and first-visit readiness score.
- Given confidence is below threshold or a policy blocker is present, when Jira export is requested, then the workflow blocks export until human review is complete.

## Risks And Dependencies

| Severity | Risk or dependency | Mitigation |
| --- | --- | --- |
| High | Legal approval is required for customer note processing through any third-party model path. | Confirm approved gateway path, redaction requirements, retention rules, and audit logging before pilot. |
| Medium | ServiceNow and parts API field mapping may delay delivery. | Assign integration owner in week one and validate sandbox data early. |
| Medium | Success metrics are missing from the intake. | Require pilot KPI signoff before Jira export. |
| Low | Technician adoption may depend on draft quality and mobile readability. | Include technician review in pilot feedback loop. |

## KPIs

- Reduce dispatch triage time by 25% in the Northeast pilot queue.
- Achieve 80% reviewer approval rate for generated work order drafts.
- Keep policy exception rate below 2% of processed incidents.
- Improve first-visit readiness score by 15% for pilot work orders.

## Launch Checklist

- Confirm Northeast pilot owner, reviewer pool, and escalation path.
- Complete legal review for customer note handling.
- Validate ServiceNow and parts API sandbox credentials.
- Run a 30-scenario offline eval before live pilot.
- Create Jira epic with scoped stories, dependencies, owners, and review gate.

## Eval Rubric

| Dimension | Weight | Passing behavior |
| --- | ---: | --- |
| Grounding | 25% | Recommendations cite requirements, policy, product, or API context. |
| Jira readiness | 25% | Stories and criteria are scoped, testable, and dependency-aware. |
| Risk handling | 20% | Compliance, integration, data, and timeline risks are surfaced. |
| Business value | 20% | KPIs connect workflow output to operational outcomes. |
| Reviewability | 10% | Confidence and human checkpoint are clear enough for reviewer action. |
