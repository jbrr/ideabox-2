function getIdeas() {
  $.getJSON('api/v1/ideas.json')
    .then(function(ideas){
      $.each(ideas, function(index, idea){
        renderIdea(idea)
    });
  });
}

function renderIdea(idea) {
  $("#latest-ideas").prepend(
    "<div class='idea' data-id='"
    + idea.id
    + "' data-quality='"
    + idea.quality
    + "'><h5 contenteditable='true' class='title-editable'>"
    + idea.title
    + "</h5><p contenteditable='true' class='body-editable'>"
    + truncateBody(idea.body)
    + "</p><p class='quality'>Quality: "
    + idea.quality
    + "</p><button class='glyphicon glyphicon-thumbs-up'></button> "
    + "<button class='glyphicon glyphicon-thumbs-down'></button><br>"
    + "<button id='delete-idea' class='btn btn-default btn-xs'>Delete</button></div>"
  )
  editTitle();
  editBody();
}

function truncateBody(body) {
  if (body.length > 100) {
    return $.trim(body).substring(0, 100)
      .split(" ").slice(0, -1).join(" ") + "...";
  } else {
    return body;
  }
}
