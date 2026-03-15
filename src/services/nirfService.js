// NIRF Score Generation Service

const academicProfiles = {
  'IISc Bangalore': {
    programs: ['B.Res (Research)', 'M.Tech', 'M.Sc', 'Ph.D - Science & Engineering'],
    achievements: ['Ranked #1 in India for 6 consecutive years', 'Nature Index top research institution in India', '500+ active patents and technology transfers'],
    activities: ['Society for Innovation and Development (SID) - startup incubator', 'National Science Academy fellowships for faculty', 'Annual Open Day & Science Outreach programs', 'Collaborative research with NASA, ISRO, DRDO', 'Centre for Nano Science and Engineering (CeNSE)'],
  },
  'IIT Madras': {
    programs: ['B.Tech', 'Dual Degree (B.Tech + M.Tech)', 'M.Tech', 'MBA', 'Ph.D'],
    achievements: ['NIRF Rank 1 among engineering institutes', "India's first on-campus startup incubator (IITM Research Park)", '600+ startups spawned from campus ecosystem'],
    activities: ["IITM Research Park - Asia's largest university research park", 'Shaastra - annual international techno-management fest', 'Centre for Innovation (CFI) - student-run maker space', 'National Centre for Combustion Research & Development', 'Industry partnerships with Google, Samsung, Boeing'],
  },
  'IIT Bombay': {
    programs: ['B.Tech', 'B.S.', 'Dual Degree', 'M.Tech', 'M.Des', 'M.Sc', 'Ph.D'],
    achievements: ['QS World Ranking Top 150', 'Highest placement packages in India (Rs 3.67 Cr CTC recorded)', 'SINE incubator - 100+ active startups'],
    activities: ['Society for Innovation and Entrepreneurship (SINE)', "Techfest - Asia's largest science & technology festival", 'National Centre for Aerospace Innovation and Research (NCAIR)', 'IBM, Microsoft, and Tata research collaborations', 'IIT Bombay Racing - Formula Student team'],
  },
  'IIT Delhi': {
    programs: ['B.Tech', 'Dual Degree', 'M.Tech', 'M.S. (Research)', 'MBA', 'Ph.D'],
    achievements: ['QS World Ranking Top 200', '150+ MoUs with global universities and industries', 'Foundation for Innovation and Technology Transfer (FITT) - 200+ patents'],
    activities: ['FITT - technology commercialisation and IP management', 'Tryst - annual technical festival', 'Rendezvous - cultural festival with national reach', 'Kusuma School of Biological Sciences research hub', 'Smart Energy & Environment research cluster'],
  },
  'IIT Kharagpur': {
    programs: ['B.Tech', 'Dual Degree', 'Integrated M.Sc', 'M.Tech', 'MBA', 'Ph.D'],
    achievements: ['Oldest IIT, established 1951', 'Gyansetu - rural technology outreach program', '18 schools of excellence covering 100+ disciplines'],
    activities: ['Technology Entrepreneurship and Innovation Hub (TEHub)', "Kshitij - Asia's largest techno-management fest", "Spring Fest - one of India's largest cultural fests", 'Centre of Excellence in Advanced Manufacturing', 'Collaboration with World Bank on rural development projects'],
  },
  'IIT Kanpur': {
    programs: ['B.Tech', 'B.S.', 'Dual Degree', 'M.Tech', 'M.Sc', 'MBA', 'Ph.D'],
    achievements: ['Pioneer of computer science education in India (1963)', 'Startup Incubation & Innovation Centre (SIIC) - 150+ startups', 'National Wind Tunnel Facility - only one in India'],
    activities: ['SIIC - flagship startup incubator', 'Techkriti - annual technical & entrepreneurship festival', 'Antaragni - cultural festival', 'National Centre for Flexible Electronics (NCFlexE)', 'ISRO-IIT Kanpur Space Technology Cell'],
  },
  'IIT Roorkee': {
    programs: ['B.Tech', 'Dual Degree', 'M.Tech', 'M.Arch', 'MBA', 'Ph.D'],
    achievements: ['Oldest technical institution in Asia (est. 1847)', "Thomso - one of India's oldest technical fests", '200+ sponsored research projects annually'],
    activities: ['Tinkering Lab & Innovation Studio', 'Cognizance - annual technical festival', 'Thomso - cultural & technical fest', 'Centre of Excellence in Disaster Mitigation & Management', 'Industry tie-ups with L&T, NTPC, BHEL'],
  },
  'IIT Guwahati': {
    programs: ['B.Tech', 'B.Des', 'Dual Degree', 'M.Tech', 'M.Des', 'M.Sc', 'Ph.D'],
    achievements: ['First IIT in North-East India', 'Technology Incubation Centre - 50+ startups', 'Centre for Nanotechnology - national recognition'],
    activities: ['Technology Incubation Centre (TIC)', 'Techniche - annual techno-management fest', "Alcheringa - one of Asia's largest cultural fests", 'Centre for Energy - renewable energy research', 'North-East India rural outreach programs'],
  },
  'AIIMS Delhi': {
    programs: ['MBBS', 'B.Sc Nursing', 'B.Sc Allied Health Sciences', 'MD/MS', 'Ph.D'],
    achievements: ["India's premier medical institution", '10,000+ patients treated daily at OPD', 'WHO Collaborating Centre for Research & Training'],
    activities: ['National Cancer Institute collaboration', 'Telemedicine services for rural India', 'Annual AIIMS Pulse - medical fest', 'Centre for Community Medicine - public health outreach', 'ICMR-funded multi-centre clinical trials'],
  },
  'JNU New Delhi': {
    programs: ['B.A.', 'M.A.', 'M.Sc', 'M.Phil', 'Ph.D - Humanities, Social Sciences, Sciences'],
    achievements: ['Top-ranked central university in India', 'Highest PhD-to-student ratio among Indian universities', 'Strong international academic exchange programs'],
    activities: ['Centre for International Politics, Organisation and Disarmament', 'School of Life Sciences - DBT-funded research', 'Annual JNU International Film Festival', 'Centre for the Study of Law and Governance', 'Collaboration with 50+ foreign universities'],
  },
  'BHU Varanasi': {
    programs: ['B.A.', 'B.Sc', 'B.Tech', 'MBBS', 'M.A.', 'M.Tech', 'Ph.D'],
    achievements: ['Largest residential university in Asia', 'Institute of Medical Sciences - 1,000-bed hospital', '140+ departments across 6 institutes'],
    activities: ['Technology Business Incubator (TBI-BHU)', 'Krishi Vigyan Kendra - agricultural outreach', 'Annual Spandan cultural fest', 'Centre of Advanced Study in Botany', 'DST-FIST funded science programs'],
  },
  'Jadavpur University': {
    programs: ['B.E.', 'B.Tech', 'B.Sc', 'B.A.', 'M.E.', 'M.Tech', 'M.Sc', 'Ph.D'],
    achievements: ['Top state university in India for engineering', 'Strong alumni network in global tech companies', 'UGC Centre of Advanced Study in multiple departments'],
    activities: ['Jadavpur University Robotics Club', 'Annual Techno India fest', 'Centre for Mobile Computing & Communication', 'DST-funded nanotechnology research lab', 'Industry collaboration with TCS, Wipro, Infosys'],
  },
  'Amrita Vishwa Vidyapeetham': {
    programs: ['B.Tech', 'B.Sc', 'BBA', 'MBBS', 'M.Tech', 'MBA', 'Ph.D'],
    achievements: ['Fastest-growing private university in India', 'UNESCO Chair on Experiential Learning for Sustainable Innovation', '600+ research publications annually'],
    activities: ['Amrita TBI - technology business incubator', 'Live-in-Labs - rural immersion program', 'Anokha - national techno-cultural fest', 'Centre for Cybersecurity Systems & Networks', 'Collaboration with MIT, Stanford, and Purdue'],
  },
  'Vellore Institute of Technology': {
    programs: ['B.Tech', 'B.Sc', 'BCA', 'M.Tech', 'MBA', 'MCA', 'Ph.D'],
    achievements: ['800+ industry partners for placements', 'QS World Ranking Top 800', 'VITBI - incubator with 100+ startups'],
    activities: ['VIT Business Incubator (VITBI)', 'Gravitas - annual technical fest', 'Riviera - cultural fest', 'Centre for Disaster Mitigation and Management', 'Industry MoUs with Bosch, Renault, Daimler'],
  },
  'University of Hyderabad': {
    programs: ['M.A.', 'M.Sc', 'M.Tech', 'M.Phil', 'Ph.D - Sciences, Humanities, Social Sciences'],
    achievements: ['Institute of Eminence status by UGC', 'Centre for Integrated Studies - interdisciplinary research', 'Strong international faculty exchange programs'],
    activities: ['Technology Incubation Centre', 'Centre for Earth, Ocean and Atmospheric Sciences', 'Annual Aaina cultural fest', 'School of Physics - DST-FIST funded', 'Collaboration with Max Planck Institute'],
  },
  'NIT Trichy': {
    programs: ['B.Tech', 'M.Tech', 'M.Sc', 'MBA', 'Ph.D'],
    achievements: ['Top NIT in India consistently', '95%+ placement rate', 'Centre of Excellence in Advanced Manufacturing Technology'],
    activities: ["Pragyan - one of India's largest technical fests", 'Festember - cultural fest', 'Centre for Research in Nano Technology & Science', 'Industry collaboration with BHEL, L&T, Ashok Leyland', 'Student satellite project - NIT-SAT'],
  },
  'Manipal Academy of Higher Education': {
    programs: ['MBBS', 'B.Tech', 'BBA', 'B.Pharm', 'M.Tech', 'MBA', 'Ph.D'],
    achievements: ['Deemed University with global campus presence', 'Kasturba Medical College - top medical school', '28,000+ students from 57 countries'],
    activities: ['Manipal Innovation Centre', 'MIT Manipal Techtatva - technical fest', 'Revels - cultural fest', 'Centre for Atomic and Molecular Physics', 'Collaboration with Manipal Hospitals for clinical research'],
  },
  'Saveetha Institute of Medical and Technical Sciences': {
    programs: ['BDS', 'MBBS', 'B.Tech', 'B.Pharm', 'M.Tech', 'MBA', 'Ph.D'],
    achievements: ['Fastest-growing dental research institution in India', '2,000+ Scopus-indexed publications annually', 'Saveetha Dental College - top dental school in India'],
    activities: ['Saveetha Innovation & Incubation Centre', 'Annual Medico-Dental fest', 'Centre for Translational Research & Genomics', 'Industry tie-ups with 3M, Dentsply, Ivoclar', 'Community dental camps across Tamil Nadu'],
  },
  'Symbiosis International University': {
    programs: ['BBA', 'B.Tech', 'B.Sc', 'LLB', 'MBA', 'M.Tech', 'Ph.D'],
    achievements: ['Deemed University with 15+ constituent institutes', 'Strong international student exchange programs', 'NAAC A++ accreditation'],
    activities: ['Symbiosis Centre for Entrepreneurship & Innovation', 'Annual Symbiosis Fest', 'Centre for Health Sciences Research', 'MoUs with 200+ international universities', 'Symbiosis Law School moot court competitions'],
  },
  'Thapar Institute of Engineering': {
    programs: ['B.E.', 'B.Tech', 'M.E.', 'M.Tech', 'MBA', 'Ph.D'],
    achievements: ['Top private engineering institute in North India', 'NAAC A grade accreditation', '90%+ placement rate with top tech companies'],
    activities: ['Thapar Technology Incubation Centre', 'Spandan - annual cultural fest', 'Thapar Research & Innovation Foundation', 'Centre for Smart Grid Technology', 'Industry collaboration with Infosys, Wipro, HCL'],
  },
};

