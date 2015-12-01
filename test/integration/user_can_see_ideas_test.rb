require "test_helper"

class UserCanSeeIdeasTest < ActionDispatch::IntegrationTest
  include Capybara::DSL

  def setup
    Capybara.app = Ideabox2::Application

    Idea.create(title: "Test Idea", body: "Test Body")
  end

  test "viewing ideas" do
    visit "/"
    assert_equal 200, page.status_code
    assert page.has_content?("Test Idea")
    assert page.has_content?("Test Body")
    assert page.has_content?("Swill")
  end
end
