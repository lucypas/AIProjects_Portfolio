const REVIEW_CONFIDENCE_THRESHOLD = 76;
const CONFIDENCE_MIN = 35;
const CONFIDENCE_MAX = 93;
const DEFAULT_SOURCE_SCORE = 35;

const baseKnowledge = [
  {
    id: "REQ-104",
    type: "Requirements",
    title: "Enterprise Intake Definition of Ready",
    keywords: ["pilot", "success", "metrics", "region", "jira", "ready", "owner", "launch"],
    excerpt:
      "Delivery plans must include personas, measurable KPIs, acceptance criteria, rollout scope, owner, dependencies, and a launch checklist before Jira handoff.",
  },
  {
    id: "POL-212",
    type: "Policy",
    title: "Sensitive Data and Model Gateway Handling",
    keywords: ["legal", "customer", "notes", "third-party", "model", "policy", "pii", "regulated", "compliance"],
    excerpt:
      "Sensitive notes can be processed only through approved model gateways with redaction, retention limits, audit logs, and human review for uncertain classifications.",
  },
  {
    id: "PROD-330",
    type: "Product",
    title: "Agentic Workflow Capabilities",
    keywords: ["summarize", "draft", "recommend", "confidence", "approval", "workflow", "assistant"],
    excerpt:
      "The platform supports summarization, classification, retrieval-grounded drafting, confidence scoring, and approval checkpoints before external system writes.",
  },
  {
    id: "EVAL-091",
    type: "Eval",
    title: "Enterprise AI Launch Eval Rubric",
    keywords: ["eval", "trust", "quality", "hallucination", "grounding", "review", "accuracy"],
    excerpt:
      "Launch evals should score grounding, completeness, policy compliance, risk handling, business value, and reviewer actionability.",
  },
];

