import { z } from "zod";

export type Value = Readonly<{
  color: string;
}>;

const valueSchema: z.Schema<Value | null> = z.object({
  color: z.string(),
}).nullable();

export const parseValue = (input: string | null): Value | null | "invalidValue" => {
  try {
    const parsedValue = valueSchema.safeParse(JSON.parse(input ?? "null"));

    return parsedValue.success ? parsedValue.data : "invalidValue";
  }
  catch (e) {
    return "invalidValue";
  }
};
