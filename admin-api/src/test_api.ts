import assert from "assert";

const BASE_URL = "http://localhost:5000/api";

async function runTests() {
  console.log("=== STARTING ADMIN API INTEGRATION TESTS ===\n");

  // 1. Health Check
  console.log("Test 1: Health Check");
  const healthRes = await fetch(`${BASE_URL}/health`);
  const healthJson = await healthRes.json() as any;
  assert.strictEqual(healthRes.status, 200);
  assert.strictEqual(healthJson.status, "ok");
  console.log("✓ Health check OK\n");

  // 2. Auth - Invalid Login
  console.log("Test 2: Auth - Invalid Login");
  const invalidLoginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "wrong@email.com", password: "badpassword" }),
  });
  assert.strictEqual(invalidLoginRes.status, 401);
  console.log("✓ Invalid login correctly returned 401\n");

  // 3. Auth - Protected Route without Token
  console.log("Test 3: Protected Route without Token");
  const noTokenRes = await fetch(`${BASE_URL}/auth/me`);
  assert.strictEqual(noTokenRes.status, 401);
  console.log("✓ Protected route without token correctly returned 401\n");

  // 4. Auth - Successful Login
  console.log("Test 4: Auth - Successful Login");
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@miscarchive.com",
      password: "admin123456",
    }),
  });
  assert.strictEqual(loginRes.status, 200);
  const loginJson = await loginRes.json() as any;
  assert(loginJson.token, "Login should return JWT token");
  const token = loginJson.token;
  console.log("✓ Login successful and token received\n");

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // 5. Auth - Verify Session
  console.log("Test 5: Auth - Verify Current User (/me)");
  const meRes = await fetch(`${BASE_URL}/auth/me`, { headers: authHeaders });
  assert.strictEqual(meRes.status, 200);
  const meJson = await meRes.json() as any;
  assert.strictEqual(meJson.user.email, "admin@miscarchive.com");
  console.log("✓ /auth/me returned correct admin user\n");

  // 6. Settings - Read and Update
  console.log("Test 6: Settings - Read & Update");
  const settingsRes = await fetch(`${BASE_URL}/settings`);
  assert.strictEqual(settingsRes.status, 200);
  const settingsJson = await settingsRes.json() as any;
  assert.strictEqual(settingsJson.data.siteName, "MiscArchive");

  const updateSettingsRes = await fetch(`${BASE_URL}/settings`, {
    method: "PUT",
    headers: authHeaders,
    body: JSON.stringify({
      siteName: "MiscArchive Updated",
    }),
  });
  assert.strictEqual(updateSettingsRes.status, 200);
  // Revert back
  await fetch(`${BASE_URL}/settings`, {
    method: "PUT",
    headers: authHeaders,
    body: JSON.stringify({ siteName: "MiscArchive" }),
  });
  console.log("✓ Settings read & update verified\n");

  // 7. Enquiries - Public Submit & Admin Manage
  console.log("Test 7: Enquiries - Public submission, Admin list, detail, status update, delete");
  const submitEnquiryRes = await fetch(`${BASE_URL}/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      service: "Digital Marketing",
      subject: "Inquiry for SEO",
      message: "Hello, I would like to get a quote for SEO services.",
      formSource: "contact_page",
    }),
  });
  assert.strictEqual(submitEnquiryRes.status, 201);
  const submitEnquiryJson = await submitEnquiryRes.json() as any;
  const enquiryId = submitEnquiryJson.data.id;

  // Admin list
  const listEnquiriesRes = await fetch(`${BASE_URL}/enquiries?status=new`, {
    headers: authHeaders,
  });
  assert.strictEqual(listEnquiriesRes.status, 200);
  const listEnquiriesJson = await listEnquiriesRes.json() as any;
  assert(listEnquiriesJson.data.some((e: any) => e._id === enquiryId));

  // Admin update status
  const updateEnquiryRes = await fetch(`${BASE_URL}/enquiries/${enquiryId}/status`, {
    method: "PATCH",
    headers: authHeaders,
    body: JSON.stringify({ status: "in_progress", notes: "Called the client." }),
  });
  assert.strictEqual(updateEnquiryRes.status, 200);

  // Admin delete
  const deleteEnquiryRes = await fetch(`${BASE_URL}/enquiries/${enquiryId}`, {
    method: "DELETE",
    headers: authHeaders,
  });
  assert.strictEqual(deleteEnquiryRes.status, 200);
  console.log("✓ Enquiries lifecycle verified\n");

  // 8. Blogs - Create with Rich HTML Body, Duplicate Slug check, Get by Slug, Update, Delete
  console.log("Test 8: Blogs - Full Rich Content preservation, Duplicate slug test, Get by Slug, Update, Delete");
  const testBlogPayload = {
    title: "Test AI in Marketing 2026",
    slug: "test-ai-in-marketing-2026",
    excerpt: "Exploring the rise of artificial intelligence in brand strategies.",
    contentHtml: `
      <h2>The New Reality of AI</h2>
      <p>Artificial intelligence is no longer optional for modern enterprises.</p>
      <ul>
        <li>Automated workflows</li>
        <li>Predictive analytics</li>
      </ul>
      <p>For more details, contact our specialists.</p>
    `,
    featuredImage: "/assets/images/blogs/bl1.jpg",
    category: "Digital Marketing",
    author: "MiscArchive Team",
    tags: ["AI", "Search", "Innovation"],
    seoTitle: "AI Marketing in 2026 | MiscArchive",
    seoDescription: "How AI transforms business in 2026.",
    isPublished: true,
  };

  // Create
  const createBlogRes = await fetch(`${BASE_URL}/blogs`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(testBlogPayload),
  });
  assert.strictEqual(createBlogRes.status, 201);
  const createBlogJson = await createBlogRes.json() as any;
  const blogId = createBlogJson.data._id;
  assert.strictEqual(createBlogJson.data.slug, "test-ai-in-marketing-2026");

  // Duplicate slug test
  const duplicateBlogRes = await fetch(`${BASE_URL}/blogs`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(testBlogPayload),
  });
  assert.strictEqual(duplicateBlogRes.status, 409);
  console.log("✓ Duplicate slug prevented with 409 Conflict");

  // Get by slug
  const getBySlugRes = await fetch(`${BASE_URL}/blogs/test-ai-in-marketing-2026`);
  assert.strictEqual(getBySlugRes.status, 200);
  const getBySlugJson = await getBySlugRes.json() as any;
  assert(getBySlugJson.data.contentHtml.includes("<h2>The New Reality of AI</h2>"));
  console.log("✓ Full Rich HTML body preserved intact and retrievable by exact slug");

  // Update
  const updateBlogRes = await fetch(`${BASE_URL}/blogs/${blogId}`, {
    method: "PUT",
    headers: authHeaders,
    body: JSON.stringify({ isPublished: false, excerpt: "Updated excerpt text." }),
  });
  assert.strictEqual(updateBlogRes.status, 200);
  const updateBlogJson = await updateBlogRes.json() as any;
  assert.strictEqual(updateBlogJson.data.isPublished, false);

  // Clean up blog
  const deleteBlogRes = await fetch(`${BASE_URL}/blogs/${blogId}`, {
    method: "DELETE",
    headers: authHeaders,
  });
  assert.strictEqual(deleteBlogRes.status, 200);
  console.log("✓ Blog CRUD lifecycle verified\n");

  // 9. Validation Tests - Invalid ObjectId, Missing Fields
  console.log("Test 9: Validation - Invalid ObjectId & Missing Fields");
  const invalidIdRes = await fetch(`${BASE_URL}/services/invalid-mongo-id-12345`);
  // Route treats identifier as slug if not valid objectId, returns 404 for not found
  assert.strictEqual(invalidIdRes.status, 404);

  const missingFieldsBlogRes = await fetch(`${BASE_URL}/blogs`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ title: "Incomplete Blog" }), // missing slug and contentHtml
  });
  assert.strictEqual(missingFieldsBlogRes.status, 400);
  console.log("✓ Validation errors handled cleanly\n");

  // 10. Dashboard Stats
  console.log("Test 10: Dashboard Stats");
  const statsRes = await fetch(`${BASE_URL}/dashboard/stats`, {
    headers: authHeaders,
  });
  assert.strictEqual(statsRes.status, 200);
  const statsJson = await statsRes.json() as any;
  assert(statsJson.stats);
  assert(statsJson.stats.enquiries !== undefined);
  assert(statsJson.stats.blogs !== undefined);
  console.log("✓ Dashboard metrics verified\n");

  console.log("=========================================");
  console.log("ALL ADMIN API TESTS PASSED SUCCESSFULLY!");
  console.log("=========================================");
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
