import React, { useState } from 'react'
import { Button } from '../../../../../components/ui/button'

import { ArrowLeft, ArrowRight, HomeIcon, LayoutGrid } from 'lucide-react'
import PersonalDetail from './forms/PersonalDetail'
import Summery from './forms/Summery'
import Experience from './forms/Experience'
import Education from './forms/Education'
import Skills from './forms/Skills'
import { Link, Navigate, useParams } from 'react-router-dom'
import ThemeColor from './ThemeColor'
function FormSection() {
const [activeFormIndex,setActiveFormIndex]=useState(1)
const[enableNext,setEnableNext]=useState(false)
const {resumeId}=useParams();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
          <Link to={"/dashboard"}>
          <Button className="bg-black text-white border border-white hover:bg-white hover:text-black"><HomeIcon/></Button>
          </Link>
       
        
          
       
          </div>
        <div className='flex gap-2 '>
          {activeFormIndex>1&& <Button size='sm' className='bg-black text-white border border-white hover:bg-white hover:text-black'
           onClick={()=>setActiveFormIndex(activeFormIndex-1)}
          
          ><ArrowLeft/></Button>}
          <Button 
  disabled={!enableNext}
  className="flex gap-2 bg-black text-white border border-white hover:bg-white hover:text-black"
  size="sm"
  onClick={() => setActiveFormIndex(activeFormIndex + 1)}
>
  Next <ArrowRight />
</Button>

        </div>
      </div>
      {activeFormIndex===1? <PersonalDetail enabledNext={(v)=>setEnableNext(v)}/>:
        activeFormIndex==2?
        <Summery enabledNext={(v)=>setEnableNext(v)}/>
        :activeFormIndex==3?
        <Experience/>
        :activeFormIndex==4?
        <Education/>
        :activeFormIndex==5?
        <Skills/>
        :activeFormIndex==6?
        <Navigate to={'/my-resume/'+resumeId+"/view"}/>
        :null


        }
      
      
    </div>
  )
}

export default FormSection
