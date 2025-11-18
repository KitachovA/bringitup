const postData = async (url, json) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'   // говоримо серверу, що надсилаємо JSON
        },
        body: json
    });

    return await res.json();
};

export default postData