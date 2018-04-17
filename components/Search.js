  //Search - nie trzeba tutaj zbyt wiele wyjaśniać. Ten komponent to pasek
  //wyszukiwania. Napiszemy w nim drobną logikę, która rozpocznie
  //wyszukiwanie, kiedy przyciśniemy enter albo kiedy długość wpisywanego
  //tekstu będzie większa niż 2 litery,
  Search = React.createClass({
    getInitialState(){  
      return {
        searchingText: ''
      };
    },

    handleChange: function(event) {
      var searchingText = event.target.value;
      this.setState({
        searchingText: searchingText
      });

      if (searchingText.length > 2) {
        this.props.onSearch(searchingText);
      }  
    },
    
    handleKeyUp: function(event) {
      if (event.keyCode === 13) {
        this.porps.onSearch(this.state.searchingText);
      }
    }, 

    render: function() {
        var styles = {
            fontSize: '1.5em',
            width: '90%',
            maxWidth: '350px'
        }

    return <input
             type="text"
             onChange={this.handleChange} 
             onKeyUp={this.handleKeyUp}
             placeholder="Tutaj wpisz wyszukiwaną frazę"
             style={styles}
             value={this.state.searchTerm} 
            />
    }
});


//Input , który będzie wspomagany pewną logiką, która będzie obserwowała
//zmiany zachodzące w inpucie i wykonywać na nim pewne akcje
