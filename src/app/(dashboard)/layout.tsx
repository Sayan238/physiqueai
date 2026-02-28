'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import MobileNav from '@/components/layout/MobileNav';
import { DashboardSkeleton } from '@/components/ui/LoadingSkeleton';
import PageTransition from '@/components/ui/PageTransition';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#06060a]">
                <DashboardSkeleton />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#06060a]">
            <Sidebar />
            <div className="lg:ml-64">
                <Topbar />
                <main className="pb-20 lg:pb-6">
                    <PageTransition key={pathname}>
                        {children}
                    </PageTransition>
                </main>
            </div>
            <MobileNav />
        </div>
    );
}

