import { z } from "zod";

export const ZUserType = z.enum(["DRIVER", "USER"]);

export const ZUser = z
  .object({
    username: z.string(),
    fullname: z.string(),
    type: ZUserType,
  })
  .strict();
