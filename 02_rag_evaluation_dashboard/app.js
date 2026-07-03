const questions = [
  {
    question_id: "Q001",
    domain: "media",
    user_question: "What should we watch if we want family-friendly sci-fi, not dark fantasy?",
    intent: "Media recommendation",
    expected_source_ids: "M001;M002;M004",
    risk_tier: "Medium",
    track: "Media Search",
    track_focus: "Tests personalization, ranking, and explicit user constraints.",
    failure_mode: "Ignored exclusion",
  },
  {
    question_id: "Q002",
    domain: "help-center",
    user_question: "Why does voice search on my Roku remote stop working after an update?",
    intent: "Troubleshooting answer",
    expected_source_ids: "H101",
    risk_tier: "Medium",
    track: "Support Assistant",
    track_focus: "Tests whether help-center retrieval beats unrelated product docs.",
    failure_mode: "Wrong source",
  },
  {
    question_id: "Q003",
    domain: "policy",
    user_question: "Can personalization override kids profile restrictions if my child likes action movies?",
    intent: "Policy answer",
    expected_source_ids: "H102",
    risk_tier: "High",
    track: "Policy / Safety",
    track_focus: "Tests policy hierarchy, safety rules, and launch hold behavior.",
    failure_mode: "Policy contradiction",
  },
];

const results = [
  {
    question_id: "Q001",
    run_version: "before",
    retrieval_profile: "Keyword baseline",
    retrieved_source_ids: "M003;M001;M002",
    answer_summary: "Recommends The Last Lantern first even though the user asked to avoid dark fantasy.",
    groundedness: 62,
    context_relevance: 55,
    answer_relevance: 58,
    citation_quality: 66,
    hallucination_risk: 64,
    status: "Hold",
    notes: "Top result is a noisy dark-fantasy title, and the answer turns an exclusion into a recommendation.",
    recommendation: "Add constraint extraction and rerank against required, preferred, and excluded attributes.",
  },
  {
    question_id: "Q001",
    run_version: "after",
    retrieval_profile: "Hybrid retrieval plus constraint rerank",
    retrieved_source_ids: "M001;M002;M004",
    answer_summary: "Recommends Galactic Harbor and Orbit Kitchen, while explaining why The Last Lantern should be avoided.",
    groundedness: 92,
    context_relevance: 91,
    answer_relevance: 94,
    citation_quality: 86,
    hallucination_risk: 90,
    status: "Pass",
    notes: "Relevant family/sci-fi context is ranked first and the answer respects the exclusion constraint.",
    recommendation: "Keep before/after retrieval snapshots for regression review.",
  },
  {
    question_id: "Q002",
    run_version: "before",
    retrieval_profile: "Dense-only retrieval",
    retrieved_source_ids: "P201;H101;P202",
    answer_summary: "Invents an enterprise support explanation for a Roku remote issue.",
    groundedness: 38,
    context_relevance: 42,
    answer_relevance: 35,
    citation_quality: 28,
    hallucination_risk: 30,
    status: "Hold",
    notes: "Correct help article appears but is ranked below unrelated product/platform docs; citation does not support the claim.",
    recommendation: "Add intent classification and filter retrieval to help-center/device sources.",
  },
  {
    question_id: "Q002",
    run_version: "after",
    retrieval_profile: "Intent classifier plus help-center filter",
    retrieved_source_ids: "H101;H102;P201",
    answer_summary: "Explains pairing, microphone permission, software update, and restart steps.",
    groundedness: 89,
    context_relevance: 84,
    answer_relevance: 87,
    citation_quality: 82,
    hallucination_risk: 88,
    status: "Pass",
    notes: "Troubleshooting steps are grounded in the voice search setup article.",
    recommendation: "Add claim-to-citation checks for support answers.",
  },
  {
    question_id: "Q003",
    run_version: "before",
    retrieval_profile: "Popularity-weighted retrieval",
    retrieved_source_ids: "M003;H102;M004",
    answer_summary: "Incorrectly says personalization can override kids profile restrictions.",
    groundedness: 24,
    context_relevance: 50,
    answer_relevance: 45,
    citation_quality: 20,
    hallucination_risk: 18,
    status: "Hold",
    notes: "Answer contradicts the policy source and cites a media synopsis for a policy claim.",
    recommendation: "Use policy-first retrieval and force review for child-safety policy regressions.",
  },
  {
    question_id: "Q003",
    run_version: "after",
    retrieval_profile: "Policy-first rerank plus safety gate",
    retrieved_source_ids: "H102;M003;M004",
    answer_summary: "Correctly says kids profile restrictions override personalization.",
    groundedness: 96,
    context_relevance: 89,
    answer_relevance: 95,
    citation_quality: 88,
    hallucination_risk: 94,
    status: "Pass",
    notes: "Policy context is ranked first and the answer directly states the control hierarchy.",
    recommendation: "Keep this as a high-risk regression case.",
  },
];

