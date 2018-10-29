import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from "material-ui/TextField";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import ImageR from './ImageR';
import axios from "axios";

const styles = theme => ({
  root: {
    flexGrow: 10,
    padding: 60,
  }
});

class GuttersGrid extends React.Component {
  state={
    searchText:'',
    amount: 16,
    apiURL: 'https://pixabay.com/api',
    apiID: '0aaa5a30',
    apiKey: '10492014-0de8fc3b87309fe5822d09bb5',
    images:[],
    completed: 0,
    complete: false
  }

   componentDidMount() {
    this.timer = setTimeout(() => this.progress(5), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
      const diff = Math.random() * 30;
      this.timer = setTimeout(() => this.progress(completed + diff), 600);
      this.state.complete = true;
    }
  }

  onTextChange = (event) => {
    console.log(
            `${this.state.apiURL}/?key=${this.state.apiKey}&q=${
              this.state.searchText
            }&image_type=photo&per_page=${this.state.amount}&safesearch=true`);
    this.setState({[event.target.name]: event.target.value}, () => {
          axios.get(
            `${this.state.apiURL}/?key=${this.state.apiKey}&q=${
              this.state.searchText
            }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then(res => this.setState({ images: res.data.hits }))
          .catch(err => console.log(err));
      });

  }

  showProgress(){
    if(!this.state.complete){
    return(<CircularProgress
          mode="determinate"
          value={this.state.completed}
        />);
      }
    }
  


  onAmountChange = (e, index, value) => this.setState({ amount: value });
  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container  justify="center" >
           <Grid item xs={12} sm={6}>
           <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={8} primaryText="8" />
          <MenuItem value={12} primaryText="12" />
          <MenuItem value={16} primaryText="16" />
          <MenuItem value={20} primaryText="20" />
        </SelectField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search images"
          fullWidth={true}
        />
           </Grid>
          </Grid>
        </Grid>
        {!this.state.complete ? (
          <CircularProgress
          mode="determinate"
          value={this.state.completed}
        />
        ) : null}
        {this.state.images.length && this.state.complete > 0 ? (
          <ImageR images={this.state.images} />
        ) : null}
      </Grid>
    );
  }
}

GuttersGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GuttersGrid);