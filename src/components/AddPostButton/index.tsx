import { Link } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';

const AddPostButton = () => {
  return (
    <Link
      to="/addpost"
      className="absolute bottom-20 right-6 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white md:hidden"
    >
      <BiEditAlt className="w-6 h-6" />
    </Link>
  );
};

export default AddPostButton;
