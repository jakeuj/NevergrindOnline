import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const sourcePageSchema = z.object({
  file: z.string(),
  title: z.string(),
  url: z.string().url(),
  lastModified: z.string().optional(),
});

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        sourcePages: z.array(sourcePageSchema).default([]),
        reviewedAt: z.string(),
        sourceLastModified: z.string(),
        status: z.string(),
      }),
    }),
  }),
};
