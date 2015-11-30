require 'test_helper'

class IdeaTest < ActiveSupport::TestCase
  attr_reader :idea
  def setup
    @idea = Idea.create(title: "Test",
                        body: "Test")
  end

  test "an idea has a title" do
    assert_equal idea.title, "Test"
  end

  test "an idea has a body" do
    assert_equal idea.body, "Test"
  end

  test "an idea has a default quality" do
    assert_equal idea.quality, 1
  end
end
