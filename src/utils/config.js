export const api = "https://orangerie-amber.vercel.app/api";
export const uploads = "https://orangerie-amber.vercel.app/uploads";

// gerenciamento de requisições, e verificação de necessidade de autenticação
export const requestConfig = (method, data, token = null, image = null) => {
  let config;

  if (image) {
    config = {
      method,
      body: data,
      headers: {},
    };
  } else if (method === "DELETE" || data === null) {
    // ela se define por si só, ent só passamos o metodo
    config = {
      method,
      headers: {},
    };
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
