export const baseUrl = "https://creative-tech-code-quest.vercel.app/api/swipe";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}
