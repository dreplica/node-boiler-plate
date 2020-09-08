import postgres from 'postgres'; 

const sql = postgres(process.env.DATABASE_URL);

async function approveDB() {
	try {
		console.log('database connecting');
        
		const val = await sql`SELECT 1=1`;
		console.log('database finally connected', val);
	} catch (error) {
		console.log('error :>> ', error);
		process.exit(1)
	}
}

export default { approveDB,  sql };
