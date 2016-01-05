import React from "react";
import $ from "jquery";

class Card extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		let $target = $(e.target),
			$front = $target.prev(),
			curVal = parseInt($front.text()),
			curImg = $front.attr("data-image");

		this.props.onClick(curVal, curImg);
	}

	render() {
		let item = this.props.itm,
			idx = this.props.idx,
			ridx = this.props.ridx,
			imgList = this.props.imgList,
			img = imgList[ridx[idx]-1],
			ctr = ridx[idx];

		return (
			<div id={`card${ctr}`}  className="column">
				<div className={(this.props.flipped)?"card":"card flipped"} onClick={this.handleClick}>
					<span className={(item%2 == 0) ? `front even ${img}` : `front ${img}`} data-image={img}>{item}</span>
					<span className="back"></span>
				</div>
			</div>
		);
	}
}

export default Card;
