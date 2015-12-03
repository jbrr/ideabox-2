require "test_helper"

class UserCanSearchAndFilterIdeasTest < ActionDispatch::IntegrationTest
  def teardown
    Capybara.reset_sessions!
  end

  test "user can search ideas" do
    visit "/"
    fill_in("#live-search", with: "Later")
    refute page.has_content?("Long")
  end
end
