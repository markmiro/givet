import { z } from "zod";

const employeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  managerId: z.string(),
});
export type Employee = z.infer<typeof employeeSchema>;

const managerSchema = z.object({
  id: z.string(),
  name: z.string(),
  // employees: z.array(employeeSchema),
});
export type Manager = z.infer<typeof managerSchema>;

const personSchema = z.union([managerSchema, employeeSchema]);
export type Person = z.infer<typeof personSchema>;

const industrySchema = z.enum(["IT", "Healthcare"]);
export type Industry = z.infer<typeof industrySchema>;

export const companySchema = z.object({
  name: z.string(),
  industry: industrySchema,
  people: z.array(personSchema),
  productCount: z.number(),
});
export type Company = z.infer<typeof companySchema>;
