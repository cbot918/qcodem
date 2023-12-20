const fetcher = async (url, token) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch(url, requestOptions);
  const data = await response.json();

  return data
}

const postData = async (url, token, payload) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type","application/json",)

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
    body: JSON.stringify(payload),
  };

  const response = await fetch(url, requestOptions);
  const data = await response.json();

  console.log("data: ", data)
  return data
}

export {fetcher,postData}