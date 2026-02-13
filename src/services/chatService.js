import instance from "./../API/axiosInstance";

export async function sendChatMessage(messages) {
  // messages = [{ role: "user"|"assistant", content: "..." }, ...]
  try {
    const response = await instance.post("/chat/query", { question: messages });
    console.log("this is amazing");

    console.log(response);
    return response.data.answer;
  } catch (err) {
    console.error("Chat API error:", err);
    throw err;
  }
}
