import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ResumeInfoContext } from '../../../../../context/ResumeInfoContext';
import dummy from '../../../../../data/dummy';
import FormSection from './component/FormSection';
import ResumePreview from './component/ResumePreview';
import GlobalApi from '../../../../../service/GlobalApi';

function EditResume() {
  const {resumeId}=useParams();
  const[resumeInfo,setResumeInfo]=useState();
  useEffect(()=>{
 
   GetResumeInfo();
  },[])

  const GetResumeInfo=()=>{
    GlobalApi.GetResumeById(resumeId).then(resp=>{
      
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
      
    })
}
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
      {/*Form section */}
       <FormSection/>
      {/*preview section */}
       <ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>
    
  )
}

export default EditResume