const defaultAcademicProfile = {
  programs: ['B.Tech / B.E.', 'M.Tech / M.E.', 'MBA', 'Ph.D'],
  achievements: ['Accredited by NAAC', 'Active placement cell with industry partnerships', 'Growing research output'],
  activities: ['Annual technical and cultural fests', 'Industry internship programs', 'Student clubs and innovation cells'],
};

export const nirfRankedDataset = [
  { rank: 1,  name: 'IISc Bangalore',                                       scores: { tlr: 95, rp: 98, go: 85, oi: 82, pr: 96 } },
  { rank: 2,  name: 'IIT Madras',                                           scores: { tlr: 91, rp: 94, go: 89, oi: 86, pr: 97 } },
  { rank: 3,  name: 'IIT Bombay',                                           scores: { tlr: 94, rp: 96, go: 90, oi: 87, pr: 99 } },
  { rank: 4,  name: 'IIT Delhi',                                            scores: { tlr: 92, rp: 95, go: 88, oi: 85, pr: 98 } },
  { rank: 5,  name: 'IIT Kharagpur',                                        scores: { tlr: 89, rp: 93, go: 87, oi: 84, pr: 95 } },
  { rank: 6,  name: 'IIT Kanpur',                                           scores: { tlr: 90, rp: 92, go: 86, oi: 83, pr: 94 } },
  { rank: 7,  name: 'IIT Roorkee',                                          scores: { tlr: 88, rp: 91, go: 85, oi: 82, pr: 93 } },
  { rank: 8,  name: 'IIT Guwahati',                                         scores: { tlr: 86, rp: 89, go: 84, oi: 81, pr: 91 } },
  { rank: 9,  name: 'AIIMS Delhi',                                          scores: { tlr: 88, rp: 92, go: 94, oi: 90, pr: 95 } },
  { rank: 10, name: 'JNU New Delhi',                                        scores: { tlr: 84, rp: 90, go: 80, oi: 85, pr: 89 } },
  { rank: 11, name: 'BHU Varanasi',                                         scores: { tlr: 82, rp: 87, go: 79, oi: 83, pr: 87 } },
  { rank: 12, name: 'Jadavpur University',                                  scores: { tlr: 81, rp: 86, go: 78, oi: 80, pr: 86 } },
  { rank: 13, name: 'Amrita Vishwa Vidyapeetham',                          scores: { tlr: 80, rp: 84, go: 82, oi: 79, pr: 85 } },
  { rank: 14, name: 'Vellore Institute of Technology',                     scores: { tlr: 79, rp: 83, go: 81, oi: 78, pr: 84 } },
  { rank: 15, name: 'University of Hyderabad',                             scores: { tlr: 78, rp: 85, go: 76, oi: 82, pr: 83 } },
  { rank: 16, name: 'NIT Trichy',                                           scores: { tlr: 77, rp: 82, go: 80, oi: 77, pr: 82 } },
  { rank: 17, name: 'Manipal Academy of Higher Education',                 scores: { tlr: 76, rp: 80, go: 79, oi: 76, pr: 81 } },
  { rank: 18, name: 'Saveetha Institute of Medical and Technical Sciences', scores: { tlr: 75, rp: 79, go: 78, oi: 75, pr: 80 } },
  { rank: 19, name: 'Symbiosis International University',                  scores: { tlr: 74, rp: 78, go: 77, oi: 74, pr: 79 } },
  { rank: 20, name: 'Thapar Institute of Engineering',                     scores: { tlr: 73, rp: 77, go: 76, oi: 73, pr: 78 } },
].map(function(u) {
  return Object.assign({}, u, {
    overall: Math.round(u.scores.tlr * 0.3 + u.scores.rp * 0.3 + u.scores.go * 0.2 + u.scores.oi * 0.1 + u.scores.pr * 0.1),
    academic: academicProfiles[u.name] || defaultAcademicProfile,
  });
});

