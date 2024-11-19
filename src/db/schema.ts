import { analysisDataType } from "@/schemas/openai-vision";
import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  analysis: many(analysis),
  photos: many(photos),
  payments: many(payments),
}));

export const accounts = pgTable(
  "account",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    pk: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const verificationTokens = pgTable(
  "verification_token",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const gender = pgEnum("gender", ["male", "female"]);

export const analysis = pgTable("analysis", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  analysisData: jsonb("analysis_data").$type<analysisDataType>(),
  height: varchar("height", { length: 5 }),
  weight: varchar("weight", { length: 5 }),
  gender: gender("gender"),
  name: varchar("name", { length: 60 }),
  showImages: boolean("show_images").default(true),
  instagram: varchar("instagram", { length: 30 }),
  isCompleted: boolean("is_completed").default(false),
  isPaid: boolean("is_paid").default(false),
  isNsfw: boolean("is_nsfw").default(false),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const analysisRelations = relations(analysis, ({ one, many }) => ({
  user: one(users, {
    fields: [analysis.userId],
    references: [users.id],
  }),
  photos: many(photos),
  payments: one(payments),
}));

export const photos = pgTable("photo", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  image: text("image_id").notNull(),
  analysisId: uuid("analysis_id").references(() => analysis.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const photosRelations = relations(photos, ({ one }) => ({
  user: one(users, {
    fields: [photos.userId],
    references: [users.id],
  }),
  analysis: one(analysis, {
    fields: [photos.analysisId],
    references: [analysis.id],
  }),
}));

export const payments = pgTable("payment", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "no action" }),
  analysisId: uuid("analysis_id")
    .notNull()
    .references(() => analysis.id, { onDelete: "no action" }),
  status: text("status").notNull(),
  customerId: text("customer_id").notNull(),
  refundedAt: timestamp("refunded_at", { mode: "string" }),
  refunded: boolean("refunded").default(false),
  orderNumber: text("order_number").notNull(),
  orderId: text("order_id").notNull(),
  total: integer("total").notNull(),
  totalFormatted: text("total_formatted").notNull(),
  receiptUrl: text("receipt_url").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerName: text("customer_name").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }),
  updatedAt: timestamp("updated_at", { mode: "string" }),
});

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
  analysis: one(analysis, {
    fields: [payments.analysisId],
    references: [analysis.id],
  }),
}));
