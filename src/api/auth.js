import { API_BASE_URL } from "../config";

export const login = async (authFetch, email, password) => {
  const res = await authFetch(
    `${API_BASE_URL}/auth/login`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const text = await res.text();

console.log(text);

return text;
};

export const register = async (authFetch, data) => {
  const res = await authFetch(
    `${API_BASE_URL}/auth/register`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  const text = await res.text();

console.log(text);

return text;
};

export const logout = async (authFetch) => {
  const res = await authFetch(
    `${API_BASE_URL}/auth/logout`,
    {
      method: "POST",
    }
  );

  const json = await res.json();

  if (!res.ok) {
    json.status = res.status;
    throw json;
  }

  return json;
};