<div id="home-template">

	<!-- include jQuery and handlebars -->
	
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
	<script src="/public/scripts/handlebars.js"></script>
	<link href="/public/styles/global.css" type="text/css" rel="stylesheet"  />
	
	<!-- here is an image, to test node.js serving up static content -->
	
	<img id="mainlogo" src="/public/images/nodejs.logo.screenshot.png" alt="official node.js logo"/>
	
	<!-- here is a title -->
	
	<h2>A Node.js (very) light MVC (almost) framework.</h2> 
	
	<!-- here is a handlebar template -->
	
	<script id="entry-template" type="text/x-handlebars-template">
  		<div class="entry">
		  <h3>{{title}}</h3>
  			<p class="topdescription">
    			{{body}}
  			</p>
		</div>
	</script>
	
	<!-- here is the container for the rendered template -->
	
	<div id="entry-template-container">
	</div>
	
	<!-- here is the code that renders the template and pushes it to the DOM -->
	
	<script type="text/javascript">
	
		$(function(){
		
			// compile your template
			
			var source   = $("#entry-template").html();
			var template = Handlebars.compile(source);
			
			// get my data function
			
			var getmydata = function(url, callback){
				$.ajax({					
					url: url,
					success : function(data) {
						// var json = jQuery.parseJSON(data);
						callback(data);
					},
					error : function(err) {
						alert(err);
					}
				});
			};
			
			// render the data function
			
			var renderData = function(context) {
				var html = template(context);
				$('#entry-template-container').html(html);
			};
			
			// do those verbs.
			
			getmydata('/home/gettemplatedata', renderData);
			
			
		});
		
	</script>

</div>