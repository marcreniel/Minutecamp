
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),

coursesCompleted: defineTable({
    userId: v.string(),
    numCompleted: v.int64(),
    courseList: v.array(v.string()),
  }).index("by_token", ["tokenIdentifier"]),
});