const scenarios = {
  field: {
    label: "ServiceNow AI Gateway",
    sample: [
      "We need something for the field services org.",
      "Dispatch managers keep asking if the AI gateway can summarize incoming priority incidents,",
      "check if a warranty exception applies, and draft the work order update before the technician arrives.",
      "It has to work with the ServiceNow queue and our internal parts API.",
      "Legal is nervous about sending customer notes to third-party models.",
      "We want a pilot in six weeks for the Northeast region,",
      "but nobody has written the success metrics yet.",
    ].join(" "),
    docs: [
      {
        id: "API-882",
        type: "API",
        title: "ServiceNow and Parts API Integration Notes",
        keywords: ["servicenow", "parts api", "queue", "warranty", "dispatch", "incident", "technician"],
        excerpt:
          "ServiceNow incidents expose priority, customer tier, asset id, and notes. The parts API exposes warranty status, exception code, inventory, and ETA.",
      },
    ],
    stories: [
      [
        "Summarize priority incidents",
        "As a dispatch manager, I want priority incidents summarized with customer tier, asset context, warranty status, and next best action so I can assign technicians faster.",
        "PROD-330, API-882",
      ],
      [
        "Draft governed work order updates",
        "As a service coordinator, I want the agent to draft work order updates using approved gateway controls so technicians receive accurate prep notes before arrival.",
        "PROD-330, POL-212",
      ],
      [
        "Launch a measurable Northeast pilot",
        "As an operations leader, I want a scoped pilot with KPIs and owners so we can decide whether to expand after six weeks.",
        "REQ-104, EVAL-091",
      ],
    ],
    criteria: [
      [
        "Given a priority ServiceNow incident, when the workflow runs, then the summary includes",
        "incident priority, customer tier, asset id, warranty signal, and recommended action.",
      ].join(" "),
      "Given customer notes contain sensitive data, when the gateway processes them, then redaction, retention limits, and audit logging are applied before generation.",
      "Given the parts API is unavailable, when a draft is shown, then the workflow displays a dependency warning and does not invent warranty or inventory details.",
      "Given policy approval or pilot KPIs are missing, when Jira export is requested, then a human reviewer must approve or request clarification first.",
    ],
    risks: [
      ["high", "Legal approval is required for customer note processing through any third-party model path."],
      ["medium", "ServiceNow and parts API field mapping may delay delivery if owners are not assigned in week one."],
      ["medium", "Success metrics are missing from the intake and need human confirmation before launch."],
      ["low", "Technician adoption may depend on draft quality and mobile readability."],
    ],
    kpis: [
      "Reduce dispatch triage time by 25% in the Northeast pilot queue.",
      "Achieve 80% reviewer approval rate for generated work order drafts.",
      "Keep policy exception rate below 2% of processed incidents.",
      "Improve first-visit readiness score by 15% for pilot work orders.",
    ],
    launch: [
      "Confirm Northeast pilot owner, reviewer pool, and escalation path.",
      "Complete legal review for customer note handling.",
      "Validate ServiceNow and parts API sandbox credentials.",
      "Run 30-scenario offline eval before live pilot.",
      "Create Jira epic with scoped stories, dependencies, owners, and review gate.",
    ],
  },
  disney: {
    label: "Disney AI Assistant",
    sample: [
      "The parks operations team wants an AI assistant that can summarize guest complaints from chat logs,",
      "identify which ride or restaurant is driving the issue,",
      "and draft a suggested response for guest relations before the next shift starts.",
      "It needs park schedule data, Zendesk tickets, and the incident tracker.",
      "Legal is worried about children's data and anything that sounds like compensation promises.",
      "Leadership wants two resorts in pilot before the holiday rush,",
      "but nobody has agreed whether success means faster response time, better satisfaction, or fewer escalations.",
    ].join(" "),
    docs: [
      {
        id: "PARK-221",
        type: "Product",
        title: "Guest Relations Assistant Context",
        keywords: ["parks", "guest", "complaints", "ride", "restaurant", "zendesk", "incident", "resort"],
        excerpt:
          "Guest relations workflows combine ticket history, park schedules, incident tracker context, and approved response templates before cast member review.",
      },
      {
        id: "POL-407",
        type: "Policy",
        title: "Youth Data and Guest Recovery Guardrails",
        keywords: ["children", "guest", "compensation", "legal", "privacy", "promise", "minor"],
        excerpt:
          "Responses involving minors, compensation, safety, or guest recovery promises require approved templates and human review before sending.",
      },
    ],
    stories: [
      [
        "Summarize guest complaint themes",
        "As a guest relations lead, I want complaint summaries grouped by attraction, restaurant, or service area so the next shift can prioritize follow-up.",
        "PARK-221",
      ],
      [
        "Draft policy-safe guest responses",
        "As a cast member, I want suggested responses constrained by approved templates so replies stay empathetic without making unauthorized compensation promises.",
        "POL-407, PROD-330",
      ],
      [
        "Measure resort pilot outcomes",
        "As a parks operator, I want KPIs for response time, satisfaction, and escalation rate so leadership can compare pilot impact across two resorts.",
        "REQ-104, EVAL-091",
      ],
    ],
    criteria: [
      "Given guest chat logs and incidents, when the assistant summarizes an issue, then it cites the related ride, restaurant, schedule, or incident source.",
      "Given a response mentions compensation, safety, or children's data, when the draft is generated, then human review is required before use.",
      "Given multiple possible success metrics, when the plan is created, then the pilot owner must select primary and secondary KPIs before launch.",
    ],
    risks: [
      ["high", "Children's data and guest recovery promises create privacy and legal review requirements."],
      ["medium", "Attribution to a ride or restaurant may be wrong if incident tracker and chat timestamps are misaligned."],
      ["medium", "Holiday rush timing may compress training and reviewer capacity."],
      ["low", "Overly generic responses could reduce cast member trust in the assistant."],
    ],
    kpis: [
      "Reduce average guest response drafting time by 30%.",
      "Improve post-contact satisfaction by 8 points for pilot queues.",
      "Reduce preventable escalations by 15%.",
      "Keep template-policy violations below 1% of reviewed drafts.",
    ],
    launch: [
      "Confirm pilot resorts, reviewer group, and escalation rules.",
      "Approve response templates for compensation and sensitive guest issues.",
      "Validate Zendesk, schedule, and incident tracker data mapping.",
      "Run red-team evals for minors, safety, and compensation scenarios.",
      "Review pilot metrics after two operating weeks.",
    ],
  },
  databricks: {
    label: "Databricks Agentic AI",
    sample: [
      "The data platform team wants an agent that can look at a messy analytics request from finance,",
      "find the right governed tables in Unity Catalog, generate a draft SQL query,",
      "and explain whether the result is safe to share with executives.",
      "It should use lineage metadata, table descriptions, access policies, and recent query examples.",
      "Security is concerned about exposing payroll-adjacent fields.",
      "The CFO wants a prototype for monthly business reviews in four weeks,",
      "but we do not know who owns query validation or how to measure trust in the output.",
    ].join(" "),
    docs: [
      {
        id: "DATA-510",
        type: "Product",
        title: "Governed Analytics Agent Pattern",
        keywords: ["unity catalog", "lineage", "table", "sql", "finance", "query", "governed", "databricks"],
        excerpt:
          "Analytics agents should use catalog metadata, lineage, table descriptions, access policy checks, and saved query examples before drafting SQL.",
      },
      {
        id: "SEC-118",
        type: "Policy",
        title: "Sensitive Finance Field Controls",
        keywords: ["security", "payroll", "executive", "access", "safe", "share", "finance"],
        excerpt:
          "Payroll-adjacent or restricted finance fields require access-policy validation, explainable lineage, and reviewer approval before executive sharing.",
      },
    ],
    stories: [
      [
        "Find governed tables for finance requests",
        "As a finance analyst, I want the agent to identify trusted tables and lineage so I can avoid using stale or unauthorized data.",
        "DATA-510",
      ],
      [
        "Draft SQL with policy explanation",
        "As a data platform reviewer, I want generated SQL to include access-policy notes and sensitive-field warnings before execution.",
        "DATA-510, SEC-118",
      ],
      [
        "Validate trust for MBR reporting",
        "As a CFO staff lead, I want a measurable validation workflow so monthly business review outputs are trusted before executive sharing.",
        "REQ-104, EVAL-091",
      ],
    ],
    criteria: [
      "Given a finance request, when the agent proposes a table, then it shows catalog description, owner, freshness, and lineage source.",
      "Given a query touches payroll-adjacent fields, when SQL is drafted, then the agent blocks executive export until policy review passes.",
      "Given no validation owner is named, when the delivery plan is created, then human review is required before Jira handoff.",
    ],
    risks: [
      ["high", "Payroll-adjacent fields can create access and privacy risk if policy checks are incomplete."],
      ["medium", "Draft SQL may be syntactically valid but semantically wrong without lineage validation."],
      ["medium", "Trust metrics are undefined and need agreement before monthly business review use."],
      ["low", "Finance users may bypass the agent if approvals feel slower than manual queries."],
    ],
    kpis: [
      "Reduce table discovery time by 40% for finance analytics requests.",
      "Achieve 90% reviewer acceptance for generated SQL drafts.",
      "Keep restricted-field policy violations at 0 in pilot.",
      "Increase analyst trust score to 4 out of 5 after pilot.",
    ],
    launch: [
      "Select pilot finance workflows and validation owner.",
      "Connect catalog metadata, lineage, access policies, and saved query examples.",
      "Define restricted-field blocklist and review policy.",
      "Run evals against known finance request/query pairs.",
      "Publish Jira epic with SQL validation and governance checkpoints.",
    ],
  },
  openai: {
    label: "OpenAI AI Success",
    sample: [
      "A large healthcare customer wants help launching an internal AI assistant for benefits administrators.",
      "The assistant should answer policy questions, summarize plan documents,",
      "and draft responses to employee benefit inquiries.",
      "It needs retrieval over plan docs, HR policy notes, redaction rules, and approved response examples.",
      "The customer is nervous about hallucinations and regulated data.",
      "They want an executive-ready pilot plan in three weeks,",
      "but have not defined evals, human review ownership, or launch KPIs.",
    ].join(" "),
    docs: [
      {
        id: "SUCCESS-720",
        type: "Product",
        title: "Enterprise AI Success Pilot Plan",
        keywords: ["healthcare", "benefits", "administrator", "plan docs", "hr", "pilot", "customer"],
        excerpt:
          "AI success pilots should define user workflow, retrieval scope, eval set, reviewer ownership, rollout metrics, and executive decision criteria.",
      },
      {
        id: "SAFE-334",
        type: "Policy",
        title: "Regulated Benefits Response Controls",
        keywords: ["regulated", "hallucination", "redaction", "benefits", "employee", "healthcare", "approved"],
        excerpt:
          "Regulated benefits assistants require grounded answers, approved response examples, redaction, refusal behavior, and human review for uncertain guidance.",
      },
    ],
    stories: [
      [
        "Answer benefits policy questions with citations",
        "As a benefits administrator, I want grounded answers from plan documents and policy notes so I can respond consistently to employee inquiries.",
        "SUCCESS-720, SAFE-334",
      ],
      [
        "Draft reviewed employee responses",
        "As an HR reviewer, I want drafted responses to include citations and uncertainty flags so regulated guidance is reviewed before sending.",
        "SAFE-334",
      ],
      [
        "Create executive-ready pilot plan",
        "As an AI success lead, I want evals, launch KPIs, and ownership defined so the customer can make a confident rollout decision.",
        "REQ-104, EVAL-091",
      ],
    ],
    criteria: [
      "Given a benefits question, when the assistant answers, then it cites the plan document or approved response example used.",
      "Given the answer confidence is low or policy context is missing, when a draft is produced, then human review is required.",
      "Given launch KPIs are undefined, when the plan is created, then the workflow blocks executive signoff until metrics are selected.",
    ],
    risks: [
      ["high", "Regulated data and hallucination risk require strict grounding and reviewer ownership."],
      ["high", "Unclear human review ownership could block executive pilot approval."],
      ["medium", "Plan document freshness may affect answer accuracy."],
      ["low", "Administrators may need training on when to trust or escalate answers."],
    ],
    kpis: [
      "Achieve 95% grounded-answer pass rate on pilot eval set.",
      "Reduce benefits response drafting time by 30%.",
      "Keep unreviewed regulated guidance at 0.",
      "Reach 85% administrator satisfaction in pilot survey.",
    ],
    launch: [
      "Define eval set with approved and edge-case benefits questions.",
      "Assign HR reviewer owner and escalation SLA.",
      "Validate retrieval over plan docs, HR notes, redaction rules, and approved examples.",
      "Run hallucination and refusal behavior evals.",
      "Prepare executive pilot readout with KPI baseline and decision criteria.",
    ],
  },
  amazon: {
    label: "Amazon AI Studios",
    sample: [
      "The media production team wants an AI workflow that turns a rough show concept into a pitch packet",
      "with audience positioning, production risks, budget assumptions, and launch channel recommendations.",
      "It should pull from past campaign performance, rights guidelines, brand safety rules,",
      "and sample production schedules.",
      "Legal is concerned about IP similarity and talent contract constraints.",
      "Studio leadership wants a demo before greenlight planning,",
      "but the team has not decided whether this is a creative assistant, a planning tool, or an approval workflow.",
    ].join(" "),
    docs: [
      {
        id: "STUDIO-615",
        type: "Product",
        title: "Studio Pitch Packet Workflow",
        keywords: ["studio", "show", "pitch", "audience", "budget", "production", "campaign", "greenlight"],
        excerpt:
          "Pitch workflows should combine audience positioning, comparable campaign performance, production assumptions, launch channels, and greenlight criteria.",
      },
      {
        id: "RIGHTS-260",
        type: "Policy",
        title: "IP Similarity and Talent Constraint Review",
        keywords: ["ip", "rights", "talent", "contract", "brand safety", "legal", "similarity"],
        excerpt:
          "Creative concepts require rights review for IP similarity, talent restrictions, brand safety, and contract obligations before greenlight use.",
      },
    ],
    stories: [
      [
        "Generate pitch packet draft",
        "As a development executive, I want a pitch packet draft with audience positioning and production assumptions so greenlight discussion starts from a structured brief.",
        "STUDIO-615",
      ],
      [
        "Surface rights and brand safety risks",
        "As a legal reviewer, I want IP similarity and talent constraint flags before the pitch packet is used in approval meetings.",
        "RIGHTS-260",
      ],
      [
        "Clarify workflow ownership",
        "As a studio operations lead, I want the workflow classified as creative assistant, planning tool, or approval workflow so review depth matches risk.",
        "REQ-104",
      ],
    ],
    criteria: [
      [
        "Given a rough show concept, when the workflow runs, then the packet includes audience,",
        "comparable campaigns, production assumptions, risks, and launch channel recommendations.",
      ].join(" "),
      "Given IP similarity or talent restrictions are detected, when the packet is prepared, then legal review is required before greenlight use.",
      "Given the workflow type is undecided, when Jira export is requested, then the plan asks for ownership and approval-path clarification.",
    ],
    risks: [
      ["high", "IP similarity and talent contract constraints could block use in greenlight planning."],
      ["medium", "Budget assumptions may be misleading if production schedule examples are not comparable."],
      ["medium", "The workflow purpose is ambiguous, which affects governance and success metrics."],
      ["low", "Creative teams may reject outputs that feel too template-driven."],
    ],
    kpis: [
      "Reduce pitch packet first-draft time by 35%.",
      "Achieve 85% reviewer usefulness rating from development executives.",
      "Identify rights or brand-safety issues before greenlight in 95% of test cases.",
      "Reduce rework from missing budget assumptions by 20%.",
    ],
    launch: [
      "Choose workflow classification and accountable owner.",
      "Approve rights, talent, and brand safety review criteria.",
      "Validate campaign, schedule, and budget reference data.",
      "Run concept similarity and legal-risk evals.",
      "Pilot with two non-confidential concepts before greenlight planning.",
    ],
  },
};

