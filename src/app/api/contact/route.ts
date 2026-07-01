type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  business?: string;
  notes?: string;
};

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return Response.json(
      { error: "Contact form is not configured." },
      { status: 500 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const phone = payload.phone?.trim() ?? "";
  const business = payload.business?.trim() ?? "";
  const notes = payload.notes?.trim() ?? "";

  if (!name || !email || !notes) {
    return Response.json(
      { error: "Name, email, and notes are required." },
      { status: 400 },
    );
  }

  const message = [
    phone ? `Phone: ${phone}` : null,
    business ? `Business: ${business}` : null,
    "",
    notes,
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Portfolio inquiry from ${name}`,
      from_name: name,
      name,
      email,
      phone: phone || undefined,
      message,
    }),
  });

  const result = (await response.json()) as {
    success?: boolean;
    message?: string;
  };

  if (!response.ok || !result.success) {
    return Response.json(
      { error: result.message ?? "Failed to send message." },
      { status: 502 },
    );
  }

  return Response.json({ success: true });
}
