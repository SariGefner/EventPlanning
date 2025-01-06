'use client';  

import useNavbarStore from '@/app/store/navbarStore'; 
import ConsumerSidebar from '@/app/component/users/userSidebar'; 
import "@/app/globals.css";

const ClientSideLayout = () => {
    const { isOpen } = useNavbarStore(); 

    return (
        <div>
            {isOpen &&
                <aside className='fixed right-0 top-[105px] h-[calc(100vh-155px)] w-64 shadow-lg z-40 flex flex-col bg-[#6C48C5]'>
                    <ConsumerSidebar />
                </aside>
            }
        </div>
    );
}
export default ClientSideLayout