import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

return (
  <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 space-y-4">
    {/* Header */}
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">
        {daysAgoFunction(job?.createdAt) === 0
          ? "Today"
          : `${daysAgoFunction(job?.createdAt)} days ago`}
      </p>
      <Button variant="outline" className="rounded-full" size="icon">
        <Bookmark />
      </Button>
    </div>

    {/* Company Info */}
    <div className="flex items-center gap-3">
      <div className="w-12 h-12">
        <Avatar className="w-full h-full">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
      </div>
      <div className="overflow-hidden">
        <h1 className="font-medium text-lg truncate">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
    </div>

    {/* Job Title and Description */}
    <div>
      <h1 className="font-bold text-lg my-2">{job?.title}</h1>
      <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
    </div>

    {/* Job Info Badges */}
    <div className="flex flex-wrap gap-2 mt-2">
      <Badge className="text-blue-700 font-bold whitespace-nowrap" variant="ghost">
        {job?.position} Position{job?.position > 1 ? "s" : ""}
      </Badge>
      <Badge className="text-[#F83002] font-bold whitespace-nowrap" variant="ghost">
        {job?.jobType}
      </Badge>
      <Badge className="text-[#7209b7] font-bold whitespace-nowrap" variant="ghost">
        {job?.salary} LPA
      </Badge>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-wrap gap-2 mt-4">
      <Button
        onClick={() => navigate(`/description/${job?._id}`)}
        variant="outline"
        className="flex-1 min-w-[120px]"
      >
        Details
      </Button>
      <Button className="bg-[#7209b7] flex-1 min-w-[120px]">Save For Later</Button>
    </div>
  </div>
);

}

export default Job