import { createClient } from '@supabase/supabase-js'

// check your SUPABASE_SERVICE_ROLE_KEY in your environment 
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  try {
    // Read raw request body first so we can handle/diagnose invalid or empty JSON
    const contentType = req.headers.get('content-type') || ''
    const raw = await req.text()

    if (!raw) {
      console.error('Empty request body received for /api/config')
      return new Response(JSON.stringify({ error: 'Empty request body' }), { status: 400 })
    }

    let body
    try {
      // prefer JSON.parse so we can catch and report parse errors
      body = JSON.parse(raw)
    } catch (parseErr) {
      console.error('Invalid JSON received for /api/config:', parseErr, 'raw:', raw)
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 })
    }

    // Log received payload for debugging
    console.log('Received body for /api/config:', body)

    // helper to normalize empty strings/undefined/null to actual null
    const toNull = (v) => (v === undefined || v === null || v === '') ? null : v

    // Basic mapping from incoming payload to DB columns (normalize values)
    const row = {
      name: toNull(body.name),
      phone: toNull(body.phone),
      email: toNull(body.email),
      budget_range: toNull(body.budgetRange),
      intended_use: toNull(body.intendedUse),
      cpu: toNull(body.cpu),
      gpu: toNull(body.gpu),
      motherboard: toNull(body.motherboard),
      memory: toNull(body.memory),
      storage: toNull(body.storage),
      psu: toNull(body.psu),
      case: toNull(body.case),
      cooling: toNull(body.cooling),
      operating_system: toNull(body.operatingSystem),
      networking: toNull(body.networking),
      other_requests: toNull(body.otherRequests),
    }

    console.log('Prepared DB row for insert:', row)

  const { data, error } = await supabase.from('Configuration_Form').insert([row]).select().single()

    if (error) {
      console.error('Supabase insert error', error)
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }

    return new Response(JSON.stringify(data), { status: 201, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
}
