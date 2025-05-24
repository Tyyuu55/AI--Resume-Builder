import React, { useContext, useEffect, useState } from 'react';
import Input from '../../../../../../components/ui/index2';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '../../../../../../components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '../../../../../../../context/ResumeInfoContext';
import GlobalApi from '../../../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';

function Skills() {
  const [skillsList, setSkillsList] = useState([{
    name: '',
    rating: 0
  }]);
  const [loading, setLoading] = useState(false);
  const { resumeId } = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo?.Skills);
  }, []);

  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();

    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const AddNewSkills = () => {
    setSkillsList([...skillsList, {
      name: '',
      rating: 0
    }]);
  };

  const RemoveSkills = () => {
    setSkillsList(skillsList => skillsList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        Skills: skillsList.map(({ id, ...rest }) => rest)
      }
    };

    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then(resp => {
        console.log(resp);
        setLoading(false);
        toast('Details updated !');
      }, (error) => {
        setLoading(false);
        toast('Server Error, Try again!');
      });
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      Skills: skillsList
    });
  }, [skillsList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-black mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add Your top professional key skills</p>
      <div>
        {skillsList.map((item, index) => (
          <div className='flex justify-between mb-2 border rounded-lg p-3' key={index}> 
            <div>
              <label className='text-xs'>Name</label>
              <Input
                className="w-full"
                defaultValue={item.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
              />
            </div>
            <Rating style={{ maxWidth: 120 }} value={item.rating} 
              onChange={(v) => handleChange(index, 'rating', v)} />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={AddNewSkills} className="text-black border-2 border-black bg-transparent hover:bg-black hover:text-white">
            + Add More Skills
          </Button>
          <Button variant="outline" onClick={RemoveSkills} className="text-black border-2 border-black bg-transparent hover:bg-black hover:text-white">
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()} className="text-black border-2 border-black bg-transparent hover:bg-black hover:text-white">
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default Skills;
