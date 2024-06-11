import { sign } from 'jsonwebtoken';

function generateToken(uuid: string, email: string){
	const token = sign(
		{
			uuid,
			email,
		},
		`${process.env.APP_JWT_PRIVATE}`,
		{expiresIn: '1m'}
	);

	return token;
}

export { generateToken };
