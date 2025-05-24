import React from 'react';

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>

      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.Experience?.map((experience, index) => (
        <div key={index} className='my-5'>
          <h2
            className='text-sm font-bold'
            style={{ color: resumeInfo?.themeColor }}
          >
            {experience?.title}
          </h2>

          <div className='text-xs flex justify-between'>
            <span>
              {experience?.companyName}, {experience?.city}, {experience?.state}
            </span>
            <span>
              {experience?.startDate} To{' '}
              {experience?.currentlyWorking ? 'Present' : experience?.endDate}
            </span>
          </div>

          {/* Render work summary with proper styling */}
          <div className='text-xs my-2 rsw-ce'>
            <div
              dangerouslySetInnerHTML={{ __html: experience?.workSummary }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
