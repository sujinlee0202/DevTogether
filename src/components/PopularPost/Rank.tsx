import { useEffect, useState } from 'react';
import { Post } from '../../types/post';
import { getUser } from '../../api/firebase';

interface Props {
  data: Post;
  rank: number;
}

const Rank = ({ data, rank }: Props) => {
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    getUser(data.email).then((user: any) => setProfileImage(user.profileImage));
  }, [data]);

  return (
    <div
      key={data.postid}
      className="flex items-center gap-3 hover:bg-blue-50 p-3"
    >
      <p className="w-4 text-center shrink-0">{rank + 1}</p>
      <img src={profileImage} className="rounded-full"></img>
      <div>
        <p className="font-bold line-clamp-1">{data.title}</p>
        <p className="text-sm">{data.name}</p>
      </div>
    </div>
  );
};

export default Rank;
