import { z } from "zod";

export const pickCategoryRegionSchema = z.object({
  category_id: z.string().uuid(),
  region_id: z.string().uuid(),
});

export type PickCategoryRegionType = z.infer<typeof pickCategoryRegionSchema>;
