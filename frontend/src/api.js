const BASE_URL = "http://localhost:3001";

export function userLogin(data) {
    return fetch(BASE_URL + "/users/login/", {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(result => {
        return result;
    })
};

export function verifyToken(token) {
    return fetch(BASE_URL + "/users/verify/token", {
        method: "GET",
        headers: {
            "x-access-token": token,
            "Content-Type": "Application/json"
        }
    }).then(response => response.json()).then(result => {
        return result;
    })
}

export function getUserById(id){
    return fetch(BASE_URL + "/users/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "Application/json"
        }
    }).then(response => response.json()).then(result => {
        return result;
    })
}

export function getProductById(id){
    return fetch(BASE_URL + "/products/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "Application/json"
        }
    }).then(response => response.json()).then(result => {
        return result;
    })
}

export function getAllProducts() {
    return fetch(BASE_URL + "/products/", {
        method: "GET",
        headers: {
            "Content-Type": "Application/json"
        }
    }).then(response => response.json()).then(result => {
        return result;
    })
}

export function getAllUsers() {
    return fetch(BASE_URL + "/users/", {
        method: "GET",
        headers: {
            "Content-Type": "Application/json"
        }
    }).then(response => response.json()).then(result => {
        return result;
    })
}

export function deleteUserId(id) {
    return fetch(BASE_URL + "/users/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "Application/json"
        }
    }).then(response => response.json()).then(result => {
        return result;
    })
}

export function deleteProductId(id) {
    return fetch(BASE_URL + "/products/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "Application/json"
        }
    }).then(response => response.json()).then(result => {
        return result;
    })
}

export function addToCart(userId, product) {
    return fetch(BASE_URL + '/carts/add/product', {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'x-access-token': userId
        },
        body: JSON.stringify(product)
    }).then(response => response.json()).then(result => {
        return result;
    })
}


export function createProduct(products) {
    return fetch(BASE_URL + '/products/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(products)

    }).then(response => response.json()).then(result => {
        return result;
    })
}

export function createUser(user) {
    return fetch(BASE_URL + '/users/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)

    }).then(response => response.json()).then(result => {
        return result;
    })
}

export function editUser(user, userId) {
    return fetch(BASE_URL + '/users/' + user._id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'x-access-token': userId
        },
        body: JSON.stringify(user)
    }).then(response => response.json()).then(result => {
        return result;
    })
}

export function editProduct(product, userId) {
    return fetch(BASE_URL + '/products/' + product._id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'x-access-token': userId
        },
        body: JSON.stringify(product)
    }).then(response => response.json()).then(result => {
        return result;
    })
}

export function getCartProducts(userId) {
    return fetch(BASE_URL + '/carts/get/products', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'x-access-token': userId
        }
    }).then(response => response.json()).then(result => {
        return result;
    })
}

export function editCartProduct(userId, product) {
    return fetch(BASE_URL + '/carts/add/products/quantity', {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'x-access-token': userId
        },
        body: JSON.stringify(product)
    }).then(response => response.json()).then(result => {
        return result;
    })
}

export function deleteCartProduct(userId, product) {
    return fetch(BASE_URL + '/carts/remove/products/quantity', {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'x-access-token': userId
        },
        body: JSON.stringify(product)
    }).then(response => response.json()).then(result => {
        return result;
    })
}

export async function addProductsHistory(id, data) {
    return await fetch(BASE_URL + "/carts/add/products/history", {
      method: "PATCH",
      headers: {
        "x-access-token": id,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        return result;
      });
  }

  export function getHistoryById(nMec) {
    return fetch(BASE_URL + "/carts/get/products/history/", {
        method: "GET",
        headers: {
            "x-access-token": nMec,
            "Content-Type": "Application/json"
        }
    }).then(response => response.json()).then(result => {
        return result;
    })
}