import api from "../utils/api";

const API_ENDPOINT = '/olympic'

export function getAllUsers(params) {
    return api.http_get(API_ENDPOINT+`?${params}`)
}

export function deleteUser(id) {
    return api.http_delete(API_ENDPOINT+`/${id}`)
}

export function downloafFileById(id) {
    return api.http_get(API_ENDPOINT+`/${id}`)
}
