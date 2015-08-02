'use strict';

var React = require('react/addons');
var cn = require('classnames');
var utils = require('../utils');

module.exports = React.createClass({
  displayName : 'Popover',


  getInitialState : function() {
    return ({
      arrow : 0,
      left: 0,
      active: false
    })
  },


  getDefaultProps : function() {
    return ({
      popover : <span></span>
    })
  },


  handleOutsideClick : function(ev) {
    var root = React.findDOMNode(this);

    if (!utils.isTargetInRoot(ev.target, root)) {
      this.setState({ active : false });
      document.removeEventListener('click', this.handleOutsideClick);
    }
  },


  componentDidUpdate : function() {
    if (this.state.active) {
      document.addEventListener('click', this.handleOutsideClick);
    }
  },


  componentDidMount : function(nextProps) {
    var drect = document.body.getBoundingClientRect();
    var element = React.findDOMNode(this.refs.content);
    var popover = React.findDOMNode(this.refs.popover);
    var prect = popover.getBoundingClientRect();
    var rect = element.getBoundingClientRect();
    var center = rect.left + (rect.width / 2);
    var left = center - (prect.width / 2);
    var arrow = (prect.width / 2) - 5;

    arrow = left < 0 ? arrow - Math.abs(0 - left) : arrow;
    arrow = left + prect.width > drect.width ? arrow + Math.abs(drect.width - (left + precdt.width)) : arrow;

    left = left < 0 ? 0 : left;
    left = left + prect.width > drect.width ? drect.width - prect.width : left;

    document.removeEventListener('click', this.handleOutsideClick);
    document.addEventListener('click', this.handleOutsideClick);

    this.setState({ arrow : arrow, left : left });
  },


  toggle : function() {
    this.setState({ active : !this.state.active });
  },


  renderPopover : function() {
    var css = cn({
      'popover-popover-container' : true,
      'popover-active' : this.state.active
    })

    var style = {
      left : this.state.left
    }

    var arrow = {
      left : this.state.arrow
    }

    return (
      <div ref='popover' className={css} style={style}>
        <div className='popover-arrow' style={arrow}></div>
        {this.props.popover}
      </div>
    )
  },


  render : function() {
    return (
      <div className='popover-container'>
        <div ref='content' className='popover-content-container' onClick={this.toggle}>
          {this.props.children}
        </div>
        {this.renderPopover()}
      </div>
    )
  }
})
