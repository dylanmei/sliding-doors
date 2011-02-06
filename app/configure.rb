
configure :production do
  set :views, File.dirname(__FILE__) + '/views'
  set :public, File.dirname(__FILE__) + '/public'
end

#configure do
#  set :destination_server, 'http://secure.thoughtful.co'
#end