export function getPeerComparisons(universityName) {
  var selected = nirfRankedDataset.find(function(u) {
    return u.name.toLowerCase() === universityName.toLowerCase();
  });
  if (!selected) {
    var simulatedRank = nirfRankedDataset.length + 1;
    var scores = generateScores(universityName);
    var overall = Math.round(scores.tlr * 0.3 + scores.rp * 0.3 + scores.go * 0.2 + scores.oi * 0.1 + scores.pr * 0.1);
    var selectedEntry = { rank: simulatedRank, name: universityName, scores: scores, overall: overall, academic: defaultAcademicProfile };
    return nirfRankedDataset.slice(-5).concat([selectedEntry]);
  }
  var above = nirfRankedDataset
    .filter(function(u) { return u.rank < selected.rank; })
    .sort(function(a, b) { return b.rank - a.rank; })
    .slice(0, 5)
    .reverse();
  return above.concat([selected]);
}

export function computeInsights(peers, selectedName) {
  var selected = peers.find(function(u) { return u.name === selectedName; });
  var peerGroup = peers.filter(function(u) { return u.name !== selectedName; });
  if (!selected || peerGroup.length === 0) return null;

  var keys = ['tlr', 'rp', 'go', 'oi', 'pr'];
  var labels = { tlr: 'Teaching, Learning & Resources', rp: 'Research & Professional Practice', go: 'Graduation Outcomes', oi: 'Outreach & Inclusivity', pr: 'Perception' };
  var recommendations = {
    tlr: ['Recruit more PhD-qualified faculty', 'Upgrade lab and library infrastructure', 'Adopt modern digital teaching tools'],
    rp:  ['Increase research publications in high-impact journals', 'Apply for more sponsored research grants', 'Build industry-academia research partnerships', 'Establish dedicated research centers'],
    go:  ['Strengthen placement cell and industry tie-ups', 'Launch structured internship programs', 'Introduce career counseling and mentorship'],
    oi:  ['Expand scholarship programs for underrepresented groups', 'Develop community outreach and extension activities', 'Improve campus accessibility infrastructure'],
    pr:  ['Enhance digital presence and institutional branding', 'Organize national conferences and seminars', 'Strengthen alumni engagement and visibility'],
  };

  var averages = {};
  keys.forEach(function(k) {
    averages[k] = Math.round(peerGroup.reduce(function(sum, u) { return sum + u.scores[k]; }, 0) / peerGroup.length);
  });

  var gaps = keys
    .map(function(k) {
      return { key: k, label: labels[k], selected: selected.scores[k], peerAvg: averages[k], gap: averages[k] - selected.scores[k], recommendations: recommendations[k] };
    })
    .filter(function(g) { return g.gap > 0; })
    .sort(function(a, b) { return b.gap - a.gap; });

  return { averages: averages, gaps: gaps, selected: selected, peerGroup: peerGroup };
}

