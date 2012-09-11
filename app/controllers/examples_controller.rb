class ExamplesController < ApplicationController
  def index
    render :layout => 'application', :inline => <<-END
    <ul>
      <% examples.each do |example| %>
        <li><%= link_to example, :action => example %></li>
      <% end %>
    </ul>
    END
  end

  private

  def examples
    globs = view_paths.map{|path| File.join(path, controller_name, '*.html')}
    Dir[*globs].uniq.sort.map{|p| File.basename(p).sub('.html', '')}
  end
  helper_method :examples
end
