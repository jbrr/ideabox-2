require "test_helper"

class UserCanSeeIdeasTest < ActionDispatch::IntegrationTest
  include Capybara::DSL

  def setup
    Capybara.app = Ideabox2::Application

    t = Time.now
    Idea.create(title: "Test Idea",
                body: "Test Body",
                created_at: t)
    Idea.create(title: "Later Idea",
                body: "Later Body",
                created_at: t + 10)
  end

  test "viewing ideas" do
    visit "/"
    assert_equal 200, page.status_code
    assert page.has_content?("Test Idea")
    assert page.has_content?("Test Body")
    assert page.has_content?("Swill")
  end

  test "ideas are sorted with the most recent first" do
    visit "/"
    assert page.all("li")[0].has_content?("Later Idea")
  end
end
