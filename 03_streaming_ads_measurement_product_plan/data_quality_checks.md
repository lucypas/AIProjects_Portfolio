# Data Quality Checks

> Demo-only note: These rules are fictionalized examples for a streaming ads product case study. They are not based on any named company's internal systems.

## Quality Gates

| Gate | Description | Blocks Reporting? | Example Threshold |
| --- | --- | --- | --- |
| Schema Completeness | Required fields exist for each event type | Yes | 99.5 percent complete by event type |
| Consent Safety | Measurement event has valid consent mode before joins | Yes | 100 percent for regions requiring consent proof |
| Event Sequence | Request precedes impression, complete, or error | Yes | 99.9 percent ordered within session |
| Duplicate Control | Event IDs are idempotent and duplicate rate is low | Yes at high severity | Warning at 0.1 percent, block at 1 percent |
| Late Arrival | Events arrive inside freshness window | No, unless severe | 95 percent within 10 minutes |
| Placement Catalog Match | Placement IDs exist and are active | Yes for published reports | 99.9 percent mapped |
| Content Catalog Match | Content IDs exist in content metadata | No | 99 percent mapped |
| Error Taxonomy | Errors include normalized code and stage | No | 95 percent normalized |
| Completion Plausibility | Completion duration matches creative duration | Yes | 99.5 percent within expected bounds |
| Enum Drift | New enum values require contract review | No, alert only | Any unapproved enum triggers review |

## Rule Examples

### Required Fields

For `ad_request`, require:

- `event_id`
- `event_ts`
- `session_id`
- `placement_id`
- `content_id`
- `ad_break_id`
- `consent_status`
- `measurement_mode`

Severity: blocker when required field completeness drops below 99.5 percent over a rolling 30-minute window.

### Event Ordering

Expected order:

1. `consent_status`
2. `ad_request`
3. `ad_impression` or `ad_error`
4. `ad_complete`, if an impression occurred

Events outside the order are quarantined from advertiser-facing reporting until reconciled.

### Consent-Safe Measurement Coverage

Coverage formula:

```text
events_with_valid_consent_mode / measurable_events
```

Blocker examples:

- `consent_status = unknown` with `measurement_mode = personalized`
- missing policy version in a region that requires policy proof
- measurement joins that rely on suppressed events

### Revenue Impact Estimate

Directional estimate:

```text
lost_impressions = expected_impressions - valid_measured_impressions
estimated_revenue_impact = lost_impressions * blended_cpm / 1000
```

This estimate is a prioritization signal, not a billing source of truth.

## Alerting Model

| Alert | Trigger | Routed To | Expected Action |
| --- | --- | --- | --- |
| Fill Rate Drop | Fill rate falls 5 points below 7-day baseline | Ad Delivery PM, Revenue Ops | Check placement, demand path, and error mix |
| Consent Coverage Drop | Consent-safe coverage below regional threshold | Privacy Lead, Data Platform | Pause affected reporting joins |
| Completion Gap | Completion rate diverges from baseline by campaign or device | Measurement PM | Compare creative duration and playback events |
| Error Spike | Error rate exceeds stage-specific threshold | Engineering Lead | Triage SDK, ad server, network, creative fetch |
| Schema Drift | New enum or missing required field | Data Platform | Review schema contract and source release |

## Reporting Publish Gate

Advertiser-facing reports should be marked `ready` only when:

- required field completeness is above threshold
- duplicate event ID rate is below blocker threshold
- consent-safe measurement coverage passes region rules
- placement and campaign IDs map to active catalog entities
- completion duration checks pass
- late-arrival window has closed or reports are labeled preliminary

Reports should be marked `hold_for_review` when any blocker check fails.
