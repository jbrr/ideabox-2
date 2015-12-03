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
