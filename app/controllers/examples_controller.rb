class ExamplesController < ApplicationController
  def index
    render :inline => <<-END
    <ul>
      <% examples.each do |example| %>
        <li><%= link_to example, :action => example %></li>
      <% end %>
    </ul>
    END
  end

  private

  def examples
    examples = Set.new
    view_paths.each do |path|
      Dir.chdir(File.join(path, controller_name)) do
        examples.merge Dir.glob('*').map{|f| f.sub(/\..*/, '')}
      end
    end
    examples
  end
  helper_method :examples
end
