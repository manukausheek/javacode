var request = new XMLHttpRequest();
		request.open('GET', '/feeds/posts/default/-/Job?max-results=21&alt=json', true);

		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				var data = JSON.parse(request.responseText);
				var posts = data.feed.entry;

				var sitemap = document.getElementById('sitemaptwo');

				for (var i = 0; i < posts.length; i++) {
					var title = posts[i].title.$t;
					var link = posts[i].link[4].href;
					var published = new Date(posts[i].published.$t).toLocaleDateString('en-GB');

					var listItem = document.createElement('li');
					listItem.innerHTML = '<a href="' + link + '">' + title + '</a> (' + published + ')';

					if (i < 5) {
						listItem.classList.add('new');
						listItem.innerHTML = 'New! ' + listItem.innerHTML;
					}

					sitemap.appendChild(listItem);
				}
			} else {
				console.log('Error');
			}
		};

		request.onerror = function() {
			console.log('Error');
		};

		request.send();