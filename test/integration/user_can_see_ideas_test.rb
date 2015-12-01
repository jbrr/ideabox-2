require "test_helper"

class UserCanSeeIdeasTest < ActionDispatch::IntegrationTest
  include Capybara::DSL

  def setup
    Capybara.app = Ideabox2::Application
    Capybara.current_driver = :selenium
  end

  test "viewing ideas" do
    visit "/"
    assert page.has_content?("Test Idea")
    assert page.has_content?("Test Body")
    assert page.has_content?("Swill")
  end

  test "ideas are sorted with the most recent first" do
    visit "/"
    assert page.all(".idea").first.has_content?("Later Idea")
  end

  test "ideas longer than 100 characters are truncated" do
    visit "/"
    assert page.has_content?("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et tellus non ligula cursus commodo....")
  end
end
