import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Fullscreen from 'material-ui/svg-icons/navigation/fullscreen';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Close from 'material-ui/svg-icons/navigation/close';

const style = {
  marginRight: 20,
};

class ImageR extends Component {
  state = {
    seeMore: false,
    currentImg: ''
  };

  handleseeMore = img => {
    this.setState({ seeMore: true, currentImg: img });
  };

  handleClose = () => {
    this.setState({ seeMore: false });
  };

  render() {
    let imageListContent;
    const { images } = this.props;

    if (images) {
      imageListContent = (
        <GridList cols={4}>
          {images.map(img => (
            <GridTile
              title={img.tags}
              key={img.id}
              subtitle={
                <span>
                  Photography by <strong>{img.user}</strong>
                </span>
              }
              actionIcon={
                <IconButton tooltip="See more" tooltipPosition="See more" onClick={() => this.handleseeMore(img.largeImageURL)}>
                  <Fullscreen  color="white"/>
                </IconButton>
              }
            >
              <img src={img.largeImageURL} alt="" />
            </GridTile>
          ))}
        </GridList>
      );
    } else {
      imageListContent = null;
    }

    const actions = [
      <FloatingActionButton secondary={true} style={style} onClick={this.handleClose}>
        <Close />
      </FloatingActionButton>
    ];

    return (
      <div>
        {imageListContent}
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.seeMore}
          onRequestClose={this.handleClose}
        >
          <img src={this.state.currentImg} alt="" style={{ width: '100%' }} />
        </Dialog>
      </div>
    );
  }
}

ImageR.propTypes = {
  images: PropTypes.array.isRequired
};

export default ImageR;