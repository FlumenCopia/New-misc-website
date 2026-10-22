const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  stats?: any;
  user?: any;
  token?: string;
  count?: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  errors?: string[];
  recentEnquiries?: any[];
  recentBlogs?: any[];
}

export const getToken = (): string | null => {
  return localStorage.getItem('miscarchive_admin_token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('miscarchive_admin_token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('miscarchive_admin_token');
};

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getToken();
  const headers = new Headers(options.headers || {});

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // If body is FormData, check file sizes under 10 MB limit
  if (options.body instanceof FormData) {
    const maxBytes = 10 * 1024 * 1024; // 10 MB
    for (const [, value] of (options.body as any).entries()) {
      if (typeof File !== 'undefined' && value instanceof File && value.size > maxBytes) {
        const sizeMb = (value.size / (1024 * 1024)).toFixed(1);
        throw new Error(`File "${value.name}" (${sizeMb} MB) exceeds the 10 MB limit. Please select an image under 10 MB.`);
      }
    }
  }

  // If body is not FormData, default to application/json
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const data = await res.json().catch(() => ({
      success: false,
      message: `Failed to parse response (Status ${res.status})`,
    }));

    if (!res.ok) {
      if (res.status === 401) {
        removeToken();
        window.dispatchEvent(new Event('auth:unauthorized'));
      }
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (error: any) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}
