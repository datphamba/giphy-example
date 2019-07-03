import React from "react";

export default class ItemListComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        {this.props.cardItem.map((item, i) => (
          <div
            key={i}
            className="card-item"
            onClick={() =>
              this.props.setFirstImage(item.images.preview_gif.url)
            }
          >
            <img
              src={item.images.preview_gif.url}
              alt={item.slug}
            />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    );
  }
}
