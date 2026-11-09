import axios from "axios";

const usersAPI = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

export async function getusers(search = "") {
  const response = await usersAPI("/users", {
    params: search ? { search } : {},
  });
  return response.data;
}
