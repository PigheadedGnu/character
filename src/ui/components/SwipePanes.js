'use strict';

var React = require('react/addons');
var Swiper = require('swiper');
var swipe;

module.exports = React.createClass({
  displayName : "SwipePanes",


  componentDidUpdate : function() {
    swipe.slideTo(this.props.activeIdx || swipe.activeIndex);
  },


  componentDidMount : function() {
    var mount = React.findDOMNode(this);
    var { activeIndex, ...opts } = this.props;

    swipe = new Swiper(mount, opts);
  },


  render : function() {
    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {this.props.children}
        </div>
      </div>
    )
  }
})