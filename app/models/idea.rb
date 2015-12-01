class Idea < ActiveRecord::Base
  default_scope { order("created_at DESC") }
  enum quality: %w(swill plausible genius)
end
