
import { getTokenFromServer } from "@/app/lib/getTokenFromServer";

export async function POST(req) {
  try {
    const token = await getTokenFromServer();

    if (!token) {
      return Response.json(
        { message: "Login required" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const res = await fetch("http://localhost:8000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return Response.json(data, { status: res.status });
  } catch (error) {
    console.error("Create event error:", error);

    return Response.json(
      { message: "Failed to create event" },
      { status: 500 }
    );
  }
}
