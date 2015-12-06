# IdeaBox 2.0

This project involves making an app to create and manage ideas using Rails, jQuery, and AJAX. The original assignment is [here](https://github.com/turingschool/curriculum/blob/master/source/projects/revenge_of_idea_box.markdown). Heroku Deployment is here: https://jbrr-ideabox2.herokuapp.com

To install:

1. Clone the repo

2. `bundle install`

3. Start PostgreSQL

4. `rake db:setup`

5. visit `localhost:3000`

To run tests:

* `rake test`

* **Nota Bene**: At the moment, integration tests fail if they run in the wrong order. It's some issue that I haven't figured out yet that involves Capybara, Selenium, and JavaScript now getting along very well. 
