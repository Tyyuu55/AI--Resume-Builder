import React from 'react'

function index() {
  const adviceSections = [
    {
      title: 'Networking Advice',
      items: [
        {
          title: 'The Importance of Networking at Every Stage of Your Career',
          url: 'https://www.linkedin.com/pulse/importance-networking-every-stage-your-career-nicky-acuna-ocana-rycse',
          description: 'Understand why building connections matters at every stage of your journey.',
        },
        {
          title: 'Professional Networking: Tips and Mistakes to Avoid',
          url: 'https://www.linkedin.com/pulse/professional-networking-tips-mistakes-avoid-robert-ford-y1trc',
          description: 'Learn networking do’s and don’ts from professionals.',
        },
        {
          title: 'Networking Tips for Career Advancement',
          url: 'https://www.linkedin.com/pulse/networking-tips-career-advancement-aysha-david-9g8yc',
          description: 'Tactical advice on how to move up using your network.',
        },
      ],
    },
    {
      title: 'ATS Optimization',
      items: [
        {
          title: 'How To Write an ATS Resume (With Template and Tips)',
          url: 'https://www.indeed.com/career-advice/resumes-cover-letters/ats-resume-template',
          description: 'Build a resume that’s easy for bots (and humans) to read.',
        },
        {
          title: '13 Best Practices for Beating an ATS',
          url: 'https://www.indeed.com/career-advice/resumes-cover-letters/how-to-beat-applicant-tracking-system',
          description: 'Tips to ensure your resume doesn’t get filtered out.',
        },
        {
          title: 'How To Optimize Your Resume for AI Scanners (With Tips)',
          url: 'https://www.indeed.com/career-advice/resumes-cover-letters/resume-ai',
          description: 'AI-friendly resume strategies that work.',
        },
      ],
    },
    {
      title: 'Resume Enhancement',
      items: [
        {
          title: 'How to Write a Resume That Stands Out',
          url: 'https://www.gsd.harvard.edu/career/career-services-students/resume-tips/',
          description: 'Guidance from Harvard on making your resume shine.',
        },
        {
          title: 'Create a Strong Resume - Harvard Career Services',
          url: 'https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/',
          description: 'Key sections and layout suggestions to boost clarity.',
        },
        {
          title: 'How to Write a Great Resume and Cover Letter',
          url: 'https://extension.harvard.edu/blog/how-to-write-a-great-resume-and-cover-letter/',
          description: 'Pairing your resume with a compelling cover letter.',
        },
      ],
    },
  ];

  return (
    <div>
      {/* <Header /> Uncomment if using a Header component */}

      <div className="p-6 max-w-5xl mx-auto text-black bg-white mt-24">
        <h1 className="text-3xl font-bold mb-8 text-center">Career & Resume Advice</h1>

        {adviceSections.map((section, index) => (
          <section key={index} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {section.items.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-black rounded-xl p-4 shadow-sm hover:shadow-lg transition-all bg-white"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-black hover:underline block"
                  >
                    {item.title}
                  </a>
                  <p className="text-sm mt-2 text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default index
