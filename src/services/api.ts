const arrUrls = [
  process.env.NEXT_PUBLIC_API_URL,
  process.env.NEXT_PUBLIC_API_URL_TWO,
  process.env.NEXT_PUBLIC_API_URL_THREE,
];

type Payload = {
  type: string;
  action: string;
  data?: any;
};

export async function sendRequest(payload: Payload, retry = true) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Usuário não autenticado.");
  }

  const response = await fetch(`${arrUrls[0]}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });

  let result = await response.json();

  if (response.status === 401 && retry) {
    const refreshed = await refreshAccessToken();

    if (refreshed) {
      return sendRequest(payload, false);
    }
  }

  return result;
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) return false;

  const response = await fetch(`${arrUrls[0]}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "auth",
      action: "refresh_token",
      data: {
        refresh_token: refreshToken,
      },
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.access_token) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    return false;
  }

  localStorage.setItem("access_token", result.access_token);
  localStorage.setItem("refresh_token", result.refresh_token);

  return true;
}
