const scenarios = {
  baseline: {
    updatedAt: "Updated 09:45 UTC",
    blockers: "2 blockers",
    decision: "Hold for Review",
    decisionText: "Two blocker gates must clear before advertiser-facing reports are marked ready.",
    readiness: "Hold for review",
    kpis: {
      fillRate: ["91.8%", "+2.4 pts vs 7-day baseline", "good"],
      completionRate: ["87.3%", "-1.1 pts on mobile midroll", ""],
      latency: ["1.42s", "Creative fetch is top driver", "warn"],
      errorRate: ["2.7%", "Blocker on live midroll", "bad"],
      revenueImpact: ["$48.2k", "Directional daily estimate", ""],
      consentCoverage: ["98.6%", "EU policy v2026.07 review open", "good"]
    },
    funnel: [
      ["Ad requests", "12.8M", 100, "blue"],
      ["Eligible", "12.0M", 94, "teal"],
      ["Filled", "11.0M", 86, "teal"],
      ["Impressions", "10.4M", 81, "amber"],
      ["Completed", "9.1M", 71, "amber"],
      ["Errors", "346k", 13, "red"]
    ],
    quality: [
      ["Consent join coverage", "EU policy v2026.07 has unmapped aggregate events", "Blocker", "blocker"],
      ["Live midroll VAST timeout", "Creative fetch timeout above threshold", "Blocker", "blocker"],
      ["Late arrival window", "95.8 percent within 10 minutes", "Pass", "pass"],
      ["Duplicate event IDs", "0.08 percent rolling 30 minutes", "Pass", "pass"],
      ["Placement catalog match", "Unmapped IDs in beta CTV app build", "Watch", "watch"]
    ],
    regions: [
      ["US", "99.1%", "Personalized + contextual", "good"],
      ["EU", "96.4%", "Aggregate review open", "warn"],
      ["LATAM", "98.8%", "Contextual stable", "good"],
      ["APAC", "98.2%", "Policy v2026.06", "good"]
    ],
    incidents: [
      ["Live midroll VAST timeout on mobile app 8.14.2", "Engineering", "$22.4k", "Review", "blocker"],
      ["EU aggregate measurement mode missing policy version", "Privacy/Data", "$11.8k", "Hold", "hold"],
      ["CTV beta placements missing catalog mapping", "Ad Delivery", "$8.7k", "Watch", "watch"],
      ["Completion duration outliers on 15s creative family", "Measurement", "$5.3k", "Watch", "watch"]
    ]
  },
  liveEvent: {
    updatedAt: "Updated 20:05 UTC",
    blockers: "3 blockers",
    decision: "Block Publish",
    decisionText: "Live-event delivery errors and late completions exceed the reporting gate threshold.",
    readiness: "Block publish",
    kpis: {
      fillRate: ["84.6%", "-6.8 pts on live midroll", "bad"],
      completionRate: ["79.4%", "-8.2 pts vs baseline", "bad"],
      latency: ["2.18s", "Ad server + creative fetch spike", "bad"],
      errorRate: ["5.9%", "VAST timeout and SDK retry failures", "bad"],
      revenueImpact: ["$126.5k", "Directional daily estimate", "warn"],
      consentCoverage: ["98.1%", "Stable but not the primary blocker", "good"]
    },
    funnel: [
      ["Ad requests", "8.4M", 100, "blue"],
      ["Eligible", "8.0M", 95, "teal"],
      ["Filled", "6.8M", 81, "amber"],
      ["Impressions", "6.1M", 73, "amber"],
      ["Completed", "4.8M", 57, "red"],
      ["Errors", "496k", 24, "red"]
    ],
    quality: [
      ["Creative fetch timeout", "Live-event demand path above blocker threshold", "Blocker", "blocker"],
      ["Late completion events", "Freshness window missed for priority advertisers", "Blocker", "blocker"],
      ["SDK retry failures", "Mobile app 8.14.2 retry success below target", "Blocker", "blocker"],
      ["Consent join coverage", "Coverage remains within threshold", "Pass", "pass"]
    ],
    regions: [
      ["US", "98.9%", "Personalized + contextual", "good"],
      ["EU", "97.2%", "Aggregate stable", "good"],
      ["LATAM", "98.4%", "Contextual stable", "good"],
      ["APAC", "97.9%", "Policy v2026.06", "good"]
    ],
    incidents: [
      ["Live-event midroll demand path timeout", "Engineering", "$74.2k", "Review", "blocker"],
      ["Late completion events for priority sponsor package", "Measurement", "$31.6k", "Hold", "hold"],
      ["Mobile SDK retry regression", "Client Platform", "$20.7k", "Review", "blocker"]
    ]
  },
  consentRisk: {
    updatedAt: "Updated 14:20 UTC",
    blockers: "2 blockers",
    decision: "Hold for Privacy Review",
    decisionText: "Consent-safe measurement coverage is below threshold in regions requiring policy proof.",
    readiness: "Privacy hold",
    kpis: {
      fillRate: ["92.6%", "+1.1 pts vs baseline", "good"],
      completionRate: ["88.1%", "+0.4 pts vs baseline", "good"],
      latency: ["1.21s", "Within delivery guardrail", "good"],
      errorRate: ["1.4%", "No delivery blocker", "good"],
      revenueImpact: ["$18.7k", "Suppressed measurement estimate", ""],
      consentCoverage: ["92.8%", "EU and APAC policy proof gaps", "bad"]
    },
    funnel: [
      ["Ad requests", "10.2M", 100, "blue"],
      ["Eligible", "9.6M", 94, "teal"],
      ["Filled", "8.9M", 87, "teal"],
      ["Impressions", "8.6M", 84, "teal"],
      ["Completed", "7.6M", 75, "amber"],
      ["Suppressed", "614k", 20, "red"]
    ],
    quality: [
      ["EU policy version missing", "Aggregate events cannot prove current policy version", "Blocker", "blocker"],
      ["APAC consent source unmapped", "Consent source missing for connected TV app", "Blocker", "blocker"],
      ["Duplicate event IDs", "0.05 percent rolling 30 minutes", "Pass", "pass"],
      ["Placement catalog match", "All priority placements mapped", "Pass", "pass"]
    ],
    regions: [
      ["US", "99.3%", "Personalized + contextual", "good"],
      ["EU", "89.7%", "Policy proof gap", "bad"],
      ["LATAM", "98.5%", "Contextual stable", "good"],
      ["APAC", "91.8%", "Consent source review", "bad"]
    ],
    incidents: [
      ["EU aggregate events missing current policy version", "Privacy/Data", "$9.8k", "Hold", "hold"],
      ["APAC CTV consent source unmapped", "Privacy/Data", "$6.3k", "Hold", "hold"],
      ["Suppressed measurement coverage increased after app release", "Data Platform", "$2.6k", "Watch", "watch"]
    ]
  }
};

