import { client } from "@/sanity/lib/client";
import { STARTUPS_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const shouldIncrement = searchParams.get("increment") === "true";


  if (!id || typeof id !== "string") {
    return Response.json({ error: "Missing or invalid 'id' parameter" }, { status: 400 });
  }

  try {
    // Fetch current view count
    const result = await client
      .withConfig({ useCdn: false })
      .fetch(STARTUPS_VIEWS_QUERY, { id })
      .catch((err) => {
        console.warn(`[View Count] Failed to fetch views for ID ${id}:`, err.message);
        return { views: 0 };
      });

      let totalViews = typeof result.views === 'number' ? result.views : 0;


      
    // Increment views only if needed
    if (shouldIncrement) {
      const updatedViews = await writeClient
        .patch(id)
        .inc({ views: 1 })
        .commit()
        .catch((err) => {
          console.error(`[View Count] Failed to increment views for ID ${id}:`, err.message);
          return null;
        });        
      if (updatedViews && typeof updatedViews.views === "number") {
        totalViews = updatedViews.views;
      } else {
        console.error(`[View Count] Unexpected response from patch operation for ID ${id}`);
      }
    }
    
    return Response.json({ views: totalViews }, { status: 200 });
  } catch (error) {
    console.error(`[View Count] Unexpected error for ID ${id}:`, error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}