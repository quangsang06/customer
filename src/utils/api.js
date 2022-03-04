import http from "./http-common";

export default {
    http_get,
    http_delete
}

async function http_get(url, pathParam= '') {
    let result = []
    await http
        .get(url + pathParam)
        .then(response => {
            result = response.data
        })
    return result
}

async function http_delete(url, pathParam= '') {
    let result = {}
    await http
        .delete(url + pathParam)
        .then(response => {
            result = response.data
        })
    return result
}