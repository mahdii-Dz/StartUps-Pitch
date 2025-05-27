"use server";

import { auth } from "@/auth";
import slugify from "slugify";
import { Parse } from "./utils";
import { writeClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";

export const CreatePitch = async (state, form, pitch) => {
  const session = await auth();
  if (!session)
    return Parse({
      error: "Not signed in",
      status: "ERROR",
    });
  const author = await client.fetch(AUTHOR_BY_ID_QUERY, { id: session?.id });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );
  const slug = slugify(title, { lower: true, strict: true });
  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      views: 0,
      _type: "startup",
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: author._id,
      },
      pitch,
    };
    const result = await writeClient.create({ _type: "startup", ...startup });
    return Parse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    return Parse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
