import { ChevronDown, LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { useUserStore } from '../store/useUserStore';
import { Link, useNavigate } from 'react-router-dom';
import { callLogoutUserApi } from '../services';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
function Header() {
    const setUser = useUserStore((state) => state.setUser);
    const user = useUserStore((state) => state.user);
    const navigate = useNavigate();
    async function handleLogout() {
        const response = await callLogoutUserApi();
        if (response?.success) {
            setUser(null);
            navigate('/auth/signin');
        }
    }
    
    return (
        <div className='flex p-4 border-b border-gray-200'>
            <ul className='flex gap-4 items-center justify-between w-full font-bold'>
                <h1>Task Manger</h1>
                <div className='flex gap-2'>
                    <Link to={'/tasks/list'} className='hover:underline'>Tasks</Link>
                    <Link to={'/tasks/scrum-board'} className='hover:underline'>Scrum Board</Link>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'outline'}>{user?.email} <ChevronDown className='mt-1' strokeWidth={'3px'} /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Button
                                    className='hover:text-black cursor-pointer '
                                    onClick={handleLogout}
                                    variant={'destructive'}
                                    size={'sm'}
                                >
                                    <LogOut /> Logout 
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </ul>
        </div>
    )
}

export default Header