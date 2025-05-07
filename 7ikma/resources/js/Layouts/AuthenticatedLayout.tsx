import { IconHome2, IconFolder, IconChartArcs, IconDashboard, IconLayout2Filled, IconSettings, IconLogout2 } from "@tabler/icons-react";

import { Link, usePage } from '@inertiajs/react';
import { Bell, Search } from 'lucide-react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    pages,
    children,
}: PropsWithChildren<{ pages?: ReactNode[] }>) {
    const user = usePage().props.auth.user;
    const [page, setPage] = useState<number>(0);
    const handleNavClick = (pageIndex:number) => {
        setPage(pageIndex);
    };

    return (
        <div className="min-h-screen bg-[#151513] pt-6 overflow-hidden" style={{ fontFamily: 'dimis', fontWeight: 700 }}>
            <div className="w-24 py-6 flex flex-col items-center gap-8 px-6 absolute h-full">
                <div
                    onClick={() => handleNavClick(0)}
                    className="w-10 h-10 text-[#f7f7f5] rounded-lg flex items-center justify-center mt-24 cursor-pointer"
                >
                    <IconLayout2Filled />
                </div>

                <div className="flex flex-col gap-8 text-[#f7f7f5]">
                    <div
                        onClick={() => handleNavClick(1)}
                        className={`w-12 h-12 ${page === 1 ? 'bg-[#fccc42] text-[#151513]' : 'text-[#f7f7f5]'} rounded-xl cursor-pointer flex items-center justify-center`}
                    >
                        <IconHome2 />
                    </div>

                    <div
                        onClick={() => handleNavClick(2)}
                        className={`w-12 h-12 ${page === 2 ? 'bg-[#fccc42] text-[#151513]' : 'text-[#f7f7f5]'} rounded-xl cursor-pointer flex items-center justify-center`}
                    >
                        <IconFolder />
                    </div>

                    <div
                        onClick={() => handleNavClick(3)}
                        className={`w-12 h-12 ${page === 3 ? 'bg-[#fccc42] text-[#151513]' : 'text-[#f7f7f5]'} rounded-xl cursor-pointer flex items-center justify-center`}
                    >
                        <IconChartArcs />
                    </div>

                    <div
                        onClick={() => handleNavClick(4)}
                        className={`w-12 h-12 ${page === 4 ? 'bg-[#fccc42] text-[#151513]' : 'text-[#f7f7f5]'} rounded-xl cursor-pointer flex items-center justify-center mt-24`}
                    >
                        <IconSettings />
                    </div>

                    <div
                        onClick={() => handleNavClick(5)}
                        className={`w-12 h-12 ${page === 5 ? 'bg-[#fccc42] text-[#151513]' : 'text-[#f7f7f5]'} rounded-xl cursor-pointer flex items-center justify-center`}
                    >
                        <IconLogout2 />
                    </div>
                </div>
            </div>

            {pages && (
                <header className="flex-1 bg-[#f7f7f5] ml-20 w-[94vw] h-[96vh] rounded-[2em] p-6 overflow-y-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center">
                            <span className="text-[#151513] mr-2">Welcome to</span>
                            <span className="text-2xl font-bold text-[#ff5734]">Learnify</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <input
                                    type="search"
                                    placeholder="Search"
                                    className="py-2 px-4 pr-10 border border-gray-300 rounded-lg w-64"
                                    style={{ border: "1px solid #151313", boxShadow: "1px 1px 0px #151313" }}
                                />
                                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#ff5734] rounded-lg p-2">
                                    <Search size={16} color="white" />
                                </button>
                            </div>

                            <button className="rounded-full w-10 h-10 bg-gray-300 flex items-center justify-center">
                                <Bell size={18} />
                            </button>

                            <div className="flex items-center gap-2 pr-2 border-r-2">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <img src="./img/usr/etudiant12.png" alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="font-medium text-sm">{user.nom_d_utilisateur}</div>
                                    <div className="text-xs text-gray-500">{user.email}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 pr-2">
                                <div className="w-12 h-10">
                                    <img src="./img/xlcoins.png" alt="Profile" className="w-full h-full" />
                                </div>
                                <div>
                                    {user.coins}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto px-1 py-6 relative">
                        {pages[page]}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
