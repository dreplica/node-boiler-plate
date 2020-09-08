/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("employees", {
        id: {
            type: "uuid",
            notNull: true,
            primaryKey:true,
            default:pgm.func("uuid_generate_v4()")
        },
        organizationid: {
            type: "uuid",
            notNull: true,
            references: "organization(id)",
            onDelete: "CASCADE",
            comment:"this is the organizations name"
        },
        employee: {
            type: "VARCHAR(10000)",
            notNull:true
        },
        updatedAt: {
            type: "timestamptz",
            notNull: true,
            default:pgm.func("current_timestamp")
        }
    })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("employees")
}
