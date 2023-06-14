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

export {fetcher}