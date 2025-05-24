import React, { useContext, useEffect, useState } from 'react';
import Input from '../../../../../../components/ui/index2';
import { Button } from '../../../../../../components/ui/button';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '../../../../../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

// ➤ Helper function to remove bullets from Gemini output
const sanitizeWorkSummary = (text) => {
  return text.replace(/^\s*[\*\-\u2022]\s+/gm, ''); // removes *, -, • with optional whitespace
};

function Experience() {
  const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: ''
  };

  const [loading, setLoading] = useState(false);
  const [experienceList, setExperienceList] = useState([]);
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    resumeInfo?.Experience.length > 0 && setExperienceList(resumeInfo?.Experience);
  }, []);

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperienceList([...experienceList, formField]);
  };

  const RemoveExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    const rawText = e.target.value;
    const cleanText = sanitizeWorkSummary(rawText);
    newEntries[index][name] = cleanText;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      Experience: experienceList
    });
  }, [experienceList]);

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        Experience: experienceList.map(({ id, ...rest }) => rest)
      }
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        setLoading(false);
        toast('Details updated !');
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-black mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your previous Job experience</p>

        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-2 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input name="title" onChange={(event) => handleChange(index, event)} 
                    defaultValue={item?.title}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input name="companyName" onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.companyName}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input name="city" onChange={(event) => handleChange(index, event)} 
                    defaultValue={item?.city}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input name="state" onChange={(event) => handleChange(index, event)} 
                    defaultValue={item?.state}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input type="date" name="startDate" onChange={(event) => handleChange(index, event)} 
                    defaultValue={item?.startDate}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input type="date" name="endDate" onChange={(event) => handleChange(index, event)} 
                    defaultValue={item?.endDate}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummary}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, 'workSummary', index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={AddNewExperience} 
              className="text-black border-2 border-black bg-transparent hover:bg-black hover:text-white"
            >
              + Add More Experience
            </Button>
            <Button 
              variant="outline" 
              onClick={RemoveExperience} 
              className="text-black border-2 border-black bg-transparent hover:bg-black hover:text-white"
            >
              - Remove
            </Button>
          </div>
          <Button 
            disabled={loading} 
            onClick={() => onSave()} 
            className="text-black border-2 border-black bg-transparent hover:bg-black hover:text-white"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
