require 'test_helper'

class IdeaTest < ActiveSupport::TestCase
  attr_reader :idea
  def setup
    @idea = Idea.create(title: "Test",
                        body: "Test",
                        quality: 1)
  end

  test "an idea has a title" do
    assert_equal idea.title, "Test"
  end
end
