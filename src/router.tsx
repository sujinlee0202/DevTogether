import { RouteObject, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/Login';
import SignUp from './pages/SignUp';
import AddPostPage from './pages/AddPost';
import Timeline from './components/Timeline';
import PostDetail from './pages/PostDetail';
import ChatPage from './pages/ChatPage';
import Message from './components/Message';

const routerData: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <Timeline />,
      },
      {
        path: '/article/:id',
        element: <PostDetail />,
      },
      {
        path: '/chat',
        element: <ChatPage />,
        children: [
          {
            path: '/chat/message',
            element: <Message />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/addpost',
    element: <AddPostPage />,
  },
];

export const routers = createBrowserRouter(
  routerData.map((router) => {
    return {
      path: router.path,
      element: router.element,
      children: router.children,
    };
  }),
);
