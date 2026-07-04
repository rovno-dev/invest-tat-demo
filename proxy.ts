import { NextResponse, NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || "";

  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.includes('.') ||
    url.pathname.startsWith('/fake-api')
  ) {
    return NextResponse.next();
  }


  const isFakeApiSubdomain = hostname.startsWith('fake-api.');
  if (url.pathname.startsWith('/FAKE-API') && !isFakeApiSubdomain) {
    return NextResponse.rewrite(new URL('/404', req.url));
  }
  if (isFakeApiSubdomain) {
    return NextResponse.rewrite(new URL('FAKE-API/', req.url));
  }
}
