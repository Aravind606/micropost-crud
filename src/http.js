class easyhttp {

  async get(url) {
    var response = await fetch(url);
    var resData = await response.json();

    return resData;
  }

  post(url, data) {
    return new Promise(function (resolve, reject) {
      fetch(url, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }

  put(url, data) {
    return new Promise(function (resolve, reject) {
      fetch(url, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }

  async delete(url) {
    var response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    var resData = await "resourse deleted";
    return resData;
  }
}

export var http = new easyhttp();