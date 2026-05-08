const arrUrls = [
  process.env.NEXT_PUBLIC_API_URL,
  process.env.NEXT_PUBLIC_API_URL_TWO,
  process.env.NEXT_PUBLIC_API_URL_THREE,
];

export async function sendRequest(
  payload: Array<{ type: string; action: string; data?: any }>,
) {
  const response = await fetch(`${arrUrls[0]}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });

  return response.json();
}
