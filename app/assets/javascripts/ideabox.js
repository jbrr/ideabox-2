$(document).ready(function() {
  getIdeas();
});

function getIdeas() {
  $.getJSON('api/v1/ideas.json')
    .then(function(ideas){
      $.each(ideas, function(index, idea){
        renderIdea(idea)
    });
  });
}

function renderIdea(idea) {
  $("#latest-ideas").append(
    "<div class='idea' data-id='"
    + idea.id
    + "'><h5>"
    + idea.title
    + "</h5><p>"
    + truncateBody(idea.body)
    + "</p><p class='quality'>"
    + idea.quality
    + "</p><button id='delete-idea' class='btn btn-default btn-xs'>Delete</button></div>"
  )
}

function truncateBody(body) {
  if (body.length > 100) {
    return $.trim(body).substring(0, 100)
      .split(" ").slice(0, -1).join(" ") + "...";
  } else {
    return body
  }
}
