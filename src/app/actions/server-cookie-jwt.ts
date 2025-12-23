import { cookies } from "next/headers";

export async function getCookie() {
    const cookieStore = await cookies();
    const token = cookieStore.getAll();
    let cookie = "";
    for (const tok of token) {
        cookie += `${tok['name']}=${tok['value']}; `;
    }
    return cookie;
}