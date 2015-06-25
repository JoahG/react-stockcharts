'use strict';
var React = require('react'),
	d3 = require('d3');

var HistogramSeries = require('./HistogramSeries');

class MACDSeries extends React.Component {
	constructor(props) {
		super(props);
		this.getMACDLine = this.getMACDLine.bind(this);
		this.getSignalLine = this.getSignalLine.bind(this);
		this.getHistogram = this.getHistogram.bind(this);
	}
	getMACDLine() {
		var dataSeries = d3.svg.line()
			.defined((d, i) => this.context.yAccessor(d) !== undefined)
			.x((d) => this.context.xScale(this.context.xAccessor(d)))
			.y((d) => this.context.yScale(this.context.yAccessor(d).MACDLine));

		return dataSeries(this.context.plotData);
	}
	getSignalLine() {
		var dataSeries = d3.svg.line()
			.defined((d, i) => this.context.yAccessor(d) !== undefined)
			.x((d) => this.context.xScale(this.context.xAccessor(d)))
			.y((d) => this.context.yScale(this.context.yAccessor(d).signalLine));

		return dataSeries(this.context.plotData);
	}
	getHistogram() {
		var dataSeries = d3.svg.line()
			.defined((d, i) => this.context.yAccessor(d) !== undefined)
			.x((d) => this.context.xScale(this.context.xAccessor(d)))
			.y((d) => this.context.yScale(this.context.yAccessor(d).histogram));

		return dataSeries(this.context.plotData);
	}
	getChildContext() {
		var yAccess = this.context.yAccessor
		return {
			yAccessor: (d) => yAccess(d).histogram,
		}
	}
	getHorizontalLine() {
		var first = this.context.xAccessor(this.context.plotData[0]);
		var last = this.context.xAccessor(this.context.plotData[this.context.plotData.length - 1]);

		return <line x1={this.context.xScale(first)}
			y1={this.context.yScale(0)}
			x2={this.context.xScale(last)}
			y2={this.context.yScale(0)} className="horizontal" />;
	}
	render() {
		return (
			<g className="macd-series">
				<path d={this.getMACDLine()} className="macdline" />
				<path d={this.getSignalLine()} className="signalline" />
				<HistogramSeries baseAt={this.context.yScale(0)} />
				{this.getHorizontalLine()}
			</g>
		);
	}
};
// baseAt={this.context.yScale(this.context.yScale(0))} 
MACDSeries.contextTypes = {
		xScale: React.PropTypes.func.isRequired,
		yScale: React.PropTypes.func.isRequired,
		xAccessor: React.PropTypes.func.isRequired,
		yAccessor: React.PropTypes.func.isRequired,
		plotData: React.PropTypes.array.isRequired,
	};
MACDSeries.childContextTypes = {
		yAccessor: React.PropTypes.func.isRequired,
	};

MACDSeries.defaultProps = { namespace: "ReStock.MACDSeries" };

module.exports = MACDSeries;