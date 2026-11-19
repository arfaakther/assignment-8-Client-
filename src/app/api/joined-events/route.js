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

    const res = await fetch("http://localhost:8000/joined-events", {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    return Response.json(data, { status: res.status });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Failed to fetch joined events" },
      { status: 500 }
    );
  }
}