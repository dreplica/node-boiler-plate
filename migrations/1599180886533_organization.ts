/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("organization", {
        id: {
            type: "uuid",
            notNull: true,
            primaryKey:true,
            default:pgm.func("uuid_generate_v4()")
        },
        organization: {
            type: "VARCHAR(100)",
            notNull: true,
            comment:"this is the organizations name"
        },
        address: {
            type: "VARCHAR(200)",
            notNull:true,
        },
        ceo: {
            type: "VARCHAR(150)",
            notNull:true,
        },
        createdAt: {
            type: "timestamptz",
            notNull: true,
            default:pgm.func("current_timestamp")
        },
        updatedAt: {
            type: "timestamptz",
            notNull: true,
            default:pgm.func("current_timestamp")
        }
    })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("organization")
}
