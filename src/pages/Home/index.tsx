import Header from '../../components/Header';
import PopularPost from '../../components/PopularPost';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex h-full w-full max-w-screen-lg mx-auto gap-10">
        <Outlet />
        <PopularPost />
      </div>
      {/* <Nav /> */}
    </>
  );
};

export default Home;