const dimensions = [
  ["groundedness", "Groundedness", 80],
  ["context_relevance", "Context relevance", 75],
  ["answer_relevance", "Answer relevance", 80],
  ["citation_quality", "Citation quality", 70],
  ["hallucination_risk", "Hallucination risk", 75],
];

const scoringModel = {
  groundedness: {
    components: [
      ["claimSupport", "Claim support", 0.5],
      ["evidenceAlignment", "Evidence alignment", 0.3],
      ["unsupportedClaimControl", "Unsupported-claim control", 0.2],
    ],
  },
  context_relevance: {
    components: [
      ["sourceMatch", "Relevant source match", 0.7],
      ["rankQuality", "Rank quality", 0.2],
      ["constraintFit", "Constraint satisfaction", 0.1],
    ],
  },
  answer_relevance: {
    components: [
      ["directness", "Question directness", 0.45],
      ["constraintHandling", "Constraint handling", 0.35],
      ["completeness", "Completeness", 0.2],
    ],
  },
  citation_quality: {
    components: [
      ["citationSupport", "Citation support", 0.5],
      ["citationCoverage", "Citation coverage", 0.3],
      ["citationPrecision", "Citation precision", 0.2],
    ],
  },
  hallucination_risk: {
    components: [
      ["evidenceRiskControl", "Evidence-risk control", 0.4],
      ["constraintSafety", "Constraint safety", 0.3],
      ["unsupportedAnswerControl", "Unsupported-answer control", 0.3],
    ],
  },
};

const calculationInputs = {
  "Q001-before": {
    groundedness: { claimSupport: 70, evidenceAlignment: 55, unsupportedClaimControl: 52 },
    context_relevance: { sourceMatch: 67, rankQuality: 35, constraintFit: 10 },
    answer_relevance: { directness: 70, constraintHandling: 42, completeness: 60 },
    citation_quality: { citationSupport: 70, citationCoverage: 65, citationPrecision: 58 },
    hallucination_risk: { evidenceRiskControl: 70, constraintSafety: 50, unsupportedAnswerControl: 70 },
  },
  "Q001-after": {
    groundedness: { claimSupport: 94, evidenceAlignment: 90, unsupportedClaimControl: 88 },
    context_relevance: { sourceMatch: 95, rankQuality: 85, constraintFit: 75 },
    answer_relevance: { directness: 96, constraintHandling: 92, completeness: 94 },
    citation_quality: { citationSupport: 88, citationCoverage: 84, citationPrecision: 84 },
    hallucination_risk: { evidenceRiskControl: 92, constraintSafety: 88, unsupportedAnswerControl: 90 },
  },
  "Q002-before": {
    groundedness: { claimSupport: 40, evidenceAlignment: 35, unsupportedClaimControl: 38 },
    context_relevance: { sourceMatch: 40, rankQuality: 55, constraintFit: 30 },
    answer_relevance: { directness: 35, constraintHandling: 30, completeness: 44 },
    citation_quality: { citationSupport: 24, citationCoverage: 30, citationPrecision: 33 },
    hallucination_risk: { evidenceRiskControl: 25, constraintSafety: 35, unsupportedAnswerControl: 30 },
  },
  "Q002-after": {
    groundedness: { claimSupport: 90, evidenceAlignment: 88, unsupportedClaimControl: 88 },
    context_relevance: { sourceMatch: 85, rankQuality: 85, constraintFit: 70 },
    answer_relevance: { directness: 88, constraintHandling: 85, completeness: 88 },
    citation_quality: { citationSupport: 84, citationCoverage: 80, citationPrecision: 80 },
    hallucination_risk: { evidenceRiskControl: 90, constraintSafety: 85, unsupportedAnswerControl: 88 },
  },
  "Q003-before": {
    groundedness: { claimSupport: 22, evidenceAlignment: 24, unsupportedClaimControl: 28 },
    context_relevance: { sourceMatch: 55, rankQuality: 45, constraintFit: 25 },
    answer_relevance: { directness: 58, constraintHandling: 20, completeness: 58 },
    citation_quality: { citationSupport: 20, citationCoverage: 20, citationPrecision: 20 },
    hallucination_risk: { evidenceRiskControl: 10, constraintSafety: 20, unsupportedAnswerControl: 25 },
  },
  "Q003-after": {
    groundedness: { claimSupport: 98, evidenceAlignment: 95, unsupportedClaimControl: 92 },
    context_relevance: { sourceMatch: 92, rankQuality: 85, constraintFit: 80 },
    answer_relevance: { directness: 96, constraintHandling: 95, completeness: 92 },
    citation_quality: { citationSupport: 90, citationCoverage: 88, citationPrecision: 83 },
    hallucination_risk: { evidenceRiskControl: 95, constraintSafety: 94, unsupportedAnswerControl: 93 },
  },
};

const state = {
  questionId: "Q001",
  version: "before",
};

const questionSelect = document.querySelector("#questionSelect");
const scoreGrid = document.querySelector("#scoreGrid");

