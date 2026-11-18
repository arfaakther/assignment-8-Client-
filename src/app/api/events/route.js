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

    const data = await req.json();

    const res = await fetch("http://localhost:8000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return Response.json(result, { status: res.status });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to create event" },
      { status: 500 }
    );
  }
}