import { NextResponse } from 'next/server'
import { getServerSupabase } from '@/lib/supabaseServer'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { type, product_id, warehouse_id, qty, user_id, note } = body

    if (!type || !product_id || !warehouse_id || qty === undefined || qty === null) {
      return NextResponse.json({ ok: false, message: 'missing fields' }, { status: 400 })
    }

    const supabase = getServerSupabase()
    const { data, error } = await supabase.rpc('change_stock', {
      p_type: type,
      p_product: product_id,
      p_warehouse: warehouse_id,
      p_qty: qty,
      p_user: user_id,
      p_note: note || ''
    })

    if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 400 })
    const result = Array.isArray(data) ? data[0] : data
    if (!result.success) return NextResponse.json({ ok: false, message: result.err || 'failed' }, { status: 400 })
    return NextResponse.json({ ok: true, final_qty: result.final_qty })
  } catch (err: any) {
    return NextResponse.json({ ok: false, message: err.message }, { status: 500 })
  }
}
