

function getBotEndpoint() {
    if (process.env.NODE_ENV === 'production') {
        return "";
    } else {
        return "http://localhost:3978";
    }
}

export {getBotEndpoint}
