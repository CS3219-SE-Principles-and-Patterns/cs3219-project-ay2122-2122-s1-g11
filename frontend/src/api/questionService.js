import axios from "axios";
import { endpoints } from "./endpoints";

const qsEndpoint = endpoints.questionService;

export async function getCategoriesAPI(difficulty) {
    const response = await axios.get(`${qsEndpoint}/category/${difficulty}`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
    return response;
}