var universityDatabase = {
  'IIT Delhi':      { tlr: 92, rp: 95, go: 88, oi: 85, pr: 98 },
  'IIT Bombay':     { tlr: 94, rp: 96, go: 90, oi: 87, pr: 99 },
  'IIT Madras':     { tlr: 91, rp: 94, go: 89, oi: 86, pr: 97 },
  'IISc Bangalore': { tlr: 95, rp: 98, go: 85, oi: 82, pr: 96 },
  'AIIMS Delhi':    { tlr: 88, rp: 92, go: 94, oi: 90, pr: 95 },
};

function generateScores(universityName) {
  if (universityDatabase[universityName]) return universityDatabase[universityName];
  var hash = universityName.split('').reduce(function(acc, char) { return acc + char.charCodeAt(0); }, 0);
  var seed = hash % 100;
  return {
    tlr: 55 + (seed % 30) + Math.floor(Math.random() * 10),
    rp:  50 + (seed % 35) + Math.floor(Math.random() * 10),
    go:  60 + (seed % 25) + Math.floor(Math.random() * 10),
    oi:  65 + (seed % 20) + Math.floor(Math.random() * 10),
    pr:  45 + (seed % 40) + Math.floor(Math.random() * 10),
  };
}

export async function analyzeUniversity(universityName) {
  await new Promise(function(resolve) { setTimeout(resolve, 2000 + Math.random() * 1000); });
  var scores = generateScores(universityName);
  var timestamp = new Date().toISOString();

  function makeParam(id, name, score) {
    return { id: id, name: name, score: score, maxScore: 100, performanceLevel: getPerformanceLevel(score), assessment: getAssessment(id, score), benchmarkGap: getBenchmarkGap(score), riskLevel: getRiskLevel(score), priority: getPriority(score), actionSteps: getActionSteps(id, score), expectedOutcome: getExpectedOutcome(score) };
  }

  return {
    universityName: universityName,
    timestamp: timestamp,
    scores: scores,
    parameters: [
      makeParam('tlr', 'Teaching, Learning & Resources',   scores.tlr),
      makeParam('rp',  'Research & Professional Practice', scores.rp),
      makeParam('go',  'Graduation Outcomes',              scores.go),
      makeParam('oi',  'Outreach & Inclusivity',           scores.oi),
      makeParam('pr',  'Perception',                       scores.pr),
    ],
  };
}

