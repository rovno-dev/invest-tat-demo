import {$fetch} from "@/shared/lib/api/fetch";
import {safeLocalStorage} from "@/shared/lib/safeLocalStorage";

export async function emailLogin(email: string) {
  const res = await $fetch(`/login/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

export async function phoneLogin(phone: string) {
  const res = await $fetch(`/login/phone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  });
  return res.json();
}

export async function verifyEmailOTP(email: string, code: string) {
  const res = await $fetch(`/otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login: email, code }),
  });
  return res.json();
}

export async function verifyPhoneOTP(phone: string, code: string) {
  const res = await $fetch(`/otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login: phone, code }),
  });
  return res.json();
}

export async function emailPasswordLogin(email: string, password: string) {
  const res = await $fetch(`/login/email-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function phonePasswordLogin(phone: string, password: string) {
  const res = await $fetch(`/login/phone-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, password }),
  });
  return res.json();
}

export async function registerEmail(email: string, password: string) {
  const res = await $fetch(`/register/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function registerPhone(phone: string, password: string) {
  const res = await $fetch(`/register/phone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, password }),
  });
  return res.json();
}

export async function refreshToken(refresh: string) {
  const res = await $fetch(`/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refresh }),
  });
  return res.json();
}

export function setTokens(access: string, refresh: string) {
  safeLocalStorage.setItem('access_token', access);
  safeLocalStorage.setItem('refresh_token', refresh);
}

export function getTokens() {
  return {
    access: safeLocalStorage.getItem('access_token'),
    refresh: safeLocalStorage.getItem('refresh_token'),
  };
}

export function clearTokens() {
  safeLocalStorage.removeItem('access_token');
  safeLocalStorage.removeItem('refresh_token');
}
