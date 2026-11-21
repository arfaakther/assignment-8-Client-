
import { getTokenFromServer } from "@/app/lib/getTokenFromServer";

export async function GET() {
  try {
    const token = await getTokenFromServer();

    if (!token) {
      return Response.json(
        { message: "Login required" },
        { status: 401 }
      );
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-events`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    return Response.json(data, { status: res.status });
  } catch (error) {
    console.error("My Events Error:", error);

    return Response.json(
      { message: "Failed to fetch your events" },
      { status: 500 }
    );
  }
}
