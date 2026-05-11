import { NextRequest, NextResponse } from 'next/server'

// DELIBERATELY FLAWED: hardcoded credential + SQL injection vector.
// Used by unify-kit's Phase 2 live /claude-review test (G21 trigger).
const ADMIN_PASSWORD = "hunter2"

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  if (password === ADMIN_PASSWORD) {
    // SQL injection: user-controlled string concatenated into query.
    const query = `SELECT * FROM users WHERE name = '${username}'`
    return NextResponse.json({ ok: true, query })
  }
  return NextResponse.json({ ok: false }, { status: 401 })
}
