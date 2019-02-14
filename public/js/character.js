$(document).ready(function() {
  // blogContainer holds all of our posts
  var characterContainer = $(".character-container");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleCharacterDelete);
  $(document).on("click", "button.edit", handleCharacterEdit);
  var characters;

  // This function grabs posts from the database and updates the view
    function getCharacters(category) {
    $.get("/api/characters", function(data) {
      console.log("Characters", data);
      characters = data;
      if (!characters || !characters.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }


  // This function does an API call to delete posts
  function deleteCharacter(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/characters/" + id
    })
      .then(function() {
        getCharacters();
      });
  }

  // Getting the initial list of posts
  getCharacters();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    characterContainer.empty();
    var charactersToAdd = [];
    for (var i = 0; i < characters.length; i++) {
      charactersToAdd.push(createNewRow(characters[i]));
    }
    characterContainer.append(charactersToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(character) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newPostName = $("<h2>");
    var newPostDate = $("<small>");
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostStrength = $("<p>");
    var newPostHealth = $("<p>");
    newPostName.text(character.name + " ");
    newPostStrength.text(character.strength);
    newPostHealth.text(character.health);
    var formattedDate = new Date(character.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newPostDate.text(formattedDate);
    newPostName.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostName);
    newPostCardBody.append(newPostStrength);
    newPostCardBody.append(newPostHealth);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("character", character);
    return newPostCard;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handleCharacterDelete() {
    var currentCharacter = $(this)
      .parent()
      .parent()
      .data("character");
    deleteCharacter(currentCharacter.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handleCharacterEdit() {
    var currentCharacter = $(this)
      .parent()
      .parent()
      .data("character");
    window.location.href = "/addCharacter?character_id=" + currentCharacter.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    characterContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No posts yet for this category, navigate <a href='/addCharacter'>here</a> in order to create a new post.");
    characterContainer.append(messageH2);
  }

});