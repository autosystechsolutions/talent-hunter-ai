import { JobDescription } from "./types";

export const PRESET_JOBS: JobDescription[] = [
  {
    id: "staff-rust-dev-ford",
    title: "Staff Rust Software Developer",
    client: "Ford",
    location: "Palo Alto, CA",
    workLocationType: "Onsite",
    workDaysDetail: "5 Days/Week",
    employmentType: "C2C",
    rateInfo: "Rate not a constraint for strong candidates",
    experienceRequiredYears: 3,
    mustHaveKeywords: [
      "Rust",
      "Infotainment",
      "Embedded Software",
      "API Design",
      "SOLID",
      "TDD",
      "Linux",
    ],
    preferredKeywords: [
      "C++17",
      "Python",
      "Bash",
      "Embedded Profiling",
      "Pair Programming",
      "Git",
      "Agile",
      "macOS",
    ],
    domainFocus: ["Automotive", "EV", "Infotainment", "HMI Frameworks"],
    responsibilities: [
      "Design and develop Rust services in support of infotainment systems and any supporting frameworks.",
      "Develop reusable modules using SOLID design principles.",
      "Prepare and maintain comprehensive documentation on software design, architecture, and API usage.",
      "Create proof of concepts for next generation infotainment systems.",
      "Optimize performance by profiling, analyzing, and improving the application code and system integration.",
      "Participate in system design, documentation, and testing.",
      "Collaborate with cross-functional teams to ensure successful integration of software components.",
      "Work in an agile team of software developers, test engineers, technical product managers and leads."
    ],
    summary:
      "Ford EVDD team seeking Staff Rust Developer in Palo Alto for next-gen EV infotainment and high-performance HMI. Requires 3+ yrs SWE, 1+ yr Rust, clean API design, SOLID principles & TDD.",
    rawText: `Position: Staff Rust Software Developer
Location: Palo Alto, CA
Client: Ford
Work Location: Onsite, 5 Days/Week
Employment Type: Contract (C2C)
Rate: Rate not a constraint for strong candidates

Ford’s Electric Vehicles, Digital and Design (EVDD) team is charged with delivering the company’s vision of a fully electric transportation future.

In this position...
As a key member of our team, you will be responsible for designing and developing complex infotainment systems with a focus on high performance HMI. You'll collaborate with cross-functional teams to ensure seamless integration of software and hardware components. Our ideal candidate is an enthusiastic, detailed oriented self-starter who demands developer-friendly APIs, bulletproof code, and adheres to SOLID principles and TDD. You will be responsible for participating in the design and development of services, frameworks, and APIs to allow users to interact with features such as navigation, media, entertainment, phone, voice, and vehicle settings.

Responsibilities:
• Design and develop Rust services in support of infotainment systems and any supporting frameworks.
• Develop reusable modules using SOLID design principles.
• Prepare and maintain comprehensive documentation on software design, architecture, and API usage.
• Create proof of concepts for next generation infotainment systems.
• Optimize performance by profiling, analyzing, and improving the application code and system integration to enhance overall efficiency.
• Participate in system design, documentation, and testing.
• Collaborate with cross-functional teams to ensure successful integration of software components.
• Work in an agile team of software developers, test engineers, technical product managers and leads.

Qualifications:
• Bachelor’s degree in engineering or computer science.
• 3+ years of software development experience
• 1+ year experience with the Rust programming language
• 1+ year experience in designing simple, elegant APIs with a strong emphasis on clarity, scalability, flexibility, versioning, and error handling.

Even better, you may have...
• Master’s degree in engineering or computer science.
• 1+ year experience with C++17 programming language
• Proficiency with scripting languages (Python, Bash).
• Experience profiling and improving embedded software performance.
• Demonstrated expertise and proficiency in pair programming.
• Proficient working in Linux and macOS environments.
• Proficient with version control systems, such as Git, and Agile development methodologies.`,
    createdAt: "2026-10-27T08:00:00Z"
  },
  {
    id: "firmware-qa-zoox",
    title: "Firmware QA Engineer",
    client: "Zoox",
    location: "Foster City, CA",
    workLocationType: "Onsite",
    workDaysDetail: "5 Days/Week",
    employmentType: "C2C",
    rateInfo: "Rate not a constraint for strong candidates",
    experienceRequiredYears: 8,
    mustHaveKeywords: [
      "Firmware Validation",
      "Bluetooth",
      "Connectivity Testing",
      "Wireshark",
      "ADB",
      "Linux",
      "Python",
    ],
    preferredKeywords: [
      "DLT Traces",
      "HCI Traces",
      "JIRA",
      "Confluence",
      "Audio Streaming",
      "Media Casting",
      "Robotaxi / AV Fleet",
      "A2DP",
      "HFP",
      "AVRCP",
    ],
    domainFocus: ["Automotive", "Autonomous Vehicles", "Connectivity", "In-Cabin Audio"],
    responsibilities: [
      "Execute manual functional, integration, regression, and exploratory testing for Audio and streaming features on bench and in-vehicle.",
      "Author new test cases, expand existing test suites, and keep test documentation current as features evolve.",
      "Identify untested or under-tested paths in the existing suites and systematically add coverage.",
      "Reproduce defects, capture and analyze logs (Wireshark, DLT, ADB, HCI/Bluetooth traces, vehicle logs), and isolate root cause before handing off to firmware owners.",
      "Own first-line triage for Audio and Streaming feature fleet issues — reproduce in lab, narrow scope, and drive issues to closure.",
      "Manage defects end-to-end in JIRA with reproduction steps, logs, severity rationale, and fix verification.",
      "Maintain test benches, in-vehicle rigs, and diagnostic setups release-ready."
    ],
    summary:
      "Zoox Autonomous Vehicles seeking hands-on Firmware Validation Engineer in Foster City for Firmware Audio & Connectivity team. 8+ yrs QA/firmware validation, Bluetooth/Wi-Fi/cellular, Wireshark/DLT/ADB, Python.",
    rawText: `Position: Firmware QA Engineer
Location: Foster City, CA
Client: Zoox
Work Location: Onsite, 5 Days/Week
Employment Type: Contract (C2C)
Rate: Rate not a constraint for strong candidates

Our team is seeking a hands-on Firmware Validation Engineer to join the Firmware - Connectivity and Audio team. This is a validation-first role focused on manual feature testing, growing test content, closing coverage gaps, root-causing defects, and triaging field problems across in-cabin connected experiences. The engineer is the team's owner for day-to-day test execution and defect quality on these feature tracks.

Key Responsibilities:
• Manual feature validation: Execute functional, integration, regression, and exploratory testing for Audio and streaming features on bench and in-vehicle.
• Test content development: Author new test cases, expand existing test suites, and keep test documentation current as features evolve.
• Coverage gap closure: Identify untested or under-tested paths in the existing suites and systematically add coverage; track coverage health for each feature track.
• Root cause analysis: Reproduce defects, capture and analyze logs (Wireshark, DLT, ADB, HCI/Bluetooth traces, vehicle logs), and isolate root cause before handing off to firmware owners.
• Field issue triage: Own first-line triage for Audio and Streaming feature fleet issues — reproduce in lab, narrow scope, and drive issues to closure in partnership with fleet support, diagnostics, and firmware teams.
• Defect lifecycle: Manage defects end-to-end in JIRA — clear reproduction steps, attached logs, severity rationale, fix verification, and regression follow-up.
• Test infrastructure: Maintain test benches, in-vehicle rigs, and diagnostic setups so they stay release-ready.
• Cross-functional communication: Partner with firmware leads, product managers, and integration partners to align on feature readiness and defect priority.

Required Qualifications:
• BS in Electrical Engineering, Computer Engineering, or related; 8+ years in a hands-on validation/QA engineering role on firmware or embedded products.
• Validation depth: Demonstrated experience writing and executing test plans/cases, identifying and closing coverage gaps, and managing defects through the full lifecycle.
• Connectivity background (any flavor): Hands-on validation experience in at least one connectivity domain — Bluetooth, Wi-Fi, cellular (LTE/5G), GNSS, or vehicle networking.
• Root-cause skill: Strong log triage and debugging instincts; comfortable with Wireshark, DLT, ADB, and similar tooling.
• Field triage experience: Track record of reproducing and isolating defects reported from production/field environments.
• Python scripting sufficient to automate repetitive checks and parse logs; comfortable on Linux/Ubuntu.
• Strong defect-tracking discipline (JIRA/Confluence) and experience in agile release cycles.

Preferred Qualifications:
• Prior experience with in-cabin entertainment and/or media casting frameworks.
• Bluetooth stack validation (pairing, A2DP/HFP/AVRCP, interop).
• Background and experience in wireless connectivity technologies.
• Prior exposure to autonomous-vehicle or robotaxi fleet environments.`,
    createdAt: "2026-10-27T08:00:00Z"
  },
  {
    id: "sr-digital-key-ford",
    title: "Senior Digital Key Engineer",
    client: "Ford",
    location: "Palo Alto, CA",
    workLocationType: "Onsite",
    workDaysDetail: "5 Days/Week",
    employmentType: "C2C",
    rateInfo: "Rate not a constraint for strong candidates",
    experienceRequiredYears: 5,
    mustHaveKeywords: [
      "CCC Digital Key",
      "NFC",
      "BLE",
      "UWB",
      "Vehicle Access",
      "CANoe",
      "Security",
    ],
    preferredKeywords: [
      "Car Connectivity Consortium",
      "PKI",
      "Cryptographic Key Management",
      "CAN",
      "LIN",
      "Automotive Ethernet",
      "Vector CANoe",
      "Wireshark",
      "Apple CarKey",
      "Android Digital Key",
    ],
    domainFocus: ["Automotive", "Vehicle Access Systems", "Wireless Security", "Smart Mobility"],
    responsibilities: [
      "Lead implementation, validation, and debugging of next-generation CCC Digital Key vehicle access systems.",
      "Ensure seamless, secure interoperability between smartphone devices (Apple CarKey, Android) and vehicle architectures.",
      "Serve as core technical expert for root-cause analysis, defect triage, and protocol-level wireless validation (NFC, BLE, UWB).",
      "Utilize CANoe, Wireshark, and protocol analyzers for bus communication and packet-level inspection.",
      "Coordinate with cross-functional security, body electronics, and mobile ecosystem engineering teams."
    ],
    summary:
      "Ford looking for Senior Digital Key Engineer in Palo Alto for vehicle access architectures. Deep knowledge of Car Connectivity Consortium (CCC) standards, NFC, BLE, UWB ranging, vehicle networks (CAN/CANoe), and crypto security.",
    rawText: `Job Description: Senior Digital Key Engineer
Location: Palo Alto, CA
Client: Ford
Work Location: Onsite, 5 Days/Week
Employment Type: Contract (C2C)
Rate: Rate not a constraint for strong candidates

Position Overview:
Need highly skilled and analytical Digital Key Engineer to lead the implementation, validation, and debugging of next-generation vehicle access systems. Person will be responsible for ensuring seamless, secure interoperability between smartphone devices and vehicle architectures and will serve as the core technical expert for root-cause analysis, defect triage, and physical/protocol-level debugging.

Key Responsibilities:
• Lead integration and validation of CCC (Car Connectivity Consortium) Digital Key architecture.
• Perform protocol analysis and RF testing across BLE (Bluetooth Low Energy), NFC, and UWB (Ultra-Wideband).
• Execute bus simulation and tracing using Vector CANoe, CANalyzer, Wireshark, and hardware oscilloscopes.
• Ensure end-to-end cryptographic security and key management compliance with Apple and Google ecosystem specifications.
• Root-cause access anomalies, ranging errors, and pairing failures in vehicle benches and fleet vehicles.

Requirements:
• BS/MS in Electrical Engineering, Computer Science, or related field.
• 5+ years automotive electronics or wireless systems experience.
• Hands-on expertise with CCC Digital Key Release 2/3 specifications.
• Strong proficiency with BLE, NFC, and UWB ranging algorithms (ToF, AoA).
• Deep expertise with Vector tools (CANoe, CANcase) and in-vehicle networks (CAN, LIN, Automotive Ethernet).
• Solid understanding of automotive security, PKI certificates, and hardware security modules (HSMs).`,
    createdAt: "2026-10-27T08:00:00Z"
  },
  {
    id: "audio-dsp-ford",
    title: "Audio DSP Specialist",
    client: "Ford",
    location: "Palo Alto, CA",
    workLocationType: "Onsite",
    workDaysDetail: "5 Days/Week",
    employmentType: "C2C",
    rateInfo: "Rate not a constraint for strong candidates",
    experienceRequiredYears: 5,
    mustHaveKeywords: [
      "Audio DSP",
      "AEC",
      "Beamforming",
      "VAD",
      "AGC",
      "ALSA",
      "Audio Weaver",
      "C++",
    ],
    preferredKeywords: [
      "Acoustic Echo Cancellation",
      "Voice Activity Detection",
      "Automatic Gain Control",
      "MATLAB",
      "Simulink",
      "DSP Concepts Audio Weaver",
      "Automotive Acoustics",
      "Microphone Arrays",
      "QNX",
      "Linux Audio",
    ],
    domainFocus: ["Automotive", "Infotainment", "Acoustics & Voice Processing", "Embedded DSP"],
    responsibilities: [
      "Architect and tune voice processing signal chains including AEC (Acoustic Echo Cancellation), beamforming microphone arrays, and noise reduction.",
      "Implement and optimize audio algorithms in C++ and DSP Concepts Audio Weaver.",
      "Configure and calibrate ALSA / QNX audio drivers and hardware codecs for optimal cabin frequency response and speech intelligibility.",
      "Conduct in-cabin tuning sessions using acoustic manikins (HATS) and directional microphone arrays.",
      "Collaborate with infotainment HMI and cloud voice assistant teams to achieve crystal-clear voice recognition under noisy driving conditions."
    ],
    summary:
      "Ford EVDD seeking Audio DSP Specialist in Palo Alto. Requires deep hands-on expertise in Acoustic Echo Cancellation (AEC), Beamforming, Voice Activity Detection (VAD), AGC, Audio Weaver, ALSA, and real-time C++ audio programming.",
    rawText: `Position: Audio DSP Specialist
Location: Palo Alto, CA
Client: Ford
Work Location: Onsite, 5 Days/Week
Employment Type: Contract (C2C)
Rate: Rate not a constraint for strong candidates

Job Overview:
Ford is looking for an experienced Audio DSP Specialist to join our Infotainment and In-Cabin Experience group in Palo Alto. You will design, integrate, and optimize advanced audio signal processing pipelines for hands-free telephony, speech recognition front-ends, active road noise cancellation, and multi-zone audio streaming.

Responsibilities:
• Develop, test, and tune digital signal processing algorithms for acoustic echo cancellation (AEC), noise suppression, beamforming, and automatic gain control (AGC).
• Implement DSP modules in embedded C++ and model signal flows using DSP Concepts Audio Weaver and MATLAB/Simulink.
• Integrate audio pipelines into Linux/ALSA and QNX operating environments on automotive SoC platforms.
• Measure and calibrate cabin acoustics using artificial head and torso simulators (HATS), measurement microphones, and audio analyzers.
• Work with speech recognition and telecom teams to pass ITU-T, CarPlay, and Android Auto voice quality certification standards.

Requirements:
• Bachelor's or Master's degree in Electrical Engineering, Audio Engineering, or Computer Science.
• 5+ years of embedded digital signal processing experience with strong emphasis on voice/audio applications.
• Expertise in Acoustic Echo Cancellation (AEC), microphone array beamforming, and Voice Activity Detection (VAD).
• Proficiency in C++ real-time audio development and DSP Concepts Audio Weaver.
• Familiarity with Linux audio architecture (ALSA, PulseAudio, PipeWire) or QNX audio subsystems.
• Strong grasp of acoustic measurement, room acoustics, and automotive in-cabin tuning.`,
    createdAt: "2026-10-27T08:00:00Z"
  },
  {
    id: "sr-functional-systems-ford",
    title: "Senior Functional Systems Engineer",
    client: "Ford",
    location: "Palo Alto, CA",
    workLocationType: "Onsite",
    workDaysDetail: "5 Days/Week",
    employmentType: "C2C",
    rateInfo: "Rate not a constraint for strong candidates",
    experienceRequiredYears: 5,
    mustHaveKeywords: [
      "Vehicle Access",
      "MBSE",
      "Systems Engineering",
      "NFC",
      "BLE",
      "UWB",
      "Requirements Management",
      "Jama",
    ],
    preferredKeywords: [
      "Cameo Enterprise Architecture",
      "SysML",
      "ISO 26262 Functional Safety",
      "DOORS",
      "FMEA",
      "Automotive Systems",
      "Body Electronics",
      "Wireless Telematics",
    ],
    domainFocus: ["Automotive", "Vehicle Access", "Model-Based Systems Engineering", "Functional Architecture"],
    responsibilities: [
      "Lead functional systems engineering and architectural decomposition for vehicle access and passive entry / passive start (PEPS) features.",
      "Develop Model-Based Systems Engineering (MBSE) models in Cameo / SysML capturing functional interactions and state machines.",
      "Author rigorous system requirements and verification matrices in Jama / DOORS for NFC, BLE, and UWB access domains.",
      "Collaborate with functional safety engineers to conduct Hazard Analysis and Risk Assessment (HARA) and DFMEA per ISO 26262.",
      "Bridge mobile application software teams, ECU hardware suppliers, and vehicle integration leads to drive feature rollout from concept to production."
    ],
    summary:
      "Ford seeking Senior Functional Systems Engineer in Palo Alto for Next-Gen Vehicle Access systems. Deep background in Model-Based Systems Engineering (MBSE/SysML), Jama requirements management, BLE/NFC/UWB vehicle access, and functional architecture.",
    rawText: `Position: Senior Functional Systems Engineer
Location: Palo Alto, CA
Client: Ford
Work Location: Onsite, 5 Days/Week
Employment Type: Contract (C2C)
Rate: Rate not a constraint for strong candidates

Job Overview:
Ford EVDD is seeking a Senior Functional Systems Engineer to define and architect next-generation vehicle access and smart entry architectures. This role bridges customer expectations, cybersecurity, RF hardware, and vehicle electrical topologies using modern Model-Based Systems Engineering (MBSE).

Responsibilities:
• Define functional architectures, sequence diagrams, and interface control documents (ICDs) for vehicle access systems.
• Create and maintain system architecture models using SysML / MBSE tools (Cameo Enterprise Architecture / MagicDraw).
• Manage end-to-end system requirements, traceability, and test verification criteria using Jama Connect or IBM DOORS.
• Specify RF system performance and state machines across NFC card emulation, BLE beacon discovery, and UWB high-precision localization.
• Conduct DFMEA and support ISO 26262 functional safety hazard analysis for electronic latches, immobilizers, and remote keyless entry.
• Interface with ECU suppliers, mobile OS partners, and vehicle integration engineers to review implementation against specifications.

Requirements:
• Bachelor's or Master's degree in Systems Engineering, Electrical Engineering, or related technical field.
• 5+ years experience in automotive systems engineering or complex mechatronic systems.
• Proven proficiency with Model-Based Systems Engineering (MBSE) principles and SysML modeling tools.
• Hands-on experience with Jama Connect or DOORS requirements lifecycle management.
• Domain expertise in Vehicle Access, Smart Entry, PEPS, and wireless technologies (BLE, NFC, UWB).
• Working knowledge of automotive network protocols (CAN, LIN, Ethernet) and diagnostics (UDS).`,
    createdAt: "2026-10-27T08:00:00Z"
  }
];