const rubricItems = [
  ["Grounding", "Uses cited KB sources for each major recommendation.", "25%"],
  ["Jira Readiness", "Stories and criteria are scoped, testable, and dependency-aware.", "25%"],
  ["Risk Handling", "Flags compliance, integration, data, and timeline risks.", "20%"],
  ["Business Value", "KPIs connect workflow output to operational outcomes.", "20%"],
  ["Reviewability", "Confidence and human checkpoint are clear.", "10%"],
];

const flowSteps = [
  ["Intake Parser", "Extracts persona, workflow, systems, timeline, constraints, and missing fields."],
  ["Retriever", "Ranks requirements, policy, product, and API notes against the request."],
  ["Planner", "Converts context into delivery slices and Jira-ready artifacts."],
  ["Risk Critic", "Checks policy exposure, integration uncertainty, owner gaps, and timeline pressure."],
  ["Confidence Gate", "Blocks export when confidence is low or governance blockers are present."],
  ["Delivery Publisher", "Formats stories, criteria, KPIs, risks, and launch checklist for Jira handoff."],
];

const state = {
  confidence: 0,
  sources: [],
  plan: {},
};

const scenarioSelect = document.querySelector("#scenario-select");
const requestInput = document.querySelector("#request-input");
const runButton = document.querySelector("#run-agent");
const resetButton = document.querySelector("#load-sample");

