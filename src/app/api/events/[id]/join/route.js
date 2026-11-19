import { getTokenFromServer } from "@/app/lib/getTokenFromServer";

export async function GET(req, { params }) {
  try {
    const token = await getTokenFromServer();

    if (!token) {
      return Response.json(
        { message: "Login required" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const res = await fetch(
      `http://localhost:8000/events/${id}/join`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const data = await res.json();

    return Response.json(data, { status: res.status });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Failed to check joined status" },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    const token = await getTokenFromServer();

    if (!token) {
      return Response.json(
        { message: "Login required" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const res = await fetch(
      `http://localhost:8000/events/${id}/join`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    return Response.json(data, { status: res.status });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Failed to join event" },
      { status: 500 }
      
    );
  }
}


export async function PATCH(req, { params }) {
  try {
    const token = await getTokenFromServer();

    if (!token) {
      return Response.json({ message: "Login required" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const res = await fetch(`http://localhost:8000/events/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return Response.json(data, { status: res.status });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const token = await getTokenFromServer();

    if (!token) {
      return Response.json({ message: "Login required" }, { status: 401 });
    }

    const { id } = await params;

    const res = await fetch(`http://localhost:8000/events/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return Response.json(data, { status: res.status });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Delete failed" }, { status: 500 });
  }
}