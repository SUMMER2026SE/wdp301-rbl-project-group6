import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../../components/DashboardLayout';
import { JobCard, WalletWidget, EarningsChart, QuickAccessCard } from '../components/ProviderHomeComponents';
import type { Job } from '../types/provider.types';

const ProviderHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);

  const navItems = [
    { icon: 'grid_view', label: 'Dashboard', path: '/provider' },
    { icon: 'event_available', label: 'Bookings', path: '#' },
    { icon: 'mail', label: 'Inbox', path: '#' },
    { icon: 'payments', label: 'Wallet', path: '#' },
    { icon: 'settings', label: 'Settings', path: '#' },
  ];

  const todaySchedule: Job[] = [
    {
      id: '1',
      title: 'Kitchen Faucet Repair',
      address: '452 Oak Avenue, Maplewood',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      status: 'Active',
    },
    {
      id: '2',
      title: 'Electrical Panel Inspection',
      address: '891 Pine Terrace, Suite 4',
      startTime: '11:15 AM',
      endTime: '12:45 PM',
      status: 'Confirmed',
    },
    {
      id: '3',
      title: 'HVAC Filter Replacement',
      address: '120 Riverdale Dr',
      startTime: '02:00 PM',
      endTime: '03:30 PM',
      status: 'Confirmed',
    },
  ];

  return (
    <DashboardLayout
      navItems={navItems}
      switchLabel="Switch to Customer"
      onSwitch={() => navigate('/customer')}
      userAvatar="https://lh3.googleusercontent.com/aida-public/AB6AXuAjpLVPoIGTa95MnukQDxDkwipVEdUK4tvywHaXPdLfsBuz3CBppL4xhrcd4KFx7IyKFsEu-oTQgItWCrfDH4bbmgdsr2QCzauPYzsV8wZKLoS5vzbTWRgaR7qArZjpW2aONOx3ZgYMLLFXtluy3RJqtRFqW9N8DAa82wW2MB-p2fuhghYyqMu-VvTCnd4FiH9L2t6YwTmaE9PKmeEJyHwaS8CYPJzieyrdiDjpoLKsPIPdIR6ioK-rCt_Vt9N59xHVs-Lu-F8U2DU"
      showStatusToggle
      isOnline={isOnline}
      onStatusToggle={() => setIsOnline(!isOnline)}
    >
      {/* Dashboard Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-md mb-lg">
        <div className="lg:col-span-8 flex flex-col justify-center">
          <h2 className="font-headline-lg text-headline-lg text-on-background mb-xs">Welcome back, Marcus</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-md">
            You have {todaySchedule.length} appointments scheduled for today. Your performance rating is up by 5% this week.
          </p>
        </div>
        <div className="lg:col-span-4 flex justify-end items-center gap-md">
          <div className="glass-card p-md rounded-xl flex-1 text-center">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Daily Earnings</p>
            <p className="font-headline-md text-headline-md text-primary">$284.50</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Schedule and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-md">
        {/* Today's Schedule */}
        <div className="lg:col-span-8 space-y-md">
          <div className="glass-card p-md rounded-xl">
            <div className="flex justify-between items-center mb-md">
              <h3 className="font-headline-md text-headline-md">Today's Schedule</h3>
              <button className="text-primary font-label-md hover:underline">View Calendar</button>
            </div>
            <div className="space-y-4">
              {todaySchedule.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>

        {/* Stats & Wallet */}
        <div className="lg:col-span-4 space-y-md">
          <WalletWidget balance="$3,429.00" weeklyEarnings="$1,240" />
          <EarningsChart />
        </div>
      </div>

      {/* Bottom Section: Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-md mt-lg">
        <div className="lg:col-span-12">
          <h3 className="font-headline-md text-headline-md mb-md">Quick Access</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
            <QuickAccessCard icon="reviews" title="Ratings" desc="Check your latest feedback and reviews." />
            <QuickAccessCard icon="support_agent" title="Support" desc="Get immediate help with a live task." />
            <QuickAccessCard icon="inventory_2" title="Inventory" desc="Manage your tools and supplies." />
            <QuickAccessCard icon="verified" title="Verification" desc="Update your licenses and insurance." />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProviderHomePage;
