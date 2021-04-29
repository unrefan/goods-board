import {hash} from '../src/utils/hash.js';
import {isDevelopment} from '../src/utils/env';
import prisma from '../src/config/database';

async function main() {
	if (isDevelopment()) {
	  const local = await prisma.user.upsert({
			where: { email: 'dev@local.com' },
			update: {},
			create: {
			  email: 'dev@local.com',
			  name: 'Developer',
			  password: hash('password'),
			},
	  });

	  console.log({ local });
	}
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});