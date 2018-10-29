import React, {Component} from "react";
import TextField from "material-ui/TextField";
import axios from "axios";

class Search extends Component{

  state={
    searchText:' ',
    amount: 3,
    apiURL: 'https://api.edamam.com/search',
    apiID: '0aaa5a30',
    apiKey: '121323f4231d114135c674183b918926',
    images:[]
  }

  onTextChange = (event) => {
    console.log(`${this.state.apiURL}?q=${this.state.searchText}
          &app_id=${this.state.apiID}&app_key=${this.state.apiKey}
          &from=0&to=3&calories=591-722&health=alcohol-free`);

    this.setState({searchText: event.target.value}, () => {
        axios.get(
          `${this.state.apiURL}?q=${this.state.searchText}
          &app_id=${this.state.apiID}&app_key=${this.state.apiKey}
          &from=0&to=3&calories=591-722&health=alcohol-free`
          )

          .then(res => this.setState({ images: res.data.hits.recipe }))
          .catch(err => console.log(err));
      });
  }


  render(){
    console.log(this.state.images);
    return(
       <div>
         <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search For Images"
          fullWidth={true}
        />

       </div>
      )
  }

}
export default Search;