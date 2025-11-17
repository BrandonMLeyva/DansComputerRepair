import React from 'react'
import dayjs from 'dayjs';
import Link from 'next/link';
import { ClipboardList, UsersRound, Package, Settings as SettingsIcon } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import OrdersPanel from './OrdersPanel';

//creating a function to update status to Database
  export async function updateStatus(id, newStatus) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data ,error } = await supabase
      .from('Admin_Page_Order')
      .update({ Status: newStatus})
      .eq('ID', id);
    if (error) {
      console.error('Error updating status:', error);
    } else {
      console.log('Status updated successfully:');
    }
  }


export const metadata = {
  title: 'Dashboard',
  description: 'Admin dashboard'
}

//change the default to include async
export default async function DashboardPage() {
  // Ensure env vars exist to avoid 500 during local testing
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="mt-4 text-red-700">
          Missing Supabase environment variables. Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code>.env.local</code>, then restart the dev server.
        </p>
      </div>
    );
  }

  // connect to supabase once env is present
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);
  //Fetching data for the whole information Admin Data
  const { data: rows, error } = await supabase.from('Admin_Page_Order').select('*');
   if (error) console.error('Supabase error:', error);
  //Fetching total order
  const { count: totalOrder, error: totalOrderError } = await supabase.from('Admin_Page_Order').select('ID', { count: 'exact'});
  if (totalOrderError) console.error('Supabase error:', totalOrderError);
  //Fetching data for ongoing orders
  const { count: ongoingOrders, error: ongoingOrdersError } = await supabase.from('Admin_Page_Order').select('Status', { count: 'exact'}).eq('Status', 'In progress');
  if (ongoingOrdersError) console.error('Supabase error:', ongoingOrdersError);
  //Fetching data for completed orders
  const { count: completedOrders, error: completedOrdersError } = await supabase.from('Admin_Page_Order').select('Status', { count: 'exact'}).eq('Status', 'Completed');
  if (completedOrdersError) console.error('Supabase error:', completedOrdersError);
  console.log('Rows:', rows);

  return (
    <div className="flex min-h-screen">
      <aside className="w-[220px] py-8 px-4 bg-gray-300 text-black">
        <h2 className="mb-6 text-4xl">Dashboard</h2>
        <nav aria-label="Sidebar" className="flex flex-col gap-3">
          <button className="text-xl inline-flex items-center justify-center gap-2 hover:underline">
            <ClipboardList size={18} />
            <span>Orders</span>
          </button>
          <button className="text-xl inline-flex items-center justify-center gap-2 hover:underline">
            <UsersRound size={18} />
            <span>Customer</span>
          </button>
          <Link href="/admin-parts" className="text-xl inline-flex items-center justify-center gap-2 hover:underline">
            <Package size={18} />
            <span>Parts</span>
          </Link>
          <button className="text-xl inline-flex items-center justify-center gap-2 hover:underline">
            <SettingsIcon size={18} />
            <span>Settings</span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>

        <section className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          <div className="p-4 bg-gray-300 border border-black flex flex-col items-center justify-center rounded-xl shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-pink-300">
            <h3 className="text-gray-900">Total Orders</h3>
            <p className="text-2xl my-2 text-gray-900">{totalOrder}</p>
          </div>

          <div className="p-4 bg-gray-300 border border-black flex flex-col items-center justify-center rounded-xl shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-pink-300">
            <h3 className="text-gray-900">Ongoing</h3>
            <p className="text-2xl my-2 text-gray-900">{ongoingOrders}</p>
            <p className="text-gray-900">Open support tickets</p>
          </div>

          <div className="p-4 bg-gray-300 border border-black flex flex-col items-center justify-center rounded-xl shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-pink-300">
            <h3 className="text-gray-900">Completed</h3>
            <p className="text-2xl my-2 text-gray-900">{completedOrders}</p>
            <p className="text-gray-900">job(s)</p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">Orders</h2>
          <OrdersPanel rows={rows ?? []}  updateStatus={updateStatus}/>
        </section>

      </main>
    </div>
  )
}
