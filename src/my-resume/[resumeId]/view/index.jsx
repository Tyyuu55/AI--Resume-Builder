import React, { useEffect, useState } from 'react'
import Header from '../../../components/custom/Header'
import { Button } from '../../../components/ui/button'
import ResumePreview from '../../../dashboard/resume/folder/edit/component/ResumePreview'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import GlobalApi from '../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then(resp => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };

  const HandleDownload = () => {
    window.print();
  };

  const HandleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} resume`,
        text: 'Hello Everyone, This is my resume. Please open the URL to see it.',
        url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`,
      })
      .then(() => console.log('Shared successfully!'))
      .catch(error => console.error('Error sharing:', error));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
          <h2 className='text-center text-2xl font-medium'>Congratulations! Your AI-powered resume is now ready</h2>
          <p className='text-center text-gray-400'>
            You're all set! Download your resume now and share your unique resume link with friends, family, or potential employers.
          </p>
          <div className='flex justify-between px-44 my-10'>
            <Button className='bg-black text-white border border-white hover:bg-white hover:text-black' onClick={HandleDownload}>Download</Button>
            <Button className='bg-black text-white border border-white hover:bg-white hover:text-black' onClick={HandleShare}>Share</Button>
          </div>
        </div>
      </div>

      <div id="print-area">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
