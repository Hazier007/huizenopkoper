'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  FileText,
  User,
  LogOut,
  CreditCard,
  AlertTriangle,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface BuyerNavProps {
  buyer: {
    id: string;
    email: string;
    company_name: string | null;
    credits_balance: number;
    low_credit_threshold: number;
  };
}

export default function BuyerNav({ buyer }: BuyerNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Fout bij uitloggen');
    } else {
      router.push('/inkoper/login');
      router.refresh();
    }
  };

  const isLowCredit = buyer.credits_balance <= buyer.low_credit_threshold;

  const navItems = [
    {
      href: '/inkoper/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/inkoper/leads',
      label: 'Leads',
      icon: FileText,
    },
    {
      href: '/inkoper/profiel',
      label: 'Profiel',
      icon: User,
    },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/inkoper/dashboard" className="font-bold text-xl text-blue-600">
              Inkoper Portal
            </Link>
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <Badge
                variant={isLowCredit ? 'destructive' : 'default'}
                className={!isLowCredit ? 'bg-green-500' : ''}
              >
                {buyer.credits_balance} credits
              </Badge>
              {isLowCredit && (
                <AlertTriangle className="h-4 w-4 text-red-500" />
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Uitloggen
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
