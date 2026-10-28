// Comprehensive Rigorous End-to-End Test Suite for AutoSys TalentHunter AI
// Testing against the live production server at http://localhost:3005

let passed = 0;
let failed = 0;

function assert(condition, testName, details = "") {
  if (condition) {
    passed++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${testName} - ${details}`);
  }
}

const PRESET_ROLES = [
  {
    name: "Staff Rust Software Developer",
    client: "Ford",
    location: "Palo Alto",
    rawText: `Position: Staff Rust Software Developer
Location: Palo Alto, CA
Client: Ford
Work Location: Onsite, 5 Days/Week
Employment Type: Contract (C2C)
Rate: Rate not a constraint for strong candidates
Ford’s Electric Vehicles, Digital and Design (EVDD) team is charged with delivering the company’s vision of a fully electric transportation future.
Responsibilities: Design and develop Rust services in support of infotainment systems and any supporting frameworks. Develop reusable modules using SOLID design principles.
Qualifications: 3+ years software development experience, 1+ year experience with Rust.`,
    expectedKeywords: ["Rust", "Infotainment", "SOLID", "Embedded Software"]
  },
  {
    name: "Firmware QA Engineer",
    client: "Zoox",
    location: "Foster City",
    rawText: `Position: Firmware QA Engineer
Location: Foster City, CA
Client: Zoox
Work Location: Onsite, 5 Days/Week
Employment Type: Contract (C2C)
Our team is seeking a hands-on Firmware Validation Engineer to join the Firmware - Connectivity and Audio team.
Key Responsibilities: Manual feature validation for Audio and streaming features. Wireshark, DLT, ADB, Bluetooth traces.
Required Qualifications: 8+ years hands-on validation/QA on firmware. Bluetooth, Wi-Fi, cellular. Python scripting.`,
    expectedKeywords: ["Firmware Validation", "Bluetooth", "Wireshark", "ADB", "Python"]
  },
  {
    name: "Senior Digital Key Engineer",
    client: "Ford",
    location: "Palo Alto",
    rawText: `Job Description: Senior Digital Key Engineer
Location: Palo Alto, CA
Client: Ford
Work Location: Onsite, 5 Days/Week
Employment Type: Contract (C2C)
Position Overview: Need highly skilled and analytical Digital Key Engineer to lead implementation, validation, and debugging of next-generation vehicle access systems.
Requirements: 5+ years automotive experience. Hands-on expertise with CCC Digital Key Release 2/3 specifications. BLE, NFC, and UWB ranging. Vector CANoe.`,
    expectedKeywords: ["CCC Digital Key", "NFC", "BLE", "UWB", "CANoe"]
  },
  {
    name: "Audio DSP Specialist",
    client: "Ford",
    location: "Palo Alto",
    rawText: `Position: Audio DSP Specialist
Location: Palo Alto, CA
Client: Ford
Work Location: Onsite, 5 Days/Week
Employment Type: Contract (C2C)
Ford is looking for an experienced Audio DSP Specialist to join our Infotainment and In-Cabin Experience group in Palo Alto.
Responsibilities: Develop, test, and tune digital signal processing algorithms for acoustic echo cancellation (AEC), noise suppression, beamforming, and automatic gain control (AGC). DSP Concepts Audio Weaver, ALSA, C++.
Requirements: 5+ years embedded digital signal processing.`,
    expectedKeywords: ["Audio DSP", "AEC", "Beamforming", "Audio Weaver", "ALSA", "C++"]
  },
  {
    name: "Senior Functional Systems Engineer",
    client: "Ford",
    location: "Palo Alto",
    rawText: `Position: Senior Functional Systems Engineer
Location: Palo Alto, CA
Client: Ford
Work Location: Onsite, 5 Days/Week
Employment Type: Contract (C2C)
Job Overview: Ford EVDD is seeking a Senior Functional Systems Engineer to define and architect next-generation vehicle access and smart entry architectures.
Responsibilities: Define functional architectures in Cameo SysML, manage requirements in Jama Connect, specify RF system performance across NFC, BLE, and UWB.
Requirements: 5+ years automotive systems engineering. Model-Based Systems Engineering (MBSE).`,
    expectedKeywords: ["MBSE", "Systems Engineering", "Jama", "NFC", "BLE", "UWB"]
  }
];

async function runTestSuite() {
  console.log("==================================================================");
  console.log("    AutoSys TalentHunter AI — Rigorous End-to-End Test Suite      ");
  console.log("    Target Host: http://localhost:3005                            ");
  console.log("==================================================================\n");

  // SECTION 1: HOMEPAGE & HEALTH CHECK
  console.log("--- Section 1: Server Health & Homepage Integrity ---");
  const homeRes = await fetch("http://localhost:3005/");
  assert(homeRes.status === 200, "Homepage status code is 200 OK");
  const homeHtml = await homeRes.text();
  assert(homeHtml.includes("AutoSys"), "Homepage contains 'AutoSys' brand name");
  assert(homeHtml.includes("TalentHunter"), "Homepage contains 'TalentHunter'");
  assert(homeHtml.includes("Open to Work"), "Homepage contains 'Open to Work' filter control");
  assert(homeHtml.includes("Export CSV"), "Homepage contains 'Export CSV' button");
  assert(homeHtml.includes("API Connectors"), "Homepage contains 'API Connectors' button");

  // SECTION 2: PARSER RIGOROUS EVALUATION (ALL 5 AUTOSYS ROLES + 1 CUSTOM ROLE)
  console.log("\n--- Section 2: Universal JD Parser Evaluation Across All Roles ---");
  const parsedJobs = [];

  for (const role of PRESET_ROLES) {
    const res = await fetch("http://localhost:3005/api/parse-jd", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: role.rawText })
    });
    assert(res.status === 200, `API /api/parse-jd returned 200 for ${role.name}`);
    const data = await res.json();
    assert(data.success === true, `Parse success is true for ${role.name}`);
    assert(data.job && data.job.client.toLowerCase() === role.client.toLowerCase(), 
      `Extracted client "${data.job.client}" matches expected "${role.client}"`);
    assert(data.job && data.job.location.includes(role.location), 
      `Extracted location "${data.job.location}" includes expected "${role.location}"`);
    assert(data.job && data.job.employmentType === "C2C", 
      `Extracted employmentType is C2C`);
    
    // Check keywords
    const foundKeywords = role.expectedKeywords.filter(kw => 
      data.job.mustHaveKeywords.some(m => m.toLowerCase().includes(kw.toLowerCase()))
    );
    assert(foundKeywords.length >= 2, 
      `Extracted core keywords for ${role.name} (Found: ${foundKeywords.join(", ")})`);

    // Check Boolean queries generated
    assert(data.xrayQueries && data.xrayQueries.linkedinOpenToWork.includes("site:linkedin.com/in"), 
      `Generated valid LinkedIn X-Ray query for ${role.name}`);
    assert(data.xrayQueries.linkedinOpenToWork.includes("open to work"), 
      `LinkedIn query contains Open-To-Work operator`);
    assert(data.xrayQueries.googleSearchUrlLinkedIn.startsWith("https://www.google.com/search?q="), 
      `Google search URL properly formatted for ${role.name}`);

    parsedJobs.push(data.job);
  }

  // Arbitrary Custom Role
  console.log("\n--- Section 2.1: Arbitrary Custom JD Parsing ---");
  const customRoleText = `
    Job Title: High Voltage Battery Management Systems (BMS) Firmware Lead
    Company: Lucid Motors
    Location: Newark, CA
    Work Arrangement: Onsite
    Contract: C2C
    Pay Rate: Market leading rates
    Experience: 7+ years embedded firmware development
    
    Responsibilities:
    - Lead architecture of BMS state estimation (SoC, SoH, SoP).
    - Implement real-time firmware on Infineon Aurix TriCore in Embedded C and Rust.
    - Validate battery safety per ISO 26262 ASIL-D using Vector CANoe.
    
    Requirements:
    - 7+ years Embedded C, Rust, CANoe, ISO 26262, FreeRTOS, Battery Management.
  `;
  const customRes = await fetch("http://localhost:3005/api/parse-jd", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: customRoleText })
  });
  assert(customRes.status === 200, "Custom JD returned HTTP 200");
  const customData = await customRes.json();
  assert(customData.success === true, "Custom JD success is true");
  assert(customData.job.client === "Lucid Motors", `Extracted custom client "Lucid Motors" (Got: "${customData.job.client}")`);
  assert(customData.job.location.includes("Newark"), `Extracted custom location "Newark, CA" (Got: "${customData.job.location}")`);
  assert(customData.job.experienceRequiredYears === 7, `Extracted custom experience 7 years (Got: ${customData.job.experienceRequiredYears})`);
  assert(customData.job.mustHaveKeywords.some(k => ["CANoe", "Rust", "ISO 26262"].includes(k)), `Extracted advanced tech keywords`);

  // SECTION 3: PARSER ERROR & EDGE CASE HANDLING
  console.log("\n--- Section 3: Parser Edge Case & Validation Tests ---");
  const emptyRes = await fetch("http://localhost:3005/api/parse-jd", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: "    " })
  });
  assert(emptyRes.status === 400, "Empty text returns HTTP 400 Bad Request");
  const emptyData = await emptyRes.json();
  assert(emptyData.success === false && emptyData.error, "Empty text response contains error explanation");

  const malformedRes = await fetch("http://localhost:3005/api/parse-jd", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });
  assert(malformedRes.status === 400, "Missing text field returns HTTP 400 Bad Request");

  // SECTION 4: CANDIDATE SEARCH & SOURCING PIPELINE TESTS
  console.log("\n--- Section 4: Sourcing Engine & Pipeline Rigorous Tests ---");
  for (let i = 0; i < parsedJobs.length; i++) {
    const job = parsedJobs[i];
    const roleName = PRESET_ROLES[i].name;

    // Search with no filters
    const searchRes = await fetch("http://localhost:3005/api/search-candidates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job, openToWorkOnly: false, platform: "all" })
    });
    assert(searchRes.status === 200, `POST /api/search-candidates returned 200 for ${roleName}`);
    const searchData = await searchRes.json();
    assert(searchData.success === true, `Search success is true for ${roleName}`);
    assert(Array.isArray(searchData.candidates) && searchData.candidates.length > 0, 
      `Found ${searchData.candidates.length} candidates for ${roleName}`);
    
    // Check candidate structure
    const topCandidate = searchData.candidates[0];
    assert(topCandidate.fullName && topCandidate.fullName.length > 2, `Top candidate has full name: ${topCandidate.fullName}`);
    assert(topCandidate.headline && topCandidate.headline.length > 5, `Top candidate has headline`);
    assert(topCandidate.matchScore >= 80, `Top candidate has high match score: ${topCandidate.matchScore}%`);
    assert(topCandidate.matchingKeywords.length > 0, `Top candidate has matching keywords: ${topCandidate.matchingKeywords.join(", ")}`);
    assert(topCandidate.profileUrl.startsWith("http"), `Top candidate has valid profile URL: ${topCandidate.profileUrl}`);

    // Search with openToWorkOnly = true
    const otwRes = await fetch("http://localhost:3005/api/search-candidates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job, openToWorkOnly: true, platform: "all" })
    });
    const otwData = await otwRes.json();
    assert(otwData.candidates.every(c => c.openToWork === true), 
      `Filter 'openToWorkOnly' strictly returned only open to work candidates (${otwData.candidates.length} candidates)`);

    // Verify match score ordering
    let isSorted = true;
    for (let j = 0; j < searchData.candidates.length - 1; j++) {
      if (searchData.candidates[j].matchScore < searchData.candidates[j + 1].matchScore) {
        isSorted = false;
        break;
      }
    }
    assert(isSorted, `Candidates strictly sorted in descending matchScore order for ${roleName}`);
  }

  // SECTION 5: CANDIDATE SEARCH WITH CUSTOM ARBITRARY JOB
  console.log("\n--- Section 5: Dynamic Sourcing for Custom Arbitrary Roles ---");
  const customSearchRes = await fetch("http://localhost:3005/api/search-candidates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      job: customData.job,
      openToWorkOnly: false,
      platform: "all"
    })
  });
  assert(customSearchRes.status === 200, "Dynamic sourcing returned HTTP 200");
  const customSearchData = await customSearchRes.json();
  assert(customSearchData.candidates.length === 6, `Dynamic sourcing synthesized 6 matching candidate profiles`);
  assert(customSearchData.candidates[0].location === customData.job.location, 
    `Dynamic candidates matched job location: ${customSearchData.candidates[0].location}`);
  assert(customSearchData.candidates[0].matchScore >= 75, 
    `Dynamic candidate match score is ${customSearchData.candidates[0].matchScore}%`);

  // SECTION 6: OUTREACH GENERATOR RIGOROUS TESTS
  console.log("\n--- Section 6: Personalized Outreach Generator Rigorous Tests ---");
  const sampleCandidate = {
    id: "cand-test-1",
    fullName: "Elena Rostova",
    currentTitle: "Staff Software Engineer",
    currentCompany: "Lucid Motors",
    location: "Palo Alto, CA",
    skills: ["Rust", "Infotainment", "Embedded Software", "Linux"],
    matchingKeywords: ["Rust", "Infotainment", "Linux"],
    missingKeywords: ["TDD"],
    matchScore: 96,
    openToWork: true,
    email: "elena.rostova@gmail.com",
    phone: "(650) 492-8172"
  };

  const channels = ["inmail", "email", "sms"];
  for (const ch of channels) {
    const outreachRes = await fetch("http://localhost:3005/api/generate-outreach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidate: sampleCandidate,
        job: parsedJobs[0],
        channel: ch
      })
    });
    assert(outreachRes.status === 200, `POST /api/generate-outreach for channel "${ch}" returned 200`);
    const outreachData = await outreachRes.json();
    assert(outreachData.success === true, `Outreach generation succeeded for "${ch}"`);
    assert(outreachData.outreach.body.includes("Elena"), `Outreach body addressed to Elena`);
    assert(outreachData.outreach.body.includes(parsedJobs[0].client), `Outreach body mentions client "${parsedJobs[0].client}"`);
    assert(outreachData.outreach.body.includes(parsedJobs[0].title), `Outreach body mentions title "${parsedJobs[0].title}"`);
    assert(outreachData.outreach.body.includes("Rust"), `Outreach body mentions matching skill Rust`);
    
    if (ch === "sms") {
      assert(outreachData.outreach.body.length < 320, `SMS length is concise (${outreachData.outreach.body.length} chars)`);
    } else {
      assert(outreachData.outreach.subject.length > 10, `Subject line present: "${outreachData.outreach.subject}"`);
    }
  }

  // Outreach error test
  const badOutreachRes = await fetch("http://localhost:3005/api/generate-outreach", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ channel: "inmail" })
  });
  assert(badOutreachRes.status === 400, "Missing candidate or job returns HTTP 400");

  // SECTION 7: LIVE EMAIL & DOMAIN VERIFICATION
  console.log("\n--- Section 7: Live Email & Domain MX Verification Tests ---");
  const emailValidRes = await fetch("http://localhost:3005/api/verify-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test@google.com" })
  });
  assert(emailValidRes.status === 200, "POST /api/verify-email returned 200");
  const emailValidData = await emailValidRes.json();
  assert(emailValidData.verification && emailValidData.verification.hasMxRecords === true, "Google domain has valid MX records");

  const emailInvalidRes = await fetch("http://localhost:3005/api/verify-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "bad-email-without-domain" })
  });
  assert(emailInvalidRes.status === 200, "Invalid email syntax handled gracefully");
  const emailInvalidData = await emailInvalidRes.json();
  assert(emailInvalidData.verification.isValidSyntax === false, "Detected invalid email syntax");

  // SECTION 8: STATIC ASSETS AND BUNDLE INTEGRITY
  console.log("\n--- Section 8: Client Script & Asset Delivery ---");
  const cssMatch = homeHtml.match(/href="(\/_next\/static\/css\/[^"]+\.css)"/);
  const cssPath = cssMatch ? cssMatch[1] : "/_next/static/css/fa73d243c49276b7.css";
  const manifestRes = await fetch(`http://localhost:3005${cssPath}`);
  assert(manifestRes.status === 200, `Main CSS stylesheet (${cssPath}) loads with HTTP 200`);

  // FINAL REPORT
  console.log("\n==================================================================");
  console.log(`   TOTAL RIGOROUS TESTS: ${passed + failed}`);
  console.log(`   PASSED:               ${passed}`);
  console.log(`   FAILED:               ${failed}`);
  console.log("==================================================================");

  if (failed > 0) {
    console.error("\n❌ Rigorous testing failed with errors.");
    process.exit(1);
  } else {
    console.log("\n✅ ALL RIGOROUS TESTS PASSED WITH 100% SUCCESS RATE!");
    process.exit(0);
  }
}

runTestSuite().catch(err => {
  console.error("Fatal test runner error:", err);
  process.exit(1);
});
