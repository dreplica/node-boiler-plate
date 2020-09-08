/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
     pgm.createExtension("uuid-ossp", {
        ifNotExists: true,
    })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropExtension("uuid-ossp")

}
/* eslint-disable camelcase */
