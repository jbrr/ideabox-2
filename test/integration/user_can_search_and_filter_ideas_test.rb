require "test_helper"

class UserCanSearchAndFilterIdeasTest < ActionDispatch::IntegrationTest
  def teardown
    Capybara.reset_sessions!
  end

  test "user can search ideas" do
    visit "/"
    fill_in("search", with: "Later")
    sleep(1)
    refute page.has_content?("Long")
  end
end
