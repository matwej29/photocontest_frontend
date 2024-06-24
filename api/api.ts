interface IQuery {
    path: string;
    method: string;
    data: object;
}

export const doQuery = async ({ path, method, data }: IQuery, json = true) => {
    const headers = new Headers();
    headers.append("Accept", "application/json");

    const token = localStorage.getItem("token");
    headers.append("X-CSRFToken", token || "");

    let body: any = data;
    if (json){
        body = JSON.stringify(data);
        console.log(body);
        headers.append("Content-Type", "application/json");
    }

    const requestOptions = {
        method,
        headers,
        credentials: "include",
        mode: "cors",
        cache: "default",
        body: method !== "GET" ? body : undefined,
    };

    return fetch(`http://localhost:8000/${path}`, requestOptions);
};
