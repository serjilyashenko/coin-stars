import axios from "axios";

export async function makeFetch(url) {
  try {
    const response = await axios.get(url);
    return {
      response,
      error: null,
    };
  } catch (e) {
    console.error(e);
    return {
      response: null,
      error: e,
    };
  }
}

export default makeFetch;
