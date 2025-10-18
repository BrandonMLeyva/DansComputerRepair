import React from 'react'

export const metadata = {
  title: 'Dashboard',
  description: 'Admin dashboard'
}

export default function DashboardPage() {
  return (
    <div style={{display: 'flex', minHeight: '100vh', fontFamily: 'Inter, system-ui, Arial'}}>
      <aside style={{width: 220, padding: '2rem 1rem', background: '#0f172a', color: '#fff'}}>
        <h2 style={{margin: 0, marginBottom: '1.5rem', fontSize: '1.25rem'}}>Dashboard</h2>
        <nav aria-label="Sidebar" style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
          <button style={{background: 'transparent', border: 'none', color: 'inherit', textAlign: 'left', padding: 0, cursor: 'pointer'}}>Orders</button>
          <button style={{background: 'transparent', border: 'none', color: 'inherit', textAlign: 'left', padding: 0, cursor: 'pointer'}}>Customer</button>
          <button style={{background: 'transparent', border: 'none', color: 'inherit', textAlign: 'left', padding: 0, cursor: 'pointer'}}>Reports</button>
          <button style={{background: 'transparent', border: 'none', color: 'inherit', textAlign: 'left', padding: 0, cursor: 'pointer'}}>Settings</button>
        </nav>
      </aside>

      <main style={{flex: 1, padding: '2rem'}}>
        <h1 style={{marginBottom: '1rem'}}>Dashboard</h1>

        <section style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
          <div style={{padding: '1rem', borderRadius: 8, background: '#f3f4f6'}}>
            <h3 style={{margin: 0}}>Total Orders</h3>
            <p style={{fontSize: '1.5rem', margin: '0.5rem 0'}}>12</p>
            <p style={{margin: 0, color: '#6b7280'}}>Active users this month</p>
          </div>

          <div style={{padding: '1rem', borderRadius: 8, background: '#f3f4f6'}}>
            <h3 style={{margin: 0}}>Ongoing</h3>
            <p style={{fontSize: '1.5rem', margin: '0.5rem 0'}}>8</p>
            <p style={{margin: 0, color: '#6b7280'}}>Open support tickets</p>
          </div>

          <div style={{padding: '1rem', borderRadius: 8, background: '#f3f4f6'}}>
            <h3 style={{margin: 0}}>'Completed'</h3>
            <p style={{fontSize: '1.5rem', margin: '0.5rem 0'}}>$3,240</p>
            <p style={{margin: 0, color: '#6b7280'}}>This month's earnings</p>
          </div>

          <div style={{padding: '1rem', borderRadius: 8, background: '#f3f4f6'}}>
            <h3 style={{margin: 0}}>'Month'</h3>
            <p style={{fontSize: '1.5rem', margin: '0.5rem 0'}}>October</p>
            <p style={{margin: 0, color: '#6b7280'}}>This month's earnings</p>
          </div>


        </section>

        <section style={{marginTop: '2rem'}}>
          <h2>Orders</h2>
          <div style={{overflowX: 'auto'}}>
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
                <tr style={{borderBottom: '1px solid #eaeaea'}}>
                  <td style={{padding: '0.75rem 0'}}>#1001</td>
                  <td style={{padding: '0.75rem 0'}}>Jane Doe</td>
                  <td style={{padding: '0.75rem 0'}}>Completed</td>
                  <td style={{padding: '0.75rem 0'}}>2025-10-15</td>
                  <td style={{padding: '0.75rem 0'}}>Replaced battery</td>
                </tr>
                <tr style={{borderBottom: '1px solid #eaeaea'}}>
                  <td style={{padding: '0.75rem 0'}}>#1002</td>
                  <td style={{padding: '0.75rem 0'}}>Mark Smith</td>
                  <td style={{padding: '0.75rem 0'}}>In progress</td>
                  <td style={{padding: '0.75rem 0'}}>2025-10-16</td>
                  <td style={{padding: '0.75rem 0'}}>Screen repair</td>
                </tr>
                <tr>
                  <td style={{padding: '0.75rem 0'}}>#1003</td>
                  <td style={{padding: '0.75rem 0'}}>Alex Johnson</td>
                  <td style={{padding: '0.75rem 0'}}>Pending</td>
                  <td style={{padding: '0.75rem 0'}}>2025-10-17</td>
                  <td style={{padding: '0.75rem 0'}}>Diagnostics</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <div style={{marginTop: '1.25rem'}}>
            <h3 style={{margin: 0}}>Order notes & follow-ups</h3>
            <p style={{marginTop: '0.5rem', color: '#6b7280'}}>Maybe a list here.</p>
        </div>
      </main>
    </div>
  )
}
