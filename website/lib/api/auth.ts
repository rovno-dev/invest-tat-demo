const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api/main/v1';

// OTP-based login (kept for reference, not used in new modal)
export async function emailLogin(email: string) {
  const res = await fetch(`${API_BASE}/login/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function phoneLogin(phone: string) {
  const res = await fetch(`${API_BASE}/login/phone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function verifyOTP(identifier: string, code: string) {
  const res = await fetch(`${API_BASE}/otp/email?email=${encodeURIComponent(identifier)}&code=${encodeURIComponent(code)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Password-based login (new)
export async function emailPasswordLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/login/email-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function phonePasswordLogin(phone: string, password: string) {
  const res = await fetch(`${API_BASE}/login/phone-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Registration (returns tokens)
export async function registerEmail(email: string, password: string) {
  const res = await fetch(`${API_BASE}/register/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function registerPhone(phone: string, password: string) {
  const res = await fetch(`${API_BASE}/register/phone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Token refresh
export async function refreshToken(refresh: string) {
  const res = await fetch(`${API_BASE}/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refresh }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Token management
export function setTokens(access: string, refresh: string) {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
}

export function getTokens() {
  return {
    access: localStorage.getItem('access_token'),
    refresh: localStorage.getItem('refresh_token'),
  };
}

export function clearTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}
