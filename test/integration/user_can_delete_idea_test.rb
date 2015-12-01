require "test_helper"

class UserCanDeleteIdeaTest < ActionDispatch::IntegrationTest
  # include Capybara::DSL
  #
  # def setup
  #   Capybara.app = Ideabox2::Application
  #   Capybara.current_driver = :selenium
  #   Capybara.default_max_wait_time = 5
  #   DatabaseCleaner.start
  # end
  #
  # def teardown
  #   DatabaseCleaner.clean
  # end

  test "user deletes an idea" do
    visit "/"
    first("#delete-idea").click
    refute page.has_content?("Later Idea")
  end
end
