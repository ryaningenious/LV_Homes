/* eslint-disable @typescript-eslint/no-explicit-any */
export function transformObject(data: any): Record<string, any> {
  const transformed: Record<string, any> = {};

  for (const key in data) {
    if (data[key] && typeof data[key] === "object" && "value" in data[key]) {
      transformed[key] = data[key].value;
    }
  }

  return transformed;
}
