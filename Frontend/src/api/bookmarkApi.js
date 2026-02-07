import { request } from "./client";

export const fetchBookmarks = () => request("/bookmark/fetch");

export const createBookmark = (payload) =>
  request("/bookmark/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateBookmark = (id, payload) =>
  request(`/bookmark/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const archiveBookmark = (id, payload) =>
  request(`/bookmark/archive/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const pinBookmark = (id, payload) =>
  request(`/bookmark/pin/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const deleteBookmark = (id) =>
  request(`/bookmark/delete/${id}`, {
    method: "DELETE",
  });
