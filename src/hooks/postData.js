export const postData = async (url, matchDescription, players) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `matchDescription=${JSON.stringify(
        matchDescription
      )}&players=${JSON.stringify(players)}`,
    });
  
    const body = await response.json();
    return body;
  };
  