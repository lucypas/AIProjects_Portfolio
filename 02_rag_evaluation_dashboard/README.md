# RAG Evaluation / Search Quality Dashboard

This artifact demonstrates how to evaluate search quality and RAG answer quality for media recommendations, help-center answers, and AI assistant responses.

## What Is Included

- `eval_rubric.md`: scoring rubric for groundedness, context relevance, answer relevance, citation quality, and hallucination risk.
- `sample_questions.csv`: small eval set with user questions, intents, expected source IDs, and risk tiers.
- `sample_results.csv`: before/after retrieval and answer quality results with pass/fail notes.
- `screenshots/`: dashboard screenshots showing the eval experience and launch-gate framing.

## How To Discuss It

The goal is not to show that a RAG pipeline exists. The goal is to show how quality would be measured before launch:

- Retrieval quality is measured separately from final answer quality.
- Each answer is evaluated against a rubric, not just judged by vibes.
- Launch decisions use thresholds by dimension, so a high average score cannot hide a safety or citation failure.
- Failed examples become a regression set for future retriever, prompt, and model changes.

## Example Launch Threshold

An answer is launch-ready only when all required dimensions meet the threshold:

- Groundedness: 80+
- Context relevance: 75+
- Answer relevance: 80+
- Citation quality: 70+
- Hallucination risk: 75+

If any dimension falls below threshold, the scenario stays on hold and the result should include an improvement recommendation.
