import React from "react";
import $ from "jquery";
import imgArray from "../data/image4tiles";
import Vent from "vent";

var vent = new Vent();

class Card extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		let $target = $(e.target),
			$parent = $target.parent(),
			$front = $target.prev(),
			curVal = parseInt($front.text()),
			curImg = $front.attr('data-image');

		this.props.onClick(curVal, curImg);
	}

	componentWillMount() {
		let idx = this.props.idx,
			ridx = this.props.ridx,
			ctr = 1000 * ridx[idx],
			elemId = `#card${ridx[idx]}`;
		console.log('componentWillMount');
		vent.on(`animate${ctr}`, this.animate);

	}

	animate(elemId, ctr) { console.log('animate', elemId, ctr)
		$(elemId).animate({
			width: "100px",
			height: "100px"
		}, ctr, function() {
			console.log('animate done');
		});
	}

	componentDidMount() {
		let idx = this.props.idx,
			ridx = this.props.ridx,
			ctr = 1000 * ridx[idx],
			elemId = `#card${ridx[idx]}`;

		// this.animate(elemId, ctr);
		vent.trigger(`animate${ctr}`,elemId, ctr);
	}

	render() {
		let item = this.props.itm, 
			i = 0,
			idx = this.props.idx,
			ridx = this.props.ridx,
			imgList = this.props.imgList,
			img = imgList[ridx[idx]-1],
			ctr = ridx[idx];

		return (
			<div id={`card${ctr}`}  className="column">
				<div className={(this.props.flipped)?'card':'card flipped'} onClick={this.handleClick}>
					<span className={(item%2 == 0) ? `front even ${img}` : `front ${img}`} data-image={img}>{item}</span>
					<span className="back"></span>
				</div>
			</div>
		)
	}
}

export default Card;