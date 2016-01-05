import React from "react";
import $ from "jquery";
import Card from "./card";
import shuffleArray from "../helpers/shuffleArray";
import imgArray from "../data/image4tiles";

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			tempSelections: [],
			selectedImage: [],
			level: this.props.level,
			imgList: this.getImageList()
		};
	}

	mergeImageList(times, idx) {
		return [].concat.apply([], Array.apply(null, Array(times)).map(function(){return imgArray[idx].slice();}));
	}

	getImageList() {
		let newArr = [],
			curLevel = parseInt(this.state && this.state.level || this.props.level);

		if(curLevel === 1) {
			let arr8 =  this.mergeImageList(2, 0);
			newArr = shuffleArray(arr8);
		} else if(curLevel === 2) {
			let arr20 = this.mergeImageList(4, 1);
			newArr = shuffleArray(arr20);
		} else if(curLevel === 3) {
			let arr30 = this.mergeImageList(5, 2);
			newArr = shuffleArray(arr30);
		}

		return newArr;
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			tempSelections: [],
			level: nextProps.level
		},function() {
			this.setState({
				imgList: this.getImageList()
			});
		});
	}

	isValidSelection(arr, imgs) {
		if($.inArray("", imgs) !== -1) {
			return false;
		}

		if(arr.length%2 == 0) {
			//Find the last 2 items in the array
			return imgs[0] == imgs[1];
		}
	}

	validateTiles() {
		let arr = this.state.tempSelections.slice(),
			imgs = this.state.selectedImage.slice(),
			isValidArr = this.isValidSelection(arr, imgs);

		if(!isValidArr && arr.length%2 == 0) {
			setTimeout(function(){
				arr.splice(-2, 2);
				this.setState({
					tempSelections: arr,
					selectedImage: []
				});
			}.bind(this), 800);
		} else if(isValidArr && arr.length%2 == 0) {
			//Flush images array
			this.setState({
				selectedImage: []
			});
		}
	}

	handleClick(val, img) {
		let arr = this.state.tempSelections.slice(),
			imgs = this.state.selectedImage.slice();

		arr.push(val);
		imgs.push(img);

		this.setState({
			tempSelections: arr,
			selectedImage: imgs
		}, () => {
			if(this.state.tempSelections.length >= 2) {
				this.validateTiles();
			}
		});
	}

	drawTiles(row, col) {
		let r = row, c = col, table = [], cRow = 0, cCol = 0, dRow = 0, dCol = 1, nRow, nCol, temp;
		for (var i = 0; i < r; i++) {
			let row = [];
			for (var j = 0; j < c; j++) {
				row.push(null);
			}
			table.push(row);
		}

		for (i = 1; i < (r*c)+1; i++) {
			table[cRow][cCol] = i;

			nRow = cRow + dRow;
			nCol = cCol + dCol;

			if ((0 <= nRow && nRow < r) && (0 <= nCol && nCol < c) && table[nRow][nCol] === null) {
				cRow = nRow;
				cCol = nCol;
			} else {
				temp = dRow;
				dRow = dCol;
				dCol = -temp;
				cRow = cRow + dRow;
				cCol = cCol + dCol;
			}
		}

		return table;
	}

	render() {
		let _drawTiles = this.drawTiles(this.props.row, this.props.col),
			result = _drawTiles.map((ritm, ridx) => {
				return (
					<div className="row">
						{ritm.map((citm, cidx, ridx) => {
							return (
								<Card itm={citm} ridx={ridx} idx={cidx} flipped={$.inArray(citm, this.state.tempSelections) !== -1} imgList={this.state.imgList} onClick={this.handleClick} />
							);
						})}
					</div>
				);
			});
		return (
			<div className="game">
				{result}
			</div>
		);
	}
}

export default Game;
