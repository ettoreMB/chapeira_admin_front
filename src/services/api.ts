import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const estabelecimentosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ESTABELECIMENTOS_URL,
  headers: {
    'Content-Type': 'application/json'
  },

});

