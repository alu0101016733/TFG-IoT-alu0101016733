const LINK = "http://127.0.0.1:3003";

export const apiCall = (
  from: string,
  values: string,
  fetchedData: (result: any) => void,
  body: {} = {}
) => {
  let fullApiLink = `${LINK}/${from}?${values}`;
  fetch(fullApiLink, {
    method: "Get",
    mode: "cors",
  })
    .then((result) => {
      if (result.ok) return result.json();
      return [];
    })
    .then((result) => {
      fetchedData(result);
    });
};

export const apiDelete = (
  from: string,
  fetchedData: (result: any) => void,
  informFailure = true
) => {
  let fullApiLink = `${LINK}/${from}`;
  fetch(fullApiLink, {
    method: "DELETE",
    mode: "cors",
  }).then((result) => {
    fetchedData(result);
  });
};

export const apiUpdate = (
  from: string,
  fetchedData: (result: any) => void,
  body: {} = {}
) => {
  let fullApiLink = `${LINK}/${from}`;
  fetch(fullApiLink, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Indicates the content
    },
    body: JSON.stringify(body),
  }).then((result) => {
    fetchedData(result);
  });
};

export const apiCreate = (
  from: string,
  fetchedData: (result: any) => void,
  body: {} = {}
) => {
  let fullApiLink = `${LINK}/${from}`;
  fetch(fullApiLink, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Indicates the content
    },
    body: JSON.stringify(body),
  }).then((result) => {
    fetchedData(result);
  });
};

export const logResult = (result: any) => {
  console.log(result);
};

export const emptyCallback = (result: any) => {};
