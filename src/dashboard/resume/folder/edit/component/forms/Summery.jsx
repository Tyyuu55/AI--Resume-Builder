import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../../../../../../components/ui/button'

import { ResumeInfoContext } from '../../../../../../../context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../../../service/GlobalApi'
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner';
import { AIChatSession } from '../../../../../../../service/AIModal'
import { Textarea } from '@/components/ui/textarea'

const prompt = "Job Title: {jobTitle}, Based on the job title, give me a list of summaries for 3 experience levels: Fresher, Mid-level, and Experienced. Each summary should be 4-5 lines long, and the response should be in an array format with fields 'experience_level' (Fresher, Mid-level, Experienced) and 'summary'.";

function Summery({enabledNext}) {
  
   const{resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
   
   const[summery,setSummery]=useState();

   const[loading,setLoading]=useState(false);
   const params=useParams()
   const [aiGeneratedSummeryList,setAiGeneratedSummeryList]=useState()

   useEffect(()=>{
    summery&&setResumeInfo({
    ...resumeInfo,
    summery:summery
    })
   },[summery])

  const GenerateSummeryFromAI=async()=>{
    setLoading(true)
    const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle)
    
    console.log(PROMPT);

    const result=await AIChatSession.sendMessage(PROMPT);
    console.log(JSON.parse(result.response.text()))
   
 setAiGeneratedSummeryList(JSON.parse(result.response.text()))
    setLoading(false);
  }

   const onSave=(e)=>{
    e.preventDefault();
    setLoading(true)
    const data={
     data:{
      summery:summery
     }
    }
    GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
      console.log(resp);
      enabledNext(true);
      setLoading(false);
      toast("Details updated")
    },(error)=>{
      setLoading(false);
    })
   }

  return (
    <div>
     <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-black mt-10">
      <h2 className="font-bold text-lg">Summary</h2>
      <p>Add Summary for your job title</p>

       <form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end'>
              <label>Add Summary</label>
              <Button  
                variant="outline" 
                onClick={()=>GenerateSummeryFromAI()}
                type="button" size='sm'
                className="text-black border-2 border-black bg-transparent hover:bg-black hover:text-white">
                <Brain className='h-4 w-4'/>Generate from AI</Button>
          </div>
       <Textarea className="mt-5" required
         value={summery}
         defaultValue={summery?summery:resumeInfo?.summery}
         onChange={(e)=>setSummery(e.target.value)}
       />

       <div className='mt-2 flex justify-end'>
         <Button 
           type="submit" 
           disabled={loading} 
           className="text-black border-2 border-black bg-transparent hover:bg-black hover:text-white">
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
         </Button>
       </div>
       </form>
      </div>
      
      {aiGeneratedSummeryList && (
        <div className='my-5'>
          <h2 className='font-bold text-lg'>Suggestions</h2>
          {aiGeneratedSummeryList?.map((item, index) => (
            <div  
              key={index} 
              onClick={() => setSummery(item?.summary)}
              className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
               <h2 className='font-bold my-1 text-black'>Level: {item?.experience_level}</h2>

               <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Summery
