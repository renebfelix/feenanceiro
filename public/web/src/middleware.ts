import  { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isValidJSON } from '@feenanceiro/utils';


export async function middleware(request: NextRequest) {
	const tokenCookie = request.cookies.get('token_fee')?.value ?? '';

	if (!tokenCookie || !isValidJSON(tokenCookie)) {
		return NextResponse.redirect(new URL('/login', request.url));
	} else {
		return NextResponse.next();
	}
}

export const config = {
	matcher: '/app/:path*',
}
