getArticlesFromApi().then(function(data) {
    // data is the value of response.json();
    displayArticles(data);
  });
function displayArticles(data) {
    console.log("data from api", data);
    var articlesElement = document.getElementById("articles");
    var template = document.getElementById("template");
    for (var i = 0; i < data.length; i++) {
      var currentArticleData = data[i]; //only data not HTML elements
      var clonedElement = template.cloneNode(true);
      var titleElement = clonedElement.querySelector("h3");
      titleElement.innerHTML = currentArticleData.title;
      //add body class"body
      var bodyElement = clonedElement.querySelector("p");
      bodyElement.innerHTML = currentArticleData.body;
      //add userid class"author"
      var authorElement = clonedElement.querySelector(".author");
      authorElement.innerHTML = currentArticleData.userId;
      clonedElement.id = currentArticleData.id;
      articlesElement.appendChild(clonedElement);

      var deleteButton = clonedElement.querySelector(".delete");
      deleteButton.addEventListener("click", deleteArticle);
      var editButton = clonedElement.querySelector(".edit");
      editButton.addEventListener("click", editArticle);
      var buttonSave = clonedElement.querySelector(".save");
      buttonSave.addEventListener("click", updateArticle);
    }
  }

  function deleteArticle(event) {
      console.log('delete event', event);
      var grandParentElement = event.target.parentElement.parentElement;
      //grandParente element is the  cloned element that has the
      //id = see line 16
      //event.target is the element that we clicked
      var articleId = grandParentElement.id;
      deleteArticleFromApi(articleId)
      .then(function(data){
          console.log('deleted', data);
          grandParentElement.remove();
      });
}
 function editArticle(event){
     console.log('edit event', event);
     var grandParentElement = event.target.parentElement.parentElement;
    
     var bodyElement = grandParentElement.querySelector("p");
     var textareaBody = document.createElement("textarea");
     textareaBody.value = bodyElement.innerText;


     
     var titleElement = grandParentElement.querySelector("h3");
     var inputTitle = document.createElement("input");
    inputTitle.value = titleElement.innerText;
    titleElement.parentNode.replaceChild(inputTitle, titleElement);
    bodyElement.parentNode.replaceChild(textareaBody, bodyElement);
    var editButton = grandParentElement.querySelector(".edit");
    editButton.style.display = "none";
    var buttonSave = grandParentElement.querySelector(".save");
    buttonSave.style.display = "initial";



 }

 function updateArticle(event){
    var grandParentElement = event.target.parentElement.parentElement;
    
    var textBody = grandParentElement.querySelector("textarea");
    var newP = document.createElement("p");
    newP.innerText = textBody.value;
    textBody.parentNode.replaceChild(newP, textBody);
   
    var textTitle = grandParentElement.querySelector("input");
    var newh3 = document.createElement("h3");
    newh3.innerText = textTitle.value;
    textTitle.parentNode.replaceChild(newh3, textTitle);

    var buttonSave = grandParentElement.querySelector(".save");
    buttonSave.style.display = "none";
    var editButton = grandParentElement.querySelector(".edit");
    editButton.style.display = "initial";

    var articleId = grandParentElement.id;
    var titleValue = textTile.value;
    var bodyValue = textBody.value;
 }