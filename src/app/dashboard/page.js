import React from 'react'
import dayjs from 'dayjs';
import { createClient } from '@supabase/supabase-js';


export const metadata = {
  title: 'Dashboard',
  description: 'Admin dashboard'
}
//change the default to include async
export default async function DashboardPage() {
  // trying to connec to supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
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
  //Maybe fetching for current month, unknow but for now it based on the user current month?
  const currentMonth = dayjs().format('MMM');
  console.log('Rows:', rows);

  // small inline status badge components
  function StatusBadge({ status }) {
    const key = String(status || '').toLowerCase();
    const styles = {
      display: 'inline-block',
      padding: '6px 10px',
      borderRadius: 6,
      fontWeight: 600,
    }

    if (key.includes('pending')) {
      return <span style={{ ...styles, background: '#e5e7eb', color: '#111' }}>{status}</span>
    }

    if (key.includes('in progress') || key.includes('in-progress') || key.includes('progress')) {
      return <span style={{ ...styles, background: '#bbf7d0', color: '#064e3b' }}>{status}</span>
    }

    // default / completed
    return <span style={{ ...styles, background: '#bfdbfe', color: '#0b3d91' }}>{status}</span>
  }

  return (
    <div style={{display: 'flex', minHeight: '100vh', fontFamily: 'Inter, system-ui, Arial'}}>
      <aside style={{width: 220, padding: '2rem 1rem', background: '#D9D9D9', color: '#000000ff'}}>
        <h2 style={{margin: 0, marginBottom: '1.5rem', fontSize: '1.25rem'}}>Dashboard</h2>
        <nav aria-label="Sidebar" style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
          <button style={{background: 'transparent', border: 'none', color: 'inherit', textAlign: 'left', padding: 0, cursor: 'pointer'}}>Orders</button>
          <button style={{background: 'transparent', border: 'none', color: 'inherit', textAlign: 'left', padding: 0, cursor: 'pointer'}}>Customer</button>
          <button style={{background: 'transparent', border: 'none', color: 'inherit', textAlign: 'left', padding: 0, cursor: 'pointer'}}>Reports</button>
          <button style={{background: 'transparent', border: 'none', color: 'inherit', textAlign: 'left', padding: 0, cursor: 'pointer'}}>Settings</button>
        </nav>
      </aside>

      <main style={{flex: 1, padding: '2rem'}}>
        <h1 style={{marginBottom: '1rem', fontSize: '2rem', fontWeight: 600}}>Dashboard</h1>

        <section style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
          <div style={{padding: '1rem', borderRadius: 0, background: '#D9D9D9', border: '1px solid #000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <h3 style={{margin: 0, color: '#111'}}>Total Orders</h3>
            <p style={{fontSize: '1.5rem', margin: '0.5rem 0', color:'#111'}}>{totalOrder}</p>
          </div>

          <div style={{padding: '1rem', borderRadius: 0, background: '#D9D9D9', border: '1px solid #000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <h3 style={{margin: 0, color: '#111'}}>Ongoing</h3>
            <p style={{fontSize: '1.5rem', margin: '0.5rem 0', color: '#111'}}>{ongoingOrders}</p>
            <p style={{margin: 0, color: '#111'}}>Open support tickets</p>
          </div>

          <div style={{padding: '1rem', borderRadius: 0, background: '#D9D9D9', border: '1px solid #000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <h3 style={{margin: 0, color: '#111'}}>Completed</h3>
            <p style={{fontSize: '1.5rem', margin: '0.5rem 0', color: '#111'}}>{completedOrders}</p>
            <p style={{margin: 0, color: '#111'}}>jobs</p>
          </div>

          <div style={{padding: '1rem', borderRadius: 0, background: '#D9D9D9', border: '1px solid #000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <h3 style={{margin: 0, color: '#111'}}>Month</h3>
            <p style={{fontSize: '1.5rem', margin: '0.5rem 0', color: '#111'}}>{currentMonth}</p>
          </div>

        </section>

        <section style={{marginTop: '2rem'}}>
          <h2 style={{fontSize: '1.5rem', fontWeight: 600 }}>Orders</h2>
          <div style={{color: '#111', background: '#f3f4f6', padding: '1rem', borderRadius: 0}}>
            <div style={{maxHeight: '400px',overflowY: 'auto'}}>
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{textAlign: 'left', borderBottom: '2px solid #e5e7eb'}}>
                  <th style={{padding: '0.5rem 0'}}>ID</th>
                  <th style={{padding: '0.5rem 0'}}>Customer</th>
                  <th style={{padding: '0.5rem 0'}}>Status</th>
                  <th style={{padding: '0.5rem 0'}}>Date</th>
                  <th style={{padding: '0.5rem 0'}}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {rows?.map((row, index) => (
                  <tr key={index} >
                    <td style={{color: '#111',padding: '0.75rem 0'}}>{row.ID}</td>
                    <td style={{color: '#111',padding: '0.75rem 0'}}>{row.Customer}</td>
                    <td style={{color: '#111',padding: '0.75rem 0'}}><StatusBadge status={row.Status} /></td>
                    <td style={{color: '#111',padding: '0.75rem 0'}}>{dayjs(row.Dates).format('MMM DD YYYY')}</td>
                    <td style={{color: '#111',padding: '0.75rem 0'}}>{row.Notes}</td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          </div>
        </section>
        <div style={{marginTop: '1.25rem'}}>
            <h3 style={{margin: 0, fontSize: '1.25rem', fontWeight: 600}}>Notifications</h3>
            <p style={{marginTop: '0.5rem', color: '#6b7280'}}>Sara needs to follow up on the battery replacement.</p>
            <h3 style={{margin: 0, fontSize: '1.25rem', fontWeight: 600}}>Reminders</h3>
            <p style={{marginTop: '0.5rem', color: '#6b7280'}}>Mark needs to check the status of the screen repair</p>
        </div>
      </main>
    </div>
  )
}
