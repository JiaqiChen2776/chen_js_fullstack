import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import './scroll.styl';

class Scroll extends React.Component {
    componentDidUpdate() {
        // 组件更新后
        if (this.bScroll && this.props.refresh === true) {
            this.bScroll.refresh();
        }
    }
    componentWillUnmount() {
        // better-scroll 比较占内存，需要卸载掉
        // 在卸载组件之前，需要进行 垃圾回收
        this.bScroll.off('scroll');  // 取消事件监听
        this.bScroll = null;
    }
    componentDidMount() {
        this.scrollView = ReactDOM.findDOMNode(this.refs.scrollView);
        if (!this.bScroll) {
            this.bScroll = new BScroll(this.scrollView, {
                propType: 3,
                click: this.props.click
            });
            if (this.props.onScroll) {
                // 事件监听
                this.bScroll.on('scroll', (scroll) => {
                    this.props.onScroll(scroll);
                })
            }
        }
    }
    refresh() {
        if (this.bScroll) {
            this.bScroll.refresh();
        }
    }

    render () {
        return (
            <div className="scroll" ref="scrollView">
                {this.props.children }
            </div>
        )
    }
}

Scroll.defaultProps = {
    click: true,
    refresh: false,
    onScroll: null
}

Scroll.propTypes = {
    click: PropTypes.bool,
    refresh: PropTypes.bool,
    onScroll: PropTypes.func
}  

export default Scroll;