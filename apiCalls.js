var baseUrl = "https://jsonplaceholder.typicode.com";


function getArticlesFromApi() {
  //Do Not forget to RETURN the fetch from the function,
  //if nothig is return the function implicintly return undefined
  // an "cannot call .then of undefined"  error will be trown
  return fetch(baseUrl + "/posts").then(function(response) {
    return response.json(); // return jason ii returnat din  functia response, ce dinainte lui
  });
}
function deleteArticleFromApi(articleId){
    var url = baseUrl + "/post/" + articleId;

    return fetch(url, {
        method:"DELETE"
    }).then(function(response){
        return response.json();
    });
}
 function editArticleFromApi(articleId, titleValue,bodyValue) {
    // /posts/1
    var url = baseUrl + "/posts/" + articleId;
    // the data that will be sent to the api
    var data = {
      title: titleValue, // "grupa-noua"
      body: bodyValue
    };
  
    return fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(function(response) {
      return response.json();
    });
  };
  