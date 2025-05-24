import { Loader2Icon, MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog"
import GlobalApi from '../../../service/GlobalApi';
import { toast } from 'sonner';

function ResumecardItem({ resume, refreshData }) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp => {
      toast('Resume Deleted!');
      refreshData();
      setLoading(false);
      setOpenAlert(false);
    }).catch(() => {
      setLoading(false);
    });
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-md border border-zinc-700 bg-[#1e1e1e]">
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div
          className="p-10 bg-neutral-200 transition-all duration-200"
          style={{
            borderTop: '4px solid #27272a', // matches bg-zinc-800
            height: '260px',
          }}
        >
          <div className="flex items-center justify-center h-[180px]">
            <img
              src="/cv.png"
              width={80}
              height={80}
              alt="Resume Icon"
              className="opacity-90"
            />
          </div>
        </div>
      </Link>

      <div className="px-4 py-3 flex justify-between items-center text-sm text-white bg-zinc-800">
        <h2 className="font-medium truncate">{resume.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer text-gray-300" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-zinc-900 text-gray-100 border border-zinc-700">
            <DropdownMenuItem onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>Download</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={openAlert}>
        <AlertDialogContent className="bg-zinc-900 text-gray-200 border border-zinc-700">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. It will permanently delete your resume.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={loading}>
              {loading ? <Loader2Icon className="animate-spin" /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ResumecardItem;