function $(selector) {
  return document.querySelector(selector);
}

function setHtml(selector, html) {
  $(selector).innerHTML = html;
}

function normalize(text) {
  return text.toLowerCase();
}

function activeScenario() {
  return scenarios[scenarioSelect.value] || scenarios.field;
}

function activeKnowledge() {
  return [...baseKnowledge, ...activeScenario().docs];
}

function scoreSource(request, source) {
  const text = normalize(request);
  const hits = source.keywords.filter((keyword) => text.includes(keyword));
  const score = Math.min(99, Math.round((hits.length / source.keywords.length) * 100 + 28));

  return {
    ...source,
    hits,
    score,
  };
}

function detectBlockers(request) {
  const text = normalize(request);
  const blockers = [
    ["Legal or compliance approval is unresolved.", ["legal", "compliance", "regulated", "policy has not approved", "has not approved"]],
    ["Sensitive or protected data may be included.", ["children", "minor", "customer notes", "employee", "payroll", "healthcare", "regulated data", "pii"]],
    [
      "Success metrics are missing or disputed.",
      ["no success", "missing success", "not defined evals", "not defined", "nobody has written", "not agreed", "do not know", "unclear metrics"],
    ],
    ["Human owner or approval path is unclear.", ["no owner", "who owns", "unclear owner", "not decided", "escalation path", "approval workflow"]],
    ["Timeline pressure increases rollout risk.", ["three weeks", "four weeks", "six weeks", "next month", "holiday rush", "before greenlight"]],
  ];

  return blockers
    .filter(([, terms]) => terms.some((term) => text.includes(term)))
    .map(([label]) => label);
}

