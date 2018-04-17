//App - tutaj tradycyjnie wszystko będziemy wiązać w jeden byt. W tym
//komponencie będziemy odbierać wiadomość z komponentu zajmującego się
//wyszukiwaniem i przekazywać do komponentu, który wyświetli
//odpowiedniego GIFa
var GIPHY_API_URL = 'http://api.giphy.com';
var GIPHY_PUB_KEY = 'F0FsZaoH8UKVlEJtBVWIlxR8JqGTJyNc';

App = React.createClass({
	
	getInitialState() {
    return {
        loading: false,
        searchingText: '',
        gif: {}
    	};
	},

	handleSearch: function(searchingText){ 
		this.setState({
			loading: true 
		});
		this.getGif(searchingText, function(gif) { 
			this.setState({
				loading: false, 
				gif: gif, 
				searchingText: searchingText
			});
		}.bind(this));
	},

	getGif: function(searchingText, callback) { 
		var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  
		var xhr = new XMLHttpRequest(); 
		xhr.open('GET', url);
		xhr.onload = function() {
			if (xhr.status === 200) {
				var data = JSON.parse(xhr.responseText).data; 
				var gif ={ 
					url: data.fixed_width_downsampled_url,
					sourceUrl: data.url
				};
				callback(gif); 
			}
		};
		xhr.send();
	},

	render: function(){
		var styles = {
			margin: '0 auto',
			textAlign: 'center',
			width: '90%'
		};

		return (
			<div style = {styles}>
					<h1>Wyszukiwarka GIFów!</h1>
					<p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciśnij Enter aby pobrać gifa</p>
					<Search onSearch={this.handleSearch} />
				<Gif
					loading={this.state.loading} 			// informacja czy gif jest ładowany
    				url={this.state.gif.url} 				// jaki jest jego bezpośredni adres URL
    				sourceUrl={this.state.gif.sourceUrl} 	// oraz jaki ma adres do strony z gifem
				/>
			</div>
		);

	}
});