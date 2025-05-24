import React, { useContext, useState } from 'react';
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg';
import { Button } from '../../../../../components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '../../../../../../context/ResumeInfoContext';
import { AIChatSession } from './../../../../../../service/AIModal';
import { toast } from 'sonner';

const PROMPT =
  'position title: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume , give me result in HTML tags';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);

    if (!resumeInfo.Experience[index]?.title) {
      toast('Please Add Position Title');
      setLoading(false);
      return;
    }

    const prompt = PROMPT.replace('{positionTitle}', resumeInfo.Experience[index].title);
    const result = await AIChatSession.sendMessage(prompt);

    try {
      const text = await result.response.text();
      const json = JSON.parse(text);

      if (json.bullet_points && Array.isArray(json.bullet_points)) {
        const html =
          '<ul>' + json.bullet_points.map((point) => `<li>${point}</li>`).join('') + '</ul>';
        setValue(html);
      } else {
        toast('AI response format unexpected.');
      }
    } catch (error) {
      console.error(error);
      toast('Failed to parse AI response.');
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          className="text-black border-2 border-black bg-transparent hover:bg-black hover:text-white"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
