import React, { Component } from 'react';
import { getCarousel } from '@/api/recommend';
import Swiper from 'swiper';
import "swiper/dist/css/swiper.css";
import './recommend.styl';
import { CODE_SUCCESS } from '../../api/config';

class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderList: []
        }
    }
    // ajax 有时会阻塞页面，应在挂载之后请求数据
    componentDidMount() {
        getCarousel().then(res => {
            // console.log(res);
            if (res) {
                if (res.code === CODE_SUCCESS) {
                 this.setState({
                     sliderList: res.data.slider
                 }, () => {
                    //  只执行一次
                     if (!this.sliderSwiper) {
                         this.sliderSwiper = new Swiper('.slider-container', {
                            loop: true,
                            autoplay: 3000,
                            autoplayDisableOnInteraction: false,
                            pagination: '.swiper-pagination'
                        })
                     }
                     
                 })   
                }
            }
        })
    }
    render() {
        return (
            <div className="music-recommend">
                <div className="slider-container">
                    <div className="swiper-wrapper">
                        {
                            this.state.sliderList.map(slider => {
                                return (
                                    <div className="swiper-slide" key={slider.id}>
                                        <a href="#" className="slider-nav">
                                            <img src={slider.picUrl} width="100%" height="100%" alt="推荐"/>
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        )
    }
};

export default Recommend;