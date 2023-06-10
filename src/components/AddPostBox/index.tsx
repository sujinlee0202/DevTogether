import { useContext } from 'react';
import { loginContext } from '../../context/loginContext';
import { Link } from 'react-router-dom';

const AddPostBox = () => {
  const { profileImage } = useContext(loginContext);

  return (
    <Link
      to="/addpost"
      className="w-full my-10 bg-white border p-4 flex items-center gap-4"
    >
      <img
        src={profileImage}
        alt="user"
        className="w-10 h-10 rounded-full"
      ></img>
      <div className="bg-gray-100 border p-4 w-full rounded-lg text-sm text-gray-500">
        나누고 싶은 생각이 있으신가요?
      </div>
    </Link>
  );
};

export default AddPostBox;
