import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

/** Sanity calls this webhook after each publish so new articles and videos appear at once. */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) return NextResponse.json({ message: 'SANITY_REVALIDATE_SECRET is not set' }, { status: 500 })
  const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret)
  if (!isValidSignature) return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
  revalidatePath('/', 'layout')
  return NextResponse.json({ revalidated: true, type: body?._type ?? null })
}
