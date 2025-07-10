import { boolean, integer, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { OrganisationTable } from "./organisation";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";


export const OrganisationUserSettingsTable = pgTable(
    "organisation_user_settings",
    {
        userId: varchar()
            .notNull()
            .references(() => UserTable.id),
        organisationId: varchar()
            .notNull()
            .references(() => OrganisationTable.id),
        newApplicationEmailNotifications: boolean().notNull().default(false),
        minimumRating: integer(),
        createdAt,
        updatedAt,
    },
    table => [primaryKey({ columns: [table.userId, table.organisationId] })]
)

export const organisationUserSettingsRelations = relations(
    OrganisationUserSettingsTable, 
    ({ one }) => ({
    user: one(UserTable, {
        fields: [OrganisationUserSettingsTable.userId],
        references: [UserTable.id]
    }),
    organisation: one(OrganisationTable, {
        fields: [OrganisationUserSettingsTable.organisationId],
        references: [OrganisationTable.id]
    })
}))