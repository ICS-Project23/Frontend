export const ws = new WebSocket("ws://localhost:5000");
ws.onopen = () => {
    console.log("Connected to server");
    setInterval(() => {
        let payload = {
            "event": "ping"
        }
        ws.send(JSON.stringify(payload));
    }, 15000)
};
ws.onmessage = (message) => {
    // console.log("Message from server:", message.data);
};
ws.onerror = (error) => {
    console.error("An error occurred:", error);
}
ws.onclose = () => {
    console.log("Disconnected from server");
};
