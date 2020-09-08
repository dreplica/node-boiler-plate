import { checkPostSchema } from '../config/validator';
import database from '../model/pg-config';
import { POST, GETREQUEST, RESULT } from '../config';
import joi, { ValidationError } from 'joi';

const { sql } = database;

export default class Request {
	constructor() {}

	async get() {
		try {
			const result: GETREQUEST[] = await sql` 
				SELECT org.organization,org.id, org.address,org.ceo,emp.employee,prod.product
                FROM organization org
                JOIN  employees emp 
                ON emp.organizationid = org.id
                JOIN products prod
				ON emp.organizationid = prod.organizationid
				`;

			const data = result.map((item) => {
				item.employee = (item.employee as string).split(',');
				item.product = (item.product as string).split(',');
				item.totalEmployees = item.employee.length;
				return item;
			});

			return { data: data, code: 200 };
		} catch (error) {
			return { error: "sorry couldn't retrieve data" + error, code: 400 };
		}
	}

	async post(post: POST): Promise<{ data?: GETREQUEST } & RESULT> {
		try {
			const { value: item, error }: { value: POST; error?: ValidationError } = checkPostSchema.validate(post);

			if (error) throw new Error(error.message);
			const checkName = await sql`SELECT organization FROM organization WHERE organization=${item.organization}`;

			if (checkName.length) throw new Error('Sorry user already exist');

			const [ organization ] = await sql`INSERT INTO organization VALUES(uuid_generate_v4(), 
			${item.organization},${item.ceo},${item.address}) Returning *`;

			const [ { employee: employ } ] = await sql`INSERT INTO employees VALUES(uuid_generate_v4(),
			${organization.id}, ${item.employees.join(',')}) Returning *`;

			const [ { product: prod } ] = await sql`INSERT INTO products VALUES(uuid_generate_v4(),
			${organization.id}, ${item.products.join(',')}) Returning *`;
			const employees: string[] = employ.split(',');
			const products: string[] = prod.split(',');

			return {
				data: {
					...organization,
					employees,
					totalEmployees: employees.length,
					products
				},
				code: 200
			};
		} catch (error) {
			return { error: error.message, code: 404 };
		}
	}

	async put() {}

	async delete(id: string) {
		try {
			const idSchema = joi.object<{ id: string }>({
					id: joi.string().guid({ version: 'uuidv4' })
				})
				.validate({ id });

			const { value, error } = idSchema;
			if (error) throw new Error("sorry couldn't delete");

			sql`DELETE FROM organization WHERE id=${value.id}`;

			return { data: 'item deleted', code: 200 };
		} catch (error) {
			return { error: error.message, code: 404 };
		}
	}
}