function getPerformanceLevel(score) { return score >= 80 ? 'Strong' : score >= 60 ? 'Moderate' : 'Low'; }

function getAssessment(parameter, score) {
  var map = {
    tlr: { high: 'Excellent faculty-student ratio, modern infrastructure, and comprehensive learning resources.', medium: 'Adequate teaching resources with room for improvement in faculty development and infrastructure.', low: 'Significant gaps in teaching quality, infrastructure, and learning resources require immediate attention.' },
    rp:  { high: 'Strong research output with high-quality publications and active industry collaborations.', medium: 'Moderate research activity with potential for increased publications and funding.', low: 'Limited research output and professional practice engagement need strategic intervention.' },
    go:  { high: 'Outstanding placement records and higher education progression rates.', medium: 'Satisfactory graduation outcomes with scope for enhanced placement support.', low: 'Graduation outcomes below expectations require comprehensive career development programs.' },
    oi:  { high: 'Exemplary outreach programs and strong inclusivity measures across demographics.', medium: 'Good outreach initiatives with opportunities to expand inclusivity efforts.', low: 'Outreach and inclusivity programs need substantial development and implementation.' },
    pr:  { high: 'Excellent reputation among peers and employers with strong brand recognition.', medium: 'Moderate perception with potential for enhanced visibility and reputation building.', low: 'Perception challenges require strategic branding and stakeholder engagement initiatives.' },
  };
  var level = score >= 80 ? 'high' : score >= 60 ? 'medium' : 'low';
  return map[parameter][level];
}

