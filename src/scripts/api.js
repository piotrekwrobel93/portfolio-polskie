const BASE_URL = "https://my-email-serverr.herokuapp.com"; // .env

async function POST(urlSegment, payload, options = { headers: [] }) {
  if (
    !urlSegment ||
    typeof urlSegment !== "string" ||
    !payload ||
    typeof payload !== "object"
  ) {
    throw new Error("Invalid POST params. -> docs link");
  }
  try {
    let response = await fetch(BASE_URL + urlSegment, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      if (response.status === "404") {
        console.log("oopsie my free email API server stopped working :)");
      }
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`
      );
    }
    return response.json();
  } catch (err) {
    throw new Error(
      "Mój hosting mailowy nie działa :) Skontaktuj sie drogą mailową."
    );
  }
}
const apiService = {
  sendEmail: async (payload) => POST("/sendMail", payload),
};

export default apiService;
