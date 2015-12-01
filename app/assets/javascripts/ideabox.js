$(document).ready(function() {
  getIdeas();
  createIdea();
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
  $("#latest-ideas").prepend(
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

function createIdea() {
  $('#create-idea').on('click', function(){
    var ideaTitle  = $('#idea-title').val()
    var ideaBody   = $('#idea-body').val()
    var ideaParams = {
      idea: {
        title: ideaTitle,
        body: ideaBody
      }
    }

    $('#idea-title').val('')
    $('#idea-body').val('')

    $.post("api/v1/ideas.json", ideaParams, $(this).serialize())
      .done(renderIdea)
  })
}
