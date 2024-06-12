import { jwtDecode } from 'jwt-decode';
import  { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getNewTokenRefresh } from './app/services/generateNewToken';
import { isValidJSON } from '@feenanceiro/utils';


export async function middleware(request: NextRequest) {
	const tokenCookie = request.cookies.get('token_fee')?.value ?? '';

	if (!tokenCookie || !isValidJSON(tokenCookie)) {
		return NextResponse.redirect(new URL('/login', request.url));
	} else {
		const { token } = JSON.parse(tokenCookie);
		const decoded = jwtDecode(token);
		const currentDate = new Date();

		if (decoded.exp && decoded.exp * 1000 < currentDate.getTime()) {
			const newToken = await getNewTokenRefresh();

			if (!newToken.token){
				NextResponse.redirect(new URL('/login', request.url));
			}

			const redirect = NextResponse.next();

			redirect.headers.set(
				"Set-Cookie",
				`token_fee=${JSON.stringify(newToken)}; HttpOnly; Path=/; SameSite=None;`
			);

			return redirect;
		} else {
			return NextResponse.next();
		}
	}
}

export const config = {
	matcher: '/app/:path*',
}
