import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { JobListingTable } from "./jobListing";
import { OrganisationUserSettingsTable } from "./organisationUserSettings";

export const OrganisationTable = pgTable("organisations", {
    id: varchar().primaryKey(),
    name: varchar().notNull(),
    imageUrl: varchar(),
    createdAt,
    updatedAt,
})

export const OrganisationTableRelations = relations(
    OrganisationTable, 
    ({ many }) => ({
    job_listings: many(JobListingTable),
    organisationUserSettings: many(OrganisationUserSettingsTable)
}))