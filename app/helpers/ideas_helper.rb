module IdeasHelper
  def truncate_body(body)
    truncate(body, length: 100, separator: " ")
  end
end
