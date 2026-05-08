const arrUrls = [
  process.env.NEXT_PUBLIC_API_URL,
  process.env.NEXT_PUBLIC_API_URL_TWO,
  process.env.NEXT_PUBLIC_API_URL_THREE,
];

export async function sendRequest(
  payload: Array<{ type: string; action: string; data?: any }>,
) {
  const payloadString = JSON.stringify(payload);

  const response = await fetch(`${arrUrls[1]}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payloadString,
  });

  return response.json();
}
