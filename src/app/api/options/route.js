import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const allowed = {
  cpu: 'cpus',
  gpu: 'gpus',
  motherboard: 'motherboards',
  memory: 'memories',
  storage: 'storages',
  psu: 'psus',
  case: 'cases',
  cooling: 'coolings',
  operating_system: 'operating_systems',
  networking: 'networkings',
}

export async function GET(req) {
  try {
    const url = new URL(req.url)
    const type = url.searchParams.get('type')
    if (!type || !allowed[type]) {
      return new Response(JSON.stringify({ error: 'invalid or missing type parameter' }), { status: 400 })
    }

    const table = allowed[type]
    const { data, error } = await supabase.from(table).select('*').order('name', { ascending: true })
    if (error) {
      console.error('Supabase options query error', error)
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }

    return new Response(JSON.stringify({ data }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
}
