export async function GET() {
  return Response.json({ status: "ok", service: "north-form-storefront", timestamp: new Date().toISOString() });
}
