$(document).ready(function() {
  getIdeas();
  createIdea();
  deleteIdea();
  promoteIdea();
  demoteIdea();
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

    $('#idea-title').val('');
    $('#idea-body').val('');

    $.post("api/v1/ideas.json", ideaParams, $(this).serialize())
      .done(renderIdea);
  });
}

function deleteIdea() {
  $('#latest-ideas').delegate('#delete-idea', 'click', function() {
    var $idea = $(this).closest('.idea');

    $.ajax({
      type: 'DELETE',
      url: 'api/v1/ideas/' + $idea.attr('data-id') + '.json',
      success: function(response) {
        $idea.remove();
      }
    });
  });
}

function editTitle(){
  $('.title-editable').keydown(function(event) {
    if(event.keyCode === 13) {
      var $title = event.currentTarget.textContent;
      var $idea = $(this).closest('.idea');

      $.ajax({
        type: 'PATCH',
        url: '/api/v1/ideas/' + $idea.attr('data-id') + '.json',
        data: {idea: {title: $title}},
        success: function(idea){
          $(event.target).blur();
          updateTitle($idea, idea.title);
        }
      });
    }
  });
}

function updateTitle(idea, title) {
  $(idea).find('.title-editable').html(title);
}

function editBody() {
  $('.body-editable').keydown(function(event) {
    if(event.keyCode === 13) {
      var $body = event.currentTarget.textContent;
      var $idea = $(this).closest('.idea');

      $.ajax({
        type: 'PATCH',
        url: 'api/v1/ideas/' + $idea.attr('data-id') + '.json',
        data: {idea: {body: $body}},
        success: function(idea) {
          $(event.target).blur();
          updateBody($idea, idea.body);
        }
      });
    }
  });
}

function updateBody(idea, body) {
  $(idea).find('.body-editable').html(body);
}

function getIdea($idea) {
  $.getJSON('api/v1/ideas/' + $idea.attr('data-id') + '.json')
    .then(function(response) {
      var $quality = $idea.find('.quality');
      $quality.html('Quality: ' + response.quality);
      $idea.attr('data-quality', response.quality);
  });
}
