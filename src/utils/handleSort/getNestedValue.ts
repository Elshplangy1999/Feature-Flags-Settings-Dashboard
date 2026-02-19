export const getNestedValue = <T extends Record<string, unknown>>(
  obj: T,
  path: string
): unknown => {
  return path.split(".").reduce<unknown>((acc: unknown, part: string) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
};