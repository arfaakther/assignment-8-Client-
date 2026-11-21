
import { getTokenFromServer } from "@/app/lib/getTokenFromServer";

// GET all events (Public)
export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events`, {
      next: { revalidate: 60 },
    });

    const data = await res.json();

    return Response.json(data, { status: res.status });
  } catch (error) {
    console.error("Fetch events error:", error);

    return Response.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// CREATE event (Protected)
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

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events`, {
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

