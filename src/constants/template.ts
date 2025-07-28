export const templates = [
    {
        id:"blank", 
        label: "Blank", 
        imageUrl: "/blank-document.svg",
        initialContent: `` 
    },
    {
        id: "software-proposal",
        label:"Software development proposal",
        imageUrl:"/software-proposal.svg",
        initialContent: `<h1>📄 Soft Proposal: <em>[Insert Title Here]</em></h1>

<p><strong>Author:</strong> Your Name<br />
<strong>Date:</strong> 2025-07-28<br />
<strong>Status:</strong> Draft</p>

<hr />

<h2>📌 Summary</h2>
<p>This document proposes the addition of <strong>[feature/change]</strong> to address <strong>[problem]</strong> by <strong>[solution]</strong>.</p>

<h2>🎯 Goals</h2>
<ul>
  <li>Improve ...</li>
  <li>Reduce ...</li>
  <li>Increase ...</li>
</ul>

<h2>🚫 Non-Goals / Out of Scope</h2>
<ul>
  <li>This will not include ...</li>
  <li>Not responsible for ...</li>
</ul>

<h2>📚 Background / Context</h2>
<p>Provide prior work, research, or relevant discussion here. Link any supporting documents or threads.</p>

<h2>💡 Proposed Solution</h2>
<p>Describe the proposed implementation, including technical, UI/UX, or process changes.</p>

<h2>🔍 Alternatives Considered</h2>
<ul>
  <li><strong>Option A</strong>: Rejected because ...</li>
  <li><strong>Option B</strong>: Not feasible due to ...</li>
</ul>

<h2>🚧 Risks or Challenges</h2>
<ul>
  <li>Risk 1 – Describe and suggest mitigation</li>
  <li>Risk 2 – Impact if ignored</li>
</ul>

<h2>📊 Metrics for Success</h2>
<ul>
  <li>Measure X reaches Y%</li>
  <li>Feedback from Z improves</li>
</ul>

<h2>🔄 Next Steps</h2>
<ul>
  <li>[ ] Review by team</li>
  <li>[ ] Final decision on YYYY-MM-DD</li>
  <li>[ ] Implementation begins</li>
</ul>

<h2>✅ Approvals</h2>
<table>
  <thead>
    <tr>
      <th>Role</th>
      <th>Name</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Product</td>
      <td>John Doe</td>
      <td>✅ Approved</td>
    </tr>
    <tr>
      <td>Engineering</td>
      <td>Jane Smith</td>
      <td>⏳ Pending</td>
    </tr>
  </tbody>
</table>
`
    },
    {
        id: "project-proposal",
        label:"Project Proposal",
        imageUrl:"/project-proposal.svg",
        initialContent: `<h1>📁 Project Proposal: <em>[Project Title]</em></h1>

<p><strong>Prepared By:</strong> Your Name<br />
<strong>Date:</strong> 2025-07-28<br />
<strong>Project Type:</strong> [Internal | Client | Research]</p>

<hr />

<h2>📌 Executive Summary</h2>
<p>This proposal outlines the goals, scope, and timeline of the <strong>[project]</strong>. The goal is to address <strong>[problem]</strong> through <strong>[solution]</strong>.</p>

<h2>🎯 Objectives</h2>
<ul>
  <li>Define clear project goals</li>
  <li>Outline deliverables</li>
  <li>Identify required resources</li>
</ul>

<h2>📦 Scope</h2>
<p>This project will include:</p>
<ul>
  <li>Feature A</li>
  <li>Feature B</li>
</ul>
<p>It will exclude:</p>
<ul>
  <li>Legacy system refactoring</li>
</ul>

<h2>⏳ Timeline</h2>
<table>
  <thead>
    <tr>
      <th>Phase</th>
      <th>Start</th>
      <th>End</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Planning</td>
      <td>Aug 1</td>
      <td>Aug 5</td>
    </tr>
    <tr>
      <td>Development</td>
      <td>Aug 6</td>
      <td>Sep 20</td>
    </tr>
  </tbody>
</table>

<h2>💰 Budget (if applicable)</h2>
<p>Estimated budget: $XXX<br />
Breakdown:</p>
<ul>
  <li>Design: $X</li>
  <li>Development: $X</li>
  <li>Testing: $X</li>
</ul>

<h2>✅ Approval</h2>
<p>Please review and provide feedback or approval by [Date].</p>
`
    },
    {
        id: "business-letter",
        label:"Business Letter",
        imageUrl:"/business-letter.svg",
        initialContent: `<h1>🏢 Business Letter</h1>

<p><strong>From:</strong><br />
Your Name<br />
Your Title<br />
Company Name<br />
Email: your@email.com</p>

<p><strong>To:</strong><br />
Recipient Name<br />
Recipient Title<br />
Company Name</p>

<p><strong>Date:</strong> 2025-07-28</p>

<hr />

<p>Dear [Recipient's Name],</p>

<p>I am writing to [state purpose clearly — e.g., request a meeting, follow up, inquire about a service].</p>

<p>[Include background or reasoning]</p>

<p>We believe this could lead to [positive outcome] and would appreciate your response at your earliest convenience.</p>

<p>Sincerely,<br />
Your Name</p>
`
    },
    {
        id: "resume",
        label:"Resume",
        imageUrl:"/resume.svg",
        initialContent: `<h1>📄 Resume: Your Full Name</h1>

<p><strong>Email:</strong> you@email.com | <strong>Phone:</strong> (123) 456-7890 | <strong>Location:</strong> City, Country</p>

<hr />

<h2>🎯 Summary</h2>
<p>Professional with X+ years of experience in [industry/role], with a focus on [key skills]. Proven success in [achievement].</p>

<h2>💼 Experience</h2>
<h3>Job Title – Company Name</h3>
<p><em>Start Date – End Date</em></p>
<ul>
  <li>Responsibility or achievement 1</li>
  <li>Responsibility or achievement 2</li>
</ul>

<h3>Job Title – Company Name</h3>
<p><em>Start Date – End Date</em></p>
<ul>
  <li>Responsibility or achievement 1</li>
</ul>

<h2>🎓 Education</h2>
<p><strong>Degree</strong> – University Name (<em>Year</em>)</p>

<h2>🛠️ Skills</h2>
<ul>
  <li>Technical Skill 1</li>
  <li>Soft Skill 1</li>
</ul>
`
    },
    {
        id: "cover-letter",
        label:"Cover Letter",
        imageUrl:"/cover-letter.svg",
        initialContent:`<h1>📄 Cover Letter</h1>

<p><strong>From:</strong><br />
Your Name<br />
Your Address<br />
Email: your@email.com</p>

<p><strong>To:</strong><br />
Hiring Manager<br />
Company Name<br />
Company Address</p>

<p><strong>Date:</strong> 2025-07-28</p>

<hr />

<p>Dear Hiring Manager,</p>

<p>I am writing to express my interest in the [Job Title] position at [Company Name]. With [X years] of experience in [your field], I bring a strong background in [skillset].</p>

<p>I was particularly drawn to [something about the company or role], and I believe I can bring [value you provide].</p>

<p>Thank you for considering my application. I look forward to the opportunity to discuss further.</p>

<p>Sincerely,<br />
Your Name</p>
`
    },
    {
        id: "letter",
        label:"Letter",
        imageUrl:"/letter.svg",
        initialContent:`<h1>✉️ Personal Letter</h1>

<p><strong>From:</strong><br />
Your Name<br />
Your Address</p>

<p><strong>To:</strong><br />
Recipient's Name<br />
Recipient's Address</p>

<p><strong>Date:</strong> 2025-07-28</p>

<hr />

<p>Dear [Name],</p>

<p>I hope this letter finds you well. I wanted to reach out and share [news, message, memory, or request].</p>

<p>[Main content of the letter]</p>

<p>Looking forward to hearing from you soon.</p>

<p>With warm regards,<br />
Your Name</p>
`
    },

]