function inferConfidence(request, sources, blockers) {
  const text = normalize(request);
  const signals = ["pilot", "api", "policy", "review", "metrics", "workflow", "assistant", "launch", "owner", "eval"];
  const signalHits = signals.filter((signal) => text.includes(signal)).length;
  const retrievalStrength = sources.reduce((sum, source) => sum + source.hits.length, 0);
  const blockerPenalty = blockers.length * 6;
  const confidence = 50 + signalHits * 3 + retrievalStrength * 2 - blockerPenalty;

  return Math.max(CONFIDENCE_MIN, Math.min(CONFIDENCE_MAX, confidence));
}

function needsHumanReview(confidence, reviewReasons) {
  return confidence < REVIEW_CONFIDENCE_THRESHOLD || reviewReasons.length > 0;
}

function formatSourceIds(sources) {
  return sources
    .slice(0, 4)
    .map((source) => source.id)
    .join(", ");
}

function buildPlan(confidence, sources, blockers) {
  const scenario = activeScenario();
  const requiresReview = needsHumanReview(confidence, blockers);
  const cited = formatSourceIds(sources);

  return {
    stories: scenario.stories.map(([title, body, source]) => ({ title, body, source })),
    criteria: scenario.criteria,
    risks: scenario.risks,
    kpis: scenario.kpis,
    launch: scenario.launch,
    reviewReasons: blockers,
    review:
      requiresReview
        ? `Human review required before Jira export. Confidence is ${confidence}% and the plan cites ${cited}.`
        : `Human review optional before Jira export. Confidence is ${confidence}% with strong retrieval coverage from ${cited}.`,
  };
}

