# Sample Product Output

## Reporting Readiness Decision

**Decision:** Hold for Review

The dashboard shows healthy overall fill and completion performance, but two blocker gates remain open:

- EU aggregate measurement events are missing current policy-version proof.
- Live midroll creative-fetch timeouts exceed the blocker threshold.

Advertiser-facing reports should not be marked final until those issues are resolved or the affected segments are excluded with clear reporting notes.

## KPI Summary

| KPI | Value | Readout |
| --- | --- | --- |
| Fill Rate | 91.8 percent | Above baseline, but midroll placement risk remains |
| Completion Rate | 87.3 percent | Slightly below target on mobile midroll |
| P95 Latency | 1.42 seconds | Creative fetch is the top latency driver |
| Ad Error Rate | 2.7 percent | Blocker for live midroll placement |
| Revenue Impact | $48.2k | Directional estimate, not billing truth |
| Consent-Safe Coverage | 98.6 percent | Requires privacy review for EU policy version gap |

## Recommended Next Actions

1. Route live midroll VAST timeout incident to Engineering with placement, SDK version, and creative-fetch stage details.
2. Route EU aggregate measurement policy-version issue to Privacy/Data before final reporting publish.
3. Keep daily report status as `hold_for_review`.
4. Recompute fill, completion, error, and consent-safe coverage after fixes land.
5. Convert the blocker cases into regression checks for future app releases and schema changes.

## PM Interpretation

The product value is not just showing metrics. The value is connecting ad delivery health, consent-safe measurement, data quality, and revenue prioritization in one operating surface so teams can decide what is ready to publish and what needs human review.
