import React from 'react'

export const metadata = {
  title: 'Dashboard',
  description: 'Admin dashboard'
}

export default function DashboardPage() {
  // small inline status badge component
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
            <h3 style={{margin: 0}}>Total Orders</h3>
            <p style={{fontSize: '1.5rem', margin: '0.5rem 0'}}>25</p>
          </div>

          <div style={{padding: '1rem', borderRadius: 0, background: '#D9D9D9', border: '1px solid #000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <h3 style={{margin: 0}}>Ongoing</h3>
            <p style={{fontSize: '1.5rem', margin: '0.5rem 0'}}>5</p>
            <p style={{margin: 0, color: '#6b7280'}}>Open support tickets</p>
          </div>

          <div style={{padding: '1rem', borderRadius: 0, background: '#D9D9D9', border: '1px solid #000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <h3 style={{margin: 0}}>Completed</h3>
            <p style={{fontSize: '1.5rem', margin: '0.5rem 0'}}>18</p>
            <p style={{margin: 0, color: '#6b7280'}}>jobs</p>
          </div>

          <div style={{padding: '1rem', borderRadius: 0, background: '#D9D9D9', border: '1px solid #000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <h3 style={{margin: 0}}>Month</h3>
            <p style={{fontSize: '1.5rem', margin: '0.5rem 0'}}>October</p>
          </div>

        </section>

        <section style={{marginTop: '2rem'}}>
          <h2 style={{fontSize: '1.5rem', fontWeight: 600}}>Orders</h2>
          <div style={{background: '#f3f4f6', padding: '1rem', borderRadius: 0}}>
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
                  <td style={{padding: '0.75rem 0'}}>#001</td>
                  <td style={{padding: '0.75rem 0'}}>Tony C</td>
                  <td style={{padding: '0.75rem 0'}}><StatusBadge status="Completed" /></td>
                  <td style={{padding: '0.75rem 0'}}>2025-10-15</td>
                  <td style={{padding: '0.75rem 0'}}>Replaced battery</td>
                </tr>
                <tr style={{borderBottom: '1px solid #eaeaea'}}>
                  <td style={{padding: '0.75rem 0'}}>#002</td>
                  <td style={{padding: '0.75rem 0'}}>Jackie</td>
                  <td style={{padding: '0.75rem 0'}}><StatusBadge status="In progress" /></td>
                  <td style={{padding: '0.75rem 0'}}>2025-10-16</td>
                  <td style={{padding: '0.75rem 0'}}>Screen repair</td>
                </tr>
                <tr>
                  <td style={{padding: '0.75rem 0'}}>#003</td>
                  <td style={{padding: '0.75rem 0'}}>Jackie</td>
                  <td style={{padding: '0.75rem 0'}}><StatusBadge status="Pending" /></td>
                  <td style={{padding: '0.75rem 0'}}>2025-10-17</td>
                  <td style={{padding: '0.75rem 0'}}>Diagnostics</td>
                </tr>
                <tr>
                  <td style={{padding: '0.75rem 0'}}>#004</td>
                  <td style={{padding: '0.75rem 0'}}>Mike</td>
                  <td style={{padding: '0.75rem 0'}}><StatusBadge status="In progress" /></td>
                  <td style={{padding: '0.75rem 0'}}>2025-10-17</td>
                  <td style={{padding: '0.75rem 0'}}>Data recovery</td>
                </tr>
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