const classNames = ["good", "bad", "warn"];

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
}

function renderKpis(kpis) {
  Object.entries(kpis).forEach(([key, [value, note, tone]]) => {
    const valueNode = document.querySelector(`[data-kpi="${key}"]`);
    const noteNode = document.querySelector(`[data-kpi="${key}Note"]`);
    valueNode.textContent = value;
    noteNode.textContent = note;
    valueNode.classList.remove(...classNames);
    noteNode.classList.remove(...classNames);
    if (tone) {
      valueNode.classList.add(tone);
      noteNode.classList.add(tone);
    }
  });
}

function renderFunnel(rows) {
  document.querySelector("[data-funnel]").innerHTML = rows.map(([label, value, width, tone]) => `
    <div class="funnel-row">
      <strong>${label}</strong>
      <div class="bar-track"><div class="bar ${tone}" style="width: ${width}%"></div></div>
      <span>${value}</span>
    </div>
  `).join("");
}

function renderQuality(rows) {
  document.querySelector("[data-quality]").innerHTML = rows.map(([title, detail, label, tone]) => `
    <div class="quality-row">
      <div>
        <strong>${title}</strong>
        <div class="mini">${detail}</div>
      </div>
      <span class="pill ${tone}">${label}</span>
    </div>
  `).join("");
}

function renderRegions(rows) {
  document.querySelector("[data-regions]").innerHTML = rows.map(([region, value, detail, tone]) => `
    <div class="region">
      <span class="label">${region}</span>
      <strong class="${tone}">${value}</strong>
      <div class="mini">${detail}</div>
    </div>
  `).join("");
}

function renderIncidents(rows) {
  document.querySelector("[data-incidents]").innerHTML = rows.map(([issue, owner, impact, status, tone]) => `
    <tr>
      <td>${issue}</td>
      <td>${owner}</td>
      <td>${impact}</td>
      <td><span class="pill ${tone}">${status}</span></td>
    </tr>
  `).join("");
}

function renderScenario(name) {
  const scenario = scenarios[name];
  renderKpis(scenario.kpis);
  renderFunnel(scenario.funnel);
  renderQuality(scenario.quality);
  renderRegions(scenario.regions);
  renderIncidents(scenario.incidents);
  setText("[data-field='updatedAt']", scenario.updatedAt);
  setText("[data-field='blockers']", scenario.blockers);
  setText("[data-field='decision']", scenario.decision);
  setText("[data-field='decisionText']", scenario.decisionText);
  setText("[data-field='readiness']", scenario.readiness);

  document.querySelectorAll(".scenario-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.scenario === name);
  });
}

document.querySelectorAll(".scenario-button").forEach((button) => {
  button.addEventListener("click", () => renderScenario(button.dataset.scenario));
});

renderScenario("baseline");