function init() {
  questionSelect.innerHTML = questions
    .map((question) => `<option value="${question.question_id}">${question.user_question}</option>`)
    .join("");

  document.querySelector("#trackGrid").innerHTML = questions
    .map(
      (question) => `
        <button class="track-card" type="button" data-track-question="${question.question_id}">
          <p class="eyebrow">${question.question_id} / ${question.domain}</p>
          <strong>${question.track}</strong>
          <p>${question.track_focus}</p>
          <div class="track-meta">
            <span>${question.risk_tier} risk</span>
            <span>${question.failure_mode}</span>
          </div>
        </button>
      `,
    )
    .join("");

  document.querySelector("#questionRows").innerHTML = questions
    .map(
      (question) => `
        <tr>
          <td>${question.user_question}</td>
          <td>${question.intent}</td>
          <td>${question.expected_source_ids}</td>
          <td>${question.risk_tier}</td>
        </tr>
      `,
    )
    .join("");

  questionSelect.addEventListener("change", (event) => {
    state.questionId = event.target.value;
    render();
  });

  document.querySelectorAll("[data-track-question]").forEach((button) => {
    button.addEventListener("click", () => {
      state.questionId = button.dataset.trackQuestion;
      render();
    });
  });

  document.querySelectorAll("[data-version]").forEach((button) => {
    button.addEventListener("click", () => {
      state.version = button.dataset.version;
      document.querySelectorAll("[data-version]").forEach((item) => {
        item.classList.toggle("active", item === button);
      });
      render();
    });
  });

  render();
}

function render() {
  const question = questions.find((item) => item.question_id === state.questionId);
  const result = results.find((item) => item.question_id === state.questionId && item.run_version === state.version);
  const statusClass = result.status.toLowerCase();

  questionSelect.value = state.questionId;
  document.querySelectorAll("[data-track-question]").forEach((button) => {
    button.classList.toggle("active", button.dataset.trackQuestion === state.questionId);
  });
  document.querySelector("#retrievalProfile").textContent = result.retrieval_profile;
  document.querySelector("#retrievedIds").textContent = result.retrieved_source_ids;
  document.querySelector("#answerSummary").textContent = result.answer_summary;
  document.querySelector("#scenarioTitle").textContent = `${question.intent} / ${question.risk_tier} risk`;
  document.querySelector("#statusBadge").textContent = result.status;
  document.querySelector("#statusBadge").className = `badge ${statusClass}`;
  document.querySelector("#notes").textContent = result.notes;
  document.querySelector("#recommendation").textContent = result.recommendation;
  document.querySelector("#launchStatus").textContent = result.status;
  document.querySelector("#launchReason").textContent =
    result.status === "Pass"
      ? "All dimensions meet the launch threshold for this sample run."
      : "At least one dimension is below launch threshold; keep this scenario on hold.";
  document.querySelector("#launchCard").className = `status-card ${statusClass}`;

  scoreGrid.innerHTML = dimensions
    .map(([key, label, threshold]) => {
      const score = calculateScore(result, key);
      const status = score >= threshold ? "pass" : score >= threshold - 12 ? "watch" : "fail";
      return `
        <article class="metric ${status}">
          <p class="eyebrow">${label}</p>
          <strong>${score}</strong>
          <span>${score >= threshold ? "Pass" : "Below"} at ${threshold}+ threshold</span>
        </article>
      `;
    })
    .join("");

  renderCalculations(result);
}

function renderCalculations(result) {
  const calculationGrid = document.querySelector("#calculationGrid");

  calculationGrid.innerHTML = dimensions
    .map(([key, label, threshold]) => {
      const model = scoringModel[key];
      const inputs = calculationInputs[calculationKey(result)][key];
      const terms = model.components.map(([inputKey, componentLabel, weight]) => {
        const value = inputs[inputKey];
        return {
          label: componentLabel,
          value,
          weight,
          term: weight * value,
        };
      });
      const rawScore = terms.reduce((sum, item) => sum + item.term, 0);
      const score = Math.round(rawScore);
      const formula = terms.map((item) => `${item.weight.toFixed(2)} * ${item.value}`).join(" + ");

      return `
        <article class="calculation-card">
          <h3>${label}: ${score}</h3>
          <code class="formula">${formula} = ${rawScore.toFixed(1)} -> ${score}</code>
          <ul class="component-list">
            ${terms
              .map((item) => `<li>${item.label}: ${item.value} at ${Math.round(item.weight * 100)}%</li>`)
              .join("")}
          </ul>
          <p class="answer-summary">Launch threshold: ${threshold}+. ${score >= threshold ? "Passes this dimension." : "Fails this dimension."}</p>
        </article>
      `;
    })
    .join("");
}

function calculateScore(result, key) {
  const inputs = calculationInputs[calculationKey(result)][key];
  const model = scoringModel[key];
  const rawScore = model.components.reduce((sum, [inputKey, , weight]) => {
    return sum + inputs[inputKey] * weight;
  }, 0);
  return Math.round(rawScore);
}

function calculationKey(result) {
  return `${result.question_id}-${result.run_version}`;
}

init();
