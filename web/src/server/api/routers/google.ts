import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import axios from "axios";

import { env } from "@/env.mjs";

export const googleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  rating: publicProcedure
    .input(z.object({ message: z.string() }))
    .query(async ({ input }) => {
      const url = `${env.RATING_URL}/rating?message=${input.message}`;
      const res = await axios.get(url);
      console.log(res.data);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res.data;
    }),
  search: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(({ input }) => {
      const url =
        "https://www.google.com/maps/embed/v1/place?key=" +
        env.GMAP_KEY +
        "&q=" +
        input.search;
      return url;
    }),
  route: publicProcedure
    .input(z.object({ origin: z.string(), destination: z.string() }))
    .query(async ({ input }) => {
      const res = await axios.get(
        `http://anmolmunnolli.pythonanywhere.com/route?origin=${input.origin}&destination=${input.destination}`
      );
      const maplink = res.data as string;
      const queryI = maplink.indexOf("&origin");
      const query = maplink.slice(queryI);
      const url =
        "https://www.google.com/maps/embed/v1/directions?key=" +
        env.GMAP_KEY +
        query;

      return url;
    }),
  ride: publicProcedure
    .input(z.object({ origin: z.string() }))
    .query(async ({ input }) => {
      const res = await axios.get(
        `http://anmolmunnolli.pythonanywhere.com/ride?origin=${input.origin}`
      );
      const maplink = res.data as string;
      const queryI = maplink.indexOf("&origin");
      const query = maplink.slice(queryI);
      const url =
        "https://www.google.com/maps/embed/v1/directions?key=" +
        env.GMAP_KEY +
        query;

      return url;

      return query;
    }),
  chats: publicProcedure
    .input(
      z.object({
        chats: z.array(z.string()),
      })
    )
    .query(async ({ ctx, input }) => {
      const res = input.chats.map((v) => {
        return axios.get(
          `https://translate.google.com/m?sl=en&tl=hi&q=${v.replaceAll(
            " ",
            "+"
          )}&hl=en`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      });

      const resData = await Promise.all(res);

      const finalRes = resData.map((v) => {
        const htmlStr = v.data as string;
        const resultI = htmlStr.indexOf('<div class="result-container">');
        const restStr = htmlStr.slice(resultI + 30);
        const closingDivI = restStr.indexOf("</div>");
        const finalStr = restStr.slice(0, closingDivI);
        return finalStr;
      });

      return finalRes;
    }),
});
