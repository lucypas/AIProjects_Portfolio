# RAG Evaluation Rubric

Use this rubric to score each question-answer pair. Scores are 0-100.

| Dimension | Threshold | What Good Looks Like | Failure Pattern |
| --- | ---: | --- | --- |
| Groundedness | 80 | Important claims are supported by retrieved context. | The answer adds facts, policies, rankings, or causes that are not in the sources. |
| Context relevance | 75 | Top retrieved documents match the user's intent, entity, constraints, and risk tier. | Retrieval surfaces adjacent but wrong documents, or ranks unsafe/noisy context first. |
| Answer relevance | 80 | The answer directly addresses the user question and respects explicit constraints. | The answer responds to the wrong task, ignores exclusions, or over-indexes on tangential context. |
| Citation quality | 70 | Citations point to the exact source used for each key claim. | Citations are missing, decorative, or attached to claims the source does not support. |
| Hallucination risk | 75 | The response avoids invented titles, unsupported policy exceptions, and unverified guarantees. | The answer invents a cause, recommends excluded content, or contradicts policy context. |

## Launch Gate

Pass/fail should be evaluated by dimension, not just by average score.

| Status | Rule |
| --- | --- |
| Pass | Every dimension meets or exceeds its threshold. |
| Watch | One or two dimensions are near threshold but still below launch requirements. |
| Hold | Any high-risk dimension fails, or three or more dimensions fall below threshold. |

## Review Notes

Each failed result should include:

- What failed.
- Which source or missing source caused the failure.
- Whether the fix belongs to retrieval, prompting, citation generation, data quality, or policy routing.
- A concrete recommendation for the next eval run.
