import React from "react";
import UUID from "uuid/v1";
import "./home.scss";

import InfiniteScroll from "react-infinite-scroller";
import ItemListComponent from "./ItemList/index.js";

export default class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      limit: 20,
      offset: 0,
      project_name: "PYCOGroup Test",
      itemsList: [],
      firstItem:
        "https://media3.giphy.com/media/XE74n8WMDfJzzGW9vK/giphy-preview.webp?cid=a23d07055d1b247a5359676649a33555&rid=giphy-preview.webp",
      showDetails: false
    };

    this.setFirstImage = this.setFirstImage.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=PcjmiLw5b2yfws6iD47n1uHDbRPkSD0A&limit=20&rating=G"
    )
      .then(response => response.json())
      .then(response => {
        if (response.meta.status === 200) {
          if (response.pagination.total_count === 0) {
            alert("No data !");
          } else {
            this.setState({
              ...this.state,
              itemsList: response.data,
              offset: this.state.limit
            });
          }
        }
      });
  }

  setFirstImage(link) {
    this.setState({
      ...this.state,
      firstItem: link,
      showDetails: true
    });
  }

  closePopup() {
    this.setState({
      ...this.state,
      showDetails: !this.state.showDetails
    });
  }

  loadMore() {
    setTimeout(() => {
      fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=PcjmiLw5b2yfws6iD47n1uHDbRPkSD0A&limit=20&offset=${
          this.state.offset
        }&rating=G`,  {mode: 'cors'}
      )
        .then(response => response.json())
        .then(response => {
          if (response.meta.status === 200) {
            if (response.pagination.total_count === 0) {
              alert("No data !");
            } else {
              const newData = this.state.itemsList;
              response.data.forEach(item => {
                newData.push(item);
              });
              this.setState({
                ...this.state,
                itemsList: newData,
                offset: this.state.offset + 20
              });
            }
          }
        });
    }, 2000);
  }

  render() {
    let { itemsList, firstItem } = this.state;
    return (
      <div className="container-flud" id="pyco-test-container">
        <h1>{this.state.project_name}</h1>
        <br />
        {this.state.showDetails ? (
          <div className="image-selected">
            <div>
              <img src={firstItem} alt={""} />
            </div>
            <div>
              <button onClick={() => this.closePopup()}>Close</button>
            </div>
          </div>
        ) : null}

        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={true || false}
          loader={
            <div key={0} className="loading-animation">
              <div />
              <div />
              <div />
            </div>
          }
        >
          <ItemListComponent
            cardItem={itemsList}
            setFirstImage={this.setFirstImage}
          />
        </InfiniteScroll>
      </div>
    );
  }
}
