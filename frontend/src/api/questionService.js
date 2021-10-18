import axios from "axios";

const qsEndpoint = "http://localhost:3001/questions";

export async function getCategoriesAPI(difficulty) {
    const response = await axios.get(`${qsEndpoint}/category/${difficulty}`);
    return response;
}

export async function getRandomQuestionAPI(difficulty, category) {
    // TODO: Take into consideration the selected category in the API response
    const response = await axios.get(`${qsEndpoint}/${difficulty}`);

    return response;
}
