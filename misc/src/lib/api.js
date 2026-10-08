const API_URL = process.env.NEXT_PUBLIC_CMS_API_URL || 'http://localhost:5000/api';

/**
 * Helper to safely resolve media asset URLs
 */
export function resolveMediaUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//') || url.startsWith('data:')) {
    return url;
  }
  if (url.startsWith('/uploads/')) {
    const origin = API_URL.replace(/\/api\/?$/, '');
    return `${origin}${url}`;
  }
  return url;
}

/**
 * Generic fetcher with fallback and timeout
 */
async function fetchFromCms(endpoint, options = {}) {
  const url = `${API_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, {
      cache: 'no-store',
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        ...(options.headers || {}),
      },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`[CMS API] Failed to fetch ${endpoint} (Status ${res.status})`);
      return null;
    }

    const json = await res.json();
    return json.success ? json.data : null;
  } catch (err) {
    console.warn(`[CMS API] Error fetching ${endpoint}:`, err.message);
    return null;
  }
}

/**
 * Fetch global website settings (contacts, social links, logos, etc.)
 */
export async function getSettings() {
  return await fetchFromCms('/settings');
}

/**
 * Fetch active hero banners
 */
export async function getBanners() {
  return await fetchFromCms('/banners');
}

/**
 * Fetch services (optionally active only)
 */
export async function getServices(activeOnly = true) {
  const data = await fetchFromCms('/services');
  if (!data || !Array.isArray(data)) return null;
  return activeOnly ? data.filter((s) => s.isActive !== false) : data;
}

/**
 * Fetch single service by slug or ID
 */
export async function getServiceBySlug(slug) {
  if (!slug) return null;
  return await fetchFromCms(`/services/${encodeURIComponent(slug)}`);
}

/**
 * Fetch sub-services
 */
export async function getSubServices() {
  return await fetchFromCms('/sub-services');
}

/**
 * Fetch client logos
 */
export async function getClientLogos(activeOnly = true) {
  const data = await fetchFromCms('/client-logos');
  if (!data || !Array.isArray(data)) return null;
  return activeOnly ? data.filter((l) => l.isActive !== false) : data;
}

/**
 * Fetch team members
 */
export async function getTeamMembers(activeOnly = true) {
  const data = await fetchFromCms('/team-members');
  if (!data || !Array.isArray(data)) return null;
  return activeOnly ? data.filter((m) => m.isActive !== false) : data;
}

/**
 * Fetch FAQs
 */
export async function getFaqs(activeOnly = true) {
  const data = await fetchFromCms('/faqs');
  if (!data || !Array.isArray(data)) return null;
  return activeOnly ? data.filter((f) => f.isActive !== false) : data;
}

/**
 * Fetch careers
 */
export async function getCareers() {
  return await fetchFromCms('/careers');
}

/**
 * Fetch blog list with pagination/search
 */
export async function getBlogs({ page = 1, limit = 50, search = '', category = '' } = {}) {
  let query = `?page=${page}&limit=${limit}&status=published`;
  if (search) query += `&search=${encodeURIComponent(search)}`;
  if (category) query += `&category=${encodeURIComponent(category)}`;
  return await fetchFromCms(`/blogs${query}`);
}

/**
 * Fetch single blog by slug or ID
 */
export async function getBlogBySlug(slug) {
  if (!slug) return null;
  return await fetchFromCms(`/blogs/${encodeURIComponent(slug)}`);
}

/**
 * Submit contact or sidebar enquiry
 */
export async function submitEnquiry(payload) {
  const url = `${API_URL}/enquiries`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return await res.json();
}
