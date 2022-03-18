import axios from "axios";

export function calculate(expression) {
    const headers = {
        "Content-Type": "application/json"
    }
    return axios
        .post("http://localhost:8080/calculator", {expression:expression}, { headers })
        .then((response) => {
            return response.data.result;
        });
}