function getBenchmarkGap(score) {
  var gap = 90 - score;
  if (gap <= 0)  return 'Exceeds top-tier benchmark standards';
  if (gap <= 10) return gap + ' points below top-tier institutions';
  if (gap <= 20) return gap + ' points gap from leading universities';
  return gap + ' points below national excellence standards';
}

function getRiskLevel(score) { return score >= 75 ? 'Low' : score >= 55 ? 'Medium' : 'High'; }

function getPriority(score) {
  if (score < 55) return 'Critical - Immediate Action Required';
  if (score < 70) return 'High - Address Within 6 Months';
  if (score < 80) return 'Medium - Strategic Improvement';
  return 'Low - Maintain Excellence';
}

function getActionSteps(parameter, score) {
  var actions = {
    tlr: ['Recruit qualified faculty with PhD credentials', 'Upgrade laboratory and library infrastructure', 'Implement modern teaching methodologies and digital tools', 'Enhance faculty development programs', 'Improve student support services'],
    rp:  ['Establish research centers of excellence', 'Increase funding for research projects', 'Encourage faculty publications in high-impact journals', 'Develop industry-academia partnerships', 'Create innovation and incubation facilities'],
    go:  ['Strengthen placement cell operations', 'Develop industry partnerships for internships', 'Implement career counseling programs', 'Track alumni career progression', 'Enhance entrepreneurship support'],
    oi:  ['Expand scholarship programs for underrepresented groups', 'Develop community outreach initiatives', 'Implement accessibility infrastructure', 'Create mentorship programs', 'Establish regional extension centers'],
    pr:  ['Enhance digital presence and branding', 'Organize national conferences and events', 'Develop strategic communication campaigns', 'Strengthen alumni engagement', 'Build partnerships with reputed institutions'],
  };
  return actions[parameter].slice(0, score < 60 ? 5 : 3);
}

function getExpectedOutcome(score) {
  var improvement = score < 60 ? '15-20' : score < 75 ? '10-15' : '5-10';
  return 'Expected improvement of ' + improvement + ' points within 12-18 months with consistent implementation';
}


// Euclidean distance between two score vectors
function euclidean(a, b) {
  var keys = ['tlr', 'rp', 'go', 'oi', 'pr'];
  return Math.sqrt(keys.reduce(function(sum, k) { return sum + Math.pow(a[k] - b[k], 2); }, 0));
}

// Returns top-N most similar universities by Euclidean distance (excluding the selected one)
export function getSimilarUniversities(universityName, topN) {
  if (topN === undefined) topN = 5;
  var target = nirfRankedDataset.find(function(u) {
    return u.name.toLowerCase() === universityName.toLowerCase();
  });
  var targetScores = target ? target.scores : generateScores(universityName);

  return nirfRankedDataset
    .filter(function(u) { return u.name.toLowerCase() !== universityName.toLowerCase(); })
    .map(function(u) {
      return Object.assign({}, u, { distance: parseFloat(euclidean(targetScores, u.scores).toFixed(2)) });
    })
    .sort(function(a, b) { return a.distance - b.distance; })
    .slice(0, topN);
}