function renderSources(sources) {
  setHtml(
    "#retrieval-results",
    sources
      .map(
        (source) => `
        <article class="source-card">
          <header>
            <h4>${source.title}</h4>
            <span class="score-pill">${source.score}% match</span>
          </header>
          <p class="muted">${source.excerpt}</p>
          <span class="tag">${source.type} - ${source.id}</span>
        </article>
      `,
      )
      .join(""),
  );
}

function renderFlow() {
  setHtml(
    "#flow-steps",
    flowSteps
      .map(
        ([title, description], index) => `
        <article class="flow-card">
          <header>
            <span class="flow-index">${index + 1}</span>
          </header>
          <h4>${title}</h4>
          <p class="muted">${description}</p>
        </article>
      `,
      )
      .join(""),
  );
}

function renderStories(stories) {
  setHtml(
    "#stories",
    stories
      .map(
        (story) => `
        <article class="story-card">
          <header>
            <h4>${story.title}</h4>
            <span class="tag">${story.source}</span>
          </header>
          <p>${story.body}</p>
        </article>
      `,
      )
      .join(""),
  );
}

function renderList(selector, items, className = "") {
  setHtml(
    selector,
    items
      .map((item) => {
        if (Array.isArray(item)) {
          return `<li class="${item[0]}">${item[1]}</li>`;
        }
        return `<li class="${className}">${item}</li>`;
      })
      .join(""),
  );
}

function renderRubric() {
  setHtml(
    "#rubric",
    rubricItems
      .map(
        ([name, description, weight]) => `
        <article class="rubric-card">
          <header>
            <h4>${name}</h4>
            <strong>${weight}</strong>
          </header>
          <p class="muted">${description}</p>
        </article>
      `,
      )
      .join(""),
  );
}

function renderConfidence(confidence, plan) {
  const chip = $("#confidence-chip");
  const reviewPanel = $("#review");
  const requiresReview = needsHumanReview(confidence, plan.reviewReasons);

  chip.textContent = `Confidence: ${confidence}%`;
  chip.classList.toggle("low", requiresReview);
  reviewPanel.classList.toggle("flagged", requiresReview);
  $("#review-title").textContent = `Review Required: ${requiresReview ? "Yes" : "No"}`;
  $("#review-summary").textContent = plan.review;
  setHtml(
    "#review-reasons",
    plan.reviewReasons.length
      ? plan.reviewReasons.map((reason) => `<li>${reason}</li>`).join("")
      : "<li>No hard blockers detected.</li>",
  );
}

function runAgent() {
  const request = requestInput.value.trim();
  const scoredSources = activeKnowledge()
    .map((source) => scoreSource(request, source))
    .filter((source) => source.hits.length > 0)
    .sort((a, b) => b.score - a.score);

  const rankedSources = scoredSources.length
    ? scoredSources
    : activeKnowledge().map((source) => ({ ...source, hits: [], score: DEFAULT_SOURCE_SCORE }));
  const blockers = detectBlockers(request);
  const confidence = inferConfidence(request, rankedSources, blockers);
  const plan = buildPlan(confidence, rankedSources, blockers);

  state.confidence = confidence;
  state.sources = rankedSources;
  state.plan = plan;

  renderSources(rankedSources);
  renderStories(plan.stories);
  renderList("#criteria", plan.criteria);
  renderList("#risks", plan.risks);
  renderList("#kpis", plan.kpis);
  renderList("#launch", plan.launch);
  renderConfidence(confidence, plan);
}

function loadScenario() {
  requestInput.value = activeScenario().sample;
  runAgent();
}

function setActiveNav() {
  const sections = [...document.querySelectorAll("main section[id]")];
  let active = sections[0];

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 120) {
      active = section;
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", active && link.getAttribute("href") === `#${active.id}`);
  });
}

renderFlow();
renderRubric();
loadScenario();

scenarioSelect.addEventListener("change", loadScenario);
runButton.addEventListener("click", runAgent);
resetButton.addEventListener("click", loadScenario);
document.addEventListener("scroll", setActiveNav, { passive: true });
