import { LogOut } from 'lucide-react'
import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'
import { callLogoutUserApi } from '../../services';

function Layout() {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  async function handleLogout() {
    const response = await callLogoutUserApi();
    if (response?.success) {
      setUser(null);
      navigate('/auth/signin');
    }
  }
  return (
    <>
      <div className="flec flex-auto flex-col">
        <div className="flex flex-auto">
          <main className="flex flex-col min-w-0 w-full bg-white border-gray-300 min-h-screen">
            {/* <Header /> */}
            <div className='flex p-4 border-b border-gray-200'>
              <ul className='flex gap-4 items-center justify-between w-full font-bold'>
                <h1>Task Manger</h1>
                <div className='flex gap-2'>
                  <Link to={'/tasks/list'}>Tasks</Link>
                  <Link to={'/tasks/scrum-board'}>Scrum Board</Link>
                </div>
                <div><LogOut
                  className='hover:text-red-500 cursor-pointer '
                  onClick={handleLogout} /></div>
              </ul>
            </div>
            {/* <Header /> */}
            <div className="flex flex-auto flex-col justify-between h-[calc(100%-64px)]">
              <div className="h-full">
                <div className="h-full flex flex-auto flex-col px-4 sm:px-6 md:px-6 py-4 sm:py-6">
                  <div className="mx-auto container h-full p-0">
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Layout
