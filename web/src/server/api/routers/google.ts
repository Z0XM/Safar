import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import axios from "axios";

import { env } from "@/env.mjs";

import FormData from "form-data";

export const googleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  // rating: publicProcedure
  //   .input(z.object({ message: z.string() }))
  //   .query(async ({ input }) => {
  //     const url = `${env.RATING_URL}/rating?message=${input.message}`;
  //     const res = await axios.get(url);
  //     console.log(res.data);
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //     return res.data;
  //   }),
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
        `${env.PYTHON_URL}/route?origin=${input.origin}&destination=${input.destination}`
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
        `${env.PYTHON_URL}/ride?origin=${input.origin}`
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
        language: z.enum([
          "Hindi",
          "Punjabi",
          "Gujarati",
          "Marathi",
          "Kannada",
        ]),
      })
    )
    .query(async ({ ctx, input }) => {
      // const res = input.chats.map((v) => {
      //   return axios.get(
      //     `https://translate.google.com/m?sl=en&tl=hi&q=${v.replaceAll(
      //       " ",
      //       "+"
      //     )}&hl=en`,
      //     {
      //       headers: {
      //         "Access-Control-Allow-Origin": "*",
      //       },
      //     }
      //   );
      // });

      // const resData = await Promise.all(res);

      // const finalRes = resData.map((v) => {
      //   const htmlStr = v.data as string;
      //   const resultI = htmlStr.indexOf('<div class="result-container">');
      //   const restStr = htmlStr.slice(resultI + 30);
      //   const closingDivI = restStr.indexOf("</div>");
      //   const finalStr = restStr.slice(0, closingDivI);
      //   return finalStr;
      // });

      // return finalRes;

      // const formData = new FormData();
      // formData.append("data", "Hello;Hindi");

      // const res = await axios.post(
      //   "https://app.aimarketplace.co/api/models/english-to-indic-langauge-translation-92a1db65/versions/d6a04955-a76b-4a8a-b1c3-471a9a3dab05/predict/",
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       Authorization: `Api-Key ${env.AI_MARKETPLACE_API_KEY}`,
      //       ...formData.getHeaders(),
      //     },
      //   }
      // );

      const data = new FormData();
      // console.log(input.chats.join(" ~ ") + ";" + input.language);
      data.append("data", input.chats.join(" @# ") + ";" + input.language);
      console.log(input.chats.join(" @# ") + ";" + input.language);

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://app.aimarketplace.co/api/marketplace/models/7379faf5-f25a-411e-91b8-a7db9ec2506a/predict/",
        headers: {
          Authorization: "Api-Key T1INms4V.1IqgtxbyIa7OH5xaQsHBEg7W7GrGX5D7",
          Cookie: "auth=0",
          ...data.getHeaders(),
        },
        data: data,
      };

      const res = await axios.request(config);

      const resData = res.data;

      console.log(resData);

      if ("response" in resData) {
        const translations = (resData.response as string).split("@#");
        console.log(translations);
        return translations;
      }
      console.log(input.chats);
      return input.chats;
    }),
});
