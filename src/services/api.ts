const arrUrls = [
  process.env.NEXT_PUBLIC_API_URL,
  process.env.NEXT_PUBLIC_API_URL_TWO,
  process.env.NEXT_PUBLIC_API_URL_THREE,
];

export async function sendRequest(payload: {
  type: string;
  action: string;
  data?: any;
}) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Usuário não autenticado.");
  }

  const response = await fetch(`${arrUrls[0]}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });

  return response.json();
}
