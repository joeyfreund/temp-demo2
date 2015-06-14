(function () {
    var gitcover = angular.module("GitCover");
    Parse.initialize("GdHAIEOn6fGCxX3kKRc5ZgR3FdN13yND0hJ8LiDT", "8lyC73dGU8jsJQzAFqunDV0oNoNBa14SDSHMCSql");

    

	gitcover.factory('DAO', [function(){
			var DAO = {};

			//---------------------------------------------------------------------
			// Data

			DAO.data = {

				items:  [
					{
						"title": "Greeio",
						"url" : "http://greeio.com",
						"thumbnail" : "https://s3.amazonaws.com/joeyfreund.com/greeio_thumbnail.png",
						"description" : "One of my passion projects. I built Greeio because I believe that every culture has hidden musical gems that should be shared with the world.",
						"tags" : ["ux", "product", "frontend"]
					},
					{
						"title": "Blueprints",
						"url" : "https://github.com/xnlogic/blueprints",
						"badge" : "http://code-bude.net/wp-content/uploads/2013/10/1372714624_github_circle_black.png",
						"description" : "Blueprints is a property graph model interface. I am one of the contributors of the project.",
						"tags" : ["java", "neo4j"]
					},
					{
						"title": "GitCover, front-end",
						"url" : "https://bitbucket.org/joey_freund/gitcover-frontend",
						"badge" : "http://www.caffeinatednightmare.com/blog/wp-content/uploads/2014/11/bitbucket-icon-150x150.png",
						"css_class" : "theme-1",
						"description" : "Source code for GitCover's front-end web application. GitCover is a simple portfolio page for hackers and software professional. Note: The repo is currently private.",
						"tags" : ["ux", "product", "frontend"]
					},
					{
						"title" : "Introduction to XN",
						"url" : "http://slides.com/joeyfreund/xn-intro",
						"badge" : "https://s3.amazonaws.com/static.slid.es/logo/slides-logo-495x479.png",
						"css_class" : "theme-2",
						"tags": ["content development", "slides"], 
						"description": "Training slides for the XN framework."
					},
					{
						"title" : "Pacer Docs",
						"url": "http://xnlogic.github.io/pacer",
						"tags": ["content development", "docs"],
						"description": "Documentation website for the Pacer library." 
					},
					{
						"title": "Software Engineering, Course Archive",
						"url": "https://github.com/joeyfreund/soft-eng-course-material",
						"badge" : "http://code-bude.net/wp-content/uploads/2013/10/1372714624_github_circle_black.png",
						"css_class" : "theme-1",
						"tags": ["content development", "university of toronto"],
						"description" : "Archive of all course material developed for a 3rd-year software engineering course, CSC301. I taught the course at the University of Toronto in the Fall of 2014."
					}
					
				]
			};

			//---------------------------------------------------------------------
			// Access Methods

			DAO.getItems = function(){ return DAO.data.items; };

			DAO.getTags = function(){
				// Collect all tags from the items
				var tagsText = new Set();
				DAO.getItems().forEach(function(item){
					if(item.tags){
						item.tags.forEach(function(tag){
							tagsText.add(tag);
						});
					}
				});

				// Return the tags as an array of objects 
				var tags = [];
				tagsText.forEach(function(tagText){
					tags.push({
						text: tagText
					});
				});
				return tags;
			};

			//-----------------------------------------------------------------
			// Header


			DAO._userToPojo = function(user){
				if(user){
					return {
						username: user.get('username'),
						name: user.get('name'),
						description: user.get('description'),
						profilePic: user.get('profilePic'),
  					};
				} else {
					return null;
				}
			};


			DAO.login  = function(success, error){
				Parse.User.logIn("joey", "123456", {

  					'success' : function(user){
  						success(DAO._userToPojo(user));
  					},

  					'error'   : error
  				});
			};

			DAO.logout = function(success){
				Parse.User.logOut().then(success);
			};

			DAO.isLoggedIn = function(){
				return Parse.User.current() != null;
			};

			DAO.getLoggedInUser = function(){
				return DAO._userToPojo(Parse.User.current());
			}

			//-----------------------------------------------------------------

			DAO.getUserByUsername = function(username, success){
				var query = new Parse.Query(Parse.User)
					.equalTo("username", username)
					.first()
					.then(function(user){
						success(DAO._userToPojo(user));
					});
			};


			return DAO;
		}
	]); 


})();