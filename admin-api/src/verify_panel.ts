import assert from "assert";

async function verifyAll() {
  console.log("=================================================");
  console.log("   ADMIN PANEL FULL ARCHITECTURE VERIFICATION    ");
  console.log("=================================================\n");

  const API_URL = "http://localhost:5000/api";
  const UI_URL = "http://localhost:5173";

  // 1. UI Serving Check
  console.log("1. Verifying Admin UI Frontend (Port 5173)...");
  const uiRes = await fetch(UI_URL);
  assert.strictEqual(uiRes.status, 200, "Admin UI must return HTTP 200");
  const uiHtml = await uiRes.text();
  assert(uiHtml.includes("MiscArchive CMS"), "UI HTML must contain brand title");
  console.log("   ✓ Admin UI is active and serving successfully on http://localhost:5173\n");

  // 2. API Health Check
  console.log("2. Verifying Admin API Health (Port 5000)...");
  const healthRes = await fetch(`${API_URL}/health`);
  assert.strictEqual(healthRes.status, 200, "Admin API health must return HTTP 200");
  const healthData = await healthRes.json() as any;
  assert.strictEqual(healthData.status, "ok");
  console.log("   ✓ Admin API health check passed: status = 'ok'\n");

  // 3. Unauthenticated Access Rejection
  console.log("3. Verifying Protected Route Rejection without Auth...");
  const unauthRes = await fetch(`${API_URL}/auth/me`);
  assert.strictEqual(unauthRes.status, 401, "Protected route must return 401 without token");
  console.log("   ✓ Unauthenticated access correctly rejected with 401 Unauthorized\n");

  // 4. Admin Login with Default Credentials
  console.log("4. Verifying Admin Login with Default Seed Credentials...");
  const credentials = {
    email: "admin@miscarchive.com",
    password: "admin123456",
  };
  const loginRes = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  assert.strictEqual(loginRes.status, 200, "Login must return 200 with valid credentials");
  const loginData = await loginRes.json() as any;
  assert(loginData.token, "Login must return a valid JWT token");
  assert.strictEqual(loginData.user.email, "admin@miscarchive.com");
  assert.strictEqual(loginData.user.role, "admin");
  const token = loginData.token;
  console.log("   ✓ Login succeeded! User: MiscArchive Administrator (role: admin)");
  console.log(`   ✓ JWT Token issued: ${token.substring(0, 30)}...\n`);

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // 5. Session Verification (/me)
  console.log("5. Verifying Active Session & Token Validation (/api/auth/me)...");
  const meRes = await fetch(`${API_URL}/auth/me`, { headers: authHeaders });
  assert.strictEqual(meRes.status, 200);
  const meData = await meRes.json() as any;
  assert.strictEqual(meData.user.email, "admin@miscarchive.com");
  console.log("   ✓ Session validated successfully via JWT token\n");

  // 6. Dashboard Metrics Read (Admin UI -> Admin API -> MongoDB)
  console.log("6. Verifying Dashboard Metrics Endpoint (/api/dashboard/stats)...");
  const dashRes = await fetch(`${API_URL}/dashboard/stats`, { headers: authHeaders });
  assert.strictEqual(dashRes.status, 200);
  const dashData = await dashRes.json() as any;
  assert(dashData.stats !== undefined);
  console.log("   ✓ Dashboard stats retrieved successfully from MongoDB:", {
    blogs: dashData.stats.blogs,
    enquiries: dashData.stats.enquiries,
    services: dashData.stats.services,
    banners: dashData.stats.banners,
  });
  console.log("");

  // 7. Full Read/Write Flow (Admin UI -> Admin API -> MongoDB)
  console.log("7. Verifying Read & Write Lifecycle (Admin UI -> API -> MongoDB)...");
  // Test creating a temporary test enquiry via API (as submitted by public/admin)
  const createLeadRes = await fetch(`${API_URL}/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Architectural Verification Client",
      email: "verify@miscarchive.com",
      message: "Testing Admin UI to API to MongoDB connection.",
      service: "Digital Marketing",
      formSource: "contact_page",
    }),
  });
  assert.strictEqual(createLeadRes.status, 201, "Lead creation must return 201");
  const leadData = await createLeadRes.json() as any;
  const leadId = leadData.data.id;
  console.log("   ✓ Record written to MongoDB successfully (ID: " + leadId + ")");

  // Verify record can be read by authenticated Admin
  const getLeadRes = await fetch(`${API_URL}/enquiries/${leadId}`, { headers: authHeaders });
  assert.strictEqual(getLeadRes.status, 200);
  const getLeadData = await getLeadRes.json() as any;
  assert.strictEqual(getLeadData.data.name, "Architectural Verification Client");
  console.log("   ✓ Record retrieved by authenticated Admin from MongoDB");

  // Verify status update in MongoDB
  const updateStatusRes = await fetch(`${API_URL}/enquiries/${leadId}/status`, {
    method: "PATCH",
    headers: authHeaders,
    body: JSON.stringify({ status: "in_progress", notes: "Verified in Step 7." }),
  });
  assert.strictEqual(updateStatusRes.status, 200);
  console.log("   ✓ Record updated in MongoDB (Status set to 'in_progress')");

  // Clean up test record
  const deleteRes = await fetch(`${API_URL}/enquiries/${leadId}`, {
    method: "DELETE",
    headers: authHeaders,
  });
  assert.strictEqual(deleteRes.status, 200);
  console.log("   ✓ Record cleaned up successfully from MongoDB\n");

  // 8. Logout Simulation
  console.log("8. Verifying Logout & Session Revocation Simulation...");
  // When user logs out, token is removed from storage. Subsequent requests without token fail.
  const afterLogoutRes = await fetch(`${API_URL}/auth/me`, {
    headers: { "Content-Type": "application/json" }, // No Authorization header
  });
  assert.strictEqual(afterLogoutRes.status, 401);
  console.log("   ✓ Client session cleared; unauthorized request rejected with 401\n");

  console.log("=================================================");
  console.log("   ALL VERIFICATION CHECKS PASSED PERFECTLY!     ");
  console.log("=================================================");
}

verifyAll().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
