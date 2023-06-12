import { User } from '../../types/user';

interface Props {
  postUser: User | undefined;
  date: string;
}

const PostProfile = ({ postUser, date }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <img
        src={postUser && postUser.profileImage}
        alt="user"
        className="rounded-full w-8 h-8"
      />
      <div className="text-sm">
        <p className="font-bold">{postUser && postUser.name}</p>
        <p className="text-gray-500">{date}</p>
      </div>
    </div>
  );
};

export default PostProfile;
