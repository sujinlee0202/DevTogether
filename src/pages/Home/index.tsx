import Nav from '../../components/Nav';
import Header from '../../components/Header';
import AddPostButton from '../../components/AddPostButton';
import PopularPost from '../../components/PopularPost';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex w-full max-w-screen-lg mx-auto gap-10">
        <Outlet />
        <PopularPost />
      </div>
      <AddPostButton />
      <Nav />
    </>
  );
};

export default Home;
