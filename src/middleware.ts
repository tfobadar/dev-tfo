import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    req.nextUrl.pathname.startsWith('/fonts') ||
    req.nextUrl.pathname.startsWith('/images')
  ) {
    return;
  }

  // Early return if we are on a locale other than default
  if (req.nextUrl.locale !== 'default') {
    return;
  }

  if (req.nextUrl.locale === 'default') {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'ar';

    return NextResponse.redirect(
      new URL(
        `/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`,
        req.url,
      ),
    );
  }
}
